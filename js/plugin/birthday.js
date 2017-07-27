(function($){ 
	$.extend({ 
		ms_DatePicker: function (options) { 
		    var defaults = { 
		         YearSelector: "#birthday-year", 
		         MonthSelector: "#birthday-month", 
		         DaySelector: "#birthday-day", 
		         FirstText: "--",
		         FirstValue:'0'
		    }; 
		    var opts = $.extend({}, defaults, options); 
		    var $YearSelector = $(opts.YearSelector); 
		    var $MonthSelector = $(opts.MonthSelector); 
		    var $DaySelector = $(opts.DaySelector); 
		    var FirstText = opts.FirstText; 
		    var FirstValue = opts.FirstValue; 
			
		    // 初始化 
		    var str = "<li>"+FirstText+"</li>"; 
		    $YearSelector.html(str); 
		    $MonthSelector.html(str); 
		    $DaySelector.html(str); 
		 
		    // 年份列表 
		    var yearNow = new Date().getFullYear(); 
		    var yearSel = $YearSelector.attr("value");
		    for (var i = yearNow; i >= 1900; i--) { 
		        var yearStr = "<li>"+i+"</li>";
		        $YearSelector.nextAll('.selectBox').children('.selectContent').append(yearStr); 
		    } 
		 
		    // 月份列表 
		    var monthSel = $MonthSelector.attr("value");
		    for (var i = 1; i <= 12; i++) { 
		        var monthStr = "<li>"+i+"</li>";
		        $MonthSelector.nextAll('.selectBox').children('.selectContent').append(monthStr);
		    } 
		 
		    // 日列表(仅当选择了年月) 
		    function BuildDay() { 
		        if ($YearSelector.val() == 0 || $MonthSelector.val() == 0) { 
		            // 未选择年份或者月份 
		            $DaySelector.html(str); 
		        } else { 
		            $DaySelector.html(str); 
		            var year = parseInt($YearSelector.val()); 
		            var month = parseInt($MonthSelector.val()); 		            
		            var dayCount = 0; 
		            switch (month) { 
		                 case 1: 
		                 case 3: 
		                 case 5: 
		                 case 7: 
		                 case 8: 
		                 case 10: 
		                 case 12: 
		                      dayCount = 31; 
		                      break; 
		                 case 4: 
		                 case 6: 
		                 case 9: 
		                 case 11: 
		                      dayCount = 30; 
		                      break; 
		                 case 2: 
		                      dayCount = 28; 
		                      if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) { 
		                          dayCount = 29; 
		                      } 
		                      break; 
		                 default: 
		                      break; 
		            } 
		            
		            var daySel = $DaySelector.attr("value");
		            for (var i = 1; i <= dayCount; i++) { 		              
		                var dayStr = "<li>"+i+"</li>";
		                $DaySelector.nextAll('.selectBox').children('.selectContent').append(dayStr);
		             } 
		         } 
		    }
		    
		    $MonthSelector.change(function () { 
		        BuildDay(); 
		    }); 
		    $YearSelector.change(function () { 
		        BuildDay(); 
		    }); 
		    if($DaySelector.attr("value")!=""){ 
		        BuildDay(); 
		    } 
		} // End ms_DatePicker 
	}); 
})(jQuery); 