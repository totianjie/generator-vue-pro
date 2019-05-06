<!--
* @Author: mikey.TIANJIE 
* @Date: 2018-06-26 13:43:45 
* @Last Modified by:   mikey.TIANJIE 
* @Last Modified time: 2018-07-12 13:43:45 
* @remark: 文件上传成功后的列表展示
-->
<template>
    <div class="v-file-list">
        <ul class="list" v-if="list.length > 0">
            <li class="item clearfix" v-for="(item, index) in list" :key="item.fileNo">

                <v-item-detail :tooltip="true" class="pull-left w-fill" :border="false">
                    <div class="w-fill clearfix">
                        <span class="block text-ellipsis pull-left" style="max-width: 80%;">
                            <i class="el-icon-document"></i>
                            <span v-text="item.oldName"></span>
                        </span>
                        <span class="pull-right delete-btn pointer" v-show="!isDownLoad" @click="handleDeleteFile(index)">删除</span>
                        <a class="pull-right download-btn pointer" :href="`${url}/annexFile/download?fileNo=${item.fileNo}`" target="_blank" v-show="isDownLoad">下载</a>
                    </div>
                    <div slot="content" class="tooltip-item">{{item.oldName}}</div>
                </v-item-detail>


            </li>
        </ul>
    </div>

</template>

<script type="text/ecmascript-6">
    import CONFIG from 'src/config';

    export default {
        data () {
            return {
                url: CONFIG.URL
            };
        },
        props: {
            list: {
                type: Array,
                default () {
                    return [
                        // {fileNo: 1530114179879, oldName: '医保整理6(1).xlsx'}
                    ];
                }
            },
            isDownLoad: {
                type: Boolean,
                default () {
                    return false;
                }
            }
        },
        model: {
            prop: 'list'
        },
        methods: {
            handleDeleteFile (index) {
                this._$confirm().then(() => {
                    this.list.splice(index, 1);
                    this.$emit('input', this.list);
                }).catch(() => false);
            }
        }
    };
</script>

<style scoped lang="scss">
    .v-file-list {
        width: 100%;
        padding-right: 6px;
        box-sizing: border-box;
        .download-btn, .delete-btn {
            color: #3B99FC;
        }
        .list {
            :last-child {
                margin-bottom: 0;
            }
        }
        .item {
            margin-bottom: 14px;
            /deep/ .text {
                padding: 0;
                min-height: auto;
            }
        }

    }
</style>
