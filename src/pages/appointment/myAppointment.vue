<template></template>

<script>
import { thisTypeAnnotation } from '@babel/types';
import axios from 'axios'
export default {

    data() {

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
            }).then((resp) => {
                console.log(resp);
            });
        },
    }
};
</script>

<style>

</style>