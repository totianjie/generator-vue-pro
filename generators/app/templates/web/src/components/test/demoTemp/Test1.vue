<template>
    <div>
        <span class="a">5566</span>
        <br>
        <span v-on="inputListeners" class="b" a="ids" data-a="data-a-123">123456</span>
    </div>
</template>
<script>
export default {
    computed: {
        inputListeners: function () {
            // var vm = this;
            // `Object.assign` 将所有的对象合并为一个新对象
            return Object.assign({},
                // 我们从父级添加所有的监听器
                this.$listeners,
                // 然后我们添加自定义监听器，
                // 或覆写一些监听器的行为
                // {
                //     // 这里确保组件配合 `v-model` 的工作
                //     input: function (event) {
                //         vm.$emit('input', event.target.value);
                //     }
                // }
            );
        }
    }
};
</script>

