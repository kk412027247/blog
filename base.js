
function Base(args){
	this.elements=[];
	if(typeof args=='string'){
		if(!args.includes(' ')){
			switch(args.charAt(0)){
				case'#':
					this.getId(args.substring(1));
					//console.log(this.elements[0])
					break;
				case'.':
					this.getClass(args.substring(1));
					break;
				default:
					this.getTagName(args);
					break;
			}	
		}
		else{
			let elements=args.split(' ')
			let childElements=[];
			let node=[];
				for(let i=0;i<elements.length;i++){
					switch(elements[i].charAt(0)){
						case'#':
							childElements=[];
							childElements.push(document.getElementById(elements[i].substring(1)));
							node=childElements;
							break;
						case'.':
							childElements=[];
							if(node.length==0)node.push(document);
							for(j=0;j<node.length;j++){
								let temps=node[j].getElementsByClassName(elements[i].substring(1))
								for(let k=0;k<temps.length;k++){
									childElements.push(temps[k]);
								}
							}
							node=childElements;
							break;
						default:
							childElements=[];
							if(node.length==0)node.push(document);
							for(j=0;j<node.length;j++){
								let temps=node[j].getElementsByTagName(elements[i])
								for(let k=0;k<temps.length;k++){
									childElements.push(temps[k]);
								}
							}
							node=childElements;
							break;
						}	
				}
				this.elements=childElements;
		}
	}else if(typeof args=='object'){
		if(args!=undefined){
			this.elements[0]=args;
		}
	}else if(typeof args=='function'){
		this.ready(args)

	}
}

let $=function(args){
	return new Base(args)
}

Base.prototype.constructor=Base;


Base.prototype.ready=function(args){
	if(typeof args=='function'){
		document.addEventListener('DOMContentLoaded',function(){
			args();
			document.removeEventListener('DOMContentLoaded',arguments.callee);
		})
	}else{
		console.log('not a function')
	}
}

Base.prototype.getId=function(id){
	this.elements.push(document.getElementById(id));
	return this;
}
Base.prototype.getName=function(Name){
	let tags=document.getElementsByName(Name)
	for(let i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
}
Base.prototype.getTagName=function(tagName){
	let tags=document.getElementsByTagName(tagName)
	for(let i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
}

Base.prototype.getClass=function(ClassName,idName){
	let node=null;
	if(arguments.length===2){
		node=document.getElementById(idName);
	}else{
		node=document;
	}
	let tags=node.getElementsByClassName(ClassName)
	for(let i=0;i<tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
}

Base.prototype.find=function(str){
	let childElements=[];
	for(let i=0;i<this.elements.length;i++){
		switch(str.charAt(0)){
			case'#':
				let tags1=document.getElementById(str.substring(1));
				childElements.push(tags1);
				break;
			case'.':
				let tags2=this.elements[i].getElementsByClassName(str.substring(1));
				for(let i=0;i<tags2.length;i++){
					childElements.push(tags2[i]);
				}				
				break;
			default:
				let tags3=this.elements[i].getElementsByTagName(str);
				for(let i=0;i<tags3.length;i++){
					childElements.push(tags3[i]);
				}
				break;
		}		 
	}
	this.elements=childElements;
	return this;
}



Base.prototype.getElement=function(num){
	return this.elements[num];
}


Base.prototype.ge=function(num){
	if (arguments.length==0){
		return this.elements[0];
	};
	return this.elements[num];
}

Base.prototype.first=function(){
	return this.elements[0];
}

Base.prototype.last=function(){
	return this.elements[this.elements.length-1];
}

Base.prototype.length=function(){
	return this.elements.length;
}

Base.prototype.attr=function(Attr,Value){
	for(let i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			return this.elements[i].getAttribute(Attr);
		}else{
			this.elements[i].setAttribute(Attr,Value);
		}
	}
	return this;
}


Base.prototype.index=function(){
	let Children=this.elements[0].parentNode.children;
	for(let i=0;i<=Children.length;i++){
		if(this.elements[0]===Children[i])return i;
	}
}


Base.prototype.opacity=function(num){
	for(let i=0;i<this.elements.length;i++){
		this.elements[i].style['opacity']=num/100;
	}
	return this;	
}



Base.prototype.eq=function(num){
	let element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}

Base.prototype.next=function(){
	for(let i=0;i<this.elements.length;i++){
 		this.elements[i]=this.elements[i].nextSibling;
 		if(this.elements[i]==null)throw new Error('zhao bu dao tong ji bie de xia yi ge jie dian')
 		if(this.elements[i].nodeType==3)this.next();
	}
	return this;	
}

Base.prototype.prev=function(){
	for(let i=0;i<this.elements.length;i++){
 		this.elements[i]=this.elements[i].previousSibling;
 		if(this.elements[i]==null)throw new Error('zhao bu dao tong ji bie de shang yi ge jie dian')
 		if(this.elements[i].nodeType==3)this.prev();
	}
	return this;	
}



Base.prototype.css=function(attr,vale){
	for(let i=0;i<this.elements.length;i++){
		if(arguments.length===1){
			return window.getComputedStyle(this.elements[i],null)[attr];
		}
		this.elements[i].style[attr]=vale;		
	}
	return this;
}

Base.prototype.addClass=function(classname){
	for(let i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))){
			this.elements[i].className+=' '+classname;
		}
	}
	return this;
}


Base.prototype.removeClass=function(classname){
	for(let i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))){
			this.elements[i].className=this.elements[i].className.replace(RegExp('(\\s|^)'+classname+'(\\s|$)'),' ')
		}
	}
	return this;
}

Base.prototype.addRule=function(num,selectorText,cssText,positon){
	let sheet=document.styleSheets[num];
	sheet.insertRule(selectorText+'{'+cssText+'}',positon);
	return this;
}


Base.prototype.removeRule=function(num,index){
	let sheet=document.styleSheets[num];
	sheet.deleteRule(index);
	return this;
}

function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}



Base.prototype.form=function(name){
	for(let i=0;i<this.elements.length;i++){
	 	this.elements[i]=this.elements[i][name]
		}
	return this;	
}




Base.prototype.value=function(str){
	for(let i=0;i<this.elements.length;i++){
		if(arguments.length===0){
			return this.elements[i].value;
		}
		this.elements[i].value=str;		
	}
	return this;
};


Base.prototype.html=function(str){
	for(let i=0;i<this.elements.length;i++){
		if(arguments.length===0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;		
	}
	return this;
};

Base.prototype.text=function(str){
	for(let i=0;i<this.elements.length;i++){
		if(arguments.length===0){
			return this.elements[i].innerText;
		}
		this.elements[i].innerText=str;		
	}
	return this;
};




Base.prototype.bind=function(event,fn){
	for(let i=0;i<this.elements.length;i++){
 		this.elements[i].addEventListener(event,fn)
	}
	return this;
}


Base.prototype.hover=function(over,out){
	for(let i=0;i<this.elements.length;i++){
		this.elements[i].addEventListener('mouseover',over);
		this.elements[i].addEventListener('mouseout',out);
	}
	return this;
};


Base.prototype.toggle=function(){
	for(let i=0;i<this.elements.length;i++){
		let count=0;
		let _arguments=arguments;
		this.elements[i].addEventListener('click',function(){
			_arguments[count++%_arguments.length].call(this);
		})
	}
	return this;
};



Base.prototype.show=function(){
	for(let i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	return this;
}

Base.prototype.resize=function(){
	for(let i=0;i<this.elements.length;i++){
		let element=this.elements[i];
		window.addEventListener('resize',function(){
			
			if(element.offsetLeft>document.documentElement.clientWidth-element.offsetWidth){
				element.style.left=document.documentElement.clientWidth-element.offsetWidth+'px';
			}
			if(element.offsetTop>scrollTop()+document.documentElement.clientHeight-element.offsetHeight&&innerHeight-element.offsetHeight>0){
				element.style.top=scrollTop()+document.documentElement.clientHeight-element.offsetHeight+'px';
			}
			if(element.offsetLeft-scrollLeft()<=0)element.style.left=scrollLeft()+1+'px';
			if(element.offsetTop-scrollTop()<=0)element.style.top=scrollTop()+1+'px';
		})
	}

	return this;
}

Base.prototype.hide=function(){
	for(let i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;
}

Base.prototype.center=function(widht,height){
	let topY=document.documentElement.clientHeight/2-this.elements[0].offsetHeight/2;
	let leftX=document.documentElement.clientWidth/2-this.elements[0].offsetWidth/2;
	for(let i=0;i<this.elements.length;i++){
		this.elements[i].style.top=scrollTop()+topY+'px';
		this.elements[i].style.left=scrollLeft()+leftX+'px';
	}
	return this;
}

Base.prototype.click=function(fn){
	for(let i=0;i<this.elements.length;i++){
		let element=this.elements[i];
		this.elements[i].addEventListener('click',fn);
	}
	return this;
}


Base.prototype.mousedown=function(fn){
	for(let i=0;i<this.elements.length;i++){
		this.elements[i].addEventListener('mousedown',fn);
	}
	return this;
}

Base.prototype.lock=function(){
	document.getElementById('screen').style.display='block';
	document.getElementById('screen').style.height=document.body.scrollHeight+'px';
	document.documentElement.style.overflow='hidden';
	document.getElementById('screen').addEventListener('mousedown',function(evt){
		evt.preventDefault();
	})
	return this;
}

Base.prototype.unlock=function(){
	document.getElementById('screen').style.display='none';
	document.documentElement.style.overflow='auto';	
	return this;
}



Base.prototype.animate=function(obj){
	for(let i=0;i<this.elements.length;i++){
		let element=this.elements[i];
		let attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':obj['attr']=='w'?'width':obj['attr']=='h'?'height':obj['attr']=='o'?'opacity':obj['attr']!=undefined?obj['attr']:'left';
		let star=obj['star']!=undefined?obj['star']:obj['attr']=='o'?getStyle()*100:getStyle();
		let t=obj['t']!=undefined?obj['t']:15;
		let step=obj['step']!=undefined?obj['step']:20;
		let alter=obj['alter'];
		let target=obj['target'];
		let mul=obj['mul']
		let speed=obj['speed']!=undefined?obj['speed']:6;
		let type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';

		function getStyle(){
			return window.getComputedStyle(element)[attr]
		}
		function setTarget(){
			element.style[attr]=target+'px'

		}
		function setOpactiy(){
			element.style['opacity']=parseInt(target)/100;

		}	
		if(alter!=undefined||target!=undefined){
			target=target||alter+parseInt(star)||0;
		}else if(alter==undefined&&target==undefined&&mul==undefined){
			throw new Error('zengliang mubiaolaing bixuyouyige')
		}
		//console.log(mul)
		if(parseInt(star)>target)step=-step;

		if(attr=='opacity'){
			element.style[attr]=parseInt(star)/100;
		}else {
			element.style[attr]=star;
		}
		clearInterval(element.timer);
		element.timer =setInterval(function(){
			let flag=true;	
			if(!mul){
				mul={};
				mul[attr]=target;	
			}
			for (let i in mul){
			attr=i=='x'?'left':i=='y'?'top':i=='w'?'width':i=='h'?'height':i=='o'?'opacity':i!=undefined?i:'left';
			target=mul[i]			
				if((attr=='width'||attr=='height')&&target<0){
					clearInterval(element.timer);			
					throw new Error('gaodu chagndu mubaiozhicuowu');
				}else if(attr=='opacity'&target>100){
					clearInterval(element.timer);			
					throw new Error('toumingdu zuidazhi chucuo');
				}else{
					if(type=='buffer'){
						step=attr=='opacity'?(target-parseFloat(getStyle())*100)/speed:(target-parseInt(getStyle()))/speed;
						step=step>0?Math.ceil(step):Math.floor(step);
					}
					if(attr=='opacity'){				
						if(step==0){
							setOpactiy()
						}else if(step>0&&Math.abs(parseFloat(getStyle())*100-target)<=step){
							setOpactiy()	
						}else if(step<0&&Math.abs(parseFloat(getStyle())*100-target)<=Math.abs(step)){
							setOpactiy()					
						}else{
							let temp=parseFloat(getStyle())*100;
							element.style[attr]=parseFloat(temp+step)/100;
						}
						if(parseInt(target)!=parseInt(parseFloat(getStyle())*100))flag=false;
					}else{
						if(step==0){
							setTarget()
						}else if(step>0&&Math.abs(parseInt(getStyle())-target)<=step){
							setTarget()	
						}else if(step<0&&Math.abs(parseInt(getStyle())-target)<=Math.abs(step)){
							setTarget()					
						}else{
							element.style[attr]=parseInt(getStyle())+step+'px';
						}	
						if(parseInt(target)!=parseInt(getStyle()))flag=false;	
					}	
				}
				//console.log(i+'_'+target+'_'+getStyle()+'_'+flag)
			}
			if(flag){
				clearInterval(element.timer);
				if(obj.fn)obj.fn();		
			}
		},t)
	}
	return this;
}

Base.prototype.extend=function(name,fn){
	Base.prototype[name]=fn;

}


function vison(){
	window.sys={}
	let s=[];
	let ua=navigator.userAgent.toLowerCase();	
	(s=ua.match(/firefox\/([\d.]+)/))?sys.firefox='firefox'+s[1]:
	(s=ua.match(/trident\/([\d.]+)/))?sys.ie='IE'+s[1]:
	(s=ua.match(/chrome\/([\d.]+\S)/))?sys.chrome='Chrome'+s[1]:0;
	console.log(sys.ie||sys.firefox||sys.chrome);

}

function inArray(array,value){
	for (let i in array){
		if (array[i]===value) return true;
	}
	return false;
}

let scrollTop=function(){
	return document.body.scrollTop||document.documentElement.scrollTop;
}

let scrollLeft=function(){
	return document.body.scrollLeft||document.documentElement.scrollLeft;
}

let prevIndex=function(current,_parent){
	var _length=parseInt(_parent.children.length);
	if(current==0) return _length-1;
	return parseInt(current)-1;
}

let nextIndex=function(current,_parent){
	var _length=parseInt(_parent.children.length);
	if(current==_length-1) return 0;
	return parseInt(current)+1;
}



function setCookie(name,value,expires,path,domain,secure){
	var cookieName=encodeURIComponent(name)+'='+encodeURIComponent(value);
	
	if(expires!=undefined){
		if(typeof expires=='number'&&expires>0){
			var date=new Date();
			date.setDate(date.getDate()+expires);
			cookieName+=';expires='+date;
		}else {
			throw new Error('chuandidetianshubuhefa');
		}
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