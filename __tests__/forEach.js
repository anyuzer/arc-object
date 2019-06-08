var ArcObject = require('../');

describe('ArcObject.forEach',() => {
    let testObj = new ArcObject({a:1,b:2,c:3});

    it('should iterate through an Object, providing values and keys', () => {
        testObj.forEach((_value,_key) => {
            switch(_key){
                case 'a':
                    expect(_value).toEqual(1);
                    break;

                case 'b':
                    expect(_value).toEqual(2);
                    break;

                case 'c':
                    expect(_value).toEqual(3);
                    break;
            }
        });
    });

    it('should break the loop, when explicit false is returned', () => {
        //Ensure break behaves as expected
        let count = 0;
        testObj.forEach(function(_v,_k){
            if(_k === 'b'){
                return false;
            }
            count++;
        });

        expect(count).toEqual(1);
    });
});