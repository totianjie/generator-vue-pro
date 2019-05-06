<template>
    <div class="gauge-demo">
        <div class="page">
            <ul class="list">
                <li class="item">
                    <gauge
                        :current="current"
                        :count="100"
                        :isLg="true"
                        name="深圳"
                    >
                    </gauge>
                </li>
                <li class="item">
                    <gauge
                        :current="20"
                        :count="100"
                        name="aa"
                    >
                    </gauge>
                </li>
                <li class="item">
                    <gauge
                        :end="100"
                        :current="60"
                        :count="100"
                        :isLg="true"
                        :colors="[{n: 0, color: '#f60'},{n: 0.7, color: '#000'}]"
                    >
                    </gauge>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'GaugeDemo',
        props: {},

        data () {
            return {
                current: 0
            };
        },
        mounted () {
            setInterval(() => {
                this.current = this.rand(1, 100);
            }, 1000);
        },

        methods: {
            rand (n, m) {
                return Math.random() * (m - n) + n;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import './../../scss/common';
    @import './../../scss/mixins';
    @import './../../scss/variables';

    .item {
        width: 200px;
        float: left;
        background: #c0c4cc;
        margin: 20px;
    }
</style>
