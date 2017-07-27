$(document).ready(function () {
    /*账号类型下拉框*/
    $(this)
        .on('click', '.iconInput.dropBox', function (event) {
            event.stopPropagation();/*阻止事件冒泡*/
            $("#divSelect").toggle();
        })
        .on('click', '#selectContent li', function (event) {/*给帐号类型赋值*/
            event.stopPropagation();/*阻止事件冒泡*/
            $('.iconInput .form-select').val($(this).html());
            $("#divSelect").hide();
        })
        .on('click',function () {
            $('#divSelect').hide();
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
        
    /*单选框和复选框*/
    $(this)
	    .on('click','.checkOne',function(){/*单选框*/
	   		var act = $(this).is('.active');
	   		if(act == false){
	   			$('.checkOne.active').removeClass('active');
	   			$(this).toggleClass('active');
	   		}else{
	   			$(this).removeClass('active');
	   		}	    	   	
	    })
	    .on('click','.checkDiv',function(){/*复选框*/	   		
   			$(this).toggleClass('active');	   			    	   	
	    });
	    
	/*根据状态显示列表*/
	$(this)
		.on('click','.toolText li',function(){
			$(this).removeClass('active').addClass('active');
			$(this).siblings('.toolText li').removeClass('active');
			statu();/*获取当前状态*/
			searchTable();/*根据搜索框的内容显示列表*/
			sortTable();/*根据排序方式显示列表内容*/
			statuTable(statu());/*根据状态显示列表*/
		});
	
	/*项目排序*/
	$(this)
		.on('click','#itemList #selectContent li',function(){					
			sortTable();/*根据排序方式显示列表内容*/
			statuTable(statu());statuTable(statu());/*根据状态显示列表*/			
		});
		
	
	/*搜索*/
	$(this)
		.on('focusout click','.panel-tool .search',function(){		
			searchTable();/*根据搜索框的内容显示列表*/
		})
		.on('keypress','.panel-tool .search',function(e){/*绑定搜索框键盘按下事件*/
			/*回车键事件*/  
		    if(e.which == 13) {   
				e.preventDefault();/*阻止它的默认行为的发生*/
		    	searchTable();/*根据搜索框的内容显示列表*/
		    }
		})
});

/*根据排序方式显示列表内容*/
function sortTable(){
	var sortVal = $('.panel-heading .form-select').val();/*获取当前的排序方式*/
	var tbodyAyy = $('.typeList tbody');
	if(tbodyAyy.length == 1){/*对搜索前的列表进行排序*/
		var listCon = $('.typeList .list-tbody').children();/*获取当前列表所有内容*/
	}else{/*对搜索后的列表进行排序*/
		var listCon = $('.typeList .list-tbody.newTbody').children();/*获取当前列表所有内容*/
	}			
	var currArr = [];/*存放当前列表值的数组*/
	var indexArr = [];/*存放当前列表值数组所对应的索引*/
	var newAyy = [];/*将每一行列表内容及其所对应的索引存放到一个新的数组中*/
	var newTable = [];/*排序后的列表*/
	var currVal = '';			
	for(var i = 0;i < listCon.length;i++){
		if(sortVal == '按类型'){/*按类型*/								
			currVal = $(listCon[i]).children('.proType').html();/*获取每一行的排序方式所对应的值*/											
		}else if(sortVal == '按时间'){/*按时间*/				
			currVal = $(listCon[i]).children('.timeCycle').html();/*获取每一行的排序方式所对应的值*/										
		}else{/*按ID*/
			currVal = $(listCon[i]).children('.num').html();/*获取每一行的排序方式所对应的值*/				
		}
		currArr.push(currVal);/*将类型值放入数组*/
		var j = i;
		indexArr[j] = i;/*保存原来的类型数组的索引*/
		newAyy.push([currArr[i],indexArr[j]]);
	}	
	newAyy.sort();/*对二维数组进行排序*/				
	for(var i = 0;i < newAyy.length;i++){
		var listIndex = newAyy[i][1];/*取出排序后数组的索引值*/					
		newTable.push(listCon[listIndex]);/*将排序后的数组放入新的列表数组中*/
	}
	if(tbodyAyy.length == 1){
		$('.typeList .list-tbody tr').remove();/*删除原来的列表项*/
		$(".typeList .list-tbody").append(newTable);/*添加排序后的列表项*/
	}else{
		$('.typeList .list-tbody.newTbody tr').remove();/*删除原来的列表项*/
		$(".typeList .list-tbody.newTbody").append(newTable);/*添加排序后的列表项*/
	}			
}

/*获取当前搜索框里的内容*/
function searchTxt(){
	var txt = $('.panel-tool .search').val();
	return txt;
}
/*根据搜索框的内容显示列表*/
function searchTable(){
	var txt = searchTxt();/*获取搜索框里的值*/
	var currStatu = statu();/*获取当前列表的状态*/
	$('.typeList .list-tbody.newTbody').remove();/*移除新的列表*/
	var tableCurr = $('.typeList .list-tbody tr');/*获取列表所有内容*/
	if(currStatu == '全部'){/*如果当前状态为全部时*/								
		var listCurr = $(tableCurr).clone(true);
	}else{/*如果当前状态不为全部时*/				
		tableCurr = statuTable(currStatu);/*获取当前状态下的所有列表内容*/
		var arrCurr = $(tableCurr).clone(true);
		/*将当前状态下的列表内容存放到新的数组中*/
		var listCurr = [];				
		for(var i = 0; i < arrCurr.length;i++){
			var disVal = $(arrCurr[i]).attr('style');
			if(disVal == ''){/*将显示的列表项存放到listCurr数组中*/
				listCurr.push(arrCurr[i]);
			}
		}										
	}
	$('.typeList .list-tbody').addClass('hide');/*隐藏原来的列表项*/
	searchCon(txt,currStatu,listCurr,tableCurr);/*判断搜索内容是否为空*/
}
/*根据搜索框内容是否为空显示列表*/
function searchCon(txt,currStatu,listCurr,tableCurr){	
	if(txt != ""){ /*如果搜索框内容不为空*/				
		/*将搜索到的内容添加到新的列表里并显示*/
		var newArr = [];
		for(var i = 0;i < listCurr.length;i++){
			var conTxt = $(listCurr[i]).filter(":contains('"+txt+"')");
			if(conTxt.length == 1){
				newArr.push(conTxt);
			}
		}			
		$(".typeList thead").after('<tbody class="list-tbody newTbody"></tbody>');
		$('.typeList .list-tbody.newTbody').append(newArr);/*添加当前状态下的列表项*/
		/*调用分页功能*/
		var data = $('.typeList .list-tbody.newTbody').children();
		pageing(data);
	}else{/*如果搜索框内容为空*/  
		$('.typeList .list-tbody.newTbody').remove();/*移除新的列表*/
		$('.typeList .list-tbody').removeClass('hide');/*显示原来的列表项*/
		statuTable(currStatu);/*根据当前状态显示列表内容*/
	}
}

/*获取当前列表的状态*/
function statu(){
	var status = $('.panel-tool .toolText').children();	
	for(var i = 0;i <status.length;i++){
		var act = $(status[i]).is('.active');
		if(act == true){
			var currStatu = $(status[i]).html();
			return currStatu;
		}
	}	
}

/*根据当前列表状态显示列表内容*/
function statuTable(currStatu){
	var tableBox = $('.toolText').parent().next().children();/*获取当前列表*/
	var tableContent = $(tableBox[1]).children();/*获取当前列表所有内容*/
	var data = tableContent;/*存放当前状态列表的内容*/
	if(currStatu != '全部'){
		data = [];
		for(var i=0;i<tableContent.length;i++){
			var labelVal = $(tableContent[i]).children().children().html();
			if(labelVal != currStatu){
				$(tableContent[i]).hide();
			}else{
				data.push(tableContent[i]);
			}
		}
	}
	pageing(data);
	return data;
}



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

 