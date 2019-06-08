const ArcObject = require('../');

describe('ArcObject.filter',() => {
    let testObj = new ArcObject({and:'aardvark',aa:'bb',bb:'cc',z:'a',id:false,id2:undefined});

    it('should filter key:values out by callback', () => {
        expect(testObj.filter((_val)=> !!_val)).toEqual({and:'aardvark',aa:'bb',bb:'cc',z:'a'})
    });
});