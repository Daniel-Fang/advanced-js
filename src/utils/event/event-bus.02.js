class EventEmitter {
    constructor () {
        this._event = this._event || new Map();
        this._maxListeners = this._maxListeners || 4;
    }
}

EventEmitter.prototype.addListener = function addListener(type, handler) {
    const fn = this._event.get(type);

    if(!fn) {
        // 不存在监听时，直接设置handler处理
        this._event.set(type, handler);
    } else if(typeof fn === 'function'){
        // 存在一个监听时，设置监听函数为一个数组
        this._event.set(type, [fn, handler]);
    } else {
        // 有多个监听函数时，直接push数组
        if(fn.length < this._maxListeners) {
            fn.push(handler);
        }else {
            throw new TypeError('more than max listeners');
        }
    }
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.emit = function emit(type, ...args) {
    const handlers = this._event.get(type);
    if(handlers === undefined) {
        throw new TypeError("can't emit the type callback");
    }
    else if(handlers instanceof Array) {
        for(let i = 0; i < handlers.length; i++) { //依次触发
            if(args.length > 0) {
                handlers[i].apply(this, args);
            }else {
                handlers[i].call(this);
            }
        }
    }else {
        if(args.length > 0) {
            handlers.apply(this, args);
        }else {
            handlers.call(this);
        }
    }

    return true;
}

EventEmitter.prototype.removeListener = function removeListener(type, handler) {
    const fn = this._event.get(type);
    if(!fn) {
        return this;
    }else if(typeof fn === 'function') {
        this._event.delete(type, handler);
    } else {
        let index = -1;
        for(let i = 0; i < fn.length; i++) {
            if(fn[i] === handler) {
                index = i;
                break;
            }
        }

        if(index !== -1) {
            fn.splice(index, 1);
            if(fn.length === 1) {
                this._event.set(type, fn[0]);
            }
        }else {
            return this;
        }
    }
}

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    const fn = this._event.get(type);

    if(!fn) {
        return this;
    }else {
        this._event.delete(type);
    }
}

var event = new EventEmitter();
function handler1() {
    console.log('callback1');
    console.log(arguments);
}

function handler2() {
    console.log('callback2');
    console.log(arguments);
}

function handler3() {
    console.log('callback3');
    console.log(arguments);
}

function handler4() {
    console.log('callback4');
    console.log(arguments);
}

function handler5() {
    console.log('callback5');
    console.log(arguments);
}

// 添加监听
event.on('click', handler1);
event.on('click', handler2);
event.on('click', handler3); 
event.on('click', handler4); 
// event.addListener('click', handler5); // 超过最大监听数

// 触发监听
event.emit('click', 'daniel');

// 移除监听回调必须为具名函数
event.removeListener('click', handler1);
event.emit('click', 'daniel');

// 移除所有为type的监听
event.removeAllListeners('click');
// event.emit('click', 'daniel');