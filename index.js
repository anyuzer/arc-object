"use strict";
var is = require('arc-is');
var Check = require('arc-check');
var ArcArray = require('arc-array');

class ArcObject extends Object {
    //Allow for an Object literal argument to be passed in that gets case to the ArcObject
    constructor(_obj){
        super();
        if(is(_obj) === 'object'){
            var keys,prop;
            keys = Object.keys(_obj);
            for(var i = 0; i < keys.length; i++){
                prop = keys[i];
                this[prop] = _obj[prop];
            }
        }
    }

    //Turn the object into an immutable object (deep)
    deepFreeze(){
        this.each(function(_k,_v){
            var $this = this;
            if(is(_v) === 'object'){
                $this[_k] = ArcObject.wrap(_v);
                $this[_k].deepFreeze();
            }
        },this);
        this.freeze.call(this);
        return this;
    }

    //Turn the object into an immutable object (shallow)
    freeze() {
        var obj = this;
        obj = Object.freeze(obj);
        return obj;
    }

    //Iterate over the object
    each(_f,_thisArg){
        if(is(_f) !== 'function'){
            throw new TypeError('ArcObject.each first argument must be a valid function');
        }

        //Declare
        var $this,keys,key,length,eachBreak;

        //Our context
        $this = _thisArg || this;

        //Etc
        keys = Object.keys(this);
        length = keys.length;

        //Iterate
        for(let i=0;i<length;i++){
            key = keys[i];
            if(_f.call($this,key,this[key],this) === false){
                break;
            }
        }
    }

    //Lazy
    count(){
        return Object.keys(this).length;
    }
    
    //Shortcut to get keys as an ArcArray
    keys(){
        return new ArcArray(...Object.keys(this));
    }

    //Obviously this is wrong, as we shouldn't trust an objects order for anything, but sometimes we do anyways. Likewise Map is really what we should be using
    ksort(){
        var $this = this;
        var keys = $this.keys();
        var copy = new ArcObject;
        keys.sort();
        keys.each(function(_key){
            copy[_key] = $this[_key];
            delete $this[_key];
        });

        copy.each(function(_key,_val){
            $this[_key] = _val;
        });
        return $this;
    }    

    //Remove the last item in the object
    pop(){
        var $this,lastKey,lastVal;
        $this = this;
        lastKey = $this.keys().pop();
        if(lastKey !== undefined){
            lastVal = $this[lastKey];
            delete $this[lastKey];
            return lastVal;
        }
    }

    //Get the last item in the object
    last(){
        var lastKey = this.keys().pop();
        if(lastKey !== undefined){
            return this[lastKey];
        }
    }

    //Remove the first item in the object
    shift(){
        var $this,firstKey,firstVal;
        $this = this;
        firstKey = $this.keys().shift();
        if(firstKey !== undefined){
            firstVal = $this[firstKey];
            delete $this[firstKey];
            return firstVal;
        }
    }

    //Get the first item in the object
    first(){
        var firstKey = this.keys().shift();
        if(firstKey !== undefined){
            return this[firstKey];
        }
    }

    //Remove values that evaluate to true through ArcCheck
    filterVals(_Check){
        if(is(_Check,true) !== 'ArcCheck'){
            throw new TypeError('ArcObject.filterVals expects a valid ArcCheck object as an argument');
        }
        var $this = this;
        var keys = $this.keys();
        for(var i=0;i<keys.length;i++){
            var key = keys[i];
            if(_Check.val($this[key])){
                delete $this[key];
            }
        }
        return $this;
    }

    //Remove values that have keys that evaluate to true through ArcCheck
    filterKeys(_Check){
        if(is(_Check,true) !== 'ArcCheck'){
            throw new TypeError('ArcObject.filterKeys expects a valid /Arc/Filter object as an argument');
        }
        var $this = this;
        var keys = $this.keys();
        keys.each(function(_key){
            if(_Check.val(_key)){
                delete $this[_key];
            }
        });
        return $this;
    }

    //Remove values that have values that match a value of the filterArray
    quickFilterVals(_filterArray){
        if(is(_filterArray) !== 'array'){
            throw new TypeError('ArcObject.quickFilterVals expects a valid array of values to check against');
        }
        var C = new Check();
        C.addInclude(function(_val){
            return (_filterArray.indexOf(_val) !== -1 ? true : false);
        });
        return this.filterVals(C);
    }

    //Remove values that have keys that match a value of the filterArray
    quickFilterKeys(_filterArray){
        if(is(_filterArray) !== 'array'){
            throw new TypeError('ArcObject.quickFilterKeys expects a valid array of values to check against');
        }
        var C = new Check();
        C.addInclude(function(_val){
            return (_filterArray.indexOf(_val) !== -1 ? true : false);
        });
        return this.filterKeys(C);
    }

    //To string: [object ArcObject]
    toString(){
        return '[object '+this.constructor.name+']';
    }

    //Take dynamic arguments and check that they're initialized objects
    static check(){
        for(var i=0;i<arguments.length;i++){
            if(is(arguments[i]) !== 'object'){
                return false;
            }
        }
        return true;
    }
    
    //When called binds the .arc() method to the global native object type, which in turn returns an ArcObject from a native object
    static bindNative(){
        Object.defineProperty(Object.prototype,'arc',{
            enumerable: false,
            configurable: false,
            writable: false,
            value: function(){
                var $this = this;
                if(is($this,true) === 'ArcObject'){
                    return $this;
                }
                $this = new ArcObject($this);
                return $this;
            }
        });
    }

    //Safely return an ArcObject or cast a native object as an ArcObject
    static wrap(_obj){
        if(is(_obj,true) === 'ArcObject'){
            return _obj;
        }
        else if(is(_obj) === 'object'){
            return new ArcObject(_obj);
        }
        else{
            throw new TypeError('Cannot wrap value. Must evaluate to a native object.');
        }
    }
}

module.exports = ArcObject;