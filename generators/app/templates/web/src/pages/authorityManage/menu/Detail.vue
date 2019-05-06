<!-- Created by TIANJIE on 2018/6/21 -->

<template>
    <div>
        <el-col :span="12" :offset="6">
            <v-item-detail :tooltip="false" label="类型：" :span="span" class="m-t-34">
                <span class="block text-ellipsis">{{detailData.type==1?'菜单':'按钮'}}</span>
                <div slot="content" class="tooltip-item">{{detailData.type==1?'菜单':'按钮'}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="菜单名称：" :span="span">
                <span class="block text-ellipsis">{{detailData.name}}</span>
                <div slot="content" class="tooltip-item">{{detailData.name}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="上级菜单：" :span="span">
                <span class="block text-ellipsis">{{detailData.parentName}}</span>
                <div slot="content" class="tooltip-item">{{detailData.parentName}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="请求地址：" :span="span">
                <span class="block text-ellipsis">{{detailData.url}}</span>
                <div slot="content" class="tooltip-item">{{detailData.url}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="显示序号：" :span="span">
                <span class="block text-ellipsis">{{detailData.orderby}}</span>
                <div slot="content" class="tooltip-item">{{detailData.orderby}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="true" label="权限编码：" :span="span">
                <span class="block text-ellipsis">{{detailData.perms}}</span>
                <div slot="content" class="tooltip-item">{{detailData.perms}}</div>
            </v-item-detail>
            <v-item-detail :tooltip="false" label="图标：" :span="span">
                <i :class="detailData.icon"></i>
            </v-item-detail>            
            <div class="text-center m-t-32">
                <el-button :size="btnSize" @click="handleBack">返回</el-button>
            </div>
        </el-col>
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
    import VItemDetail from 'components/VItemDetail';
    import CONFIG from 'src/config';
    import { getSysMenu } from "js/api/authorityManage/menu";

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
            getSysMenu({id: this.id}).then(res => {
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
            }
        },
        filters: {},
        components: {VItemDetail}
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

</style>
