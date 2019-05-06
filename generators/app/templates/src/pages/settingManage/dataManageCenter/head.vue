<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <div class="over-hidden">
        <v-search-box>
            <div>
                <el-col :span="span" class="search-status-class">
                    <v-input :label="headTitle" :span="5">
                        <v-select v-model="selectMenu" @change="change" :list="DMbussinessCodeList" :size="formSize" :props="selectProps" placeholder="请选择" />
                    </v-input>
                </el-col>
            </div>
            <div slot="btn">
                <el-button type="primary" @click="handlerSearch" :size="btnSize">查询</el-button>
            </div>
        </v-search-box>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('settingManage');
    export default {
        props: {
            headTitle: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                selectProps: {
                    name: 'busiName',
                    value: 'busiCode'
                },
                keyword: '',
                span: 8,
                selectShow: {},
                formSize: CONFIG.homeFormSize,
                btnSize: CONFIG.homeBtn
            };
        },
        computed: {
            selectMenu: {
                get: function () {
                    console.log("get");
                    if (this.DMSelectMenuIsTemp) {
                        this.selectShow = this.DMSelectMenuIsTemp;
                    }
                    return this.selectShow.busiCode;
                },
                set: function (value) {
                    console.log("set", value);
                    let objArr = this.DMbussinessCodeList.filter(item => {
                        return item.busiCode === value;
                    }) || [{}];
                    let obj = objArr[0] || {};
                    this.selectShow = obj;
                }
            },
            ...mapGetters(['DMbussinessCodeList', 'DMSelectMenu', 'DMSelectMenuIsTemp'])
        },

        watch: {

        },

        methods: {
            change (val) {
                console.log("change", val);
                let objArr = this.DMbussinessCodeList.filter(item => {
                    return item.busiCode === this.selectShow.busiCode;
                }) || [{}];
                let obj = objArr[0] || {};
                console.log("change", obj);
                this.setDMSelectMenuIsTemp(obj);
            },
            handlerSearch () {
                console.log("handlerSearch");
                if (this.selectMenu === undefined) {
                    this.resetOffsetDM();
                    this.setDMSelectMenu({});
                    this.setDMSelectMenuIsTemp({});
                    this.requestDataDM();
                    this.$emit("resetPage");
                    return;
                }
                if (JSON.stringify(this.selectMenu) === '{}') {
                    this.resetOffsetDM();
                    this.setDMSelectMenu({});
                    this.setDMSelectMenuIsTemp({});
                    this.requestDataDM();
                    this.$emit("resetPage");
                    return;
                }
                let objArr = this.DMbussinessCodeList.filter(res3 => {
                    return res3.busiCode === this.selectMenu;
                }) || [{}];
                let obj = objArr[0] || {};
                this.resetOffsetDM();
                this.setDMSelectMenu(obj);
                this.setDMSelectMenuIsTemp(obj);
                this.requestDataDM();
                this.$emit("resetPage");
            },
            ...mapMutations({
                setDMbussinessCodeList: 'setDMbussinessCodeList',
                setDMSelectMenu: 'setDMSelectMenu',
                setDMSelectMenuIsTemp: 'setDMSelectMenuIsTemp'
            }),
            ...mapActions(['resetOffsetDM', 'requestDataDM'])
        },
        components: {
            
        }
    };
</script>
<style lang="scss" scoped>
    .m-t-5 {
        margin-top: 5px;
    }
    .search-status-class{
        min-width: 400px;
    }
</style>
