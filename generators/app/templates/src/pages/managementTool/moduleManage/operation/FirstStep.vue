<!--
* @Author: Nelson
* @Date: 2018/9/17
* @remark: 新增模板第一步
-->
<!--
ResponseEntity«TempletDetailVo» {
data (TempletDetailVo, optional),
errorMsg (string, optional),
status (boolean, optional),
statusCode (string, optional)
}TempletDetailVo {
creatTime (string, optional): 创建时间 ,
dataNum (integer, optional): 知识库数据条数 ,
dbList (Array[TempletDbDetailVo], optional): 数据库配置信息 ,
remark (string, optional): 备注 ,
templetCode (string, optional): 模板编码 ,
templetDrugId (integer, optional): 临床路径导入模板id ,
templetId (integer, optional): 模板id ,
templetName (string, optional): 模板名称 ,
templetType (string, optional): 模板类型 ,
updateTime (string, optional): 修改时间
}TempletDbDetailVo {
columns (Array[TempletColumnsVo], optional): 数据库字段 ,
columnsVo (TablesColumnsVo, optional): 目标库和源库列表 ,
sourceDbId (integer, optional): 源库id ,
sourceTableName (string, optional): 源库数据库表名 ,
sourceTables (Array[Tables], optional): 源库表 ,
targeDbId (integer, optional): 目标库id ,
targeTableName (string, optional): 目标库数据库表名 ,
targeTables (Array[Tables], optional): 目标库表
}TempletColumnsVo {
sourceColumns (string, optional),
targetColumns (string, optional)
}TablesColumnsVo {
sourceColumns (Array[Columns], optional): 源库字段列表 ,
targeColumns (Array[Columns], optional): 目标库字段列表
}Tables {
comments (string, optional): 表描述 ,
tableName (string, optional): 表名称
}Columns {
columnComment (string, optional): 字段描述 ,
columnName (string, optional): 字段名称 ,
tableName (string, optional): 表名称
}
-->
<template>
    <div class="step1-body">
        <div class="tempelate-type-class">
            模板类型：{{templetTypeString}}
        </div>
        <div class="search-tool">
            <div class="pull-left">加密密钥：</div>
            <el-input class="search-tool-text"
                      minlength="16" 
                      maxlength="16" 
                      v-model="modelEx.encryptKey" 
                      placeholder="请输入"
                      @blur="changeText" 
                      :size="formSize"
                      :disabled="modelEx.encAndDec==1"
            >
            </el-input>
            <div class="pull-left p-r-15">解密密钥：</div>
            <el-input class="search-tool-text" 
                        minlength="16" 
                        maxlength="16"
                      　@blur="changeText" 
                        v-model="modelEx.decryptKey" 
                        placeholder="请输入" 
                        :size="formSize"
                        :disabled="modelEx.encAndDec==1"
            >
            </el-input>
        </div>
        <div class="content-table">
            <select-list-table
                :params="item"
                :toArr="targetList"
                :toColsArr="toColsArr"
                :fromArr="sourceList"
                :fromColsArr="fromColsArr"
                @getData="getData"
                :isEdit="isEdit" 
                @delTable="delTable"
                @changeData="changeData"
                @changeAddColomn="changeAddColomn"
                @showAll="showAll"
                @removeData="removeData"
                v-for="(item, index) in dataList"
                :index="index"
                :key="item.tempId"
                :tableType="tableType"
                :templetType="templetType"
                :isSql="tableType===1"
                :isAdd="templetType===2"
                :check="modelEx.encAndDec==1"
            >
        </select-list-table>
        </div>
    </div>
</template>

<script>
import CONFIG from 'src/config';
import SelectListTable from '.././components/SelectListTable';
export default {
    data () {
        return {
            test: '',
            btnSize: CONFIG.homeBtn,
            formSize: CONFIG.homeFormSize,
            templetTypeString: '',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            selectListArr: [],
            selectCount: 0,
            total: 0,
            isShowDiseaseList: true
        };
    },
    props: {
        tableType: {
            type: Number,
            default () {
                return 0;
            }
        },
        templetType: {
            type: Number,
            default () {
                return 0;
            }
        },
        heightPage: {
            type: Number,
            default () {
                return 0;
            }
        },
        sourceList: {
            type: Array,
            default () {
                return [];
            }
        },
        targetList: {
            type: Array,
            default () {
                return [];
            }
        },
        dataBaseArr: {
            type: Array,
            default () {
                return [];
            }
        },
        modelEx: {
            type: Object,
            default () {
                return {};
            }
        },
        isEdit: {
            type: Boolean,
            default () {
                return false;
            }
        },
        dataList: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    created () {
        this.init();
    },
    watch: {

    },
    methods: {
        changeText (data) {
            console.log('changeText', data.target.value);
            if (typeof data.target.value !== 'string') {
                return true;
            }
            if (!data.target.value.length) {
                return true;
            }
            
            let pattern = /^[a-zA-Z0-9\`\!\~\@\#\$\%\^\&\*\(\)\_\+\-\=\{\}\[\]\;\'\"\:\<\>\?\/\,\.]+$/;
            if (!pattern.test(data.target.value)) {
                this.$toast('输入不正确（须英文、数字、英文半角状态下的键盘符号输入），请重新输入');
                data.target.value = '';
                return false;
            }
            return true;
        },
        formatType () {
            let tableType = [];
            switch (parseInt(this.tableType)) {
            case 1:
                tableType.push('sql语句');
                break;
            case 2:
                tableType.push('源表');
                break;
            default:
                tableType.push('其他');
                break;
            }
            switch (parseInt(this.templetType)) {
            case 1:
                tableType.push('全量替换');
                break;
            case 2:
                tableType.push('增量');
                break;
            case 3:
                tableType.push('临床路径');
                break;
            case 4:
                tableType.push('全量新增');
                break;
            default:
                tableType.push('其他');
                break;
            }
            return tableType.join('+');
        },
        init () {
            this.templetTypeString = this.formatType();
        },
        showAll (result_, index_, ori, bak) {
            let temp_ = this.dataList[index_];
            temp_.unOpen = !result_;
            temp_.resultData = ori;
            temp_.resultDataBak = bak;
            if (result_) {
                // 展开
                temp_.height = 89 + temp_.resultData.length * 30 || 0;
                this.dataList.splice(index_, 1, temp_);
            } else {
                temp_.height = 85;
                this.dataList.splice(index_, 1, temp_);
            }
            this.$emit('changeData', this.dataList);
            this.change();
        },
        delTable (index_) {
            try {
                this.dataList.splice(index_, 1);
                this.$emit('changeData', this.dataList);
                this.change();
            } catch (error) {
                console.error('error', error.name, error.message);
            }
        },
        changeData (result_, index_) {
            let temp_ = this.dataList[index_];
            temp_.resultData = result_ || [];
            temp_.height = 89 + result_.length * 30;
            this.dataList.splice(index_, 1, temp_);
            this.change();
            this.modelEx.dbList = this.dataList;
            this.$emit('changeData', this.dataList);
        },
        removeData (index_) {
            let temp_ = this.dataList[index_];
            temp_.resultData = [];
            temp_.resultDataBak = [];
            temp_.height = 85;
            this.dataList.splice(index_, 1, temp_);
            this.change();
            this.modelEx.dbList = this.dataList;
            this.$emit('changeData', this.dataList);
        },
        changeAddColomn (addColomn, index_) {
            let temp_ = this.dataList[index_];
            temp_.timestampColumn = addColomn || '';
            this.dataList.splice(index_, 1, temp_);
            this.change();
            this.modelEx.dbList = this.dataList;
            this.$emit('changeData', this.dataList);
        },
        change () {
            let heights = 0;
            for (let i = 0; i < this.dataList.length; i++) {
                let item = this.dataList[i];
                heights = item.length;
            }
            this.$emit("updateHight", heights);
        }
    },
    computed: {
 
    },
    components: {SelectListTable}
};
</script>
<style lang="scss" scoped>
    .step1-body{
        height: calc(100% - 110px);
        width: 100%;
        min-width:1080px;
    }
    .tempelate-type-class {
        margin-top: 18px;
        height: 20px;
        margin-left: 11px;
        margin-bottom: 5px;
    }
    .search-tool{
        float:left;
        margin-top: 0;
        margin-left: 11px;
        margin-bottom: 5px;
        position: relative;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight:400;
        min-width: 700px;
        color:#333333;
        .search-tool-text {
            display: block;
            float:left;
            max-width: 250px;
            min-width: 200px;
        }
    }
    .p-r-15{
        margin-left: 15px;
    }
    .content-table{
        height: calc(100% - 85px);
    }
</style>
