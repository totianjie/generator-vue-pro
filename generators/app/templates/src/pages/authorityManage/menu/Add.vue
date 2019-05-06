<!-- Created by TIANJIE on 2018/6/8 -->
<template>
    <div>
        <div class="page p-t-40" @click="changeState">
            <el-col :span="10" :offset="5">
                <el-form ref="menuAddForm" :model="addForm" :rules="rules" label-width="110px" :size="formSize">
                    <el-form-item label="类型：" prop="type">
                        <el-radio-group v-model="addForm.type" class="radio-group">
                            <el-radio label="1" class="radio">菜单</el-radio>
                            <el-radio label="2" class="radio">按钮</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="菜单名称：" prop="name">
                        <el-input placeholder="请输入菜单名称" v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="上级菜单：" prop="parentId">
                        <el-input placeholder="请选择上级菜单" v-model="preMenuName"></el-input>
                        <div class="orgs-tree" @click.stop="handleSelectPreMenu">
                            <v-input-box class="tree" v-if="treeShow">
                                <el-tree
                                    :data="treeData"
                                    :props="defaultProps"
                                    @node-click="handleNodeClick"
                                    accordion
                                    highlight-current
                                    :expand-on-click-node="false"
                                ></el-tree>
                            </v-input-box>
                        </div>
                    </el-form-item>
                    <el-form-item label="请求地址：" prop="url">
                        <el-input placeholder="请输入菜单地址" type="textarea" autosize v-model="addForm.url" maxlength="300"></el-input>
                    </el-form-item>
                    <el-form-item label="显示排序：" v-show="addForm.type==1" prop="orderby">
                        <el-input placeholder="请输入排序号" v-model="addForm.orderby"></el-input>
                    </el-form-item>
                    <el-form-item label="权限编码：" prop="perms">
                        <el-input placeholder="请输入权限编码" type="textarea" autosize v-model="addForm.perms" maxlength="1000"></el-input>
                    </el-form-item>
                    <el-form-item label="图标：" v-show="addForm.type==1" prop="icon">
                        <el-input placeholder="请选择图标"></el-input>
                        <el-button class="showMenus"
                                   @click.stop="selectMenu()" :style="{ width: selectIconName.length?'90%':'100%',opacity:selectIconName.length?1:0}">
                        	<span class="iconMenuShow">
                          		<i :class="selectIconName"></i>
                          	</span>
                        </el-button>
                        <el-button class="el-icon-close"
                                   @click.stop="clearIcon()" v-show="selectIconName.length">
                        </el-button>
                        <div class="selectMenu" v-show="isShowIconView">
                            <el-button v-show="isShowIconView"
                                       size="mini"
                                       v-for="(item,index) in icons"
                                       :key="index" class="menuItemClass"
                                       @click="pullMenu(item)">
                                <i :class="item"></i>
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="isEdit" label="状态：" prop="enable">
                        <el-radio-group v-model="addForm.enable" class="radio-group">
                            <el-radio class="radio" :label="true">启用</el-radio>
                            <el-radio class="radio" :label="false">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button :size="btnSize" @click="handlerCancel">取&nbsp;消</el-button>
                        <el-button :size="btnSize" @click="handlerSubmit" type="primary">确&nbsp;定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </div>
    </div>
</template>

<script>
    import CONFIG from 'src/config';
    import {addMenu, getMenuAll, getSysMenu, updateMenu, checkMenuCode} from "js/api/authorityManage/menu";
    import rules from './rules';

    export default {
        data () {
            const checkOnlyCode = (rule, value, callback) => {
                if (typeof value !== 'string') {
                    return callback();
                }
                if (value.length === 0) {
                    callback();
                    return;
                }
                let re = /^[a-zA-Z0-9\,;:]+$/;
                let checkResult = re.test(value);
                if (!checkResult) {
                    return callback(new Error('您输入不正确，须英文、数字、符号(，; :)，4-1000字符，重新输入。'));
                }
                if (value.length < 4) {
                    return callback(new Error('您输入不正确，须英文、数字、符号(，; :)，4-1000字符，重新输入。'));
                }
                if (this.menuId === -1) {
                    this.menuId = '';
                }
                if (!this.isEdit) {
                    this.menuId = '';
                }
                checkMenuCode({per: value, id: this.menuId}).then(res => {
                    console.log(res);
                    if (res.data) {
                        if (res.data.errorMsg !== '请求成功') {
                            callback(new Error(res.data.errorMsg));
                            return;
                        }
                    } else {
                        if (res.errorMsg !== '请求成功') {
                            callback(new Error(res.errorMsg));
                            return;
                        }
                    }
                    callback();
                }).catch(err => {
                    console.log('修改失败', err);
                    if (err.data) {
                        callback(new Error(err.data.errorMsg));
                    } else {
                        callback(new Error(err.errorMsg));
                    }
                });
            };
            return {
                isShowIconView: false,
                noIcon: '选择菜单图标',
                haveIcon: '',
                selectIconName: '',
                icons: [
                    'icon iconfont icon-yemian',
                    'icon iconfont icon-yemian1',
                    'icon iconfont icon-chaxun1',
                    'icon iconfont icon-chaxun2',
                    'icon iconfont icon-shenhe1',
                    'icon iconfont icon-chaxun2',
                    'icon iconfont icon-quanxianguanli1',
                    'icon iconfont icon-createtask_fill',
                    'icon iconfont icon-document_fill',
                    'icon iconfont icon-task_fill',
                    'icon iconfont icon-shenhe2',
                    'icon iconfont icon-shenbao1',
                    'icon iconfont icon-authority-manager',
                    'icon iconfont icon-shenhe3',
                    'icon iconfont icon-shenbaoqingdan',
                    'icon iconfont icon-quanxianguanli',
                    'icon iconfont icon-shenbao',
                    'icon iconfont icon-shenhe',
                    'icon iconfont icon-chaxun',
                    'icon iconfont icon-shenbaoqingkuangchaxun',
                    'icon iconfont icon-shouye-copy',
                    'icon iconfont icon-shoushuduizhao',
                    'icon iconfont icon-jibingduizhao'
                ],
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.baseFormSize,
                addForm: {
                    parentId: '', // eslint-disable-line
                    type: '', // 菜单类型
                    name: '', // 名称
                    url: '', // 地址
                    icon: '',
                    perms: '',
                    enable: true,
                    orderby: '',
                    checkOrderBy: ''
                },
                rules: Object.assign({}, rules, {
                    perms: [
                        {trigger: 'blur', validator: checkOnlyCode, required: false}
                    ],
                    parentId: [
                        {required: true, trigger: 'change', message: '请选择上级菜单'}
                    ]
                }),
                treeShow: false,
                preMenuName: '',
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            };
        },
        computed: {
            currentType () {
                return this.addForm.type;
            }
        },
        watch: {
            currentType (val) {
                if (!this.isEdit) {
                    // if (parseInt(val) === 1) {
                    //     let rootTree = this.treeData[0] || '';
                    //     this.preMenuName = rootTree.name || '';
                    //     this.addForm.parentId = '1';
                    // } else {
                    //     this.preMenuName = '';
                    //     this.addForm.parentId = '';
                    // }
                }
            }
        },
        props: {
            value: {
                type: Boolean,
                default () {
                    return false;
                }
            },
            menuId: {
                type: Number,
                default () {
                    return '';
                }
            },
            isEdit: {
                type: Boolean,
                default () {
                    return false;
                }
            }
        },
        created () {
            if (this.isEdit) {
                if (this.menuId === '') {
                    this.$emit('input', false);
                    return false;
                }

                let params = {id: this.menuId};
                // 获取当前查看的菜单详细信息
                getSysMenu(params).then(res => {
                    let {type, name, url, icon, parentId, parentName, perms, enable, orderby} = res.data;
                    this.preMenuName = parentName;
                    this.addForm = {
                        type,
                        name,
                        url,
                        icon,
                        parentId,
                        perms,
                        enable,
                        orderby
                    };
                    this.selectIconName = this.addForm.icon || '';
                });
            }
            // 获取菜单列表
            getMenuAll().then(res => {
                let {data} = res;
                this.treeData = data;
            });
        },
        methods: {
            changeState () {
                this.treeShow = false;
                this.isShowIconView = false;
            },
            selectMenu () {
                this.isShowIconView = true;
            },
            pullMenu (data) {
                this.selectIconName = data;
                this.isShowIconView = false;
                this.addForm.icon = data;
            },
            handlerSubmit () {
                this.$refs.menuAddForm.validate(value => {
                    if (value) {
                        if (this.isEdit) {
                            this.addForm.id = this.menuId;
                            updateMenu(this.addForm).then(res => {
                                this._resetForm('menuAddForm');
                                this.$emit('input', false);
                                this.$emit('update');
                            });
                        } else {
                            addMenu(this.addForm).then(res => {
                                this._resetForm('menuAddForm');
                                this.$emit('input', false);
                                this.$emit('update');
                            });
                        }

                    } else {
                        return false;
                    }
                });

            },
            _resetForm (formName) {
                this.$refs[formName].resetFields();
            },
            handlerCancel () {
                this._resetForm('menuAddForm');
                this.$emit('input', false);
            },
            // 选择上级菜单
            handleSelectPreMenu () {
                this.treeShow = true;
            },
            // 组织树节点  点击
            handleNodeClick ({id, name, code, parentId}) {
                this.treeShow = false;
                this.addForm.parentId = id;
                this.preMenuName = name;
            },
            clearIcon () {
                this.selectIconName = '';
                this.addForm.icon = '';
            }
        }
    };
</script>

<style scoped lang="scss">

    .p-t-40 {
        padding-top: 40px;
    }

    .radio {
        margin-right: 32px;
    }

    .orgs-tree {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;

    }

    .showMenus {
        width: 85%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
        z-index: 1800;
        height: 40px;
        text-align: left;
        border-right-width: 0;
        opacity: 0;
    }

    .selectMenu {
        display: block;
        border: 1px solid #dcdfe6;
        padding: 0px;
        &:after {
            content: ".";
            display: block;
            height: 0;
            visibility: hidden;
            clear: both;
        }
        //伪类清除
        zoom: 1;
        width: 100%;
        position: relative;
        top: 0px;
        bottom: 0;
        left: 0;
        cursor: pointer;
        background-color: white;
        border-radius: 4px;
    }

    .menuItemClass {
        border-width: 0px;
        float: left;
        margin-left: 0px;
    }

    .el-icon-close {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1800;
        height: 40px;
        border-left-width: 0;
    }

    .radio-group {
        margin-top: 12px;
    }

    .tree {
        width: 100%;
        position: absolute;
        left: 0;
        top: 35px;
        padding-bottom: 12px;
        z-index: 2000;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.15)
    }

    .iconMenuShow {
        z-index: 2000;
        display: block;
    }

    .statusBtn {
        line-height: 40px;
    }
</style>
