import {addEvent} from 'js/utils/dom';
import CONFIG from 'src/config';
import DialogDetail from './DialogDetail';
import busEvent from 'src/busEvent';

export default {
    data () {
        return {
            tableSize: CONFIG.tableSize,
            shiftKey: false, // 是否按下了shift键
            lastTimeIndex: '' // 当前选中第几个，用于shiftKey 加点击做比较
        };
    },
    props: {
        tableData: { // 表格数据
            type: Object,
            default () {
                return [];
            }
        },
        rawData: { // 表格被点击单条时的数据
            type: [null, Object],
            default () {
                return null;
            }
        },
        rawDataList: { // 复选框选中的数据
            type: [Array],
            default () {
                return [];
            }
        },
        detailDialog: { // 详情弹框
            type: Boolean,
            default: false
        },
        detailDialogData: { // 详情数据
            type: Object,
            default: {}
        },
        sortObj: {
            type: Object,
            default: {
                orderByName: null,
                orderBy: null // orderBy 排序（1 升序，2 降序）
            }
        },
        tabsActive: {
            type: [Number],
            default: 0
        }

    },
    mounted () {
        addEvent(document, 'keydown', (ev) => {
            let oEvent = ev || event;
            if (oEvent.shiftKey) {
                this.shiftKey = true;
            }
            return false;
        });
        addEvent(document, 'keyup', () => {
            this.shiftKey = false;
            return false;
        });
    },
    methods: {
        // 某一行被双击
        handleRowDblclick (row, event) {
            // console.log(row, event);
        },
        // 当某一行被点击时
        handleRowClick (row = {}, {shiftKey} = {}, column = {}) {
            if (this.setCurrentRowClassStatus) {
                this._setCurrentRowClass('remove');
            }
            this.$emit('update:rawData', row);
        },
        handleDetailNameClick (row) { // 原始诊断名称
            busEvent.$emit('baseDataContrast/operation/common/RawDataTableMixins.rowClick', row);
        },
        // 单个选择取消
        handleSelect (selection, row) {
            if (selection.length > this.rawDataList.length) { // 是取消
                if (this.lastTimeIndex !== '' && this.shiftKey) { // 按下shift的时候

                    let start = '';
                    let end = '';
                    if (row.index > this.lastTimeIndex) { // 从上向下选
                        start = Math.min(this.lastTimeIndex, row.index + 1);
                        end = Math.max(this.lastTimeIndex, row.index + 1);
                    } else { // 下往上选
                        start = Math.min(this.lastTimeIndex + 1, row.index);
                        end = Math.max(this.lastTimeIndex + 1, row.index);
                    }
                    // 去除被选中的，把没有被选中的挑出来  在下一步设置为选中
                    let currentSelect = this.tableData.slice(start, end).filter(item => selection.findIndex(child => child.id === item.id) === -1);

                    currentSelect.forEach(item => {
                        this.$refs.multipleTable.toggleRowSelection(item);
                    });
                }
                this.lastTimeIndex = row.index;
            } else {
                this.lastTimeIndex = '';
            }
            this.$emit('update:rawDataList', JSON.parse(JSON.stringify(selection)));
        },
        // 选择全部   取消全部
        handleSelectAll (selection) {
            if (selection.length) {
                this.$emit('update:rawDataList', JSON.parse(JSON.stringify(selection)));
            } else {
                this.$emit('update:rawDataList', []);
            }
            this.lastTimeIndex = '';
        },
        handleDetail (data) { // 查看详情
            console.log('查看详情');
            this.$emit('checkDetail', {data});
        },
        // 排序
        handleSortChange ({column, prop, order}) {
            this.$emit('sort', {column, prop, order});
        },
        _reset (lastTimeIndex = '') { // 表格数据重新请求，把相关数据重置
            this.lastTimeIndex = lastTimeIndex;
            this._setCurrentRowClass('remove');
        },
        _setCurrentRow (row = null) { // 设置选中行  多项对照  不能对照  审核  撤销  提交  双击对照  （接品请求完成后，表格更新完后把当前选中行重新选中）  ps: 批量学习  排除目前这个版本不需要设置回去
            console.log('设置吧', row);
            if (row !== null) {
                this._setCurrentRowClass('add', row); // 上一次选择的行设置为高亮
                this.lastTimeIndex = row.index;
            }

        },
        _setCurrentRowClass (type = 'add', row) { // 默认是添加
            this.$nextTick(() => {
                if (type === 'add') {
                    let aTbody = this.$refs.multipleTable.$el.getElementsByClassName('el-table__body-wrapper')[0].children[0].getElementsByTagName('tbody')[0];
                    if (aTbody.children.length > 0) {
                        [...aTbody.children].forEach(item => {
                            item.classList.remove('table-current-row');
                        });
                    }
                    this.setCurrentRowClassStatus = false;

                    let aTr = this.$refs.multipleTable.$el.getElementsByClassName('el-table__body-wrapper')[0].children[0].getElementsByTagName('tbody')[0].children;
                    aTr[row.index].classList.add('table-current-row');
                    this.setCurrentRowClassStatus = true;
                    return false;
                }
                let aTbody = this.$refs.multipleTable.$el.getElementsByClassName('el-table__body-wrapper')[0].children[0].getElementsByTagName('tbody')[0];
                if (aTbody.children.length > 0) {
                    [...aTbody.children].forEach(item => {
                        item.classList.remove('table-current-row');
                    });
                }
                this.setCurrentRowClassStatus = false;
            });
        },
        handleDelete (params) {
            this.$emit('deleteDetail', params);
        },
        handleCloseDetail (data) {
            this.$emit('closeDetail', data);
        }
    },
    components: {DialogDetail},
    destroyed () {
    }
};
