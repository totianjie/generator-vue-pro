/**
 *  Created by TIANJIE on 2018/6/6
 *
 *  id pid 方式的数组  变为 children的形式
 * */
export default class ResetDataFormat {
    constructor (data, formatKey = {id: 'id', pId: 'pId'}) {
        this.tree = data || []; //数据
        this.groups = {}; //分组
        this._key = formatKey.id;
        this._parentKey = formatKey.pId;
    }

    init (pid) { // 接收一个最高级pid
        this.group();
        return this.getData(this.groups[pid]);
    }

    group () {
        let len = this.tree.length;
        for (let i = 0; i < len; i++) {
            if (this.groups[this.tree[i][this._parentKey]]) {
                this.groups[this.tree[i][this._parentKey]].push(this.tree[i]);
            } else {
                this.groups[this.tree[i][this._parentKey]] = [];
                this.groups[this.tree[i][this._parentKey]].push(this.tree[i]);
            }
        }
    }

    getData (info) { //输入直接父集的id去递归查找 返回每次查找的结果
        if (!info) return;
        let children = [];
        let len = info.length;
        for (let i = 0; i < len; i++) {
            let item = info[i];
            let result = this.getData(this.groups[item[this._key]]);
            result = result ? result : [];
            item.children = item['children'].concat(result);
            children.push(item);
        }
        return children;
    }
}

/*

ResetDataFormat2.prototype = {
    init: function (pid) {
        this.group();
        console.log(this.groups[pid]);
        var data = this.getData(this.groups[pid]);
        return data;
    },
    group: function () {
        for (var i = 0; i < this.tree.length; i++) {
            if (this.groups[this.tree[i].pId]) {
                this.groups[this.tree[i].pId].push(this.tree[i]);
            } else {
                this.groups[this.tree[i].pId] = [];
                this.groups[this.tree[i].pId].push(this.tree[i]);
            }
        }
    },
    getData: function (info) { //输入直接父集的id去递归查找 返回每次查找的结果
        if (!info) return;

        var children = [];
        for (var i = 0; i < info.length; i++) {
            var item = info[i];
            item.children = item['children'].concat(this.getData(this.groups[item.id]));
            children.push(item);
        }

        return children;
    }
};
*/
