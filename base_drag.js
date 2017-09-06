$().extend('drag',function(){
	var tags=arguments;
	for(let i=0;i<this.elements.length;i++){
		this.elements[i].addEventListener('mousedown',function(evt){
			let _this=this;
			let diffX=evt.clientX-_this.offsetLeft;
			let diffY=evt.clientY-_this.offsetTop;
			let leftX=scrollLeft()+document.documentElement.clientWidth-_this.offsetWidth;
			let topY=scrollTop()+document.documentElement.clientHeight-_this.offsetHeight;
			let evtMove=function(evt){
				let xLeft=evt.clientX-diffX;
				let yTop=evt.clientY-diffY;
				if(xLeft>0&&xLeft<leftX&&_this.offsetLeft-scrollLeft()>0){
					_this.style.left=xLeft+'px';
					if(_this.offsetLeft-scrollLeft()<=0)_this.style.left=scrollLeft()+1+'px';
				}
				if(yTop>0&&yTop<topY&&_this.offsetTop-scrollTop()>0){
					_this.style.top=yTop+'px';
					if(_this.offsetTop-scrollTop()<=0)_this.style.top=scrollTop()+1+'px';
				}
			}
			let evtUp=function(){
					document.removeEventListener('mousemove',evtMove);
					document.removeEventListener('mouseup',evtUp);
			}
			let falg=false;
			for(let i=0;i<tags.length;i++){
				if(evt.target==tags[i]){
					falg=true;
					break;
				}
			}
			if(falg){

				document.addEventListener('mousemove',evtMove);
				document.addEventListener('mouseup',evtUp);
			}
		})
	}
	return this;	
})