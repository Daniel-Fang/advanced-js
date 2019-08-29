class EventEmitter {
    constructor () {
        this._event = this._event || new Map();
        this._maxListeners = this._maxListeners || 10;
    }
}

EventEmitter.prototype.addListener = function(type, handler) {
    if(!this._event.get(type)) {
        this._event.set(type, handler);
    }
}


EventEmitter.prototype.emit = function(type, ...args) {
    console.log(args);
    let handler = this._event.get(type);
    if(args.length > 0) {
        handler.apply(this, args);
    }else {
        handler.call(this);
    }

    return true;
}

var event = new EventEmitter();
event.addListener('click', function() {
    console.log(arguments);
})

event.emit('click', 'name');
// 1、存在不能设置多个监听回调的问题
// 2、_maxListeners未用上
// 3、无removeListener