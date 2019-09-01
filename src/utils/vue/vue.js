function Dep() {
    this.subs = [];
}

Dep.prototype.addSub = function addSub(sub) {
    this.subs.push(sub);
}

Dep.prototype.notify = function notify() {
    this.subs.forEach(function (sub) {
        sub.update();
    })
}

function Watcher(vm, node, name) {
    Dep.target = this;
    this.vm = vm;
    this.node = node;
    this.name = name;
    this.update();
    Dep.target = null;
}

Watcher.prototype.update = function update() {
    this.get();
    if (this.node.nodeType === 1) {
        this.node.value = this.value;
    } else if (this.node.nodeType === 3) {
        this.node.nodeValue = this.value;
    }
}

Watcher.prototype.get = function get() {
    this.value = this.vm.data[this.name];
}

function defineReactive(obj, key, value) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target);
            }
            return value;
        },
        set: function (val) {
            if (value === val) {
                return;
            }
            value = val;
            dep.notify();
        }
    })
}

function Observer(vm, obj) {
    Object.keys(obj).forEach(function (key) {
        defineReactive(obj, key, obj[key]);
    })
}


function compile(vm, node) {
    var reg = /\{\{(.*)\}\}/;
    if (node.nodeType === 1) { // 节点类型为元素
        var attr = node.attributes;
        for (var i = 0; i < attr.length; i++) {
            if (attr[i].nodeName == 'v-model') {
                var name = attr[i].nodeValue;
                node.addEventListener('input', function (e) {
                    vm.data[name] = e.target.value;
                })
                node.value = vm.data[name];
                node.removeAttribute('v-model');
            }
        }
    }

    if (node.nodeType === 3) { //节点类型为Text
        if (reg.test(node.nodeValue)) {
            var name = RegExp.$1;
            name = name.trim();
            new Watcher(vm, node, name);
        }
    }
}

function nodeToFragment(vm, node) {
    var flag = document.createDocumentFragment();
    var child;
    while (child = node.firstChild) { //将节点append之后，child会自动删除
        compile(vm, child);
        flag.appendChild(child);
    }
    return flag;
}

function Vue(options) {
    this.data = options.data || {};
    var data = this.data;
    Observer(data, this);  //监听数据变化
    var id = options.el; 
    var dom = nodeToFragment(this, document.getElementById(id));
    document.getElementById(id).appendChild(dom);
}

export default Vue;