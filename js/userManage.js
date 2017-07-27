$(document).ready(function () {   
	/*搜索*/
	$(this)
		.on('focusout','.panel-tool .search',function(){		
			dataTable();
		})
		.on('keypress','.panel-tool .search',function(e){/*绑定搜索框键盘按下事件*/
			/*回车键事件*/  
		    if(e.which == 13) {   
				e.preventDefault();/*阻止它的默认行为的发生*/
		    	dataTable();
		    }
		})		
});

/*列表数据*/
function dataTable() { 
	$('.typeList .list-tbody tr').remove();/*删除原来的数据*/		
	$.ajax({
		type:"get",
		url:"../../json/user.json",
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
	var searchVal = $('.panel-tool .search').val();
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
	return searchArr;
}

/*将搜索到的内容添加到表格中*/
function addtoTable(searchArr){	
	/*将排序后的列表添加到表格中*/				
	var tableCont = "";		
	for(var i = 0; i < searchArr.length; i++){
		tableCont += "<tr><td class='num'>"+searchArr[i].id+"</td><td>"+searchArr[i].username+"</td><td>"+searchArr[i].age+"</td><td>"+searchArr[i].gender+"</td><td class='accountType'>";
		
		var boolVal = $(searchArr[i].accountType).filter(':contains(、)');/*判断当前账号类型有一个还是多个*/		
		if(boolVal){/*如果有多个账号类型*/
			var newAccount = (searchArr[i].accountType).split("、");/*分割账号类型*/
			for(var j = 0; j < newAccount.length; j++){
				tableCont += "<span class='lable lable-border'><i class='icon icon-tag'></i>"+newAccount[j]+"</span>";	
			}
		}else{
			tableCont += "<span class='lable-border'><i class='icon icon-tag'></i>"+searchArr[i].accountType+"</span>";
		}
		tableCont += "</td><td>"+searchArr[i].employeeNumber+"</td><td>"+searchArr[i].position+"</td><td>"+searchArr[i].workType+"</td>";
		tableCont += "<td><div class='iconInput dropBox select-group  inputState'><input type='text' class='form-control form-select inputState-in' readonly='readonly'  name='userState' value="+searchArr[i].state+">";
		tableCont += "<i class='glyphicon glyphicon-triangle-bottom iconRight select' aria-hidden='true'></i>";
		tableCont += "<div class='selectBox generalSelect'><ul class='selectContent'><li value='0'>在职</li><li value='0'>离职</li></ul></div></div></td>"
		tableCont += "<td><div class='operationIcon'><i class='icon-eye-open'></i><i class='icon-pencil'></i>"+searchArr[i].operation+"</div></td></tr>";
	}
	$('.list-tbody').append(tableCont);/*向表格中添加内容*/
	var tableArr = $('.list-tbody').children();	
	pageing(tableArr);/*分页*/
	
	/*为页面中的账号类型添加样式*/
	var accountVal = [];
	for (var i = 0; i < tableArr.length; i++) {
		var spanNum = $(tableArr[i]).find('.accountType span');
		if( spanNum.length > 1){
			for(var j = 0; j < spanNum.length; j++){
				accountTypeStyle($(spanNum[j]).text(),spanNum[j]);/*添加账号类型样式*/	
			}			
		}else{
			accountTypeStyle($(spanNum).text(),spanNum);/*添加账号类型样式*/
		}		
	}	
}

/*添加账号类型样式*/
function accountTypeStyle(a,b){			
	if( a == '普通管理员' ){
		$(b).children('i').css('color','#afb5fe');
	}else if( a == '项目经理' ){
		$(b).children('i').css('color','#08c7c9');
	}else if( a == '监理' ){
		$(b).children('i').css('color','#1183c9');
	}else if( a == '采购经理' ){
		$(b).children('i').css('color','#faad52');
	}else if( a == '工程部经理' ){
		$(b).children('i').css('color','#f2524e');
	}else if( a == '库管经理' ){
		$(b).children('i').css('color','#00a4ff');
	}else if( a == '技术员' ){
		$(b).children('i').css('color','#6cd4f9');
	}else if( a == '出纳' ){
		$(b).children('i').css('color','#fe8c64');
	}else if( a == '会计经理' ){
		$(b).children('i').css('color','#fee456');
	}else{
		$(b).children('i').css('color','#55c39a');
	}					
}