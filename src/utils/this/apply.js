Function.prototype.myapply = function(context) {
    if(typeof context !== 'function') {
        throw new TypeError('not function');
    }

    var context = context || window;
    context.fn = this;
    var args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var result = context.fn([...args]);
    delete context.fn;
    return result;
}