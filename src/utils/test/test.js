var anotherObject = {

}

var value;
Object.defineProperty(anotherObject, 'a', {
    set: function(val) {
        value = val;
    }
})
var myObject = Object.create(anotherObject);


myObject.a = 2;
console.log(value);