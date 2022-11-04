import ArcObject from "../index.js";

class Test{
    something(){}
}

describe('ArcObject duckType',() => {

    it('should return a boolean, based on whether or not an object has the same keys and types as another object', () => {
        //An instantiated class
        let mainObj = new Test;
        mainObj.someProp = 'A value';

        //Another, but with a different property
        let sameObj = new Test;
        sameObj.someProp2 = 'Other value';

        //Another but with a different interface signature
        let diffObj = new Test;
        diffObj.newInterface = function(){};

        //A non class
        let nonObj = "Test";

        expect(ArcObject.duckType(mainObj,sameObj)).toBe(true); //They are the same
        expect(ArcObject.duckType(diffObj,mainObj)).toBe(false); //The duck object does not contain the same interface signature as the primary (diffObj)
        expect(ArcObject.duckType(mainObj,diffObj)).toBe(true); //The duck object does contain the same interface signature as the primary object
        expect(ArcObject.duckType(mainObj,nonObj)).toBe(false); //They are different
    });
});