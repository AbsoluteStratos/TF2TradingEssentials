//Hover Properties
$(".TradingHub").hover(function() {
	$(".TradingHub").css({backgroundColor: "#DCD4BB"})
},function() {
	$(".TradingHub").css({backgroundColor: "transparent"})
});
$(".OutpostBumper").hover(function() {
	$(".OutpostBumper").css({backgroundColor: "#DCD4BB"})
},function() {
	$(".OutpostBumper").css({backgroundColor: "transparent"})
});
$(".SteamTradingTools").hover(function() {
	$(".SteamTradingTools").css({backgroundColor: "#DCD4BB"})
},function() {
	$(".SteamTradingTools").css({backgroundColor: "transparent"})
});
$(".OutpostTradingTools").hover(function() {
	$(".OutpostTradingTools").css({backgroundColor: "#DCD4BB"})
},function() {
	$(".OutpostTradingTools").css({backgroundColor: "transparent"})
});
$(".linkbox").hover(function() {
	$(this).css({backgroundColor: "#DCD4BB"})
},function() {
	$(this).css({backgroundColor: "transparent"})
});
//Initial Icon loading
chrome.storage.local.get('steamTools',function(data){
	if(data.steamTools == "True"){
		$("#steamtoolicon").html("<img id ='steamtoolpic' alt='icon' src='Images/checkmark.png'></img>");
	}else{
		$("#steamtoolicon").html("<img id ='steamtoolpic' alt='icon' src='Images/xmark.png'></img>");
	}
});
chrome.storage.local.get('outpostTools',function(data){
	if(data.outpostTools == "True"){
		$("#outposttoolicon").html("<img id ='outposttoolpic' alt='icon' src='Images/checkmark.png'></img>");
	}else{
		$("#outposttoolicon").html("<img id ='outposttoolpic' alt='icon' src='Images/xmark.png'></img>");
	}
});
//Switch for steamtools
$(".SteamTradingTools").click(function() {
	chrome.storage.local.get('steamTools',function(data){
		if(data.steamTools == "False"){
			chrome.storage.local.set({'steamTools':"True"});
			$("<img>", {
	    		"src": "Images/checkmark.png",
	    		"load": function() {
	        		$("#steamtoolpic").attr("src","Images/checkmark.png");
	    		}
			})
		}else{
			chrome.storage.local.set({'steamTools':"False"});
			$("<img>", {
	    		"src": "Images/checkmark.png",
	    		"load": function() {
	        		$("#steamtoolpic").attr("src","Images/xmark.png");
	    		}
			})
		}
	});
});
//Switch for outposttools
$(".OutpostTradingTools").click(function() {
	chrome.storage.local.get('outpostTools',function(data){
		if(data.outpostTools == "False"){
			chrome.storage.local.set({'outpostTools':"True"});
			$("<img>", {
	    		"src": "Images/checkmark.png",
	    		"load": function() {
	        		$("#outposttoolpic").attr("src","Images/checkmark.png");
	    		}
			})
		}else{
			chrome.storage.local.set({'outpostTools':"False"});
			$("<img>", {
	    		"src": "Images/checkmark.png",
	    		"load": function() {
	        		$("#outposttoolpic").attr("src","Images/xmark.png");
	    		}
			})
		}
	});
});

$("#version").text("v "+chrome.app.getDetails().version);