function setCookie(name,value,expires,path,domain,secure){
	var cookieName=encodeURIComponent(name)+'='+encodeURIComponent(value);
	if(typeof expires=='number'&&expires>0){
		var date=new Date();
		date.setDate(date.getDate()+expires);
		cookieName+=';expires='+date;
	}else {
		throw new Error('chuandidetianshubuhefa');
	}
	if(path){
		cookieName+=';phth='+path;
	}
	if(domain){
		cookieName+=';domain='+domain;
	}
	if(secure){
		cookieName+=';secure';
	}
	document.cookie=cookieName;
}

function getCookie(name){
	var cookieName=encodeURIComponent(name)+'=';
	var cookieStart=document.cookie.indexOf(cookieName)
	var cookieValue=null;
	if(cookieStart>-1){
		var cookieEnd=document.cookie.indexOf(';',cookieStart);
		if(cookieEnd==-1){
			cookieEnd=document.cookie.length;
		}
		cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
		return cookieValue;
	}else{
		return 'no found'
	}

}