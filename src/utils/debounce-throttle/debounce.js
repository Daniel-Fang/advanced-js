// ES5
const debounce = function(fn, wait) {
    var timer = null;
    return function() {
        var self = this;
        var args = arguments;
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn.apply(self, args);
        }, wait);
    }
}


// ES6
// const debounce = (fn, wait) => {
//     var timer = null;
//     return function() {
//         if(timer) {
//             clearTimeout(timer);
//         }
//         timer = setTimeout(() => {
//             fn.apply(this, [...arguments]);
//         }, wait)
//     }
// }

export { debounce }