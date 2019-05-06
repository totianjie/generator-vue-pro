<!-- Created by TIANJIE on 2018/6/21 -->
<template>
    <div>
        <div class="page">
            <el-col :span="12" :offset="6" v-if="bSing">
                <v-item-detail :tooltip="true" label="组织名称：" :span="span" class="m-t-34">
                    <span class="block text-ellipsis">{{detailData.orgName}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.orgName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="组织编码：" :span="span">
                    <span class="block text-ellipsis">{{detailData.code}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.code}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="所属角色组：" :span="span">
                    <span class="block text-ellipsis">{{detailData.pertainRoleName}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.pertainRoleName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="所属组织：" :span="span">
                    <span class="block text-ellipsis">{{detailData.pertainOrgName}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.pertainOrgName}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建人：" :span="span">
                    <span class="block text-ellipsis">{{detailData.createUser}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.createUser}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="创建时间：" :span="span">
                    <span class="block text-ellipsis">{{detailData.createDate}}</span>
                    <div slot="content" class="tooltip-item">{{detailData.createDate}}</div>
                </v-item-detail>
                <v-item-detail :tooltip="true" label="备注：" :span="span">
                    <span class="block showAllText">{{detailData.remark}}</span>
                    <div slot="content" class="tooltip-item showAllText">{{detailData.remark}}</div> 
                </v-item-detail>
                <div class="text-center m-t-32">
                    <el-button :size="btnSize" @click="handleBack">返回</el-button>
                </div>
            </el-col>
        </div>
    </div>
</template>
<script>
    /**
     * orgName;//组织
     pertainOrgName;//所属组织
     code //所属组织编码
     pertainRoleName;//所属角色组
     orgCode //角色组code
     createUser;//创建人
     createDate;//创建时间
     parentId;//所属组织id
     remark 备注
     * */
    import CONFIG from 'src/config';
    import {getOrgDetail} from "js/api/authorityManage/org";

    export default {
        data () {
            return {
                span: 8,
                bSing: false,
                btnSize: CONFIG.baseBtn,
                detailData: {}
            };
        },
        props: {
            value: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            id: {
                type: Number,
                default () {
                    return '';
                }
            }
        },
        created () {
            getOrgDetail({id: this.id}).then(res => {
                res.data.createDate = this.dateTimeDowith(res.data.createDate) || '';
                this.detailData = res.data;
                this.bSing = true;
            });
        },
        methods: {
            handleBack () {
                this.$emit('input', false);
            },
            formateArr (arr) {
                let a = [];
                arr.forEach((item) => {
                    a.push(item.name);
                });
                return a.join('/');
            },
            dateTimeDowith (datetime) {
                // let location = this.options.findIndex(item => item.value === input);
                // return this.options[location].label;
                return datetime.length > 19 ? datetime.substr(0, 19) : datetime;
            }
        },
        filters: {}
    };
</script>

<style scoped lang="scss">
    .m-t-32 {
        margin-top: 32px;
    }
    .m-t-34 {
        margin-top: 34px;
    }
    .item {
        display: block;
    }
    .statusBtn{
        line-height: 40px;
    }
    .showAllText{
        word-break: break-all;
    }
</style>
