const ArcObject = require('../');

describe('ArcObject.reduce',() => {
    let testObject = new ArcObject({a:'a',b:'b',c:'c',d:'d'});

    it('should iterate through a full object as expected', () => {
        testObject.reduce((_lastArg,_value,_key) => {
            expect(_value).toEqual(testObject[_key]);
        });
    });

    it('should break the iteration on an explicit return false', () => {
        let count = 0;
        testObject.reduce((_lastArg,_v,_i) => {
            if(_i === 'c'){
                return false;
            }
            count++;
        });
        expect(count).toBe(2);
    });

    it('should not break an iteration, if falseBreak is turned off', () => {
        let count2 = 0;
        testObject.reduce((_i,_v) => {
            count2++;
            if(_i === 2){
                return false;
            }
        },[],false);
        expect(count2).toBe(4);
    });

    it('should return a final value based on the continual return argument from the reduce', () => {
        const joined = testObject.reduce((_lastReturn,_value,_key) => {
            _lastReturn += _value;
            return _lastReturn;
        },'');
        expect(joined).toEqual('abcd');
    });
});