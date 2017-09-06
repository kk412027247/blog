
function ajax(obj){ 
	let xhr=new XMLHttpRequest();
	obj.url=obj.url+'?rand='+Math.random()
	//obj.data=params(obj.date);
	obj.data=(function(data){
		let arr=[];
		for(let i in data){
			arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]))
		}
		return arr.join('&');	
	})(obj.date)
	if(obj.method=='get')obj.url+=obj.url.indexOf('?')==-1?'?'+obj.data:'&'+obj.data;
	if(obj.async==true){
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				callback()
			}
		}
	}
	// console.log(obj.url);
	xhr.open(obj.method,obj.url,obj.async);
	if(obj.method=='get')xhr.send(null);
	// console.log(obj.data)
	if(obj.method=='post'){
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}
	if(obj.async==false){
		callback()
	}
	function callback(){
		if(xhr.status==200){
			obj.success(xhr.responseText);
		}else{
			console.log(xhr.status+' '+xhr.statusText);
		}
	}
}




// function params(data){
// 	let arr=[];
// 	for(let i in data){
// 		arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]))
// 	}
// 	return arr.join('&');
// }




// document.addEventListener('click',function(){
// 	ajax({
// 		method:'get',
// 		url:'demo.php',
// 		date:{
// 			'na&me':'lee',
// 			'age':100
// 		},
// 		async:true,
// 		success:function(text){
// 			console.log(text)
// 		}
// 	});
// })


