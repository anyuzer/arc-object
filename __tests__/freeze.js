import ArcObject from "../index.js";

//Test freeze methods
describe('ArcObject.freeze',() => {
    let testObj = new ArcObject({a:'a',b:'b',c:'c'});

    //Freeze it
    testObj.freeze();

    it('should not be able to set a new value', () => {
        //Attempt overwrite
        expect(() => {testObj.a = 'test'}).toThrow();
    });

    //Freeze even nested objects
    testObj = new ArcObject({a:'a',b:{x:'x',y:'y',z:'z'},c:'c'});
    testObj.deepFreeze();

    it('should not be able to set a new value, even on a nested object', () => {
        expect(() => {testObj.b.x = 'yes';}).toThrow();
    });
});