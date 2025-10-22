import ArcArray from 'arc-array';

declare class ArcObject extends Object {
    /**
     * Construct from a plain object; assigns own enumerable props to `this`.
     */
    constructor(_obj?: object);

    /**
     * Deep-freeze the object; nested plain objects are wrapped as ArcObject and frozen.
     */
    deepFreeze(): this;

    /**
     * Shallow freeze (Object.freeze).
     */
    freeze(): this;

    /**
     * Iterate own enumerable properties. If the callback returns false, iteration breaks.
     */
    forEach(
        _f: (this: any, value: any, key: string, self: this) => boolean | void,
        _thisArg?: any
    ): void;

    /**
     * Reduce over own enumerable properties, calling fn(acc, value, key).
     * If fn returns false and _falseBreak !== false, iteration stops.
     */
    reduce<T>(
        _f: (this: this, last: T, value: any, key: string) => T | false,
        _lastArg: T,
        _falseBreak?: boolean
    ): T;

    /**
     * Map over own enumerable properties.
     * - When _asArray === false, returns an object keyed by the same keys.
     * - Otherwise (default), returns an array of mapped values.
     */
    map<T>(_f: (this: this, value: any, key: string) => T, _asArray: false): Record<string, T>;
    map<T>(_f: (this: this, value: any, key: string) => T, _asArray?: true): T[];

    /**
     * Filter own enumerable properties by predicate; returns a new plain object of passing entries.
     */
    filter(
        _f: (this: this, value: any, key: string) => boolean
    ): Record<string, any>;

    /**
     * Count of own enumerable properties.
     */
    count(): number;

    /**
     * Own keys as an ArcArray (extends Array).
     */
    keys(): ArcArray<string>;

    /**
     * Sort keys lexicographically (mutates object order in JS engines that reflect insertion order)
     * and reinsert properties accordingly. Returns this.
     */
    ksort(): this;

    /**
     * Remove and return the last property's value, or undefined.
     */
    pop(): any | undefined;

    /**
     * Peek the last property's value, or undefined.
     */
    last(): any | undefined;

    /**
     * Remove and return the first property's value, or undefined.
     */
    shift(): any | undefined;

    /**
     * Peek the first property's value, or undefined.
     */
    first(): any | undefined;

    /**
     * Define a non-writable, non-configurable property on this (enumerable defaults to true).
     */
    constant(_key: string, _val: any, _enumerable?: boolean): void;

    /**
     * "[object ArcObject]"
     */
    toString(): string;

    /**
     * Duck-type check: returns true when _duck has functions on the same keys where _primary has functions.
     */
    static duckType(_primary: any, _duck: any): boolean;

    /**
     * Safe deep getter: returns undefined if any path segment is missing.
     */
    deepGet(...path: Array<string | number>): any;

    /**
     * Return an ArcObject: pass through if already ArcObject; wrap a plain object; otherwise throw.
     */
    static wrap(_obj: ArcObject | object): ArcObject;

    /**
     * Define a constant (non-writable, non-configurable) property on any object.
     */
    static defineConstant(
        _obj: object,
        _key: string,
        _val: any,
        _enumerable?: boolean
    ): void;

    /**
     * Deep copy the given value.
     */
    static copy<T>(_obj: T): T;
}

export default ArcObject;
