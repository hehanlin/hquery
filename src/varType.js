function getType(_var) {
	var str = Object.prototype.toString.call(_var);
	var res = /^\[object\s{1}(\w+)\]/.exec(str)[1];
	return res.slice(0,1).toUpperCase() + res.slice(1);
}

function isString(str) {
	return getType(str) === 'String';
}

function isBool(bool) {
	return getType(bool) === 'Boolean';
}

function isNumber(num) {
	return getType(num) === 'Number';
}

function isObject(obj) {
	return getType(obj) === 'Object';
}

function isArray(arr) {
	return getType(arr) === 'Array';
}

function isFunction(func) {
	return getType(func) === 'Function';
}

function isRegExp(reg) {
	return reg instanceof RegExp;
}


function isELement(element) {
	return element.nodeType && element.nodeType === 1;
}

function isArrayLike(o) {
    if (o &&                                // o is not null, undefined, etc.
        typeof o === 'object' &&            // o is an object
        isFinite(o.length) &&               // o.length is a finite number
        o.length >= 0 &&                    // o.length is non-negative
        o.length===Math.floor(o.length) &&  // o.length is an integer
        o.length < 4294967296 &&
        o.slice === undefined)              // o.length < 2^32
        return true;                        // Then o is array-like
    else
        return false;                       // Otherwise it is not
}