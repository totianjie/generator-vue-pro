<!--
* @Author: Nelson Hsiao
* @Date: 2019/01/04
* @remark:  
-->
<template>
    <div>
        {{test}}
        <div class="page p-t-40" @click="treeShow = false">
            <el-col :span="10" :offset="4">
                <el-form ref="addForm" :model="addForm" :rules="rules" label-width="180px" :size="formSize">
                    <el-form-item 
                        label="城市选择："
                        prop="cityNames"
                    >
                         <el-cascader
                            :clearable ="true"
                            :size="formSize"
                            placeholder="请选择"
                             :show-all-levels="true"
                            :options="options"
                            :props="props"
                            v-model="addForm.cityNames"
                            :change-on-select="true"
                            @change="handleCascaderChange">
                        </el-cascader>
                    </el-form-item>
                    <!-- <el-form-item 
                        label="业务编码：" 
                        prop="busiCode"
                    >
                        <el-input placeholder="请输入业务编码" maxlength="20" v-model="addForm.busiCode" @blur="inputInfo"></el-input>
                    </el-form-item> -->
                    <el-form-item 
                        label="业务名称：" 
                        prop="busiName"
                    >
                        <el-input placeholder="请输入业务名称" maxlength="20" v-model="addForm.busiName" @blur="inputInfo"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="业务备注：" 
                        prop="remark"
                    >
                        <el-input placeholder="请输入业务备注" maxlength="50" v-model="addForm.remark" @blur="inputInfo"></el-input>
                    </el-form-item>
                    <el-form-item 
                        label="源库数据库地址：" 
                        prop="sourceDbName"
                    >
                        <el-select v-model="addForm.sourceDbName" placeholder="请选择数据库地址" @change="changeOri" class="w-fill" >
                            <el-option
                                v-for="item in DMdbList.ori"
                                :key="item.dbCode"
                                :value="item.dbCode"
                                :label="item.dbName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item 
                        label="中间库地址：" 
                        prop="middleDbName" 
                        style="position:relative;"
                    >
                        <el-select v-model="addForm.middleDbName" placeholder="请选择数据库地址" @change="changeMid" class="w-fill">
                            <el-option
                                v-for="item in DMdbList.mid"
                                :key="item.dbCode"
                                :value="item.dbName"
                                :label="item.dbName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item 
                        label="平台数据库地址：" 
                        prop="platDbName" 
                        style="position:relative;"
                    >
                        <el-select v-model="addForm.platDbName" placeholder="请选择数据库地址" @change="changePlat" class="w-fill">
                            <el-option
                                v-for="item in DMdbList.plat"
                                :key="item.dbCode"
                                :value="item.dbCode"
                                :label="item.dbName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item 
                        label="业务库地址：" 
                        prop="serviceDbName" 
                        style="position:relative;"
                    >
                        <el-select v-model="addForm.serviceDbName" @change="changeWork" placeholder="请选择数据库地址" class="w-fill">
                            <el-option
                                v-for="item in DMdbList.work"
                                :key="item.dbCode"
                                :value="item.dbCode"
                                :label="item.dbName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item 
                        v-if="isEdit" 
                        label="配置状态：" 
                        prop="enableBool"
                    >
                        <el-radio-group v-model="addForm.enableBool" class="radio-group">
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
    /*
    *
    * */
    import CONFIG from 'src/config';
    import rules from './rules';
    import {insertSetting, updateSetting, getArea, detail} from 'js/api/settingManage/dataManageCenter/dataManageCenter.js';
    import {createNamespacedHelpers} from 'vuex';
    const {mapGetters, mapActions, mapMutations} = createNamespacedHelpers('settingManage');
    export default {
        data () {
            return {
                test: '',
                dataBaseList: [],
                radio: '1',
                btnSize: CONFIG.baseBtn,
                formSize: CONFIG.baseFormSize,
                options: [{
                    label: '',
                    cities: []
                }], // 区域数组
                cityCodes: [],
                areaParams: {
                    parentId: ''
                },
                getCityList: [],
                props: {
                    value: 'label',
                    children: 'cities'
                },
                model: [],
                addForm: {
                    cityNames: [],
                    cityCodes: [],
                    busiCode: "",
                    busiName: "",
                    cityCode: "",
                    deleteFlag: 0,
                    enable: 1,
                    enableBool: true,
                    provinceCode: "",
                    remark: "",
                    middleDbCode: "",
                    middleDbName: "",
                    platDbCode: "",
                    platDbName: "",
                    serviceDbCode: "",
                    serviceDbName: "",
                    sourceDbName: "",
                    sourceDbCode: ""
                },
                // 表单验证
                rules: Object.assign({}, rules, {})
            };
        },
        props: {
        },
        computed: {
            ...mapGetters(['DBCity', 'DMEditObj', 'DMdbList', 'DMTableList', 'DMParameters', 'DMIsDetail', 'DMIsEdit', 'DMIsAdd', 'DMtotal', 'DMSelectMenu'])
        },
        created () {
            this._init();
        },
        methods: {
            inputInfo () {
                this.setDMEditObj(this.addForm);
            },
            changeWork (val) {
                console.log(val);
                let serviceDbCode = this.DMdbList.work.filter((res) => {
                    return res.dbName === val;
                })[0].dbCode || '';
                this.addForm.serviceDbCode = serviceDbCode;
                this.setDMEditObj(this.addForm);
                
            },
            changeOri (val) {
                console.log(val);
                let sourceDbCode = this.DMdbList.ori.filter((res) => {
                    return res.dbName === val;
                })[0].dbCode || '';
                this.addForm.sourceDbCode = sourceDbCode;
                this.setDMEditObj(this.addForm);

            },
            changeMid (val) {
                console.log(val);
                let middleDbCode = this.DMdbList.mid.filter((res) => {
                    return res.dbName === val;
                })[0].dbCode || '';
                this.addForm.middleDbCode = middleDbCode;
                this.setDMEditObj(this.addForm);

            },
            changePlat (val) {
                console.log(val);
                let platDbCode = this.DMdbList.plat.filter((res) => {
                    return res.dbName === val;
                })[0].dbCode || '';
                this.addForm.platDbCode = platDbCode;
                this.setDMEditObj(this.addForm);

            },
            _init () {
                if (this.DBCity.length === 0) {
                    getArea({level: 1}).then((res) => {
                        this.options = res.data.list.map((resTemp) => {
                            return {label: resTemp.areaName, value: resTemp.areaCode, cities: [], level: 1};
                        });
                        this.setDBCity(this.options);
                        if (this.DMIsEdit) {
                            this.getDetail(this.DMEditObj);
                        }
                    });
                } else {
                    this.options = this.DBCity;
                    if (this.DMIsEdit) {
                        this.getDetail(this.DMEditObj);
                    }
                }
            },
            getDetail (val) {
                console.log(val);
                if (!this.DMEditObj.request) {
                    detail(val).then(res => {
                        if (typeof res.data.enable !== "boolean") {
                            if (res.data.enable + '' === '1') {
                                res.data.enableBool = true;
                            } else {
                                res.data.enableBool = false;
                            }
                        } else {
                            res.data.enableBool = res.data.enable;
                            if (res.data.enableBool) {
                                res.data.enable = 1;
                            } else {
                                res.data.enable = 0;
                            }
                        }
                        let tempIndex = -1;
                        let temp = this.options.filter((res2, index) => {
                            if (res2.value + '' === res.data.provinceCode) {
                                tempIndex = index;
                                return res2;
                            }
                        })[0].label || '';
                        this.getCity(res.data.provinceCode, 2, temp, tempIndex, res.data);
                    });
                } else {
                    this.addForm = this.DMEditObj;
                }

                
            },
            handlerSubmit () {
                this.$refs.addForm.validate(value => {
                    console.log('handlerSubmit');
                    if (!value) {
                        return false;
                    }
                    this.addForm.provinceCode = this.addForm.cityCodes[0];
                    this.addForm.cityCode = this.addForm.cityCodes[1] || '';
                    this.setDMEditObj(this.addForm);
                    if (this.DMIsEdit) {
                        if (this.addForm.enableBool === true) {
                            this.addForm.enable = 1;
                        } else {
                            this.addForm.enable = 0;
                        }
                        this.setDMEditObj(this.addForm);
                        updateSetting(this.addForm).then((res) => {
                            this.handlerCancel();
                            this.requestDataDM();
                            this.getBussnissCode();
                        }).catch(error => {
                            console.error(error);
                        });
                    } else {
                        insertSetting(this.addForm).then((res) => {
                            this.handlerCancel();
                            this.requestDataDM();
                            this.getBussnissCode();
                        }).catch(error => {
                            console.error(error);
                        });
                    }
                });
            },
            getCity (parentId, level, areaName, indexPath, data) {
                this.areaParams.parentId = parentId;
                getArea(this.areaParams).then(res => {
                    this.doWithCity(parentId, level, areaName, indexPath, data, res);
                });
            },
            doWithCity (parentId, level, areaName, indexPath, data, res) {
                try {
                    let tempCity = "";
                    let findCity = false;
                    let cityCodeTemp = '';
                    if (data.cityCode !== "" && data.cityCode) {
                        findCity = true;
                        cityCodeTemp = data.cityCode;
                    }
                    this.options[indexPath].cities = res.data.list.map((resTemp) => {
                        if (findCity && cityCodeTemp === resTemp.areaCode) {
                            tempCity = resTemp.areaName;
                        }
                        return {label: resTemp.areaName, value: resTemp.areaCode, level: 2};
                    });
                    
                    data.cityNames = [areaName, tempCity];
                    data.cityCodes = [data.provinceCode, data.cityCode || ''];
                    this.doWithDBName(data);
                    this.addForm = Object.assign({}, this.addForm, data);
                    this.addForm = Object.assign({}, this.addForm, {request: true});
                    this.setDMEditObj(this.addForm);
                } catch (error) {
                    console.error('doWithDBName', error.message, error.name);
                }
            },
            doWithDBName (data) {
                try {
                    let middleDbName = this.DMdbList.mid.filter((res) => {
                        return res.dbCode === data.middleDbCode;
                    })[0].dbName || '';
                    data.middleDbName = middleDbName;
                    let platDbName = this.DMdbList.plat.filter((res) => {
                        return res.dbCode === data.platDbCode;
                    })[0].dbName || '';
                    data.platDbName = platDbName;
                    let serviceDbName = this.DMdbList.work.filter((res) => {
                        return res.dbCode === data.serviceDbCode;
                    })[0].dbName || '';
                    data.serviceDbName = serviceDbName;
                    let sourceDbName = this.DMdbList.ori.filter((res) => {
                        return res.dbCode === data.sourceDbCode;
                    })[0].dbName || '';
                    data.sourceDbName = sourceDbName;
                } catch (error) {
                    console.error('doWithDBName', error.message, error.name);
                }
            },
            getAreaList (parentId, level, indexArr) {
                this.areaParams.parentId = parentId;
                // this.areaParams.level = level + 1;
                getArea(this.areaParams).then(res => {
                    if (level === 1) {
                        this.options[indexArr[0]].cities = res.data.list.map((resTemp) => {
                            return {label: resTemp.areaName, value: resTemp.areaCode, level: 2};
                        });
                        // 以下是三级时处理
                        // this.options[indexArr[0]].cities = res.data.list.map((resTemp) => {
                        //     return {label: resTemp.areaName, value: resTemp.areaCode, cities: [], level: 2};
                        // });
                    } else if (level === 2) {
                        this.options[indexArr[0]].cities[indexArr[1]].cities = res.data.list.map((resTemp) => {
                            return {label: resTemp.areaName, value: resTemp.areaCode, level: 3};
                        });
                    }
                    this.setDBCity(this.options);
                });
            },

            handlerCancel () {
                this.setDMIsEdit(false);
                this.setDMIsAdd(false);
            },
            handleCascaderChange (data) {
                let level = data.length;
                let parentId = 0;
                let indexArr = [];
                let cityCodesArr = [];
                this.addForm.cityNames = data;
                this.options.forEach((res, index) => {
                    if (parentId !== 0) {

                    } else {
                        if (level === 1) {
                            if (res.label === data[0]) {
                                indexArr.push(index);
                                parentId = res.value;
                                cityCodesArr.push(res.value);
                            }
                        } else if (level === 2) {
                            if (res.label === data[0]) {
                                indexArr.push(index);
                                cityCodesArr.push(res.value);
                                res.cities.forEach((res2, index2) => {
                                    if (res2.label === data[1]) {
                                        parentId = res2.value;
                                        indexArr.push(index2);
                                        cityCodesArr.push(res2.value);
                                    }
                                });
                            }
                        } else if (level === 3) {
                            if (res.label === data[0]) {
                                cityCodesArr.push(res.value);
                                res.cities.forEach((res2, index2) => {
                                    if (res2.label === data[1]) {
                                        cityCodesArr.push(res2.value);
                                        res2.cities.forEach((res3, index3) => {
                                            if (res3.label === data[2]) {
                                                cityCodesArr.push(res3.value);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    }
                });
                this.addForm.cityCodes = cityCodesArr;
                this.setDMEditObj(this.addForm);
                // 控制请求到第几层, 如果 是3 就是最多可以到第3层
                if (data.length === 2) {
                    return;
                }
                this.getAreaList(parentId, level, indexArr);
            },
            change (data) {
                if (!this.addForm.cityCodes) {
                    this.addForm.cityCodes = [];
                }
            },
            ...mapMutations({
                setDMIsDetail: "setDMIsDetail",
                setDMdbList: 'setDMdbList',
                setDMTableList: 'setDMTableList',
                setDMEditObj: 'setDMEditObj',
                setDMIsEdit: 'setDMIsEdit',
                setDBCity: 'setDBCity',
                setDMIsAdd: 'setDMIsAdd'
            }),
            ...mapActions(['getBussnissCode', 'requestDataDM'])
        },
        watch: {

        }
    };
</script>

<style scoped lang="scss">
    .p-t-40 {
        padding-top: 40px;
    }

    .el-checkbox + .el-checkbox.radio, .el-checkbox + .el-checkbox.checkbox, .el-checkbox.checkbox, .el-checkbox.radio {
        width: 90px;
        margin-right: 10px;
        margin-bottom: 8px;
        box-sizing: border-box;
    }

    .orgs-tree {
        width: 100%;
        position: absolute;
        top: 8px;
        bottom: 0;
        left: 0;
        cursor: pointer;
        padding:10px;
        box-sizing:border-box;
        z-index: 100;

    }

    .dataTree{
        padding: 8px 0;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        background-color: #fff;
    }

    .tree {
        width: 100%;
        position: absolute;
        left: 0;
        top: 35px;
        padding-bottom: 12px;
        z-index: 2000;
        background-color: #fff;
    }

    .statusBtn{
        line-height: 40px;
    }
    .radio-group {
        margin-top: 12px;
    }
    .radio {
        margin-right: 32px;
    }
</style>
