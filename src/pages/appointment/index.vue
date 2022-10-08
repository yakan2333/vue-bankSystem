<template>
  <div>
    <div id="allmap"></div>
    <div id="selectTime">
      <button id="backToUserBT">返回以用户为中心地图</button>
      <el-select
        v-model="options.value"
        placeholder="请选择预约时间"
        @change="getresult"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="网点编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="网点名" width="180">
        </el-table-column>
        <el-table-column prop="num" label="当前预约人数" width="180">
        </el-table-column>
        <el-table-column prop="distance" label="距离(米)"> </el-table-column>
        <el-table-column prop="time" label="大致需要等待时间(分钟)">
        </el-table-column>

        <el-table-column label="预约操作" prop="compile">
          <template slot-scope="{ row, $index }">
            <el-button
              type="button"
              size="mini"
              @click="handlePass(row, $index)"
              >{{ row.compile }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MapVGL",
  data() {
    return {
      appointment: {
        userID: 18,
        mechanismId: 10001,
        time: 1,
      },
      tableData: [],
      distanceList: [],
      nameList: [],
      options: [
        { value: 1, label: "8:00-10:00" },
        { value: 2, label: "10:00-12:00" },
        { value: 3, label: "14:00-16:00" },
        { value: 4, label: "16:00-18:00" },
      ],
      iconSize: { w: 30, h: 30, l: 0, t: 0, x: 6, lb: 5 },
      userMarkerInfo: {
        id: "sb",
        url: "src\assets\test.png",
        title: "华少",
        content: "您的位置",
        lng: 0,
        lat: 0,
      },
    };
  },
  mounted() {
    this.init();

    let that = this;
    axios
      .get("/getMechanismList")
      .then(function (response) {
        console.log(response.data.data);

        //批量生成网点的坐标标注
        that.addMechanismPointInfo(that.taransResponse(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log("初始化地图信息");
      });
  },
  methods: {
    init() {
      this.initMap();
      this.initUserPoint();
      this.setMapEvent();
      this.addMapControl();
      this.initBtEvent();
    },

    initMap() {
      var map = new BMap.Map("allmap");
      window.map = map;
    },

    initUserPoint() {
      var userPoint;

      let that = this;

      navigator.geolocation.getCurrentPosition(function (position) {
        that.userMarkerInfo.lng = position.coords.longitude; // 经度
        that.userMarkerInfo.lat = position.coords.latitude; // 纬度

        userPoint = new BMap.Point(
          that.userMarkerInfo.lng,
          that.userMarkerInfo.lat
        );

        console.log(
          "用户经度：" +
            that.userMarkerInfo.lng +
            "，纬度：" +
            that.userMarkerInfo.lat
        );

        map.centerAndZoom(userPoint, 15); //以用户当前坐标为中心生成地图，地图初始大小15，范围3-19
        that.addMarker(that.userMarkerInfo);
        window.userPoint = userPoint;
      });
    },

    setMapEvent() {
      map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
      map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
      map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
      map.enableKeyboard(); //启用键盘上下左右键移动地图

      map.addEventListener("click", function (e) {
        console.log(
          "点击位置，经度：" + e.point.lng + "，维度：" + e.point.lat
        );
      });
    },

    addMapControl() {
      //向地图中添加平移、缩放控件
      var ctrl_nav = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE,
      });
      map.addControl(ctrl_nav);
      //向地图中添加缩略图控件
      var ctrl_ove = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1,
      });
      map.addControl(ctrl_ove);
      //向地图中添加比例尺控件
      var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
      map.addControl(ctrl_sca);
      //向地图中添加地图类型空间，可切换2D，3D，卫星图
      map.addControl(new BMap.MapTypeControl());
    },

    addMarker(json) {
      /*  console.log("marker: lng:" + json.lng + ",lat:" + json.lat); */

      //根据坐标创建标注点
      let iconImg = this.createIcon(json);
      let marker = new BMap.Marker(new BMap.Point(json.lng, json.lat), {
        icon: iconImg,
      });
      //创建infoWindow

      let iw = this.createInfoWindow(json);
      marker.addEventListener("click", function () {
        this.openInfoWindow(iw);
      });

      marker.ID = json.id;

      map.addOverlay(marker);

      /* console.log("新增标注: ID:" + json.id + " 坐标：" + json.lng + "," + json.lat); */
      return marker;
    },

    createIcon(json) {
      let iconSize = this.iconSize;
      //根据json中的信息生成icon
      var icon = new BMap.Icon(
        json.url,
        new BMap.Size(iconSize.w, iconSize.h),
        {
          imageOffset: new BMap.Size(-iconSize.l, -iconSize.t),
          infoWindowOffset: new BMap.Size(iconSize.lb + 5, 1),
          offset: new BMap.Size(iconSize.x, iconSize.h),
        }
      );
      return icon;
    },

    createInfoWindow(json) {
      var iw = new BMap.InfoWindow(
        "<b class='iw_poi_title' title='" +
          json.title +
          "'>" +
          json.title +
          "</b><div class='iw_poi_content'>" +
          json.content +
          "</div>"
      );
      return iw;
    },

    initBtEvent() {
      let that = this;
      let backToUserBT = document.getElementById("backToUserBT");
      backToUserBT.addEventListener("click", function () {
        window.setTimeout(function () {
          map.panTo(
            new BMap.Point(that.userMarkerInfo.lng, that.userMarkerInfo.lat)
          );
          console.log(
            "地图中心定位到位置：" +
              that.userMarkerInfo.lng +
              "，" +
              that.userMarkerInfo.lat
          );
        }, 1000);
      });
    },

    //批量增加点和标注
    addMechanismPointInfo(list) {
      var markerList = new Array();
      for (let i = 0; i < list.length; i++) {
        markerList.push(this.addMarker(list[i]));
      }
    },

    //测试能否批量添加
    testAddList() {
      let markerInfoList = [
        {
          id: "10001",
          url: "../img/flash.png",
          title: "网点1",
          content: "当前网点预约人数",
          lng: 115.83069930916683,
          lat: 28.67036966457041,
        },
        {
          id: "10002",
          url: "../img/flash.png",
          title: "网点2",
          content: "当前网点预约人数",
          lng: 115.91657637048775,
          lat: 28.688846961648085,
        },
      ];
      this.addMechanismPointInfo(markerInfoList);
    },

    //转换接收到的JSON数组
    taransResponse(list) {
      let markerInfoList = new Array();

      for (let i = 0; i < list.length; i++) {
        let info = {
          id: 0,
          url: "../img/flash.png",
          title: 0,
          content: 0,
          lng: 0,
          lat: 0,
        };
        info.id = list[i].id;
        info.title = list[i].name + list[i].type;
        info.content = "联系电话：" + list[i].phone;
        info.lng = list[i].lng;
        info.lat = list[i].lat;
        markerInfoList.push(info);
      }

      window.markerInfoList = markerInfoList;
      return markerInfoList;
    },

    //根据当前网点信息计算出距离用户距离和所需时间
    getMechanismList() {
      let list = window.markerInfoList;
      let speed = 6 * 60; //每分钟行驶多少米
      let userPoint = new BMap.Point(
        this.userMarkerInfo.lng,
        this.userMarkerInfo.lat
      );

      this.nameList = new Map();
      this.distanceList = new Map();

      //记录
      let userToMechanismTime = new Map();
      /* console.log("========================================");
            console.log("市区行驶速度约为：" + speed + "米/分钟\n"); */

      for (let i = 0; i < list.length; i++) {
        let distance = map
          .getDistance(userPoint, new BMap.Point(list[i].lng, list[i].lat))
          .toFixed(2);
        let time = (distance / speed).toFixed(2);

        /* console.log("网点：" + list[i].title + " , 经纬度：" + list[i].lng + "," + list[i].lat);
                console.log("距离用户点：" + distance + "米");
                console.log("所需时间：" + time + "分钟\n"); */

        userToMechanismTime.set(list[i].id, time);

        this.nameList.set(list[i].id, list[i].title);
        this.distanceList.set(list[i].id, distance);
      }
      /* console.log(userToMechanismTime.entries());
            console.log("========================================"); */

      //返回Map
      return userToMechanismTime;
    },

    //排序计算各网点大致需要等待时间
    addTime(map, list) {
      for (let i = 0; i < list.length; i++) {
        /* console.log("时间1：" + list[i].time);
                console.log("时间2：" + map.get(list[i].id)); */

        list[i].time = parseFloat(
          parseFloat(list[i].time) + parseFloat(map.get(list[i].id))
        ).toFixed(2);
      }

      return this.sortList(list);
    },

    sortList(list) {
      list.sort(function (a, b) {
        return a.time - b.time; //	降序，升序则反之
      });

      return list;
    },

    //
    getresult() {
      let that = this;
      let map = that.getMechanismList();

      axios
        .get("/recommend")
        .then(function (response) {
          let list = response.data.data.data;
          console.log(list);

          let time = that.options.value - 1;
          if (that.options.value == null) {
            time = 0;
          }

          let result = that.addTime(map, list[time]);
          console.log(result);

          that.showList(result);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          console.log("从后端接收数据");
        });
    },

    //
    showList(result) {
      this.tableData = [];
      for (let i = 0; i < result.length; i++) {
        this.tableData.push({
          id: result[i].id,
          name: this.nameList.get(result[i].id),
          num: result[i].num,
          distance: this.distanceList.get(result[i].id),
          time: result[i].time,
          compile: "预约",
        });
      }
      console.log(this.tableData);
    },

    handlePass(row, $index) {
      this.appointment.mechanismId = row.id;
      this.appointment.time = this.options.value;

      console.log(this.appointment);

      axios
        .get("/appointment", {
          params: this.appointment,
        })
        .then((resp) => {
          console.log(resp);

          if (resp.data.data.code == 250) {
            alert("预约失败，当前时间段当前网点已存在，不可重复预约");
          } else {
            this.getresult();
          }
        });
    },
  },
};
</script>

<style scoped>
#allmap {
  width: 1000px;
  height: 600px;
}
</style>
