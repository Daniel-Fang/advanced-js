/**
 * 1、并不能复制不可枚举的属性以及Symbol类型
 * 2、对于Array,Date,RegExp,Error,Function引用类型无法正确拷贝
 * 3、对象成环，即循环引用 (例如：obj1.a = obj)
 * @param {Object} obj 
 */

function deepClone(obj) {
    if(obj === null) return null;
    if(typeof obj !== 'object') return obj;
    var newObj = obj instanceof Array ? [] : {};
    for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    } 

    return newObj;
}