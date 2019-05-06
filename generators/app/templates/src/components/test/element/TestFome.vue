<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="用户名" prop="user">
                <el-input v-model="ruleForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="在次输入密码" prop="checkPass">
                <el-input v-model="ruleForm.checkPass"></el-input>
            </el-form-item>
            <el-form-item label="测试是否必填" required>
                <el-input v-model="ruleForm.requi"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {},

        data () {
            // 自定义验证方法2
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('不能为空'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    user: '',
                    password: '',
                    checkPass: '',
                    requi: ''
                },
                rules: {
                    // 这里的名字一定要跟ruleForm里面的名字一样
                    // required字段是在前面多一个图标，如果没有就没有图标
                    user: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        // 自定义验证方法1
                        {pattern: /^\d+$/, message: '只能输入数字'}
                    ],
                    checkPass: [
                        // 自定义验证方法2
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submit () {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            reset () {
                console.log('重置');
                console.log(this.$refs.form);
                this.$refs['ruleForm'].resetFields();
            }
        }
    };
</script>
<style scopd>


</style>
