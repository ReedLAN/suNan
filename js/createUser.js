/*物业打分*/
$('.star .icon-star').click(function(){			
	var boolVal = $(this).is('.text-yellow');
	var starArr = $(this).prevAll('.icon-star');
	if(boolVal){
		$(this).nextAll('.icon-star').removeClass('text-yellow');				
	}else{				
		for(var i = 0; i < starArr.length; i++){
			if(!$(starArr[i]).is('.text-yellow')){
				$(starArr[i]).addClass('text-yellow');
			}
		}
		$(this).addClass('text-yellow');
	}	
	$('.score .scoreNum').text(starArr.length+1);/*修改分数*/
});		


/*添加其他人员*/
function addOther(){
	$('#positionTitle').bind('focus',function(){
		$('.modal-body .form-group .input-group span').remove();
		$('#positionTitle').closest('.modal-content').find('.btn-success').removeClass('disabled');						
	});
	var positionVal = $("#positionTitle").val();
	var positionLab = $('#propertyInf form>.form-group>label');
	var positionArr = [];
	var otherContent = '';
	var boolVal = true;
	if(positionVal != '' || null){
		/*获取之前的职务名称*/
		for(var i = 0; i < positionLab.length; i++){
			positionArr.push($(positionLab[i]).text());
		}
		/*判断当前职务名称与之前的职务名称是否重复*/
		for(var i = 0; i < positionArr.length; i++){
			if( positionVal === positionArr[i]){
				$('.modal-body .form-group').addClass('has-error');
				$('.modal-body .form-group .input-group').append('<span class="help-block">职务名称重复</span>');
				boolVal = false;
				$('#positionTitle').closest('.modal-content').find('.btn-success').addClass('disabled');
			}
		}
		/*添加新的职务名称的联系方式*/
		if(boolVal == true){
			$('.modal-body .form-group').removeClass('has-error');
			$('.modal-body .form-group .input-group span').remove();
			otherContent += '<div class="form-group col-group"><label for="propertyFinance" class="col-text control-label">'+positionVal+'</label>';
			otherContent += '<div class="col-input"><div class="personnelBox">';
			otherContent += '<div class="form-group col-group"><label class="col-text control-label">姓名</label><div class="col-input"><div class="input-group"><input type="text" class="form-control" placeholder="请填写姓名"></div></div></div>';
			otherContent += '<div class="form-group col-group"><label class="col-text control-label">手机</label><div class="col-input"><div class="input-group"><input type="text" class="form-control" placeholder="请填写手机号码"></div></div></div>';
			otherContent += '<div class="form-group col-group"><label class="col-text control-label">固定电话</label><div class="col-input"><div class="input-group"><input type="text" class="form-control" placeholder="请填写固定电话"></div></div></div>';
			otherContent += '</div></div></div>'
			$("#operationButton").before(otherContent);
			$('#addOtherModal').removeClass('in').css('display','none');
			$('div.modal-backdrop').remove();
			$('body').removeClass('modal-open');
		}
	}else{
		$('.modal-body .form-group').addClass('has-error');
		$('.modal-body .form-group .input-group').append('<span class="help-block">职务名称不能为空</span>');
		$('#positionTitle').closest('.modal-content').find('.btn-success').addClass('disabled');
	}		
}


/*选择日期周期*/
function cycleTime(a,b){
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var checkin = $(a).fdatepicker({
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
		$(b)[0].focus();
	}).data('datepicker');
	var checkout = $(b).fdatepicker({
		onRender: function (date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		checkout.hide();
	}).data('datepicker');
}

/*获取所有的项目类型并添加到下拉框中*/
function getProjectType(){
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
			var newTypeArr = $.unique(typeArr);/*存放去重后的项目类型的数组*/			
			
			/*向下拉框中添加内容*/
			var listCont = "";
			for(var i = 0; i < newTypeArr.length; i++){
				listCont += "<li>" + newTypeArr[i] + "</li>";
			}
			$('#basicInf #projectTypeSelect').append(listCont);			
		}
	});
}

/*保存基本信息*/
function saveInf(a,b){	
	var textArr = $(a).serializeArray();/*序列化数组*/
	
//	console.log(a);
//	if( a == '#propertyScore form'){
		var propertyScore = $('#propertyScore .scoreNum').text();/*物业分数*/
		var scoreLi = $('#propertyScore li');
//	}
		
	var postData = {};/*创建一个对象*/
	$.each(textArr, function(key,value) {
		postData[textArr[key].name] = textArr[key].value;
	});
//	alert("保存成功！");
	
	/*保存物业信息时的物业分数*/
//	if( a == '#propertyScore form'){
		for (var i = 0; i < propertyScore; i++) {
			$(scoreLi[i]).addClass('text-yellow');
		}
		$('#propertyScore .scoreNum').text(propertyScore);
//	}
		
	var inputArr = $(b);
	for (var i = 0; i < postData.length; i++) {
		$(inputArr[i]).val() = postData[i].value;
	}	
}
