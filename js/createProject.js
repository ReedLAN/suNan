
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
