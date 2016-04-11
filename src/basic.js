if(!isFunction(Array.prototype.indexOf)) {
	Array.prototype.indexOf = function(item) {
		for(var i = 0,len = this.length; i<len; i++) {
			return this[i] === item	?	i 	: -1;	
		}
	}
}