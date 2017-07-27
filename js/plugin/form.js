var MyValidator = function() {
    var handleSubmit = function() {  
    	jQuery.validator.addMethod("isMobile", function(value, element) {    		
		    var length = value.length;
		    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
		    return this.optional(element) || (length == 11 && mobile.test(value));
		}, "请正确填写您的手机号码");
				
		jQuery.validator.addMethod("isuserName", function(value, element) {    		
		    var length = value.length;
		    var username = /^([A-Za-z]|[\u4E00-\u9FA5])+$/;/*用户名正则表达式，只有汉字和字母*/
		    return this.optional(element) || (length !== 0 && username.test(value));
		}, "请输入英文或中文字符");
		
        $.each($('.form-horizontal'), function() {
        	$(this).validate({
	            errorElement : 'span',  
	            errorClass : 'help-block',  
	            focusInvalid : false,  
	            rules : {  
	                username : {  
	                    required : true	                    
	                }, 
	                name : {
	                	required:true,
	                	isuserName: true
	                },
	                password : {  
	                    required : true  
	                }, 
	                account : {  
	                    required : true  
	                },               
	                projectBudget : {
	                	digits : true,
	                	min :　1
	                },	               
	                departmentMobile : {
			            isMobile : true
			        },
			        engineeringMobile : {
			            isMobile : true
			        },
			        securityMobile : {
			            isMobile : true
			        },
			        userNumber : {
			        	digits :　true
			        }
	            },  
	            messages : {  
	                username : {  
	                    required : "用户名不能为空" 
	                },
	                name : {
	                	required : "用户名不能为空" ,
	                    isuserName: "请输入中文或英文字符"
	                },
	                password : {  
	                    required : "密码不能为空"  
	                },
	                account : {  
	                    required : "请选择账号类型"  
	                },                
	                projectBudget : {
	                	digits : "请输入大于0的整数",
	                	min : "不能小于1"
	                },	                
	                departmentMobile : {
			            isMobile : "请正确填写您的手机号码"
			        },
			        engineeringMobile : {
			            isMobile : "请正确填写您的手机号码"
			        },
			        securityMobile : {
			            isMobile : "请正确填写您的手机号码"
			        },
			        userNumber :　{
			        	digits :　"请输入大于0的整数"
			        }
	            },  
	  
	            highlight : function(element) {  
	                $(element).closest('.form-group').addClass('has-error');  
	            },  
	  
	            success : function(label) {  
	                label.closest('.form-group').removeClass('has-error');  
	                label.remove();  
	            },  
	  
	            errorPlacement : function(error, element) {  
	                element.parent('div').append(error);  
	            },  
	  
	            submitHandler : function(form) {  
	                form.submit();  
	            }  
	        });  
  
	        $('.form-horizontal input').keypress(function(e) {  
	            if (e.which == 13) {  
	                if ($('.form-horizontal').validate().form()) {  
	                    $('.form-horizontal').submit();  
	                }  
	                return false;  
	            }  
	        });  
        });       
    }  
    return {  
        init : function() {  
            handleSubmit();  
        }  
    };  
  
}();  


