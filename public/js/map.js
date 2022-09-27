export function initUserPoint() {

    var userMarkerInfo = { id: "sb", title: "华少", content: "您的位置", lng: 0, lat: 0 };
    if (navigator.geolocation) {
        //根据定位获取用户当前坐标经纬度
        navigator.geolocation.getCurrentPosition(function (position) {

            userMarkerInfo.lng = position.coords.longitude; // 经度
            userMarkerInfo.lat = position.coords.latitude; // 纬度

            console.log("用户经度：" + userMarkerInfo.lng + "，纬度：" + userMarkerInfo.lat);
        })
    }

    return userMarkerInfo;
}