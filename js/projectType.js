$(document).ready(function () {   
	/*搜索*/
	$(this)
		.on('focusout','.panel-tool .search',function(){		
			dataTable(tabId);
		})
		.on('keypress','.panel-tool .search',function(e){/*绑定搜索框键盘按下事件*/
			/*回车键事件*/  
		    if(e.which == 13) {   
				e.preventDefault();/*阻止它的默认行为的发生*/
		    	dataTable(tabId);
		    }
		})
	
	/*展开收缩子工序*/
	$(this)
		.on('click','.unitParent>td:first-child',function(){			
			var arrowVal = $(this).find('.iconAngle').is('.icon-angle-down');/*判断当前是收缩还是展开*/
			var noParent = $(this).parent('.unitParent').nextUntil('.unitParent');/*判断当前工序有多少子工序*/
			if(arrowVal){/*如果是展开的*/				
				$(this).find('.iconAngle').removeClass('icon-angle-down').addClass('icon-angle-up');
				for(var i = 0; i < noParent.length; i++){				
					$(noParent[i]).addClass('hide');
				}
			}else{/*如果是合并的*/
				$(this).find('.iconAngle').removeClass('icon-angle-up').addClass('icon-angle-down');
				for(var i = 0; i < noParent.length; i++){				
					$(noParent[i]).removeClass('hide');				
				}
			}
			var tableArr = $('#projectProcess .list-tbody').children('tr:not(".hide")');
			pageing(tableArr);/*分页*/
		})
		
	/*多选下拉框*/
    $(this)
        .on('click', '.dropMulti', function (event) {
            event.stopPropagation();/*阻止事件冒泡*/       
            var styleDis = $(this).children(".multi-select").css('display');
            if(styleDis === 'none'){
//          	$(this).parents('.list-tbody').find('.multi-select').hide();
            	$('.selectBox').hide();
            	$(this).children(".multi-select").show();
            }else{
//          	$(this).parents('.list-tbody').find('.multi-select').hide();
            	$('.selectBox').hide();
            }
            /*下拉滚动条*/		    	  	
		    $(this).children(".selectBox").niceScroll($(this).find(".selectContent"),{
		    	cursorcolor:"#F00",
		    	cursoropacitymax:0.7,
		    	boxzoom:true,
		    	touchbehavior:true
		    });		   
        })
        .on('click', '.multi-select .selectContent li', function () {/*给下拉选择框赋值*/
            var inputVal = $(this).parents('.dropMulti').find('.form-select').val();/*获取当前下拉框的值*/
            var isHide = $(this).find('i').is('.hide');/*判断当前选项是否被选中*/
            if(isHide){/*如果未被选中，选中此选项*/
            	$(this).find('i').removeClass('hide');/*选中此选项*/
            	inputVal += ' , ' + $(this).text();
            }else{/*如果已经被选中，取消选中*/
           		if( inputVal.indexOf(',') > 0 ){
           			$(this).find('i').addClass('hide');/*取消选中此选项*/ 
	            	if( inputVal.indexOf( $(this).text() ) == 0 ){/*如果取消的是输入框里的第一个值*/
	            		inputVal = inputVal.replace($(this).text() + ' , ','');
	            	}else{
	            		inputVal = inputVal.replace(' , '+$(this).text(),'');
	            	} 
           		}          	         	
            }
            $(this).parents('.dropMulti').find('.form-select').val(inputVal);/*将选择的值赋给当前输入框*/
        })
        .on('click',function () {
            $('.multi-select').hide();
        });
    
    /*根据状态显示列表*/
	$(this)
		.on('click','#projectType .toolText .toolUnit li',function(){
			console.log($(this));
			if(!$(this).is('.active')){
				$(this).addClass('active');
				$(this).siblings('#projectType .toolText ul li').removeClass('active');				
				dataTable(tabId);
			}									
		});
});

/*列表数据*/
function dataTable(tabId) { 
	$('.typeList .list-tbody tr').remove();/*删除原来的数据*/	
	if( tabId === 'projectType-tab'){
		_ajaxTypeTable();/*获取json数据*/
	}else{
		_ajaxProcessTable();
	}
}
/*获取项目类型json数据*/
function _ajaxTypeTable() {
	$.ajax({
		type:"get",
		url:"../../json/projectType.json",
		data:"json",
		success:function(dataTable){
			_ajaxData(dataTable);
		}
	});
}
/*获取工序json数据*/
function _ajaxProcessTable() {
	$.ajax({
		type:"get",
		url:"../../json/projectProcess.json",
		data:"json",
		success:function(dataTable){
			_ajaxData(dataTable);
		}
	});
}
/*将获取的数据添加到表格中*/
function _ajaxData(dataTable){
	var dataArr = [];/*存放获取到的json数据*/
	/*将获取到的每一组表格数据存放到sortArr中*/
	$.each(dataTable, function(key,value) {
		dataArr.push(value);
	});
	var searchArr = searchTable(dataArr);/*搜索*/
	addtoTable(searchArr);/*将搜索到的内容添加到表格中*/
}
/*搜索*/
function  searchTable(dataArr) {
	var searchVal = "";
	if( tabId === 'projectType-tab' ){
		searchVal = $('#projectType .panel-tool .search').val();
		var searchArr = [];
		if(searchVal){ /*如果搜索框内容不为空*/
			for(var i = 0; i < dataArr.length; i++){
				var dataVal = [];
				$.each(dataArr[i],function (key,value) {
					dataVal.push(value);
				})
				var patt = new RegExp(searchVal);
				if(patt.test(dataVal)){
					searchArr.push(dataArr[i]);
				}
			}
		}else{
			searchArr = dataArr;
		}
	}else{
		searchArr = dataArr;
	}
	return searchArr;
}

/*将搜索到的内容添加到表格中*/
function addtoTable(searchArr){	
	/*将排序后的列表添加到表格中*/	
	if(tabId === 'projectType-tab'){/*项目类型表格*/
		getProType(searchArr);
	}else{/*工序表格*/		
		/*向表格中添加内容*/
		var tableCont = "";
		for(var i = 0; i < searchArr.length; i++){
			tableCont += "<tr><td><i class='icon iconAngle icon-angle-down hide'>"+searchArr[i].arrow+"</i></td><td class='num'>"+searchArr[i].number+"</td><td>"+searchArr[i].subType+"</td><td>"+searchArr[i].subUnit+"</td>";
			tableCont += "<td><div class='iconInput dropMulti select-group'><input type='text' class='form-control form-select' readonly='readonly' value='小工' name='workType'><i class='glyphicon glyphicon-triangle-bottom iconRight select' aria-hidden='true'></i>";
			tableCont += "<div class='selectBox multi-select'><ul class='selectContent'><li value='0'>瓦工<i class='icon icon-ok hide'></i></li><li value='1'>电工<i class='icon icon-ok hide'></i></li><li value='2'>木工<i class='icon icon-ok hide'></i></li><li value='3'>技工<i class='icon icon-ok hide'></i></li><li value='4'>小工<i class='icon icon-ok'></i></li></ul></div></div>"+searchArr[i].workType+"</td>";
			tableCont += "<td>"+searchArr[i].workload+"</td><td>"+searchArr[i].unit+"</td><td>"+searchArr[i].model+"</td>";
			tableCont += "<td><div class='operationIcon'><i class='icon-add'></i><i class=' icon-eye-open'></i>"+searchArr[i].operation+"</div></td><td class='parentVal hide'>"+searchArr[i].parent+"</td></tr>";
		}
		$('#projectProcess .list-tbody').append(tableCont);/*向表格中添加内容*/
		var tableArr = $('#projectProcess .list-tbody').children();
		childProcess(tableArr);/*判断是不是子工序*/
		pageing(tableArr);/*分页*/
	}			
}

/*获取所有的项目类型并将所有内容添加到表格中*/
function getProType(searchArr){
	$.ajax({
		type:"get",
		url:"../../json/projectType.json",
		data:"json",
		success:function(dataTable){
			/*获取项目类型*/
			var dataAll = [];/*存放获取到的json数据*/
			/*将获取到的每一组表格数据存放到sortArr中*/
			$.each(dataTable, function(key,value) {
				dataAll.push(value);
			});	
			
			var typeArr = [];
			for (var i = 0; i < dataAll.length; i++) {
				typeArr.push(dataAll[i].projectType);
			}
			var newTypeArr = $.unique(typeArr);/*存放项目类型的数组*/
			var toolUnitLength = $('#projectType .toolUnit li').length;
			if(toolUnitLength == 1){
				for(var j = 0; j < newTypeArr.length; j++){
					$('#projectType .toolUnit').append( "<li>" + newTypeArr[j] + "</li>");
				}
			}			

			/*向表格中添加内容*/
			var tableCont = "";/*添加表格内容*/
			for(var i = 0; i < searchArr.length; i++){
				tableCont += "<tr><td class='num'>"+searchArr[i].number+"</td><td>"+searchArr[i].projectType+"</td><td>"+searchArr[i].subtype+"</td>";
				tableCont += "<td><div class='operationIcon'><i class='icon-eye-open'></i><i class='icon-pencil'></i>"+searchArr[i].operation+"</div></td></tr>";
			}
			$('#projectType .list-tbody').append(tableCont);
			var tableArr = $('#projectType .list-tbody').children();
			statuTable(tableArr);
		}
	});
}

/*按状态筛选*/
function statuTable(tableArr) {
	/*获取当前列表的状态*/
	var status = $('#projectType .panel-tool .toolText ul').children();
	var currentType = '';
	for(var i = 0;i <status.length;i++){
		var act = $(status[i]).is('.active');
		if(act) currentType = $(status[i]).text();
	}

	/*根据状态显示列表*/
	if(currentType != '全部'){
		for(var i = 0; i < tableArr.length; i++){
			if($(tableArr[i]).find('td:nth-child(2)').text() !== currentType ){
				$(tableArr[i]).remove();
			}
		}
	}
	pageing(tableArr);/*分页*/
}

/*创建项目类型*/
function createProType(){
	$.ajax({
		type:"get",
		url:"../../json/projectProcess.json",
		data:"json",
		success:function(dataTable){
			var dataArr = [];/*存放获取到的json数据*/
			/*将获取到的每一组表格数据存放到sortArr中*/
			$.each(dataTable, function(key,value) {
				dataArr.push(value);
			});
			/*向表格中添加内容*/
			var tableCont = "";
			for(var i = 0; i < dataArr.length; i++){
				tableCont += "<tr><td style='width:60px;'><i class='icon iconAngle icon-angle-down hide'>"+dataArr[i].arrow+"</i></td><td class='num'>"+dataArr[i].number+"</td><td>"+dataArr[i].subType+"</td>";				
				tableCont += "<td><div class='checkDiv'><i class='icon-ok'></i></div>"+dataArr[i].operation+"</div></td><td class='parentVal hide'>"+dataArr[i].parent+"</td></tr>";
			}
			$('#createProTypeModal tbody').append(tableCont);/*向表格中添加内容*/
			var tableArr = $('#createProTypeModal tbody').children();
			childProcess(tableArr);/*判断是不是子工序*/			
			/*modal下拉滚动条*/		    	  	
			$("#createProTypeModal .modal-content .modal-body").niceScroll();
		}
	});
}

/*判断是不是子工序*/
function childProcess(tableArr){
	for(var i = 0; i < tableArr.length; i++){
		var tdVal = $(tableArr[i]).find('.parentVal').text();
		if( tdVal === 'true'){
			$(tableArr[i]).addClass('unitParent');
			if( $(tableArr[i+1]).find('.parentVal').text() === 'false' & i != tableArr.length-1){
				$(tableArr[i]).find('.iconAngle').removeClass('hide');
			}				
		}else{
			$(tableArr[i]).find('td:first-child').css('border','none');
		}							
	}
}
