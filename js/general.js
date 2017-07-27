$(document).ready(function () {
	
    /*通用下拉框*/
    $(this)
        .on('click', '.dropBox', function (event) {
            event.stopPropagation();/*阻止事件冒泡*/
//          $(this).children(".generalSelect").toggle();			
            var styleDis = $(this).children(".generalSelect").css('display');
            if(styleDis === 'none'){
            	$('.selectBox').hide();
            	$(this).children(".generalSelect").show();
            }else{
            	$('.selectBox').hide();
            }
            /*下拉滚动条*/
			var nice = $("html").niceScroll();
		    $(this).children(".selectBox").niceScroll($(this).find(".selectContent"),{
		    	cursorcolor:"#F00",
		    	cursoropacitymax:0.7,
		    	boxzoom:true,
		    	touchbehavior:true
		    });	
        })
        .on('click', '.selectContent li', function (event) {/*给帐号类型赋值*/
            event.stopPropagation();/*阻止事件冒泡*/          
            $(this).parents('.dropBox').find('.form-select').val($(this).text());
            
            /*修改生日*/
            if($(this).parents().is('.birthday-input')){
            	if(!($(this).parents().prevAll().is('#birthday-day'))){/*如果当前被修改的输入框不是日*/
            		$(this).parents('.dropBox').find('.form-select').attr('value',$(this).text());/*修改value值*/            		
	            	$($($(this).parents('.birthday').find('#birthday-day')).nextAll('.selectBox').find('.selectContent li')).remove();/*删除原来的日*/
	            	$(function () { 
					    $.ms_DatePicker({ 
				            YearSelector: "#birthday-year", 
				            MonthSelector: "#birthday-month", 
				            DaySelector: "#birthday-day" 
					    }); 
					});
            	}            	
            }  
            
            $(".generalSelect").hide();
        })
        .on('click',function () {
            $('.generalSelect').hide();
        });

    /*左侧导航和顶部导航点击事件*/
    $(this)
        .on('click', '.leftNav .primaryBox', function () {/*二级导航*/
            $(this).toggleClass('active');
            $(this).siblings('.primaryBox').removeClass('active');
        })
        .on('click', '.littleLeft.leftNav .primaryBox', function (event) {/*窄屏二级导航*/
            event.stopPropagation();/*阻止事件冒泡*/
            var act = $(this).is('.nav-active');
            if(act == false){
            	$(this).removeClass('active');           
            }else{
            	$(this).removeClass('active').addClass('active');
            }
        })
        .on('click', '#userAccount', function (event) {/*帐号下拉框*/
            event.stopPropagation();/*阻止事件冒泡*/
            $(this).next().toggle();
        })
        .on('click',function () {
            $('#userAccount').next().hide();
        })
        .on('click', '#switchBtn', function () {/*左侧导航切换*/
            $("#leftNav").toggleClass('littleLeft');
        });
    
    /*创建下的箭头*/
    $(this)
    	.on('click','.creatBox .iconArrow',function(){
    		$(this).parents('.itemBox').toggleClass('active');
    	})
    	
    /*表格里的箭头*/
    $(this)
    	.on('click','.iconAngle',function(){
    		$(this).parents('td').toggleClass('active');
    	})	
    /*单选框和复选框*/
    $(this)
    	.on('click','.checkbox label',function(){
    		var act = $(this).children('.checkOne').is('.active');
	   		if(!act){
	   			$('.checkOne.active').removeClass('active');
	   			$(this).children('.checkOne').toggleClass('active');
	   		}else{
	   			$(this).children('.checkOne').removeClass('active');
	   		}
    	})
	    .on('click','.checkOne',function(event){/*单选框*/
	   		event.stopPropagation();/*阻止事件冒泡*/
	   		var act = $(this).is('.active');
	   		if(!act){
	   			$('.checkOne.active').removeClass('active');
	   			$(this).toggleClass('active');
	   		}else{
	   			$(this).removeClass('active');
	   		}	    	   	
	    })
	    .on('click','.checkDiv',function(){/*复选框*/	   		
   			$(this).toggleClass('active');	   			    	   	
	    });	    	
});

/*分页*/
function pageing(list){
	$(list).hide();
	var nums = 8; //每页出现的数量
	var pages = Math.ceil(list.length/nums); //得到总页数
	var thisDate = function(curr){/*curr表示当前页*/
	    $(list).hide();
	    var last = curr*nums - 1;
	    last = last >= list.length ? (list.length-1) : last;/*last表示当前页显示的最后一条数据索引*/
	    for(var i = (curr*nums - nums); i <= last; i++){
			$(list[i]).show();
	    }
	    return list;
	};
	
	//调用分页
	laypage({
	    cont: 'pagination',
	    pages: pages,
	    jump: function(obj){
	        document.getElementsByClassName('list-tbody').innerHTML = thisDate(obj.curr);
	    }
	});
}

/*注销*/
function logout(){
	location.href = "../login.html";
}
