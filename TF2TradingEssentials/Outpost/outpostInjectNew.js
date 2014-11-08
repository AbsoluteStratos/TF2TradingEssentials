function altKeys(key){
    //Flying Guilotine Alt index
    if(key == 812){
        return 833;
    }
    //Triad Trinket Alt index
    if(key == 814){
        return 835;
    }
    //Shotgun alt index
    if(key == 9 || key == 11 || key == 12|| key == 199){
        return 10;
    }
    //Rocket Launcher Alt index
    if(key == 205){
        return 18;
    }
    //Revolver Alt index
    if(key == 210){
        return 24;
    }
    //Invis Watch Alt index
    if(key == 212){
        return 30;
    }
    //Fireaxe Alt index
    if(key == 2){
        return 192;
    }
    //Scattergun alt index
    if(key == 13){
        return 200;
    }
    //Sniper rifle alt index
    if(key==14){
        return 201;
    }
    //Grenade Launcher Alt
    if(key == 19){
        return 206;
    }
    //Sapper Alt
    if(key == 736){
        return 735;
    }
    //Red Tape Recorder Alt
    if(key==831){
        return 810;
    }
    //Human Cannonball Alt
    if(key == 838){
        return 817;
    }
    //Crate alts
    if(key == 5041 || key == 5045){
        return 5022;
    }
    //Pistol alt
    if(key == 23 || key == 22){
        return 209;
    }
    //Bat Alt
    if(key == 0){
       return 190;
    }
    //Shovel Alt
    if(key == 6){
        return 196;
    }
    //Flame thrower alt
    if(key == 21){
        return 208;
    }
    //Fire Axe Alt
    if(key == 2){
        return 192;
    }
    //Sticky Bomb Launcher
    if(key == 20){
        return 207;
    }
    //Bottle
    if(key == 1){
        return 191;
    }
    //Minigun
    if(key == 15){
        return 202;
    }
    //Fists
    if(key == 5){
        return 195;
    }
    //Wrench
    if(key == 7){
        return 197;
    }
    //Construction PDA
    if(key == 25){
        return 737;
    }
    //Syringe Gun
    if(key == 17){
       return 204;
    }
    //Medi Gun
    if(key == 29){
        return 211;
    }
    //Bonesaw
    if(key == 8){
        return 198;
    }
    //SMG
    if(key == 16){
        return 203;
    }
    //Kukri
    if(key == 3){
        return 193;
    }
    //Kinfe alt
    if(key == 4){
        return 194;
    }
    //Neon Alt
    if(key==813){
        return 834;
    }
    //Name Tag Alt
    if(key==5020){
        return 2093;
    }
    return key;
}
function pricer(hash,flags,sub){
	if(localStorage.getItem('backpackPriceCache')){
        var backpackPriceData = jQuery.parseJSON(localStorage.getItem('backpackPrices'));
        var userdata = null;
        var type = 6;
        var key,floatindex = 0;
        var fontsize = 15;
       
        var datastring = hash;
        key = datastring.substring(datastring.indexOf(",")+1,datastring.indexOf(",",datastring.indexOf(",")+1));
        type = datastring.substring(datastring.indexOf(",",datastring.indexOf(",")+1)+1);
        if(flags && flags.indexOf("Uncraftable")!=-1){
            type=600;
        }
        
        key = altKeys(key);
        if(sub.indexOf("Locked Crate")!=-1){
            floatindex = parseInt( $("li[data-hash='"+hash+"']>a>.series_no").text().replace( /^\D+/g, ''));
            console.log(floatindex);
        }
        try{
            if(backpackPriceData['response']['prices'][key][type][floatindex]['current']){
                if(backpackPriceData['response']['prices'][key][type][floatindex]['current']['value'].toString().indexOf('.')== -1){
                    itemPrice = backpackPriceData['response']['prices'][key][type][floatindex]['current']['value'].toString() +".00";
                }else{
                    itemPrice = backpackPriceData['response']['prices'][key][type][floatindex]['current']['value'].toString(); 
                }
                if(backpackPriceData['response']['prices'][key][type][floatindex]['current']['value_high']){
                    if(backpackPriceData['response']['prices'][key][type][floatindex]['current']['value_high'].toString().indexOf('.')== -1){
                        itemPrice += " - "+backpackPriceData['response']['prices'][key][type][floatindex]['current']['value_high'].toString() +".00";
                    }else{
                        itemPrice += " - "+backpackPriceData['response']['prices'][key][type][floatindex]['current']['value_high'].toString(); 
                    }
                }
                if(backpackPriceData['response']['prices'][key][type][floatindex]['current']['currency']=='metal'){
                    itemPrice +=" Ref.";   
                }
                else if(backpackPriceData['response']['prices'][key][type][floatindex]['current']['currency']=='keys'){
                    itemPrice +=" Keys";   
                }
                    else if(backpackPriceData['response']['prices'][key][type][floatindex]['current']['currency']=='earbuds'){
                        itemPrice +=" Earbuds";   
                    }
                    else if(backpackPriceData['response']['prices'][key][type][floatindex]['current']['currency']=='usd'){
                        itemPrice +=" US Dollars"; 
                    }else{}
            }
        }catch(err){
           itemPrice = "Cannot Find Price"; 
        }
        if(type == 5){
            itemPrice =  "Cannot Price Accurately";  
        }
        if(key == 20000){
            itemPrice = "Cannot Price Chem. Sets";   
        }
        return itemPrice;
    }
}

setTimeout(function(){
	var height = $("div [class='submit contents']").height();
	$("div [class='submit contents']>.error").html("<div class = 'autoprice' style='cursor: pointer; cursor: hand; height: "+height+"px;border-radius:8px; background: linear-gradient(#00E6E6, #006B6B); width: 35%; display: block;'>"+
		"<center><span style='line-height:"+height+"px'><font color= 'white' style ='font-family:Arial Black;font-size:9pt;font-weight:500'>Autoprice!</font></span></center></div>");
	$("div [class='submit contents']>.clear").after("<div style='display: inline;'><center><font size='3'>Powered By: TF2 Trading Essentials</font></center></div>");
	//Hover Properties
	$(".autoprice").hover(function() {
		$(".autoprice").css({background: 'linear-gradient(#00FFFF, #006B6B)'})
	},function() {
		$(".autoprice").css({background: 'linear-gradient(#00E6E6, #006B6B)'})
	});

	$('.autoprice').click(function(){
		var elements = new Array();
		var datanames = new Array();
		var datahash = new Array()
		elements = $("#has>li[class*='item it_440']");
		for(var i = 0;i<elements.length;i++){
			datanames.push($(elements[i]).find("img").attr("alt"));
		}
		var pricelist = "";
		for(var i = 0;i<datanames.length;i++){
			pricelist += datanames[i]+": "+pricer($("li[data-name = '"+datanames[i]+"']").attr('data-hash'),$("li[data-name = '"+datanames[i]+"']").attr('data-flags'),$("li[data-name = '"+datanames[i]+"']").attr('data-subtitle'))+"\n";
		}
		console.log(pricelist);
		if(pricelist!=""){
			$("textarea[name]").val($("textarea[name]").val()+"Prices:\n"+pricelist);
		}
	});
	

},5);