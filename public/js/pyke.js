var userPointLat, userPointLng;
var userPoint;
var map;
var iconSize = { w: 30, h: 30, l: 0, t: 0, x: 6, lb: 5 }
var userMarkerInfo = { id: "sb", url: "../img/test.png", title: "华少", content: "您的位置", lng: 0, lat: 0 };

var markerInfoList = [
    {
        id: "10001", url: "../img/flash.png", title: "网点1", content: "当前网点预约人数", lng: 115.83069930916683, lat: 28.67036966457041
    },
    {
        id: "10002", url: "../img/flash.png", title: "网点2", content: "当前网点预约人数", lng: 115.91657637048775, lat: 28.688846961648085
    }
];

var markerList = new Array();

export function init() {
    initUserPoint();
    setMapEvent();
    addMapControl();
    initBtEvent();
    addMechanismPointInfo(markerInfoList);
}

//初始化用户坐标，以用户当前坐标为中心生成地图
function initUserPoint() {

    map = new BMap.Map("container");

    //检测浏览器是否支持定位API
    if (navigator.geolocation) {
        //根据定位获取用户当前坐标经纬度
        navigator.geolocation.getCurrentPosition(function (position) {

            userPointLng = position.coords.longitude; // 经度
            userPointLat = position.coords.latitude; // 纬度
            userPoint = new BMap.Point(userPointLng, userPointLat);

            console.log("经度：" + userPointLng + "，纬度：" + userPointLat);

            map.centerAndZoom(userPoint, 15);//以用户当前坐标为中心生成地图，地图初始大小15，范围3-19


            userMarkerInfo.lng = userPointLng;
            userMarkerInfo.lat = userPointLat;
            console.log("用户标注:" + userMarkerInfo.lng + "," + userMarkerInfo.lat);
            var userMarker = addMarker(userMarkerInfo);
        })
    }

    window.userPoint = userPoint;
    window.map = map;
}

//地图基础事件
function setMapEvent() {
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图

    map.addEventListener('click', function (e) {
        console.log('点击位置，经度：' + e.point.lng + '，维度：' + e.point.lat);
    })
}

//向地图中添加基础控件
function addMapControl() {
    //向地图中添加平移、缩放控件
    var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    map.addControl(ctrl_sca);
    //向地图中添加地图类型空间，可切换2D，3D，卫星图
    map.addControl(new BMap.MapTypeControl());
}


//创建标注点坐标
function addMarker(json) {
    //根据坐标创建标注点
    let iconImg = createIcon(json);
    let marker = new BMap.Marker(new BMap.Point(json.lng, json.lat), { icon: iconImg });
    //创建infoWindow

    let iw = createInfoWindow(json);
    marker.addEventListener('click', function () {
        this.openInfoWindow(iw);

    })

    marker.ID = json.id;
    console.log(marker);
    map.addOverlay(marker);
    console.log("新增标注: ID:" + json.id + " 坐标：" + json.lng + "," + json.lat);
    return marker;
}

//创建一个Icon
function createIcon(json) {

    //根据json中的信息生成icon
    var icon = new
        BMap.Icon(json.url,
            new BMap.Size(iconSize.w, iconSize.h),
            {
                imageOffset: new BMap.Size(-iconSize.l, -iconSize.t), infoWindowOffset: new BMap.Size(iconSize.lb + 5, 1),
                offset: new BMap.Size(iconSize.x, iconSize.h)
            })
    return icon;
}

//创建InfoWindow
function createInfoWindow(json) {
    var iw = new
        BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
    return iw;
}


//按钮基础事件
function initBtEvent() {

    //添加按钮事件，用户点击时，自动回到以自己为中心的地图
    let btBackToUser = document.getElementById("backToUser");
    btBackToUser.addEventListener('click', backToUser);

    //添加按钮事件，点击时删除全部标注（除用户标注）
    let btRemoveIcon = document.getElementById("removeIcon");
    btRemoveIcon.addEventListener('click', removeMechanismPointInfo);

    // 添加按钮事件，点击时获取各个标注和用户的距离
    let btgetDistanceFromUser = document.getElementById("getDistanceFromUser");
    btgetDistanceFromUser.addEventListener('click', function () {
        getDistanceFromUser(markerInfoList);
    })
}

//将地图平移至以用户为中心的位置
function backToUser() {
    window.setTimeout(function () {
        map.panTo(userPoint);
        console.log("地图中心定位到位置：" + userPoint.lng + "，" + userPoint.lat);
    }, 1000);
}

//批量增加点icon标注
function addMechanismPointInfo(list) {

    for (let i = 0; i < list.length; i++) {
        markerList.push(addMarker(list[i]));
    }
}

// 批量删除icon标注
function removeMechanismPointInfo() {
    console.log("删除全部标注: " + markerList.length);
    for (let i = markerList.length; i > 0; i--) {
        let mark = markerList.pop();
        map.removeOverlay(mark);
    }

    alert(markerInfoList.length);
}

//计算个网点和用户之间的距离
function getDistanceFromUser(list) {

    let speed = 12 * 60;//每分钟行驶多少米

    //记录
    let userToMechanismTime = new Map();

    console.log("========================================");
    console.log("用户点： " + userPoint.lng + "," + userPoint.lat);
    console.log("市区行驶速度约为：" + speed + "米/分钟\n")
    for (let i = 0; i < list.length; i++) {
        let distance = map.getDistance(userPoint, new BMap.Point(list[i].lng, list[i].lat)).toFixed(2);
        let time = (distance / speed).toFixed(2);

        console.log("当前点：" + list[i].title + " , 经纬度：" + list[i].lng + "," + list[i].lat);
        console.log("距离用户点：" + distance + "米");
        console.log("所需时间：" + time + "分钟\n");

        userToMechanismTime.set(list[i].id, time);
    }
    console.log(userToMechanismTime.entries());
    console.log("========================================");


    //返回Map
    return userToMechanismTime;
}

init();