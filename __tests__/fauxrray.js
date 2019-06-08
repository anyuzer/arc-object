const ArcObject = require('../');

//Everybody knows objects shouldn't be used as map/array bastardizations.. but we do sometimes anyway
describe('ArcObject.fauxrray',() => {
    let testObj = new ArcObject({z:'c',y:'b',x:'a'});
    testObj.ksort();

    it('should have internal keys ordered alphabetically', () => {
        expect(testObj).toEqual({x:'a',y:'b',z:'c'});
    });

    it('should return the value of the first key based on internal order', () => {
        expect(testObj.first()).toEqual('a');
    });

    it('should return the value of the last key based on internal order', () => {
        expect(testObj.last()).toEqual('c');
    });

    it('should remove and return the last key:val of the object based on internal order', () => {
        expect(testObj.pop()).toEqual('c');
        expect(testObj).toEqual({x: 'a', y: 'b'});
    });

    it('should remove and return the first key:val of the object based on internal order', () => {
        expect(testObj.shift()).toEqual('a');
        expect(testObj).toEqual({y:'b'});
    });
});