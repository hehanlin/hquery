//事件
function addEvent(element,event,listener,useCapture) {
	if(!isELement(element) || !isFunction(listener))return false;
	useCapture = useCapture===undefined 	?	false 	: 	true;
	event = trim(event);
	if(element.addEventListener) {
		return element.addEventListener(event,listener,useCapture);
	}
	// lt ie9
	else if(element.attachEvent) {
		event = 'on' + event;
		return element.attachEvent(event,listener);
	}
	//lt ie8
	else {
		event = 'on' + event;
		return element[event] = listener;
	}
}

function removeEvent(element,event,listener,useCapture) {
	if(!isELement(element) ||　!isFunction(listener))return false;
	useCapture = useCapture===undefined 	?	false 	: 	true;
	event = trim(event);
	if(element.removeEventListener) {
		return element.removeEventListener(event,listener,useCapture);
	}
	//lt ie9
	else if(element.detachEvent) {
		event = 'on' + event;
		return element.detachEvent(event,listener);
	}
	//lt ie8
	else {
		event = 'on' + event;
		if(listener === element[event] || listener === undefined) {
			return element[event] = null;
		}
	}
}

function addClickEvent(element,listener,useCapture) {
	return addEvent(element,'click',listener,useCapture);
}

function addKeyEvent(element,keyType,listener,useCapture) {
	keyType = trim(keyType);
	return (keyType === 'keydown' || keyType === 'keyup' || keyType === 'keypress') && addEvent(element,keyType,listener,useCapture);
}


//该函数未完成,做不到事件移除
function addEnterEvent(element,listener,useCapture) {
	var trueListener = function(e) {
		e = e||window.event;//for lte ie8
		var _keyCode = e.keyCode	?	e.keyCode 	: 	e.which;//for lte ie8
		if(_keyCode === 13) {
			listener(e);
		}
	}

	return addKeyEvent(element,'keydown',trueListener,useCapture);
	//此处选用keydown
	//原因: lte ie8不支持 keypress  lte ie6不支持keyup 
}

//事件委托 //依旧无法移除事件
function delegateEvent(element,tag,eventName,listener,useCapture) {
	tag = trim(tag);
	var trueListener = function(e) {
		e= e||window.event;
		var target = e.target || e.srcElement;//for lte ie8
		if(target.nodeName.toLowerCase() === tag) {
			listener(e);
		}
	}

	return addEvent(element,eventName,listener,useCapture);
}

//事件 挂载方法
He.on = function(selector,event,listener,useCapture) {
	selector = He(selector);
	if(!isArray(selector[0]))return false;

	each(selector[0],function(item) {
		addEvent(item,event,listener,useCapture);
	});
	return true;
}

He.un = function(selector,event,listener,useCapture) {
	selector = He(selector);
	if(!isArray(selector[0]))return false;

	each(selector[0],function(item) {
		removeEvent(item,event,listener,useCapture);
	});
	return true;
}

He.click = function(selector,listener,useCapture) {
	selector = He(selector);
	if(!isArray(selector[0]))return false;

	each(selector[0],function(item) {
		addClickEvent(item,listener,useCapture);
	});
	return true;
}

He.enter = function(selector,listener,useCapture) {
	selector = He(selector);
	if(!isArray(selector[0]))return false;

	each(selector[0],function(item) {
		addEnterEvent(item,listener,useCapture);
	});
	return true;
}

He.delegate = function(selector,tag,event,listener,useCapture) {
	selector = He(selector);
	if(!isArray(selector[0]))return false;

	each(selector[0],function(item) {
		delegateEvent(item,tag,event,listener,useCapture);
	});
}

He.prototype.on = function(event,listener,useCapture) {
	var selector = this[0];
	He.on(selector,event,listener,useCapture);
	return this;
}

He.prototype.un = function(event,listener,useCapture) {
	var selector = this[0];
	He.un(selector,event,listener,useCapture);
	return this;
}

He.prototype.click = function(listener,useCapture) {
	var selector = this[0];
	He.click(selector,listener,useCapture);
	return this;
}

He.prototype.enter = function(listener,useCapture) {
	var selector = this[0];
	He.enter(selector,listener,useCapture);
	return this;
}

He.prototype.delegate = function(tag,event,listener,useCapture) {
	var selector = this[0];
	He.delegate(selector,tag,listener,useCapture);
	return this;
}