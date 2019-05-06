<template>
    <div>
        <hr>
        <ul class="tabs-wrap">
            <li class="item-wrap" @click="handleClick(1)">tab1</li>
            <li class="item-wrap" @click="handleClick(2)">tab2</li>
        </ul>
        <component :is="currentComponent" v-bind.sync="$data"></component>   
        <hr>
    </div>
</template>
<script>
import Temp from './ComponentsIs1.vue';
import Temp2 from './ComponentsIs2.vue';

export default {
    data () {
        return {
            test: 1,
            currentComponent: 'Temp'
        };
    },
    mounted () {
        console.log(this.$data);
    },
    methods: {
        handleClick (index) {
            this.currentComponent = index === 1 ? 'Temp' : 'Temp2';
        }
    },
    components: {
        Temp,
        Temp2
    }
};
</script>
<style lang="scss" scoped>
    .tabs-wrap {
        overflow: hidden;
        .item-wrap {
            float: left;
            width: 50px;
            height: 30px;
            margin-left: 20px;
            line-height: 30px;
            border: 1px solid #ccc;
            text-align: center;
            ;
        }
    }
</style>

