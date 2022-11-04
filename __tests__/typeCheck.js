import is from 'arc-is';
import ArcObject from "../index.js";

//Test native casting, toString and wrapping
describe('ArcObject typeCheck',() => {
    //Non prototype evaluation as object. Prototype toString evaluation as ArcObject

    it('should always return the proper type', () => {
        let testObj = new ArcObject();
        expect(is(testObj)).toEqual('object');
        expect(is(testObj,true)).toEqual('ArcObject');

        //Native object uses wrap to return an ArcObject.
        let nativeObj = {a:'a'};
        nativeObj = ArcObject.wrap(nativeObj);
        expect(is(nativeObj,true)).toEqual('ArcObject');
        expect(nativeObj).toEqual({a:'a'});
        expect(ArcObject.wrap(nativeObj)).toBe(nativeObj); //An already wrapped ArcObject should return itself
    });
});