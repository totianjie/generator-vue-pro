/**
 * 时间转化
 * time 时间毫秒数,必传
 * format 格式,非必传 yyyy年 MM月 dd日 hh小时 mm分 ss秒，比如传入'始于yyyy-MM-dd的hh:mm',则返回'始于2014-06-15的12:05'
 *
 * 添加了毫秒格式, 用于logger.
 * 添加了星期格式, 用于酒店, 做了'今天'的判断.
 *
 * ios下new Date(2018-10-31)报错:invalid date...要改为: 2018/06/31样式
 * */
export function formatTime (time, format) {
    if (!time) {
        return '';
    }
    // if (typeof time === 'string') {
    //     time = time.toString().replace(/-/g, '/'); // ios下new Date(2018-10-31)报错:invalid date...要改为: 2018/10/31样式
    // }
    // if (typeof time === 'number' && (time.toString().length) === 10) {
    //     time = parseInt(time + '000');
    // }
    // 过去
    let stamp = new Date(time),
        cur = new Date(),
        year = stamp.getFullYear(),
        month = (stamp.getMonth() + 1) > 9 ? (stamp.getMonth() + 1) : '0' + (stamp.getMonth() + 1),
        day = stamp.getDate() > 9 ? stamp.getDate() : '0' + stamp.getDate(),
        hour = stamp.getHours() > 9 ? stamp.getHours() : '0' + stamp.getHours(),
        minute = stamp.getMinutes() > 9 ? stamp.getMinutes() : '0' + stamp.getMinutes(),
        sec = stamp.getSeconds() > 9 ? stamp.getSeconds() : '0' + stamp.getSeconds(),
        ms = stamp.getMilliseconds() < 100 ? '0' + (stamp.getMilliseconds() < 10 ? '0' + stamp.getMilliseconds() : stamp.getMilliseconds()) : stamp.getMilliseconds(),
        weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        week = weeks[stamp.getDay()];
    if (format) {
        format = format.replace('yyyy', year);
        format = format.replace('MM', month);
        format = format.replace('dd', day);
        format = format.replace('hh', hour);
        format = format.replace('mm', minute);
        format = format.replace('ss', sec);
        format = format.replace('ms', ms);

        if (year === cur.getFullYear() && stamp.getMonth() === cur.getMonth() && stamp.getDate() === cur.getDate()) {
            week = '今天';
        }
        format = format.replace('week', week);
    } else {
        format = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }

    return format;
}

/**
 * 把字符串、数字转换成时间对象
 */
export function dateTrans (dt) {
    if (typeof dt === 'string') {
        dt = dt.toString().replace(/-/g, '/'); // ios下new Date(2018-10-31)报错:invalid date...要改为: 2018/10/31样式
    }
    if (typeof dt === 'number' && (dt.toString().length) === 10) {
        dt = parseInt(dt + '000');
    }
    dt = new Date(dt);
    return dt;
}

/**
 * 时间是否同年、同月、同日的判断函数
 */
export function isSameYear (dt1, dt2) {
    if (!dt1 || !dt2) return false;
    dt1 = (dt1 instanceof Date) ? dt1 : this.dateTrans(dt1);
    dt2 = (dt2 instanceof Date) ? dt2 : this.dateTrans(dt2);
    return dt1.getFullYear() === dt2.getFullYear();
}

export function isSameMonth (dt1, dt2) {
    if (!dt1 || !dt2) return false;
    dt1 = (dt1 instanceof Date) ? dt1 : this.dateTrans(dt1);
    dt2 = (dt2 instanceof Date) ? dt2 : this.dateTrans(dt2);
    return dt1.getFullYear() === dt2.getFullYear() && dt1.getMonth() === dt2.getMonth();
}

export function isSameDay (dt1, dt2) {
    if (!dt1 || !dt2) return false;
    dt1 = (dt1 instanceof Date) ? dt1 : this.dateTrans(dt1);
    dt2 = (dt2 instanceof Date) ? dt2 : this.dateTrans(dt2);
    return dt1.getMonth() === dt2.getMonth() && dt1.getDate() === dt2.getDate();
}
