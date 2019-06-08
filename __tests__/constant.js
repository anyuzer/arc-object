const ArcObject = require('../');

describe('ArcObject constant', () => {
    it('should prevent a value on an object to be overwritten', () => {
        let testObj = new ArcObject();
        testObj.constant('A','a');
        testObj.constant('B','b',false);

        testObj.A = 'B';

        var hasB = false;
        for(let val in testObj){
            if(val === 'b'){
                hasB = true;
            }
        }
        expect(testObj.A).toEqual('a');
        expect(hasB).toBe(false);
    });
})