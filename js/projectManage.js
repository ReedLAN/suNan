$(document).ready(function () {	  
	/*根据状态显示列表*/
	$(this)
		.on('click','.toolText ul li',function(){
			if(!$(this).is('.active')){
				$(this).addClass('active');
				$(this).siblings('.toolText ul li').removeClass('active');
				showTable();
			}									
		});
	
	/*项目排序*/
	$(this)
		.on('click','#itemList #selectContent li',function(){					
			showTable();		
		});
		
	
	/*搜索*/
	$(this)
		.on('focusout','.panel-tool .search',function(){		
			showTable();
		})
		.on('keypress','.panel-tool .search',function(e){/*绑定搜索框键盘按下事件*/
			/*回车键事件*/  
		    if(e.which == 13) {   
				e.preventDefault();/*阻止它的默认行为的发生*/
		    	showTable();
		    }
		})
				
});

/* 定义排序、状态、搜索*/
var conditionsVal = {
	sort: '',
	statu: '',
	search: ''
};
/*根据筛选出来的结果显示到表格中*/
function showTable(){
	/*获取当前的排序方式*/
	conditionsVal.sort = $('.panel-heading .form-select').val();
	/*获取当前列表的状态*/
	var status = $('.panel-tool .toolText ul').children();
	for(var i = 0;i <status.length;i++){
		var act = $(status[i]).is('.active');
		if(act) conditionsVal.statu = $(status[i]).text();
	}
	/*获取搜索框里的值*/
	conditionsVal.search = $('.panel-tool .search').val();
	$('.typeList .list-tbody tr').remove();/*删除原来的数据*/
	_ajaxDataTable();/*获取json数据*/
}

/*获取json数据*/
function _ajaxDataTable() {
	$.ajax({
		type:"get",
		url:"../../json/projectTable.json",
		data:"json",
		success:function(dataTable){
			var sortArr = [];/*存放获取到的json数据*/
			/*将获取到的每一组表格数据存放到sortArr中*/
			$.each(dataTable, function(key,value) {
				sortArr.push(value);
			});
			sortTable(sortArr);/*排序*/
			var dataArr = statuTable(sortArr);/*按状态筛选*/
			var searchArr = searchTable(dataArr);/*搜索*/
			addtoTable(searchArr);/*将搜索到的内容添加到表格中*/
			addLabel();/*根据项目状态添加标签样式*/
		}
	});
}

/*排序*/
function sortTable(sortArr) {
	if(conditionsVal.sort) {/*如果排序方式不为空*/
		/*将tdArr中的每一项表格数据根据条件进行排序*/
		for (var i = 0; i < sortArr.length; i++) {
			for (var j = 0; j < sortArr.length - i - 1; j++) {
				if (conditionsVal.sort === '按类型') {/*按类型*/
					if (sortArr[j].type > sortArr[j + 1].type) {
						var temp = sortArr[j];
						sortArr[j] = sortArr[j + 1];
						sortArr[j + 1] = temp;
					}
				} else if (conditionsVal.sort === '按时间') {/*按时间*/
					if (sortArr[j].cycle > sortArr[j + 1].cycle) {
						var temp = sortArr[j];
						sortArr[j] = sortArr[j + 1];
						sortArr[j + 1] = temp;
					}
				} else {/*按ID*/
					if (sortArr[j].id > sortArr[j + 1].id) {
						var temp = sortArr[j];
						sortArr[j] = sortArr[j + 1];
						sortArr[j + 1] = temp;
					}
				}
			}
		}
	}
	return sortArr;
}

/*按状态筛选*/
function statuTable(sortArr) {
	/*根据状态修改boolVal的值*/
	if(conditionsVal.statu != '全部'){
		for(var i = 0; i < sortArr.length; i++){
			if(sortArr[i].statu !== conditionsVal.statu ){
				sortArr[i].boolVal = false;
			}
		}
	}else{
		for(var i = 0; i < sortArr.length; i++) {
			sortArr[i].boolVal = true;
		}
	}
	var dataArr = [];
	for(var i = 0; i < sortArr.length; i++){
		if(sortArr[i].boolVal == true){
			dataArr.push(sortArr[i]);
		}
	}
	return dataArr;
}

/*搜索*/
function  searchTable(dataArr) {
	/*在所有boolVal的值为true的列表项里搜索内容*/
	var searchArr = [];
	if(conditionsVal.search){ /*如果搜索框内容不为空*/
		for(var i = 0; i < dataArr.length; i++){
			var dataVal = [];
			$.each(dataArr[i],function (key,value) {
				dataVal.push(value);
			})
			var patt = new RegExp(conditionsVal.search);
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
	var tableCont = "";/*添加表格内容*/
	for(var i = 0; i < searchArr.length; i++){
		tableCont += "<tr><td class='num'>"+searchArr[i].id+"</td><td>"+searchArr[i].projectName+"</td><td>"+searchArr[i].type+"</td><td>"+searchArr[i].cycle+"</td><td><div class='label'>"+searchArr[i].statu+"</div></td>";
		tableCont += "<td><div class='operationIcon'><i class='icon-eye-open'></i><i class='icon-pencil'></i><i class='icon-trash'></i>"+searchArr[i].operation+"</div></td><td class='hide'>"+searchArr[i].boolVal+"</td></tr>";
	}
	$('.typeList .list-tbody').append(tableCont);	
}

/*根据项目状态添加标签样式*/
function addLabel(){	
	var tableArr = $('.typeList .list-tbody').children();
	for (var i = 0; i < tableArr.length; i++) {
		var tdCon = $(tableArr[i]).children();
		var tdLabel = $($(tdCon[4]).children()).text();
		if(tdLabel === '未开始'){
			$(tdCon[4]).children().addClass('label-default');
		}else if(tdLabel === '进行中'){
			$(tdCon[4]).children().addClass('label-info');
		}else{
			$(tdCon[4]).children().addClass('label-success');
		}
	}
	pageing(tableArr);/*分页*/
}


/*选择周期时间*/
function cycleTime(startTime,endTime){					
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var checkin = $(startTime).fdatepicker({
		format: 'yyyy-mm-dd',
		onRender: function (date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		if (ev.date.valueOf() > checkout.date.valueOf()) {
			var newDate = new Date(ev.date)
			newDate.setDate(newDate.getDate() + 1);
			checkout.update(newDate);
		}
		checkin.hide();
		$(endTime)[0].focus();
	}).data('datepicker');
	var checkout = $(endTime).fdatepicker({
		format: 'yyyy-mm-dd',
		onRender: function (date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		checkout.hide();
	}).data('datepicker');
	$('.cycleTime').click(function(){
		$(this).children('input').focus();
	});
}



/*注销*/
function logout(){
	location.href = "../login.html";
}


