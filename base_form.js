$().extend('serialize',function(){
	for(let i=0;i<this.elements.length;i++){
		let parts={};
		let form=this.elements[i]
		for(let i=0;i<form.elements.length;i++){
			let filed=form.elements[i];
			switch(filed.type){
				case undefined:
				case 'submit':
				case 'reset':
				case 'file':
				case 'button':
					break;
				case 'radio':
				case 'checkbox':
					if(!filed.checked) break;
				case 'select-one':
				case 'select-multiple':
					if(filed.value==0) break;
				default:
					parts[filed.name]=filed.value;
			};
		}
		return parts;
	}
	return this;
})