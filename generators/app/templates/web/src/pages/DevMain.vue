<!-- Created by TIANJIE on 2018/6/25 -->
<template>
    <div>
        <el-row class="tac">
            <el-col :span="12">
                <el-menu default-active="1" class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>申报</span>
                        </template>
                        <el-menu-item index="1"><i class="el-icon-menu"></i>
                            <router-link to="/declaration/zhenliao">诊疗项目(新增)</router-link>
                            ==>>
                            <router-link :to="{path: '/declaration/zhenliao', query: {isEdit: true, id: 137}}">诊疗项目(编辑)</router-link>
                        </el-menu-item>
                        <el-menu-item index="4"><i class="el-icon-menu"></i>
                            <router-link to="/declaration/materials">卫生材料(新增)</router-link>
                            ==>>
                            <router-link :to="{path: '/declaration/materials', query: {isEdit: true, id: 68}}">卫生材料(编辑)</router-link>
                        </el-menu-item>
                        <el-menu-item index="2"><i class="el-icon-menu"></i>
                            <router-link to="/declaration/drugs">药品(新增)</router-link>
                            ==>>   <!-- (院内制剂 id = 107; type = 1;)(西药 id = 108; type = 2;)(中成药 id = 109; type = 3;)(中药饮片 id = 110; type = 4;)(民族药饮片 id = 111; type = 5;) -->
                            <router-link :to="{path: '/declaration/drugs', query: {isEdit: true, id: 107, drugType: 1}}">药品(编辑)</router-link>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-menu"></i>
                            <router-link to="/declaration/servicingfacilities">服务设施(新增)</router-link>==>>
                            <router-link :to="{path: '/declaration/servicingfacilities/indexupdata', query: {isEdit: true, id: 75}}">服务设施(编辑)</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>审批</span>
                        </template>
                        <el-menu-item index="1"><i class="el-icon-menu"></i>
                            <router-link to="/audit/Medicare/service">服务设施(社保)审核</router-link>
                            ==>>
                            <router-link to="/audit/Humansociety/service">服务设施(人社)备案</router-link>
                        </el-menu-item>

                        <el-menu-item index="3"><i class="el-icon-menu"></i>
                            <router-link to="/audit/Medicare/materials">卫生材料(社保)审核</router-link>
                            ==>>
                            <router-link to="/audit/Humansociety/materials">卫生材料人社)备案</router-link>
                        </el-menu-item>

                        <el-menu-item index="5"><i class="el-icon-menu"></i>
                            <router-link to="/audit/Medicare/zhenliao">诊疗(社保)审核</router-link>
                            ==>>
                            <router-link to="/audit/Humansociety/zhenliao">诊疗(人社)审核</router-link>
                        </el-menu-item>

                        <el-menu-item index="5"><i class="el-icon-menu"></i>
                            <router-link to="/audit/Medicare/drugs">药品(社保)审核</router-link>
                            ==>>
                            <router-link to="/audit/Humansociety/drugs">药品(人社)审核</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>查询</span>
                        </template>
                        <el-menu-item index="10"><i class="el-icon-menu"></i>
                        <router-link to="/query/druginfo">药品信息查询</router-link>
                        ==>>
                        <router-link :to="{path: '/query/druginfo'}">药品信息详情</router-link>
                    </el-menu-item>
                        <el-menu-item index="11"><i class="el-icon-menu"></i>
                            <router-link to="/query/treatment">诊疗项目查询</router-link>
                            ==>>
                            <router-link :to="{path: '/query/treatment'}">诊疗项目查询详情</router-link>
                        </el-menu-item>
                        <el-menu-item index="12"><i class="el-icon-menu"></i>
                            <router-link to="/query/materials">卫生材料查询</router-link>
                            ==>>
                            <router-link :to="{path: '/query/materials'}">卫生材料查询详情</router-link>
                        </el-menu-item>
                        <el-menu-item index="13"><i class="el-icon-menu"></i>
                            <router-link to="/query/services">服务设施查询</router-link>
                            ==>>
                            <router-link :to="{path: '/query/services'}">服务设施查询详情</router-link>
                        </el-menu-item>

                        <el-menu-item index="14"><i class="el-icon-menu"></i>
                            <router-link to="/query/druginfoProgress">药品信息申报进度查询</router-link>
                            ==>>
                            <router-link :to="{path: '/query/druginfoProgress'}">药品信息申报进度详情</router-link>
                        </el-menu-item>
                        <el-menu-item index="15"><i class="el-icon-menu"></i>
                            <router-link to="/query/treatmentProgress">诊疗项目申报进度查询</router-link>
                            ==>>
                            <router-link :to="{path: '/query/treatmentProgress'}">诊疗项目申报进度详情</router-link>
                        </el-menu-item>
                        <el-menu-item index="16"><i class="el-icon-menu"></i>
                            <router-link to="/query/materialsProgress">卫生材料申报进度查询</router-link>
                            ==>>
                            <router-link :to="{path: '/query/materialsProgress'}">卫生材料申报进度详情</router-link>
                        </el-menu-item>
                        <el-menu-item index="17"><i class="el-icon-menu"></i>
                            <router-link to="/query/servicesProgress">服务设施申报进度查询</router-link>
                            ==>>
                            <router-link :to="{path: '/query/servicesProgress'}">服务设施申报进度详情</router-link>
                        </el-menu-item>
                   </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="10"><i class="el-icon-menu"></i>
                            <router-link to="/authorityManage/user">用户管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="11"><i class="el-icon-menu"></i>
                            <router-link to="/authorityManage/menu">菜单管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="12"><i class="el-icon-menu"></i>
                            <router-link to="/authorityManage/roleGroup">角色组管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="12"><i class="el-icon-menu"></i>
                            <router-link to="/authorityManage/dataRole">数据角色管理</router-link>
                        </el-menu-item>
                        <el-menu-item index="12"><i class="el-icon-menu"></i>
                            <router-link to="/authorityManage/org">组织架构管理</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>DEMO</span>
                        </template>
                        <el-menu-item>
                            <router-link to="/components/test/demo">component</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {};
</script>
