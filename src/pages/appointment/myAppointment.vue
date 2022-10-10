<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="网点编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="网点名" width="180">
            </el-table-column>
            <el-table-column prop="time" label="预约时间段" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="num" label="排队序号">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

import { thisTypeAnnotation } from '@babel/types';

import axios from 'axios'
export default {

    data() {
        return {
            tableData: [],
        };
    },

    mounted() {
        this.getAllAppointmentById();
    },

    methods: {

        getAllAppointmentById() {
            let p = JSON.parse(localStorage.getItem("user"));
            console.log("预约人：" + p.id);

            axios.get("/myAppointment", {
                params: { userId: p.id }
            }).then((response) => {
                let list = response.data.data.data;
                console.log(list);
                this.showList(list);
            });
        },

        //将信息展示在表格上
        showList(result) {

            this.tableData = [];
            for (let i = 0; i < result.length; i++) {
                this.tableData.push({
                    id: result[i].mechanismId,
                    name: result[i].mechanismName,
                    time: result[i].time,
                    createTime: result[i].createTime,
                    num: result[i].num,
                });
            }
        },
    }
};
</script>

<style>

</style>