<template>
    <div>
        tab1
        <br>
        {{test}}
        <br>
        <input type="button" @click="handleClick" value="改变父级数据">
    </div>
</template>
<script>
export default {
    props: {
        test: {
            type: [Number, String],
            default: ''
        }
    },
    mounted () {
        console.log('tab1更新');
        console.log(`this.a: ${this.a}`);
    },
    methods: {
        handleClick () {
            this.$emit('update:test', this.test + 'update');
        }
    }
};
</script>

