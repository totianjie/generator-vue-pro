<template>
    <div>
        <h1>单选</h1>
        <el-radio-group v-model="radioData.radio">
            <el-radio
                v-for="(item, index) in radioData.data"
                :key="index"
                :label="item"
            >
                {{item}}
            </el-radio>
        </el-radio-group>

        <hr>
        <h1>复选</h1>
        <el-checkbox-group v-model="checkboxData.checkbox">
            <el-checkbox
                v-for="(item, index) in checkboxData.data"
                :key="index"
                :label="item"

            ></el-checkbox>
        </el-checkbox-group>
        <hr>
        <h1>输入框</h1>
        <el-input
            v-model="input"
            placeholder="请输入..."
            prefix-icon="el-icon-search"
            suffix-icon="el-icon-date"
            clearable
            size="mini"
        >
        </el-input>
        <h1>文本域</h1>
        <el-input
            type="textarea"
            v-model="textarea"
            :autosize="{minRows: 2, maxRows: 4}"
            placeholder="请输入文本..."
        >
        </el-input>
        <h1>输入框前后可加任何东西</h1>
        <el-input
            v-model="input"
            placeholder="请输入..."
            size="small"
        >
            <template slot="prepend">
                https: //
            </template>
            <template slot="append">
                .com
            </template>
        </el-input>
        <h1>数字选择</h1>
        <el-input-number
            v-model="inputNumber"
            :min="1"
            :max="10"
            label="想说点什么"
            @change="inputNumHandleChange"
        >

        </el-input-number>
        <h1>下拉选择</h1>
        <el-select v-model="selectData.select" placeholder="请选择...">
            <el-option
                class="aaa"
                v-for="(item, index) in selectData.data"
                :key="index"
                :value="item.value"
                :label="item.label"
            >

            </el-option>
        </el-select>
        <h1>开关</h1>
        <el-switch
            v-model="switchVal"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关">
        </el-switch>
        <h1>滑块</h1>
        <el-slider
            v-model="sliderVal"
            :min="0"
            :max="1000"
            style="margin: 0 20px;"
        >

        </el-slider>
        <h1>日期选择器</h1>
        <el-date-picker
            v-model="dateVal"
            type="date"
            placeholder="请选择时间..."
        >
        </el-date-picker>
        <el-date-picker
            v-model="dateRangeVal"
            type="daterange"
            start-placeholder="选择开始时间"
            end-placeholder="选择结束时间"
        >
        </el-date-picker>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {},

        data () {
            return {
                radioData: {
                    radio: false,
                    data: ['选项1', '选项2', '选项3', '选项4', '选项5']
                },
                checkboxData: {
                    checkbox: [],
                    data: ['选项1', '选项2', '选项3', '选项4', '选项5']
                },
                input: '',
                textarea: '',
                inputNumber: '',
                selectData: {
                    select: '',
                    data: [
                        {
                            value: '选项1',
                            label: '黄金糕'
                        },
                        {
                            value: '选项2',
                            label: '双皮奶'
                        },
                        {
                            value: '选项3',
                            label: '蚵仔煎'
                        },
                        {
                            value: '选项4',
                            label: '龙须面'
                        },
                        {
                            value: '选项5',
                            label: '北京烤鸭'
                        },
                        {
                            value: '选项11',
                            label: '黄金糕'
                        },
                        {
                            value: '选项21',
                            label: '双皮奶'
                        },
                        {
                            value: '选项31',
                            label: '蚵仔煎'
                        },
                        {
                            value: '选项41',
                            label: '龙须面'
                        },
                        {
                            value: '选项51',
                            label: '北京烤鸭'
                        }
                    ]

                },
                switchVal: false,
                sliderVal: 0,
                dateVal: '',
                dateRangeVal: ''
            };
        },

        computed: {},

        watch: {
            'radioData.radio': function (newRadio, oldRadio) {
                console.log(newRadio, oldRadio);
            },
            'checkboxData.checkbox': function (newCheckbox, oldcheckbox) {
                console.log(newCheckbox, oldcheckbox);
            },
            input (newInput, oldInput) {
                console.log(newInput, oldInput);
            },
            textarea (newArea, oldArea) {
                console.log(newArea, oldArea);
            },
            inputNumber (newNum, oldNum) {
                console.log(newNum, oldNum);
            },
            'selectData.select' (newSelect, oldSelect) {
                console.log(newSelect, oldSelect);
            },
            switchVal (newSwitch, oldSwitch) {
                console.log(newSwitch, oldSwitch);
            },
            sliderVal (newSliderVal, oldSliderVal) {
                console.log(newSliderVal, oldSliderVal);
            },
            dateVal (newDateVal, oldDateVal) {
                console.log(newDateVal, oldDateVal);
                let oDate = new Date(newDateVal);
                console.log(oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate());
            },
            dateRangeVal (newDate, oldDate) {

                if (newDate instanceof Array) {
                    let oDate = new Date(newDate[0]);
                    let oDate2 = new Date(newDate[1]);
                    console.log(oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate());
                    console.log(oDate2.getFullYear(), oDate2.getMonth() + 1, oDate2.getDate());
                }
            }
        },

        created () {
        },

        mounted () {
        },

        methods: {
            inputNumHandleChange (val) {
                console.log(val);
            }
        },

        components: {}
    };
</script>
<style scopd>


</style>
