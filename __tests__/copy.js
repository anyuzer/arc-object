import ArcObject from "../index.js";

describe('ArcObject copy', () => {
    it('should return a copy of an object', () => {
        const Y = { a: 1 };
        expect(ArcObject.copy(Y)).not.toBe(Y);
    });
});