$(vison())

$(function(){	
	$('#header .member').hover(function(){
		$(this).css('background','url(images/arrow2.png) no-repeat center right')
		$('.member_ul').show().animate({
			mul:{
				o:100,
				h:120
			}
		});
	},function(){
		$(this).css('background','url(images/arrow.png) no-repeat center right')
		$('.member_ul').animate({
			mul:{
				o:0,
				h:0
			},
			fn:function(){
				$('.member_ul').hide()
				}
		});
	})
	$('#login').center().resize().drag($('#login h2').last());
	$('#reg').center().resize().drag($('#reg h2').last());
	$('#blog').center().resize().drag($('#blog h2').last());
	$('#skin').center().resize().drag($('#skin h2').last());

	$('#header .login').click(function(){
		$('#login').show().center()
		$('#screen').lock().animate({
			attr:'o',
			target:30,
			t:30
		})
	})
	$('#login .close').mousedown(function(){
		$('#login').hide()
		$('#screen').animate({
			attr:'o',
			target:0,
			t:30,
			fn:function(){
				$('#screen').unlock()
			}
		})
	})

	$('#header .reg').click(function(){
		$('#reg').show().center()
		$('#screen').lock().animate({
			attr:'o',
			target:30,
			t:30
		})
	})
	$('#reg .close').mousedown(function(){
		$('#reg').hide()
		$('#screen').animate({
			attr:'o',
			target:0,
			t:30,
			fn:function(){
				$('#screen').unlock()
			}
		})
	})

	$('#header .blog').click(function(){
		$('#blog').show().center()
		$('#screen').lock().animate({
			attr:'o',
			target:30,
			t:30
		})
	})
	$('#blog .close').mousedown(function(){
		$('#blog').hide()
		$('#screen').animate({
			attr:'o',
			target:0,
			t:30,
			fn:function(){
				$('#screen').unlock()
			}
		})
	})


	ajax({
		method:'post',
		url:'get_skin.php',
		date:{
			'type':'main'
		},
		async:true,
		success:function(text){

			let json=JSON.parse(text)
			let _url='images/'+json.big_bg;
			let _color=json.bg_color;
			$('body').css('background', `${_color} url(${_url}) repeat-x`);
		}
	})








	$('#header .skin').click(function(){
		$('#skin').show().center()
		$('#screen').lock().animate({
			attr:'o',
			target:30,
			t:30
		})

		ajax({
			method:'post',
			url:'get_skin.php',
			date:{
				'type':'all'
			},
			async:true,
			success:function(text){
				let json=JSON.parse(text);
				let _html='';
				for(let i=0;i<json.length;i++){
					_html+=`<dl><dt><img src="images/${json[i].small_bg}" bg_color="${json[i].bg_color}" big_bg="images/${json[i].big_bg}"></dt><dd>${json[i].bg_text}</dd></dl>`
				}
				$('.skin_bg').html(_html).animate({
					attr:'o',
					star:0,
					target:100
				});
				$('#skin dl dt img').click(function(){
					let _this=this;
					let _url=$(_this).attr('big_bg');
					let _color=$(_this).attr('bg_color');
					$('body').css('background', `${_color} url(${_url}) repeat-x`);
					ajax({
						method:'post',
						url:'get_skin.php',
						date:{
							'type':'set',
							'big_bg':$(_this).attr('big_bg').substring(7)
						},
						async:true,
						success:function(text){
							$('#success').show().center();
							$('#success p').html('皮肤更换成功');
							setTimeout(function(){
								$('#success').hide()
							},1500)	




						}
					})
				});
			}
		})


		
	})


	$('#skin .close').mousedown(function(){
		$('#skin').hide()
		$('#screen').animate({
			attr:'o',
			target:0,
			t:30,
			fn:function(){
				$('#screen').unlock()
			}
		})
	})



	$('form').eq(2).form('sub').click(function(){
		if(trim($('form').eq(2).form('title').value())==0||trim($('form').eq(2).form('content').value())==0){
			$('#blog .info').html('发表失败：标题或内容不得为空')
		}else{
			$('#blog .info').html('&nbsp;');
			$('#loading').show().center();
			$('#loading p').html('正在发表博文')
			let _this=this;
			$(_this).css('backgroundPosition','right')
			_this.disabled=true;
			ajax({
				method:'post',
				url:'add_blog.php',
				date:$('form').eq(2).serialize(),
				async:true,
				success:function(text){
					if(text==1){
						$('#loading').hide();
						$('#success').show().center();
						$('#success p').html('博文发表成功');
						setTimeout(function(){
							$('#success').hide();
							$('#blog').hide();
							$('form').eq(2).first().reset();
							_this.disabled=false;
							$(_this).css('backgroundPosition','left')
							$('#screen').animate({
								attr:'o',
								target:0,
								t:30,
								fn:function(){
									$('#screen').unlock()
									$('#index').html("<span class='loading'></span>")
									ajax({
										method:'post',
										url:'get_blog.php',
										date:{},
										async:true,
										success:function(text){
											let json=JSON.parse(text);
											let _html='';
											for(let i=0;i<json.length;i++){
												_html+=`<div class="content"><h2><em>${json[i].date}</em>${json[i].title}</h2><p>${json[i].content}</p>`
											}
											$('#index').html(_html).animate({
												attr:'o',
												star:0,
												target:100
											})
										}
									})
								}
							});
						},1000)
					}else{
						console.log(text)
						throw new Error('博文发博过程出错了，请检查ajax')
					}
				}
			})
		}
	})


$('#index').html("<span class='loading'></span>")
ajax({
	method:'post',
	url:'get_blog.php',
	date:{},
	async:true,
	success:function(text){
		let json=JSON.parse(text);
		let _html='';
		for(let i=0;i<json.length;i++){
			_html+=`<div class="content"><h2><em>${json[i].date}</em>${json[i].title}</h2><p>${json[i].content}</p>`
		}
		$('#index').html(_html).animate({
			attr:'o',
			star:0,
			target:100
		})
	}
})
















	$('#share').css('top',(innerHeight-$('#share').first().offsetHeight)/2+'px')

	$(window).bind('scroll',function(){
		$('#share').animate({
			attr:'y',
			target:scrollTop()+(innerHeight-$('#share').first().offsetHeight)/2
		});		
	})

	$('#share').hover(function(){
		$(this).animate({
			attr:'x',
			target:0,
			t:30
		})		
		},function(){
			$(this).animate({
				attr:'x',
				target:-212
			})
		}		
	)

	$('#nav .about li').hover(function(){
		let target=$(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			attr:'x',
			target:target+20,
			fn:function(){
				$('#nav .white').animate({
					attr:'x',
					target:-target
				})
			}
		});
		},function(){
			$('#nav .nav_bg').animate({
				attr:'x',
				target:20,
				fn:function(){
					$('#nav .white').animate({
						attr:'x',
						target:0
					})
				}	
			});
		})


	 $('#siderbar h2').toggle(function(){
	 	$(this).next().animate({
	 		mul:{
	 			h:0,
	 			o:0
	 		}
	 	})
	 },function(){
	 	$(this).next().animate({
	 		mul:{
	 			h:150,
	 			o:100
	 		}
	 	})
	 })

	$('form').eq(0).first().reset()

	$('form').eq(0).form('user').bind('focus',function(){
		$('#reg .info_user').show();
		$('#reg .error_user').hide()
		$('#reg .succ_user').hide()
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').css('display','none')		
			$('#reg .error_user').hide()
			$('#reg .succ_user').hide()
		}else if(!check_user()){
			$('#reg .error_user').show();
			$('#reg .info_user').hide()
			$('#reg .succ_user').hide()		
		}else{
			$('#reg .succ_user').show();
			$('#reg .error_user').hide()
			$('#reg .info_user').hide()
		}
	});

	function check_user(){
		let flag=true;
		if(!/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value()))){
			$('#reg .error_user').html('输入不合法，请从新如输入!')
			return false;
		}else{
			$('#reg .loading').show()
			$('#reg .succ_user').hide()
			$('#reg .error_user').hide()
			$('#reg .info_user').hide()			
			ajax({
				method:'post',
				url:'is_user.php',
				date:$('form').eq(0).serialize(),
				async:false,
				success:function(text){
					$('#reg .loading').css('display','none')
					if(text==1){
						$('#reg .error_user').html('用户名被占用！')
						flag=false;
					}else{
						$('#reg .succ_user').show();
						flag=true;
					}
				}
			});
		}
		return flag;
	}

	$('form').eq(0).form('pass').bind('focus',function(){
		$('#reg .info_pass').show();
		$('#reg .error_pass').hide()
		$('#reg .succ_pass').hide()
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_pass').hide()
		}else if(check_pass.call(this)){
			$('#reg .info_pass').hide()
			$('#reg .error_pass').hide()
			$('#reg .succ_pass').show();
		}else{
			$('#reg .info_pass').hide()
			$('#reg .error_pass').show();
			$('#reg .succ_pass').hide()
		}
	})



	$('form').eq(0).form('pass').bind('keyup',function(){
		check_pass.call(this)
	})

	function check_pass(){
		let value=trim($(this).value());
		let value_length=value.length;
		let code_length=0;
		let flag=false;
		if(value_length>=6&&value_length<=20){
			$('#reg .info_pass .q1').html('●').css('color','green')
		}else{
			$('#reg .info_pass .q1').html('○').css('color','#666')
		}
		if(value_length>0&&!/\s/.test(value)){
			$('#reg .info_pass .q2').html('●').css('color','green')			
		}else{
			$('#reg .info_pass .q2').html('○').css('color','#666')
		}
		if(/[\d]/.test(value)){
			code_length++;
		}
		if(/[a-z]/.test(value)){
			code_length++;
		}
		if(/[A-Z_]/.test(value)){
			code_length++;
		}		
		if(/[^\w]/.test(value)){
			code_length++;
		}
		if(code_length>1){
			$('#reg .info_pass .q3').html('●').css('color','green')	
		}else{
			$('#reg .info_pass .q3').html('○').css('color','#666')
		}
		if(value_length>=10&&code_length>=3){
			$('#reg .info_pass .s').css('color','green');
			$('#reg .info_pass .s4').html(' 高').css('color','green');
		}else if(value_length>=8&&code_length>=2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html(' 中').css('color','#f60');
		}else if(value_length>=1){
			$('#reg .info_pass .s1').css('color','maroon');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html(' 低').css('color','#ccc');
		}else{
			$('#reg .info_pass .s1').css('color','#ccc');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('');
		}
		if(value_length>=6&&value_length<=20&&code_length>1&&!/\s/.test(value))flag=true;
		return flag;
	}

	$('form').eq(0).form('notpass').bind('focus',function(){
		$('#reg .info_notpass').show();
		$('#reg .error_notpass').hide()
		$('#reg .succ_notpass').hide()
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_notpass').hide()
		}else if(check_notpass()){
			$('#reg .info_notpass').hide()
			$('#reg .error_notpass').hide()
			$('#reg .succ_notpass').show();
		}else{
			$('#reg .info_notpass').hide()
			$('#reg .error_notpass').show();
			$('#reg .succ_notpass').hide()			
		}
	})


	function check_notpass(){
		if(trim($('form').eq(0).form('notpass').value())==trim($('form').eq(0).form('pass').value()))return true;

	}


	function check_ques(){
		if($('form').eq(0).form('ques').value()!=0)return true;
	}

	$('form').eq(0).form('ques').bind('change',function(){
		if(check_ques()){
			$('#reg .error_ques').hide()
		}
	})



	$('form').eq(0).form('ans').bind('focus',function(){
		$('#reg .info_ans').show();
		$('#reg .error_ans').hide()
		$('#reg .succ_ans').hide()
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_ans').hide()
		}else if(check_ans()){
			$('#reg .info_ans').hide()
			$('#reg .error_ans').hide()
			$('#reg .succ_ans').show();
		}else{
			$('#reg .info_ans').hide()
			$('#reg .error_ans').show();
			$('#reg .succ_ans').hide()		
		}
	})

	function check_ans(){
		if(trim($('form').eq(0).form('ans').value()).length>=2&&trim($('form').eq(0).form('ans').value()).length<=32)return true;
	}

	$('form').eq(0).form('email').bind('focus',function(){
		if(!$(this).value().includes('@'))
		{
			$('#reg .all_email').show().animate({
					mul:{
						o:100,
						h:145
					}
				})
			$('#reg .info_email').show();
			$('#reg .error_email').hide()
			$('#reg .succ_email').hide()
		}
	}).bind('blur',function(){
		$('#reg .all_email').animate({
			mul:{
				o:0,
				h:0
			},
			fn:function(){
				$('#reg .all_email').hide()
			}
		})
		if(trim($(this).value())==''){
			$('#reg .info_email').hide()
		}else if(check_email()){
			$('#reg .info_email').hide()
			$('#reg .error_email').hide()
			$('#reg .succ_email').show();
		}else{
			$('#reg .info_email').hide()
			$('#reg .error_email').show();
			$('#reg .succ_email').hide() 	
		}
	})

	function check_email(){
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z\d]+)+$/.test(trim($('form').eq(0).form('email').value())))return true;
	}


	$('form').eq(0).form('email').bind('keyup',function(evt){
		if(!$(this).value().includes('@')){
			$('#reg .all_email').show().animate({
					mul:{
						o:100,
						h:145
					}
				})
			$('#reg .all_email li span').html($(this).value())	
		}else{
			$('#reg .all_email').animate({
				mul:{
					o:0,
					h:0
				},
					fn:function(){
						$('#reg .all_email').hide()
					}
			})
		}
		let length=$('#reg .all_email li').length();	
		$('#reg .all_email li').css('background','none');
		$('#reg .all_email li').css('color','#666');
		if(evt.keyCode==40){
			if(this.index==undefined||this.index==length-1){
				this.index=0;
			}else{
				this.index++;
			}
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369')
		}

		if(evt.keyCode==38){
			if(this.index==undefined||this.index==0){
				this.index=length-1;
			}else{
				this.index--;
			}
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369')
		}
		if(evt.keyCode==13){
			$(this).value($('#reg .all_email li').eq(this.index).text())
			$('#reg .all_email').animate({
				mul:{
					o:0,
					h:0
				},
				fn:function(){
				$('#reg .all_email').hide()
				}
			})	
			if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z\d]+)+$/.test(trim($('form').eq(0).form('email').value()))){
				$('#reg .info_email').hide()
				$('#reg .error_email').hide()
				$('#reg .succ_email').show();			
			}
			this.index=undefined;
		}

	})

	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('color','#369')
	},function(){
		$(this).css('background','none');
		$(this).css('color','#666');		
	})

	$('#reg .all_email li').click(function(){
		$('form').eq(0).form('email').value(($(this).text()))
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z\d]+)+$/.test(trim($('form').eq(0).form('email').value()))){
			$('#reg .info_email').hide()
			$('#reg .error_email').hide()
			$('#reg .succ_email').show();			
		}
	})

	let year=$('form').eq(0).form('year')
	let month=$('form').eq(0).form('month')
	let day=$('form').eq(0).form('day')

	for(let i=1950;i<=2017;i++){
		year.first().add(new Option(i,i),undefined);
	}

	for(let i=1;i<=12;i++){
		month.first().add(new Option(i,i),undefined);
	}

	let day30=[4,6,9,11];
	let day31=[1,3,5,7,8,10,12];

	function select_day(){
		if(year.value()!=0&&month.value()!=0){
			day.first().options.length=1;
			let cur_day=0
			if(inArray(day30,parseInt(month.value()))){
				cur_day=30;				
			}else if(inArray(day31,parseInt(month.value()))){
				cur_day=31;			
			}else{
				if((parseInt(year.value())%4==0&&parseInt(year.value())%100!=0)||parseInt(year.value())%400==0){
					cur_day=29;
				}else{
					cur_day=28;
				}	
			}
			for(let i=1;i<=cur_day;i++){
				day.first().add(new Option(i,i),undefined);
			}				
		}else{
			day.first().options.length=1;
		}		
	}

	month.bind('change',select_day)
	year.bind('change',select_day)


	day.bind('change',function(){
		if(check_birthday()){
			$('#reg .error_birthday').hide()	
		}
	})


	function check_birthday(){
		if(year.value()!=0&&month.value()!=0&&day.value()!=0)return true;
	}

	$('form').eq(0).form('ps').bind('keyup',check_ps).bind('paste',function(){
		setTimeout(check_ps,1)
	})

	$('.clear').click(function(){
		let str=$('form').eq(0).form('ps').value();
		$('form').eq(0).form('ps').value(str.substring(0,200));
		check_ps()
	})

	function check_ps(){
		let num=200-$('form').eq(0).form('ps').value().length;
		if(num>=0){
			$('#reg .ps').eq(0).show()
			$('#reg .ps .num').eq(0).html(num)
			$('#reg .ps').eq(1).hide()
			$('form').eq(0).form('ps').css('border-color','#ccc')
			return true;
		}else{
			$('#reg .ps').eq(0).css('display','none')
			$('#reg .ps .num').eq(1).html(-num).css('color','red')
			$('#reg .ps').eq(1).show()
			$('form').eq(0).form('ps').css('border-color','red')
			return false;
		}
	}

	$('form').eq(0).form('sub').click(function(evt){
		let flag=true;
		if(!check_user()){
			$('#reg .error_user').show();
			flag=false
		}
		if(!check_pass.call($('form').eq(0).form('pass').first())){
			$('#reg .error_pass').show();
			flag=false
		}		
		if(!check_notpass()){
			$('#reg .error_notpass').show();
			flag=false
		}
		if(!check_ques()){
			$('#reg .error_ques').show();
			flag=false
		}
		if(!check_ans()){
			$('#reg .error_ans').show();
			flag=false
		}		
		if(!check_email()){
			$('#reg .error_email').show();
			flag=false
		}	
		if(!check_birthday()){
			$('#reg .error_birthday').show();
			flag=false
		}		
		if(!check_ps()){
			flag=false
		}

		if(flag){
			$('#loading').show().center();
			$('#loading p').html('正在提交注册中……')
			let _this=this;
			$(_this).css('backgroundPosition','right')
			_this.disabled=true;
			ajax({
				method:'post',
				url:'add.php',
				date:$('form').eq(0).serialize(),
				async:true,
				success:function(text){
					if(text==1){
						$('#loading').hide()
						$('#success').show().center();
						$('#success p').html('注册成功,请登录');
						setTimeout(function(){
							$('#success').hide()
							$('#reg').hide()
							$('form').eq(0).first().reset();
							$('.succ').hide()
							$('.ps .num').html('200');
							_this.disabled=false;
							$(_this).css('backgroundPosition','left')
							$('#screen').animate({
								attr:'o',
								target:0,
								t:30,
								fn:function(){
									$('#screen').unlock()
								}
							});
						},1000)
					}else{
						console.log(text)
					}
				}
			})
		}
	});

	$('form').eq(1).form('sub').click(function(){
		if(/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value()))&&$('form').eq(1).form('pass').value().length>=6){
			$('#loading').show().center();
			$('#loading p').html('正在登陆……')	
			let _this=this;
			$(_this).css('backgroundPosition','right')
			_this.disabled=true;		
			ajax({
				method:'post',
				url:'is_login.php',
				date:$('form').eq(1).serialize(),
				async:true,
				success:function(text){
					$('#loading').css('display','none')
					_this.disabled=false;
					$(_this).css('backgroundPosition','left')					
					if(text==1){
						$('#login .info').html('登陆失败：用户名或密码不正确!')
					}else{
						$('#login .info').html('&nbsp;')
						$('#success').show().center();
						$('#success p').html('登陆成功');	
						setCookie('user',trim($('form').eq(1).form('user').value()));
						setTimeout(function(){
							$('#header .reg').hide()
							$('#header .login').hide()
							$('#header .info').html(getCookie('user')+',&nbsp;&nbsp;您好')
							$('#success').hide()
							$('#login').hide()
							$('#screen').animate({
								attr:'o',
								target:0,
								t:30,
								fn:function(){
									$('#screen').unlock()
								}
							});
						},1000)					
					}
				}
			});
		}else{
			$('#login .info').html('登陆失败：用户名或密码不合法!')
		}
	})

	$('#banner img').opacity(0)
	$('#banner img').eq(0).opacity(100)
	$('#banner ul li').eq(0).css('color','#333')
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	let banner_index=1;
	let banner_type=1;
	let banner_timer=setInterval(banner_fn,3000)

	$('#banner ul li').hover(function(){
		clearInterval(banner_timer)
		if($(this).css('color')!='rgb(51, 51, 51)'){
			banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1)
		}
	},function(){
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn,3000)
	})

	function banner(obj,prev){
		$('#banner ul li').css('color','#999')
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
		$(obj).css('color','#333')	

		if(banner_type==1){
			$('#banner img').eq(prev).animate({
				attr:'o',
				target:0
			}).css('zIndex',1);
			$('#banner img').eq($(obj).index()).animate({
				attr:'o',
				target:100
			}).css('zIndex',2);
		}else if(banner_type==2){
			$('#banner img').eq(prev).animate({
				attr:'y',
				target:150
			}).css('zIndex',1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr:'y',
				target:0
			}).css('top','-150px').css('zIndex',2).opacity(100);	
		}
	}

	function banner_fn(){
		if (banner_index>=$('#banner ul li').length())banner_index=0;
		banner($('#banner ul li').eq(banner_index).first(),banner_index==0?$('#banner ul li').length()-1:banner_index-1)
		banner_index++;
	}
	
	let wait_load=$('.wait_load');
	wait_load.opacity(0)
	$(window).bind('scroll',_wait_load)
	$(window).bind('resize',_wait_load)
	$(window).bind('load',_wait_load)

	function _wait_load(){
		for(let i=0;i<wait_load.length();i++){
			let _this=wait_load.ge(i)
			if(innerHeight+scrollTop()>_this.offsetTop){
				$(_this).attr('src',$(_this).attr('xsrc')).animate({
					attr:'o',
					target:100
				})
			}
		}			
	}


	$('#photo dl dt img').click(function(){
		$('#photo_big').show().center()
		$('#screen').lock().animate({
			attr:'o',
			target:30,
			t:30
		})
		let temp_img = new Image();
		$(temp_img).bind('load',function(){
			$('#photo_big .big img').attr('src',temp_img.src).css('top',0).opacity(0).animate({
				attr:'o',
				target:100
			}).css('width','600px').css('height','450px')	
		})
		temp_img.src =$(this).attr('bigsrc');

		let _children=this.parentNode.parentNode;

		prve_nex_img(_children)
	});

	$('#photo_big .close').mousedown(function(){
		$('#photo_big').hide()
		$('#screen').animate({
			attr:'o',
			target:0,
			t:30,
			fn:function(){
				$('#screen').unlock()
			}
		})
	$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('width','32px').css('top','190px').opacity(100)
	})

	$('#photo_big').center().resize().drag($('#photo_big h2').last());	

	$('#photo_big .left').hover(function(){
		$('#photo_big .sl').animate({
			attr:'o',
			target:50
		})
	},function(){
		$('#photo_big .sl').animate({
			attr:'o',
			target:0
		})
	})

	$('#photo_big .right').hover(function(){
		$('#photo_big .sr').animate({
			attr:'o',
			target:50
		})
	},function(){
		$('#photo_big .sr').animate({
			attr:'o',
			target:0
		})
	})

	$('#photo_big .left').click(function(){
		let _url=$('#photo_big .big img').attr('src');
		$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px').opacity(100)
		$('#photo_big .big').css('background',`url(${_url}) no-repeat center`)
		let current_img=new Image();
		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',current_img.src).animate({
				attr:'o',
				star:0,
				target:100
			}).css('width','600px').css('height','450px').css('top',0)
		})
		current_img.src=$(this).attr('src')
		let _children=$('#photo dl dt img').ge(prevIndex($('#photo_big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prve_nex_img(_children)
	})

	$('#photo_big .right').click(function(){
		let _url=$('#photo_big .big img').attr('src');
		$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px').opacity(100)
		$('#photo_big .big').css('background',`url(${_url}) no-repeat center`)
		let current_img=new Image();
		$(current_img).bind('load',function(){
			$('#photo_big .big img').attr('src',current_img.src).animate({
				attr:'o',
				star:0,
				target:100
			}).css('width','600px').css('height','450px').css('top',0)
		})
		current_img.src=$(this).attr('src')
		let _children=$('#photo dl dt img').ge(prevIndex($('#photo_big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prve_nex_img(_children)
	})


	function prve_nex_img(_children){
		let prev=prevIndex($(_children).index(),_children.parentNode)
		let next=nextIndex($(_children).index(),_children.parentNode)
		let prev_img=new Image();
		let next_img=new Image();
		prev_img.src=$('#photo .wait_load').eq(prev).attr('bigsrc')
		next_img.src=$('#photo .wait_load').eq(next).attr('bigsrc')
		$('#photo_big .left').attr('src',prev_img.src)
		$('#photo_big .right').attr('src',next_img.src)
		$('#photo_big img').attr('index',$(_children).index())
		$($('#photo_big .index').html($(_children).index()+1+'/'+$('#photo dl dt img').length()))
	}
})




























































































