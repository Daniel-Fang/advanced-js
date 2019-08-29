// ES5 时间戳版
// const throttle = function (fn, wait) {
//     let startTime = 0;
//     return function () {
//         let self = this;
//         let curTime = new Date();
//         if (curTime - startTime >= wait) {
//             fn.apply(self, arguments);
//             startTime = curTime;
//         }
//     }
// }


// ES6 时间戳版
// const throttle = function(fn, wait) {
//     var startTime = 0;
//     return function() {
//         var curTime = new Date();
//         if(curTime - startTime >= wait) {
//             fn.apply(this, [...arguments]);
//             startTime = curTime;
//         }
//     }
// }


//ES5 定时器版
// const throttle = function(fn, wait) {
//     var timeout = null;
//     return function() {
//         var self = this;
//         var args = arguments;
//         if(!timeout) {
//             timeout = setTimeout(function() {
//                 timeout = null;
//                 fn.apply(self, args);
//             }, wait)
//         }
//     }
// }


//ES6 定时器版
const throttle = function(fn, wait) {
    var timeout = null;
    return function() {
        if(!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(this, arguments);
            }, wait)
        }
    }
}

export { throttle }