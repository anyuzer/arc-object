import ArcObject from "../index.js";

//Test some lazy shortcut methods
describe('ArcObject.lazyMethods',() => {
    let testObj = new ArcObject({z:'a',y:'b',x:'c'});

    it('should return the number of keys:values in the object', () => {
        expect(testObj.count()).toBe(3);
    });

    it('should return the keys of the object in an array', () => {
        expect(testObj.keys()).toEqual(['z','y','x']);
    });

    //Test Check for checking object instantiation
    const x = new ArcObject({
        test:{
            a:{
                deep:{
                    value:"success"
                }
            }
        }
    });

    it('should return a deeply set value, or undefined', () => {
        let success = x.deepGet('test','a','deep','value')
        let fail = x.deepGet('test','a','deep','failure');

        expect(success).toEqual('success');
        expect(fail).toBe(undefined);
    });
});