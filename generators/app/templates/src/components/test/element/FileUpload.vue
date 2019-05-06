<template>
    <div>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :file-list="fileList"

            :before-upload="handlerBeforeUpload"
            :on-progress="handlerProgress"
            :on-success="handlerSuccess"
            :on-error="handlerError"

            :before-remove="beforeRemove"
            :on-remove="handleRemove"

            :on-preview="handlePreview"
            :on-change="handlerChange"
            :on-exceed="handleExceed"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            <!--
                before-upload   上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
                    在文件上传前做上传格式和大小验证
                    handleBeforeUpload (file) {
                        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                        const extension = testmsg === 'xls'
                        const extension2 = testmsg === 'xlsx'
                        const isLt2M = file.size / 1024 / 1024 < 10
                        if(!extension && !extension2) {
                            this.$message({
                                message: '上传文件只能是 xls、xlsx格式!',
                                type: 'warning'
                            });
                        }
                        if(!isLt2M) {
                            this.$message({
                                message: '上传文件大小不能超过 10MB!',
                                type: 'warning'
                            });
                        }
                        return extension || extension2 && isLt2M
                    }
                on-progress     文件上传时的钩子
                on-success      文件上传成功时的钩子
                on-error        文件上传失败时的钩子

                before-remove   删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
                on-remove       文件列表移除文件时的钩子

                on-preview      点击文件列表中已上传的文件时的钩子
                on-change       文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
                on-exceed	    文件超出个数限制时的钩子

                auto-upload     是否在选取文件后立即进行上传
                limit           最大允许上传个数

                action          必选参数，上传的地址      string
                headers         设置上传的请求头部      object
                multiple	    是否支持多选文件	    boolean
                data            上传时附带的额外参数	object
                name	        上传的文件字段名	string
                with-credentials	支持发送 cookie 凭证信息	boolean
                show-file-list	是否显示已上传文件列表	boolean
            -->
        </el-upload>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {},

        data () {
            return {
                fileList: [
                    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                    {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}

                ]
            };
        },

        computed: {},

        watch: {},

        created () {
        },

        mounted () {
        },

        methods: {
            handlerBeforeUpload (file) { // 文件上传前
                console.log(file);
                console.log('文件上传前');
                // return false; 在这里return 后会跳直接跳过上传 但是会进入删除的步骤
            },
            handlerProgress (file) { // 文件上传中
                console.log(file);
                console.log('文件上传中');
            },
            handlerSuccess () { // 文件上传成功
                console.log('文件上传成功');
            },
            handlerError () { // 文件上传失败
                console.log('文件上传失败');
            },

            beforeRemove (file, fileList) { // 删除前
                console.log('删除前');
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleRemove (file, fileList) { // 文件删除
                console.log('文件删除');
                console.log(file, fileList);
            },

            handlePreview (file) { // 点击上传好的文件
                console.log('点击上传好的文件');
                console.log(file);
            },
            handlerChange () { // 文件列表改变时
                console.log('文件列表改变时');
            },
            handleExceed (files, fileList) { // 文件超出限制大小时
                console.log('文件超出限制大小时');
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            }
        },

        components: {}
    };
</script>
<style scopd>


</style>
