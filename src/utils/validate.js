// 过滤特殊字符
export function Stripscript(str) {
    var pattern = new RegExp("[~!@#$%^&*()=|{}',\\[\\].< >/?~! @#￥……&*（）+&;—|{}【】‘；：“”'。，、？]")
    var rs = "";
    for(var i = 0; i < str.length; i++){
        rs = rs + str.substr(i,1).replace(pattern,'');
    }
    return rs;
}
// 验证用户名
export function validateUser(value) {
    let reg = /^[a-zA-Z0-9_-]{4,16}$/;
    return reg.test(value)? true : false
}

// 验证密码
export function validatePass(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)/;
    return reg.test(value)? true : false
}

// 验证验证码
export function validateCodeNum(value) {
    var reg = /^[a-z0-9]{6}$/;
    return reg.test(value)? true : false
}