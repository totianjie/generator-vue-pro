<template>
    <section>
        <el-dialog
            :visible.sync="bShow"
            width="40%"
            min-width="500"
            class="dialog"
            @close="bShow = false"
        >
        <span class="dialog-title" slot="title">设置</span>
        <div style="max-height: 350px; overflow-y: auto;position:relative;top:-20px">
        <div class="tableTitle">原始数据栏</div>
            <el-table
                size="mini"
                :data="tableCol.raw"
                style="width: 100%"
                border
                cell-class-name="pointer current-active"
                :highlight-current-row="true"
                :stripe="true"
            >
                <el-table-column
                    prop="label"
                    show-overflow-tooltip
                    label="栏目名称"
                    width="94"
                >
                </el-table-column>
                
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handlePre(scope)" size="mini">上移</el-button>
                        <el-button @click="handleNext(scope)" size="mini">下移</el-button>
                        <el-button @click="handleTop(scope)" size="mini">置顶</el-button>
                        <el-button @click="handleBottom(scope)" size="mini">置底</el-button>
                    </template>
                </el-table-column>
            </el-table>

        <div class="tableTitle" style="margin-top:14px;">标准数据栏</div>
            <el-table
                size="mini"
                :data="tableCol.standard"
                style="width: 100%"
                border
                cell-class-name="pointer current-active"
                :highlight-current-row="true"
                :stripe="true"
            >
                <el-table-column
                    prop="label"
                    show-overflow-tooltip
                    label="栏目名称"
                    width="94"
                >
                </el-table-column>
                
                <el-table-column
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handlePre(scope,`right`)" size="mini">上移</el-button>
                        <el-button @click="handleNext(scope,`right`)" size="mini">下移</el-button>
                        <el-button @click="handleTop(scope,`right`)" size="mini">置顶</el-button>
                        <el-button @click="handleBottom(scope,`right`)" size="mini">置底</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button :size="btnSize" @click="bShow = false">取消</el-button>
            <el-button :size="btnSize" type="primary" @click="_settingOk">确定</el-button>
        </span>
        </el-dialog>
    </section>
</template>
<script>
import CONFIG from 'src/config';
import {COST, DISEASE_CONTROL, OPERATION} from './../tableColDefault';
import {createNamespacedHelpers} from 'vuex';
const {mapGetters, mapMutations, mapActions} = createNamespacedHelpers('comparisonForm');
export default {
    data () {
        return {
            formSize: CONFIG.homeFormSize,
            btnSize: CONFIG.homeBtn,
            bShow: false,
            COST,
            DISEASE_CONTROL,
            OPERATION,
            backup: []
        };
    },
    props: {
        type: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapGetters(['chargeComparisonLeft']),
        tableCol () {
            let localRaw = null;
            switch (this.type) {
            case "cost":
                localRaw = window.localStorage.getItem("cost");
                this.COST = localRaw ? JSON.parse(localRaw) : this.COST;
                return this.COST;
            case "diseaseControl":
                localRaw = window.localStorage.getItem("diseaseControl");
                this.DISEASE_CONTROL = localRaw ? JSON.parse(localRaw) : this.DISEASE_CONTROL;
                return this.DISEASE_CONTROL;
            case "operation":
                localRaw = window.localStorage.getItem("operation");
                this.OPERATION = localRaw ? JSON.parse(localRaw) : this.OPERATION;
                return this.OPERATION;
            default:
                return {};
            }
        }
    },
    mounted () {
        console.log(this.tableCol, this.type);
    },
    methods: {
        ...mapMutations(['setchargeComparisonLeft', 'setchargeComparisonRight', 'setdiseaseControlLeft', 'setdiseaseControlRight', 'setsurgicalControlRight', 'setsurgicalControlLeft']),
        ...mapActions(['addData']),
        setting () {
            this.bShow = true;
        },
        _settingOk () {
            console.log("settingOk", this.tableCol);
            switch (this.type) {
            case "cost":
                window.localStorage.setItem("cost", JSON.stringify(this.tableCol));
                this.setchargeComparisonLeft(this.tableCol.raw);
                this.setchargeComparisonRight(this.tableCol.standard);
                break;
            case "diseaseControl":
                window.localStorage.setItem("diseaseControl", JSON.stringify(this.tableCol));
                this.setdiseaseControlLeft(this.tableCol.raw);
                this.setdiseaseControlRight(this.tableCol.standard);
                break;
            case "operation":
                window.localStorage.setItem("operation", JSON.stringify(this.tableCol));
                this.setsurgicalControlLeft(this.tableCol.raw);
                this.setsurgicalControlRight(this.tableCol.standard);
                break;
            default:
                console.log(`默认走了default >>>>>>>>>>`);
            }
            
            
            this.bShow = false;
        },
        getTypeName (type) {
            switch (type) {
            case "cost":
                return `COST`;
            case "diseaseControl":
                return `DISEASE_CONTROL`;
            case "operation":
                return `OPERATION`;
            default:
                console.log(`默认走了default >>>>>>>>>>`);
                return ``;
            }
        },
        handlePre ({$index, row}, value) {
            let typeName = this.getTypeName(this.type);
            if ($index !== 0) {
                if (value === `right`) {
                    let temp = this[typeName].standard.splice($index, 1);
                    this[typeName].standard.splice($index - 1, 0, temp[0]);
                } else {
                    let temp = this[typeName].raw.splice($index, 1);
                    this[typeName].raw.splice($index - 1, 0, temp[0]);
                }
            }
        },
        handleNext ({$index, row}, value) {
            let typeName = this.getTypeName(this.type);
            if (value === `right`) {
                if ($index < this[typeName].standard.length - 1) {
                    let temp = this[typeName].standard.splice($index, 1);
                    this[typeName].standard.splice($index + 1, 0, temp[0]);
                }
            } else {
                if ($index < this[typeName].raw.length - 1) {
                    let temp = this[typeName].raw.splice($index, 1);
                    this[typeName].raw.splice($index + 1, 0, temp[0]);
                }
            }
            
        },
        handleTop ({$index, row}, value) {
            let typeName = this.getTypeName(this.type);
            if ($index !== 0) {
                if (value === `right`) {
                    let temp = this[typeName].standard.splice($index, 1);
                    this[typeName].standard.splice(0, 0, temp[0]);
                } else {
                    let temp = this[typeName].raw.splice($index, 1);
                    this[typeName].raw.splice(0, 0, temp[0]);
                }
            }
        },
        handleBottom ({$index, row}, value) {
            let typeName = this.getTypeName(this.type);
            if (value === `right`) {
                if ($index < this[typeName].standard.length - 1) {
                    let temp = this[typeName].standard.splice($index, 1);
                    this[typeName].standard.splice(this[typeName].raw.length, 0, temp[0]);
                }
               
            } else {
                if ($index < this[typeName].raw.length - 1) {
                    let temp = this[typeName].raw.splice($index, 1);
                    this[typeName].raw.splice(this[typeName].raw.length, 0, temp[0]);
                }
                   
            }
           
        }
    }
};
</script>
<style lang="scss" scoped>
.tableTitle{
    height:14px;
    font-size:14px;
    margin-bottom:19px;
    color:rgba(51,51,51,1);
    font-weight:400;
}
    .dialog {
        .item-detail.v-item-detail /deep/ .text {
            padding: 0;
        }
        .dialog-list {
        }
        .dialog-item {
            height: 42px;
            line-height: 42px;
            border-bottom: 1px solid #D8D8D8;
            text-indent: 2px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    .dialog-title {
        padding-left: 11px;
        font-size: 18px;
        color: #333333;
        border-left: 4px solid #4579C5;
    }

    /deep/ .el-dialog__body {
        line-height: 100%;
    }
</style>


