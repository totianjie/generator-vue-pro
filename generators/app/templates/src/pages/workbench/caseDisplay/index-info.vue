<!--
* @Author: mikey.TIANJIE
* @Date: 2018/9/6
* @remark: 病例展示
-->
<template>
    <section class="case-display-wrap">
        <section class="page h-fill wrapper">
            <aside class="aside-wrap"></aside>
            <section class="content-wrap">
                <div style="height: 320px; background: #fff;">

                </div>
                <!--<test style="flex: 1; background: #fff; margin-top: 8px;"></test>-->
                <!--<visit-detail style="flex: 1; background: #fff; margin-top: 8px;"></visit-detail>-->
                <!--<diagnose-table style="flex: 1; background: #fff; margin-top: 8px;"></diagnose-table>-->
                <!--<visit-diagnose-table style="flex: 1; background: #fff; margin-top: 8px;"></visit-diagnose-table>-->
                <!--<case-detail style="flex: 1; background: #fff; margin-top: 8px;"></case-detail>-->
                <!--<case-diagnose-table style="flex: 1; background: #fff; margin-top: 8px;"></case-diagnose-table>-->
                <!--<leave-hos-table style="flex: 1; background: #fff; margin-top: 8px;"></leave-hos-table>-->
                <medical-info-table style="flex: 1; background: #fff; margin-top: 8px;"></medical-info-table>
            </section>
        </section>
    </section>
</template>

<script>
    // import VisitDetail from './info/VisitDetail';
    // import DiagnoseTable from './info/DiagnoseTable';
    // import VisitDiagnoseTable from './info/VisitDiagnoseTable';
    // import CaseDetail from './info/CaseDetail';
    // import CaseDiagnoseTable from './info/CaseDiagnoseTable';
    // import LeaveHosTable from './info/LeaveHosTable';
    import MedicalInfoTable from './info/MedicalInfoTable';


    export default {
        // components: {VisitDetail}
        // components: {DiagnoseTable}
        // components: {VisitDiagnoseTable}
        // components: {CaseDetail}
        // components: {CaseDiagnoseTable}
        // components: {LeaveHosTable}
        components: {MedicalInfoTable}
    };
</script>

<style scoped lang="scss">
    .case-display-wrap {
        background: none;
        .wrapper {
            display: flex;
            .aside-wrap {
                flex: 0 0 174px;
            }
            .content-wrap {
                flex: 1;
                flex-direction: column;
                margin-left: 8px;
                overflow: auto;
                display: flex;
            }
        }
    }
</style>
