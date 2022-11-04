import ArcObject from "../index.js";

describe('ArcObject.map',() => {
    let testObj = new ArcObject({a:1,b:2,c:3});

    it('should return a new array of values', () => {
        const mappedArray = testObj.map((_val) => _val+_val);
        expect(mappedArray).toEqual([2,4,6]);
    });

    it('should return a new object of values', () => {
        const mappedObject = testObj.map((_val) => _val+_val, false);

        expect(mappedObject).toEqual({a:2,b:4,c:6});
    });
});