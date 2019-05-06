<template>
    <div>
        <span>{{title}}</span>
        <span @click='update'>更新数据</span>
        <hr>
        {{a}}
        {{b}}
        <hr>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        // a: {
        //     type: Number,
        //     default: 0
        // },
        // b: {
        //     type: Number,
        //     default: 0
        // }
        a: Number,
        b: Number
    },
    methods: {
        update () {
            this.$emit('update:title', `update-${this.title}`);
            this.$emit('update:a', 300);
        }
    }
};
</script>

