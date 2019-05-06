// 收费对照
export const COST = {
    raw: [
        {
            label: "原始项目编码",
            prop: "instCatalogCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "原始项目名称",
            prop: "instCatalogName",
            sortable: "custom",
            width: "136",
            tooltip: true
        },
        {
            label: "原始剂型",
            prop: "instDrugForm",
            sortable: false,
            width: "120",
            tooltip: true
        },
        {
            label: "标准编码",
            prop: "catalogCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "标准名称",
            prop: "catalogName",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "标准剂型",
            prop: "drugForm",
            sortable: false,
            width: "120",
            tooltip: true
        },
        {
            label: "数据状态",
            prop: "statusName",
            sortable: false,
            width: "94",
            tooltip: true
        },
        {
            label: "是否同步",
            prop: "synFlag",
            sortable: "custom",
            width: "94",
            tooltip: true
        },
        {
            label: "对照人",
            prop: "compareOptUser",
            sortable: "custom",
            width: "94",
            tooltip: true
        }
    ],
    standard: [
        {
            label: "标准编码",
            prop: "catalogCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "标准名称",
            prop: "catalogName",
            sortable: "custom",
            width: "136",
            tooltip: true
        },
        {
            label: "标准剂型",
            prop: "drugForm",
            sortable: false,
            width: "120",
            tooltip: true
        }
    ]
};
// 疾病
export const DISEASE_CONTROL = {
    raw: [
        {
            label: "编号",
            prop: "serialNum",
            sortable: "custom",
            width: "80",
            tooltip: true
        },
        {
            label: "原始诊断编码",
            prop: "instDiseaseCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "原始诊断名称",
            prop: "instDiseaseName",
            sortable: "custom",
            width: "136",
            tooltip: true
        },
        {
            label: "标准编码",
            prop: "diseaseCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "附加编码",
            prop: "diseaseCodeAdd",
            sortable: false,
            width: "120",
            tooltip: true
        },
        {
            label: "标准名称",
            prop: "diseaseName",
            sortable: "custom",
            width: "136",
            tooltip: true
        },
        {
            label: "数据状态",
            prop: "statusName",
            sortable: false,
            width: "94",
            tooltip: true
        },
        {
            label: "是否同步",
            prop: "synFlag",
            sortable: "custom",
            width: "94",
            tooltip: true
        },
        {
            label: "对照人",
            prop: "compareOptUser",
            sortable: "custom",
            width: "94",
            tooltip: true
        }
    ],
    standard: [
        {
            label: "标准编码",
            prop: "diseaseCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "附加编码",
            prop: "diseaseCodeAdd",
            sortable: false,
            width: "120",
            tooltip: true
        },
        {
            label: "标准名称",
            prop: "diseaseName",
            sortable: "custom",
            width: "136",
            tooltip: true
        },
        {
            label: "入径诊断标记",
            prop: "diagnosis",
            sortable: false,
            width: "136",
            tooltip: true
        }
    ]
};
// 手术
export const OPERATION = {
    raw: [
        {
            label: "原始手术编码",
            prop: "instOperationCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "原始手术名称",
            prop: "instOperationName",
            sortable: "custom",
            width: "136",
            tooltip: true
        },
        {
            label: "标准编码",
            prop: "operationCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "标准名称",
            prop: "operationName",
            sortable: "custom",
            width: "136",
            tooltip: true
        },

        {
            label: "数据状态",
            prop: "statusName",
            sortable: false,
            width: "94",
            tooltip: true
        },
        {
            label: "是否同步",
            prop: "synFlag",
            sortable: "custom",
            width: "94",
            tooltip: true
        },
        {
            label: "对照人",
            prop: "compareOptUser",
            sortable: "custom",
            width: "94",
            tooltip: true
        }
    ],
    standard: [
        {
            label: "标准编码",
            prop: "operationCode",
            sortable: "custom",
            width: "120",
            tooltip: true
        },
        {
            label: "标准名称",
            prop: "operationName",
            sortable: "custom",
            width: "136",
            tooltip: true
        }
    ]
};
