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
        <div style="max-height: 350px; overflow-y: auto;">
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
export default {
    data () {
        return {
            formSize: CONFIG.homeFormSize,
            btnSize: CONFIG.homeBtn,
            bShow: false,
            COST,
            DISEASE_CONTROL,
            OPERATION
        };
    },
    props: {
        type: {
            type: String,
            default: ''
        }
    },
    computed: {
        tableCol () {
            switch (this.type) {
            case "cost":
                return this.COST;
            case "diseaseControl":
                return this.DISEASE_CONTROL;
            case "operation":
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
        setting () {
            this.bShow = true;
        },
        _settingOk () {
            console.log("settingOk");
            window.localStorage.setItem("cost", JSON.stringify(this.tableCol));
        },
        handlePre ({$index, row}) {
            if ($index !== 0) {
                let temp = this.COST.raw.splice($index, 1);
                this.COST.raw.splice($index - 1, 0, temp[0]);
            }
        },
        handleNext ({$index, row}) {
            if ($index < this.COST.raw.length - 1) {
                let temp = this.COST.raw.splice($index, 1);
                this.COST.raw.splice($index + 1, 0, temp[0]);
            }
        },
        handleTop ({$index, row}) {
            if ($index !== 0) {
                let temp = this.COST.raw.splice($index, 1);
                this.COST.raw.splice(0, 0, temp[0]);
            }
        },
        handleBottom ({$index, row}) {
            if ($index < this.COST.raw.length - 1) {
                let temp = this.COST.raw.splice($index, 1);
                this.COST.raw.splice(this.COST.raw.length, 0, temp[0]);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
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


