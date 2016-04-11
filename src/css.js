function hasClass(element,className) {
	if(element.nodeType !== 1 || !className)return false;
	var classList = trim(element.className).split(/\s+/);
	return classList.indexOf(className)=== -1	?	false : true;
}

function addClass(element,newClassName) {
	var classList = trim(element.className).split(/\s+/);
	var newClassList = trim(newClassName).split(/\s+/);
	each(newClassList,function(item) {
		if(!hasClass(element,item)) {
			classList.push(item);
		}
	});
	element.className = classList.join(" ");
}

function removeClass(element,oldClassName) {
	var classList = trim(element.className).split(/\s+/);
	var oldClassList = trim(oldClassName).split(/\s+/);
	each(oldClassList,function(item) {
		var index = classList.indexOf(item);
		if(index !== -1) {
			classList.splice(index,1);
		}
	});
	element.className = classList.join(" ");
}