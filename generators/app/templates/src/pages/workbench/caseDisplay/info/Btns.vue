<!--
* @Author: GOTINTIN
* @Date: 2018-9-10
* @Last Modified by: GOTINTIN
* @Last Modified time: 2018-9-10
* @remark: 医嘱信息和收费明细查询
-->
<template>
    <div class="btn-wrap">
        <el-row type="flex" justify="space-around">
            <el-col :span="8">
                <el-button-group>
                    <el-button @click="handleBtnClick('1', '药品')" :class="{'btn-action': btnAction === '1'}" :size="btnSize">药品</el-button>
                    <el-button @click="handleBtnClick('2', '检查')" :class="{'btn-action': btnAction === '2'}" :size="btnSize">检查</el-button>
                    <el-button @click="handleBtnClick('3', '治疗')" :class="{'btn-action': btnAction === '3'}" :size="btnSize">治疗</el-button>
                    <el-button @click="handleBtnClick('4', '材料')" :class="{'btn-action': btnAction === '4'}" :size="btnSize">材料</el-button>
                    <el-button @click="handleBtnClick('5', '其他')" :class="{'btn-action': btnAction === '5'}" :size="btnSize">其他</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="7">
                <el-button-group>
                    <el-button @click="handleDetailBtnClick(0)" :class="{'btn-action': btnDetailAction === 0}" :size="btnSize">去重后项目</el-button>
                    <el-button @click="handleDetailBtnClick(1)" :class="{'btn-action': btnDetailAction === 1}" :size="btnSize">详细明细</el-button>
                </el-button-group>
            </el-col>
            <el-col :span="5">
                <div  class="search-wrap">
                    <v-search-input v-model="input" @search="handlerSearch"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/ecmascript-6">
    import CONFIG from 'src/config';
    export default {
        data () {
            return {
                btnSize: CONFIG.homeBtn
            };
        },
        props: {
            btnAction: {
                type: String,
                default: '1'
            },
            btnDetailAction: {
                type: Number,
                default: 0
            },
            input: {
                type: [String, Number],
                default: ''
            }
        },

        mounted () {},

        methods: {
            // 药品,检查，治疗，材料，其他按钮的切换
            handleBtnClick (btnType, text) {
                // this.btnAction = index;
                // this.type = index;
                this.$emit('handleBtn', btnType, text);
            },
            // 去重后项目,详细明细按钮的切换
            handleDetailBtnClick (index) {
                // this.btnDetailAction = index;
                // this.type = index;
                this.$emit('handleDetailBtn', index);
            },
            // 查询
            handlerSearch () {
                console.log('Btns-handleSearch' + this.input);
                this.$emit('input', this.input);
                this.$emit('search', {value: this.input});
            }
        },

        components: {}
    };
</script>
<style lang="scss" scoped>
    .btn-wrap{
        /*按钮滚动条样式start*/
        overflow: auto;
        overflow-y: hidden;
        box-sizing: border-box;
        .el-row{
            overflow: hidden;
            width: 100%;
            min-width: 850px;
            padding: 8px 0;
        }
        /*按钮滚动条样式end*/

        .btn-action{
            background-color: #4579C5;
            color: #fff;
        }
        .search-wrap{
            height: 30px;
            /deep/ .wrap{
                height: 30px;
            }
            /deep/ .wrap .icon{
                position: absolute;
                left: 6px;
                top: 6px;
            }
            /deep/ .wrap .input{
                height: 29px;
            }
        }
    }
</style>
