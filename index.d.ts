import ArcArray from 'arc-array';

declare class ArcObject<T extends object = Record<string, any>> extends Object {
    /**
     * Construct from a plain object; assigns own enumerable props to `this`.
     */
    constructor(_obj?: T);

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
        _f: (
            this: this,
            value: T[keyof T],
            key: Extract<keyof T, string>,
            self: this
        ) => boolean | void,
        _thisArg?: any
    ): void;

    /**
     * Reduce over own enumerable properties, calling fn(acc, value, key).
     * If fn returns false and _falseBreak !== false, iteration stops.
     */
    reduce<R>(
        _f: (
            this: this,
            last: R,
            value: T[keyof T],
            key: Extract<keyof T, string>
        ) => R | false,
        _lastArg: R,
        _falseBreak?: boolean
    ): R;

    /**
     * Map over own enumerable properties.
     * - When _asArray === false, returns an object keyed by strings.
     * - Otherwise (default), returns an array of mapped values.
     */
    map<R>(
        _f: (this: this, value: T[keyof T], key: Extract<keyof T, string>) => R,
        _asArray: false
    ): Record<string, R>;
    map<R>(
        _f: (this: this, value: T[keyof T], key: Extract<keyof T, string>) => R,
        _asArray?: true
    ): R[];

    /**
     * Filter own enumerable properties by predicate; returns a new plain object of passing entries.
     */
    filter(
        _f: (this: this, value: T[keyof T], key: Extract<keyof T, string>) => boolean
    ): Record<string, T[keyof T]>;

    /**
     * Count of own enumerable properties.
     */
    count(): number;

    /**
     * Own keys as an ArcArray (extends Array).
     */
    keys(): ArcArray<Extract<keyof T, string>>;

    /**
     * Sort keys lexicographically and reinsert properties accordingly. Returns this.
     */
    ksort(): this;

    /**
     * Remove and return the last property's value, or undefined.
     */
    pop(): T[keyof T] | undefined;

    /**
     * Peek the last property's value, or undefined.
     */
    last(): T[keyof T] | undefined;

    /**
     * Remove and return the first property's value, or undefined.
     */
    shift(): T[keyof T] | undefined;

    /**
     * Peek the first property's value, or undefined.
     */
    first(): T[keyof T] | undefined;

    /**
     * Define a non-writable, non-configurable property on this (enumerable defaults to true).
     */
    constant(_key: string, _val: unknown, _enumerable?: boolean): void;

    /**
     * "[object ArcObject]"
     */
    toString(): string;

    /**
     * Duck-type check: returns true when _duck has functions on the same keys where _primary has functions.
     */
    static duckType(_primary: unknown, _duck: unknown): boolean;

    /**
     * Safe deep getter: returns undefined if any path segment is missing.
     */
    deepGet(...path: Array<string | number>): unknown;

    /**
     * Return an ArcObject: pass through if already ArcObject; wrap a plain object; otherwise throw.
     */
    static wrap<U extends object>(_obj: ArcObject<U> | U): ArcObject<U>;

    /**
     * Define a constant (non-writable, non-configurable) property on any object.
     */
    static defineConstant(
        _obj: object,
        _key: string,
        _val: unknown,
        _enumerable?: boolean
    ): void;

    /**
     * Deep copy the given value.
     */
    static copy<S>(_obj: S): S;
}

export default ArcObject;
