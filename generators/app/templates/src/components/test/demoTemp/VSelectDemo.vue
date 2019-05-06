<template>
    <div>
        <v-select
            v-model="selectResult"
            :list="selectData"
            :props="selectProps"
            :filterable="true"
            :remote="true"
            :remote-method="remoteMethod"
        >
        </v-select>
    </div>
</template>
<script>
import VSelect from 'components/VSelect';

export default {
    data () {
        return {
            selectData: [
                {
                    "dictCode": "code",
                    "dictName": "name",
                    "dictType": "type",
                    "dictValue": "value"
                },
                {
                    "dictCode": "code2",
                    "dictName": "name2",
                    "dictType": "type2",
                    "dictValue": "value2"
                },
                {
                    "dictCode": "code3",
                    "dictName": "name3",
                    "dictType": "type3",
                    "dictValue": "value3"
                },
                {
                    "dictCode": "code4",
                    "dictName": "name4",
                    "dictType": "type4",
                    "dictValue": "value4"
                }
            ],
            selectProps: {
                name: 'dictName',
                value: 'dictValue'
            },
            selectResult: ''
        };
    },
    methods: {
        remoteMethod (queryString) {
            if (!queryString) {
                this.selectData = [];
                return false;
            }
            // ajax请求
            setTimeout(() => {
                this.selectData.length = 0;
                this.selectData.push({dictName: 'ajaxname', dictValue: 'ajaxValue'});
            }, 1000);
        }
    },
    components: {VSelect}

};
</script>
