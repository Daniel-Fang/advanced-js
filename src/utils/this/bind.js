Function.prototype.mybind = function(context) {
    if(typeof context !== 'function') {
        throw new TypeError('not function');
    }
    var self = this;
    var args = [...arguments].slice(1);
    return function() {
        var newArgs = [...arguments];
        console.log(newArgs);
        return self.apply(context, args.concat(newArgs));
    }
}