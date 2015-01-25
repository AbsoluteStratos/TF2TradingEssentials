//Searches backpack.tf json for item price and parses it
function itemPricer(backpackPriceData, defindex, quality, floatindex)
{
    var itemPrice = "No Price Found";
    try{
        if(backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']){
            if(backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['value'].toString().indexOf('.')== -1){
                itemPrice = backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['value'].toString() +".00";
            }else{
                itemPrice = backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['value'].toString(); 
            }
            if(backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['value_high']){
                if(backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['value_high'].toString().indexOf('.')== -1){
                    itemPrice += " - "+backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['value_high'].toString() +".00";
                }else{
                    itemPrice += " - "+backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['value_high'].toString(); 
                }
            }
            if(backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['currency']=='metal'){
                itemPrice +=" Refined"; 
            }
            else if(backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['currency']=='keys'){
                itemPrice +=" Keys";   
            }
            else if(backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['currency']=='earbuds'){
                itemPrice +=" Earbuds";   
            }
            else if(backpackPriceData['response']['prices'][defindex][quality][floatindex]['current']['currency']=='usd'){
                itemPrice +=" US Dollars";   
            }else{}
        }
    }catch(err){
       itemPrice = "Cannot Find Price"; 
    }
    if(quality == 5){
        itemPrice =  "Cannot Price Accurately";  
    }
    if(defindex == 20000){
        itemPrice = "Cannot Price Chem. Sets";   
    }
    return itemPrice;
}

//Checks for alt def indexes
function altDefindexs(backpackPriceData, defi){
    var defindex = defi;
    jQuery.each(backpackPriceData['response']['prices'], function(i, val) {
        if(val["alt_defindex"])
        {
            var altFound = false;
            jQuery.each(val["alt_defindex"], function(j, val2) {
                if(val2 == defindex)
                    altFound = true;
            });

            if(altFound){
                defindex = i;
                return false; //break each loop
            }
        }
    });
    return defindex;
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
        if(localStorage.getItem('backpackPriceCache'))
        {
            console.log("\nGenerating Price List...");
            var backpackPriceData = jQuery.parseJSON(localStorage.getItem('backpackPrices'));
            var quality = 6;
            var defindex,floatindex = 0;

    		var elements = new Array();
    		var datanames = new Array();
    		var datahash = new Array()

    		elements = $("#has>li[class*='item it_440']");

    		for(var i = 0;i<elements.length;i++){
    			datanames.push($(elements[i]).find("img").attr("alt"));
    		}

    		var pricelist = "";
    		for(var i = 0;i<datanames.length;i++){
                //Find our defindex and quality
                var datahasharry = $("li[data-name = '"+datanames[i]+"']").attr('data-hash').split(',');
                defindex = datahasharry[1];
                quality = datahasharry[2];

                //Check for uncraftable
                if(typeof $("li[data-name = '"+datanames[i]+"']").attr('data-flags') !== typeof undefined)
                {
                    if($("li[data-name = '"+datanames[i]+"']").attr('data-flags').indexOf("Uncraftable") != -1)
                        quality = 600;
                }

                //Check to see if its a crate, if so adjust float
                if(typeof $("li[data-name = '"+datanames[i]+"']").attr('data-subtitle') !== typeof undefined)
                {
                    if($("li[data-name = '"+datanames[i]+"']").attr('data-subtitle').indexOf("Supply Crate")!=-1)
                    {
                         newindex = $("li[data-name = '"+datanames[i]+"']").attr("data-attributes").replace( /^\D+/g, '');
                         if(!isNaN(newindex)) // Make sure we get a real number
                            floatindex = newindex;
                    }
                }
                
                console.log("Defindex-"+defindex);
                console.log("Quality-"+quality);
                console.log("Float Value-"+floatindex);
    			pricelist += datanames[i]+": "+itemPricer(backpackPriceData,defindex,quality,floatindex)+"\n";
    		}

    		console.log(pricelist);
    		if(pricelist!=""){
    			$("textarea[name]").val($("textarea[name]").val()+"Prices:\n"+pricelist);
    		}
        }
	});
},5);