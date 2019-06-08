var tap = require('tap');
var ArcObject = require('../');

//Test each iterator
tap.test('ArcObject.map',function(_test){
    let testObj = new ArcObject({a:1,b:2,c:3});

    //If each does not receive a valid function, throw a TypeError
    _test.throws(function(){
        testObj.forEach('STRING');
    },TypeError);

    //Ensure the iteration behaves as expected
    const mappedArray = testObj.map((_val) => _val+_val);

    _test.same(mappedArray,[2,4,6]);

    const mappedObject = testObj.map((_val) => _val+_val, false);

    _test.same(mappedObject,{a:2,b:4,c:6});

    //End
    _test.end();
});