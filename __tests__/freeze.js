var ArcObject = require('../');

//Test freeze methods
describe('ArcObject.freeze',() => {
    let testObj = new ArcObject({a:'a',b:'b',c:'c'});

    //Freeze it
    testObj.freeze();


    it('should not be able to set a new value', () => {
        //Attempt overwrite
        testObj.a = 'test';
        expect(testObj.a).toEqual('a');
    });

    //Freeze even nested objects
    testObj = new ArcObject({a:'a',b:{x:'x',y:'y',z:'z'},c:'c'});
    testObj.deepFreeze();

    it('should not be able to set a new value, even on a nested object', () => {
        //Attempt overwrite
        testObj.b.x = 'yes';
        expect(testObj.b.x).toEqual('x');
    });
});