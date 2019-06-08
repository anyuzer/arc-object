const is = require('arc-is');
const ArcObject = require('../');

//Bind ArcObject to the native object
ArcObject.bindNative();

//Test native casting, and toString
describe('ArcObject nativeBind',() => {
    let testObj = {}.arc();

    it('should return an ArcObject', () => {
        expect(is(testObj)).toEqual('object');
        expect(is(testObj, true)).toEqual('ArcObject');
        expect(testObj.arc()).toBe(testObj);
    });
});