/*
* @Author: mikey.TIANJIE
* @Date: 2018/11/21
* @remark:
* */
export default {
    data () {
        return {
            enterActiveClass: 'bounceInRight', // slideInRight lightSpeedIn fadeInRightBig bounceInRight bounceIn
            leaveActiveClass: 'zoomOutRight'
        };
    },
    methods: {
        _moveItem (tagArr, newArr) { // newArr ==> tagArr
            this[tagArr] = [];
            console.log(newArr.length);
            if (newArr.length > 0) {
                let timer = setInterval(() => {
                    if (this[tagArr].length !== newArr.length) {
                        this[tagArr].push(newArr[this[tagArr].length]);
                    } else {
                        clearInterval(timer);
                    }
                }, 100);
            }
        },
        _formatter (arr, textKey = 'cases') {
            if (!Array.isArray(arr) || arr.length === 0) {
                return [];
            }
            return arr.map((item, index) => {
                let obj = {};
                obj.name = `NO.${index + 1}&nbsp;${item.name}`;
                obj.currentText = `¥${item[textKey]}`;
                obj.currentRatio = parseFloat(item.accounted);
                return obj;
            });
        }
    }
};
