function shallowClone(obj) {
    if(obj === null) return null;
    if(typeof obj !== 'object') return obj;
    var newObj = {};
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }

    return newObj;
}

const obj = {
    a: 1,
    b: ['e', 'f', 'g'],
    c: { name: 'daniel-fang'}
};

var newObj = shallowClone(obj);
obj.a = 2;
obj.b[0] = 'E';
obj.c.name = 'daniel';

console.log(obj); // { a: 2, b: [ 'E', 'f', 'g' ], c: { name: 'daniel' } }
console.log(newObj); // { a: 1, b: [ 'E', 'f', 'g' ], c: { name: 'daniel' } }
// 浅克隆之所以被称为浅克隆，是因为对象只会被克隆最外部的一层,至于更深层的对象,则依然是通过引用指向同一块堆内存.