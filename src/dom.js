function html(element,html) {
	return element.innerHTML = html;
}

function isSiblingNode(element,siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}

//获取相对于浏览器窗口的位置
function getPosition(element) {
	if(isFunction(element.getBoundingClientRect)) {
		var res = element.getBoundingClientRect();
		return {x: res.left,y: res.top};
	}
	var x = element.offsetLeft-element.scrollLeft,
		y = element.offsetTop-element.scrollTop;

	while(element = element.offsetParent) {
		x += element.offsetLeft;
		y += element.offsetTop;
	}
	return {x:x,y:y};
}

//获取相对于文档左上角的位置
function getOffset(element) {
	if(isFunction(element.getBoundingClientRect)) {
		var res = element.getBoundingClientRect();
		return {x: res.left+element.scrollLeft, y: res.top+element.scrollTop};
	}

	var x = element.offsetLeft,
		y = element.offsetTop;

	while(element = element.offsetParent) {
		x += element.offsetLeft;
		y += element.offsetTop;
	}
	return {x:x,y:y};
}


function attr(element,attrName,attrValue) {
	if(!isELement(element))return false;
	if(!attrValue) {
		return element.getAttribute(attrName);
	}
	else {
		return element.setAttribute(attrName,attrValue);
	}
	
}

function walkDOM(rootNode,fn) {
	fn(rootNode);
	for(var i = 0,len = rootNode.childNodes.length; i<len; i++) {
		walkDOM(rootNode.childNodes[i],fn);
	}
}

function getElementsByAttr(attrName,attrValue,rootNode) {
	rootNode = rootNode===undefined 	?	document 	: 	rootNode;
	var result = [];

	walkDOM(rootNode,function(node) {
		var actual = node.nodeType ===1 && node.getAttribute(attrName);
		if(typeof actual === 'string' && (actual === attrValue || attrValue === undefined)) {
			result.push(node);
		}
	});
	return result;
}

He.prototype.html = function(html) {
	if(html === undefined)return this[0][0].innerHTML;
	var element = this[0];

	each(element,function(item) {
		item.innerHTML = html;
	});
	return this;
}

He.prototype.offset = function(newOffset) {
	if(newOffset === undefined)return getOffset(this[0][0]);
	//TODO setOffset
}