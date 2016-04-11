function cloneObject(obj) {
	var type = getType(obj);
	//如果是一个数组
	if(type === 'Array') {
		var _arr = [];
		for( var i = 0,len=obj.length; i<len; i++ ) {
			if( isFunction(obj[i]) || isRegExp(obj[i]) )continue;
			if( typeof obj[i] === 'object' && obj[i] !== null ) {
				var _type = getType(obj[i]);
				switch(_type) {
					case 'String':
						_arr.push( new String(obj[i]) );
						break;
					case 'Date':
						_arr.push( new Date(obj[i]) );
						break;
					case 'Number':
						_arr.push( new Number(obj[i]) );
						break;
					case 'Boolean':
						_arr.push( new Boolean(obj[i]) );
						break;
					default:
						_arr.push( cloneObject(obj[i]) );
				}
			}else {
				_arr.push(obj[i]);
			}
		}
		return _arr;
	}
	//如果是一个对象
	else if(type === 'Object') {
		var _obj = new Object();
		for(var index in obj) {
			if(isFunction(obj[index]) || isRegExp(obj[index]))continue;
			if( typeof obj[index] === 'object' && obj[index] !== null ) {
				var type = getType(obj[index]);
				switch(type) {
					case 'String':
						_obj[index] = new String(obj[index]);
						break;
					case 'Date':
						_obj[index] = new Date(obj[index]);
						break;
					case 'Number':
						_obj[index] = new Number(obj[index]);
						break;
					case 'Boolean':
						_obj[index] = new Boolean(obj[index]);
						break;
					default:
						_obj[index] = cloneObject(obj[index]);
				}		
			}else {
				_obj[index] = obj[index];
			}
		}
		return _obj;
	}
	//如果是一个Date
	else if(type === 'Date') {
		return new Date(obj);
	}
	//如果是String包装对象
	else if(type === 'String' && typeof obj === 'object') {
		return new String(obj);
	}
	//如果是一个Number包装对象
	else if(type === 'Number' && typeof obj === 'object') {
		return new Number(obj);
	}
	//如果是一个Boolean包装对象
	else if(type === 'Boolean' && typeof obj === 'object') {
		return new Boolean(obj);
	}
	//如果是其他基本类型
	else {
		return obj;
	}
}

function mergeObject(obj1,obj2) {
	var tmp = {};
	for( index in obj2 ) {
		if(obj2.hasOwnProperty(index)) {
			tmp[index] = obj1.hasOwnProperty(index) ? obj1[index] : obj2[index];
		}
	}
	return tmp;
}

function uniqArray(arr) {
	if(!isArray(arr))return false;
	var hash = {},
		temp = [];
	for(var i=0,len=arr.length; i<len; i++) {
		if(!hash[arr[i]]) {
			hash[arr[i]] = true;
			temp.push(arr[i]);
		}
	}
	return temp;
}

function trim(str,replace) {
	var reg = /^([\s\xA0\uFEFE\u3000]+)|([\s\xA0\uFEFE\u3000]+)$/g;
	replace = replace===undefined ? '' : replace;
	return str.replace(reg,replace);
}

//内部each，仅供内部遍历数组使用
function each(arr,fn) {
	if(isArray(arr)) {
		for(var i = 0,len = arr.length; i<len; i++) {
			fn(arr[i],i,arr);
		}
	}
}

function getObjectLength(obj) {
	var i = 0;
	for(item in obj) {
		if(obj.hasOwnProperty(item)) {
			i++;
		}
	}
	return i;
}

function isMobilePhone(num) {
	return /^()1[3578]\d{9}$/.test(num);
}

function isEmail(email) {
	var reg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+\w{1,5}$/;
	return reg.test(email);
}





function arrayLikeToArray(arr) {
	var _arr = [];
	try{	
		_arr = _arr.slice.call(arr);
	}catch(e) {//for lte ie8
		for(var i=0,len=arr.length; i<len; i++) {
			_arr.push(arr[i]);
		}
	}
	return _arr;
}



function isIE() {
	var info = window.navigator.userAgent;
	var res = /MSIE\s(\d+)\.\d+/.exec(info);
	return !res ? 0 : res[1];
}

function setCookie(cookieName,cookieValue,expires) {
	cookieName = encodeURIComponent(cookieName);
	cookieValue = encodeURIComponent(cookieValue);
	var time = new Date( ( (new Date()).getTime()+expires*1000 ) );
	time = time.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + ";" + "expires=" + time;
	return true;
}

function getCookie(cookieName) {
	var cookies = decodeURIComponent(document.cookie);
	var reg = new RegExp( cookieName + "=([^;]+);\s" );
	var res = reg.exec(cookies);
	return !res ? false : res[1];
}

function parseJSON(json) {
	return window.JSON ? JSON.parse(json) : eval( "(" + json + ")" );
}

function stringifyJSON(obj) {
	//TODO
}

He.cookie = function(cookieName,cookieValue,expires) {
	return cookieValue===undefined ? getCookie(cookieName) : setCookie(cookieName,cookieValue,expires);
}

He.isIE = isIE;

He.parseJSON = parseJSON;

He.stringifyJSON = stringifyJSON;

He.clone = cloneObject;

He.trim = trim;

He.isString = isString;

He.isArray = isArray;

He.each = each;