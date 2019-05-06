<template>
    <div>
        {{a}} / 
        {{b}}
        <input  v-bind="$attrs" />
        <test1 @click.native="handleClick"/>
    </div>
</template>
<script>
import Test1 from './Test1.vue';
export default {
    // inheritAttrs: false,
    props: {
        a: [Number, String],
        b: [Number, String]
    },
    mounted () {
    },
    methods: {
        handleClick (event) {
            console.log(event.target.className);
            console.log(event.target.getAttribute('a'));
            console.log(event.target.dataset.a);
        }
    },
    components: { Test1 }
};
</script>

