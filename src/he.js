//核心函数
function He(selector,context) {
	return new He.prototype.init(selector,context);
}

He.prototype = {
	constructor: He,
	init: function(selector,context) {
		this[0] = null;
		//
		//selector有以下几种情况
		// 	1: 	dom单个节点	Element or He对象本身
		// 	2: 	dom多个节点 nodeLIst
		// 	3: 	function
		// 	4:  css选择器 string

		//1 
		if(isELement(selector) || isArray(selector) ) {
			this[0] = selector;
			return this;
		}
		//2
		if(isArrayLike(selector)) {
			this[0] = arrayLikeToArray(selector);
			return this;
		}

		//3
		if(isFunction(selector)) {
			//todo 未完成,兼容性问题没解决
			return document.ready = selector;
		}

		//4
		context = context===undefined 	?	document	:	context;

		selector = trim(selector);

		if(!selector || !context)return false;

		if(isFunction(context.querySelectorAll)) {
			var nodeList = context.querySelectorAll(selector);
			this[0] = arrayLikeToArray(nodeList);
			return this;
		}

		var idReg = /^#([\w-]+)$/;
		var classReg = /^\.([\w-]+)$/;
		var tagReg = /^([A-Za-z]+)$/;
		var attrReg = /^([A-Za-z]+)?\[([\w-]+)=['"]?([\w-]+)?['"]?\]$/;

		//路由,判断要找什么
		function router(part,actions,element) {
			//actions为回调函数集合,默认赋值空函数避免报错
			actions = actions || {
				id: function() {},
				className: function() {},
				tag: function() {},
				attr: function() {}
			};

			var result = [],//正则匹配的结果数组
				callback = '',//要调用的回调函数
				parms = [];//传入回调函数中的参数

			if(element) {
				parms.push(element);
			}
			//id e.g #hello
			if(result = idReg.exec(part)) {
				callback = 'id';
				parms.push(result[1]);
			}
			//class e.g .hello
			else if(result = classReg.exec(part)) {
				callback = 'className';
				parms.push(result[1]);
			}
			//tag e.g a or br or span
			else if(result = tagReg.exec(part)) {
				callback = 'tag';
				parms.push(result[1]);
			//attribute e.g input[type='text'] or [data-id=3] or span[id] or img[ 'title' = 'hello' ]
			}else if(result = attrReg.exec(part)) {
				callback = 'attr';
				parms.push(result[1],result[2],result[3]);
			}

			return actions[callback].apply(null,parms);
		}
		
		//查找单个part e.g #hello
		function find(parts,context) {
			//从后往前过滤元素,同时把已经找过的part弹出
			var part = parts.pop();
			//设置回调函数
			var actions = {
				id: function(id) {
					return [
						context.getElementById(id)
					];
				},

				className: function(className) {
					var elementList = [];
					if(isFunction(context.getElementsByClassName)) {
						elementList = context.getElementsByClassName(className);
					}
					//for lte ie8
					else {
						var allElementList = context.getElementsByTagName("*");
						for(var i = 0,len = allElementList.length; i<len; i++) {
							if(hasClass(allElementList[i],className)) {
								elementList.push(allElementList[i]);
							}
						}
					}
					return elementList;
				},

				tag: function(tagName) {
					return context.getElementsByTagName(tagName);
				},

				attr: function(tag,name,value) {
					var elementList = getElementsByAttr(name,value,context);
					// e.g [data-id]
					if(!tag) {
						return elementList;
					}
					//e.g input[data-id=3] or p[title]
					var newEleList = [];
					for(var i = 0, len = elementList.length; i<len; i++) {
						if(tag === elementList[i].nodeName.toLowerCase()) {
							newEleList.push(elementList[i]);
						}
					}
					return newEleList; 
				}
			}//actions结束

			var result = router(part,actions);
			// 类数组转换为数组
			result = arrayLikeToArray(result);
			//如果已经找到,并且parts并没有结束(还没有过滤完成),那就继续过滤,否则,返回结果
			return result[0] && parts[0]	?	filterByParent(parts,result)	: 	result;

		}

		//通过父元素过滤可能,缩小范围
		function filterByParent(parts,result) {
			var part = parts.pop();
			var filterAfterResult = [];
			
			var actions = {
				id: function(parentElement,id) {
					return parentElement.id === id;
				},
				className: function(parentElement,className) {
					return hasClass(parentElement,className);
				},
				tag: function(parentElement,tagName) {
					return parentElement.nodeName.toLowerCase() === tagName;
				},
				attr: function(parentElement,tag,name,value) {
					var flag = true;
					//检查是否设置tag
					if(tag) {
						flag = actions.tag(parentElement,tag);
					}
					flag = flag && parentElement.hasAttribute(name);
					if(value) {
						flag = flag && (parentElement.getAttribute(name) === value);
					}

					return flag;

				}
			};//actions结束

			for(var i = 0,len = result.length; i<len; i++) {
				var node = result[i];
				var pnode = node;

				while(pnode = pnode.parentNode) {
					var valid = router(part,actions,pnode);
					if(valid) {
						break;
					}
				}

				if(valid) {
					filterAfterResult.push(node);
				}
			}

			return filterAfterResult[0] && parts[0]	 ?	 filterByParent(parts,filterAfterResult)	: 	filterAfterResult;
		}

		this[0] = find(selector.split(/\s+/),context);
		return this;
	}//init
};//He.prototype

//链式调用
He.prototype.init.prototype = He.prototype;

window.$ = He;//todo 未完成 此处应该可以自定义配置