function ajax(url,options) {

	function getXhrObj() {
		var xhr = false;
		try{
			xhr = new XMLHttpRequest();
		}catch(e) {
			try{
				xhr = new ActiveXObject("Msxml2.HTTP"); //for gte ie7
			}catch(e1) {
				try{
					xhr = new ActiveXObject("Microsoft.XMLHTTP"); //for lte ie6
				}catch(e2) {
					xhr = false;
				}
			}			
		}
		return xhr;
	}

	function encodeParms(obj) {
		var str = '';
		for( index in obj ) {
			if(obj.hasOwnProperty(index)) {
				str += (encodeURIComponent(index) + "=" + encodeURIComponent(obj[index]) + "&");
			}
		}

		return str.slice(0,-1);
	}

	function create(url,options) {
		var xhr = getXhrObj();
		if(!xhr)return false;
		options = mergeObject(options,{
			type: 'get',
			data: {},
			success: function() {},
			fail: function() {},
			async: true
		});
		var data = encodeParms(options.data);
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					options['success'](xhr.responseText);
				}else {
					options['fail'](xhr.responseText,xhr.status);
				}
			}
		};

		xhr.open(options['type'],url,options.async);
		//setRequestHeader 函数在open后调用,防止火狐的bug
		if(options['type']=='post' || options['type']=='POST')
		{
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		xhr.send(data);
	}

	create(url,options);
}

He.ajax = ajax;