/**
 *  Created by TIANJIE on 2018/6/12
 * */
export default {
    mounted () {
        this._fileTpl = document.createElement('a');
        this._fileTpl.style.display = 'none';
        document.body.appendChild(this._fileTpl);
    },
    methods: {
        _$confirm (options = {}) {
            let defaltOptions = {content: '此操作将永久删除, 是否继续?', title: '提示', btn: ['确定', '取消'], type: 'warning'};
            let {content, title, btn, type} = Object.assign({}, defaltOptions, options);
            return this.$confirm(content, title, {
                confirmButtonText: btn[0],
                cancelButtonText: btn[1],
                type
            });
        },
        _$download ({data, headers, request}) {
            let {status, statusText, responseType} = request;
            console.log(responseType);
            console.log(statusText);
            console.log(status);
            console.log(data);
            if (responseType === 'blob' && status === 200 && data) {
                let url = window.URL.createObjectURL(new Blob([data]));
                this._fileTpl.href = url;
                let filename = headers['content-disposition'].split(';')[1].split('=')[1];
                this._fileTpl.setAttribute('download', filename);
                this._fileTpl.click();
            }
        }
    }
};
