//Backpack.tf prices
setTimeout(function(){

    if(typeof(Storage)!=="undefined"){

        jQuery('body').on('DOMNodeInserted', function(e) {
            var itemPrice = "No Price Found";

            if (jQuery(e.target).hasClass("tipsy") && $(".tipsy_item >div[class*= '440']").length != 0)
            {
                if(localStorage.getItem('backpackPriceCache'))
                {
                    var backpackPriceData = jQuery.parseJSON(localStorage.getItem('backpackPrices'));
                    var quality = 6;
                    var defindex,floatindex = 0;
                    var fontsize = 15;
                   
                    var dataname = $(".tipsy_item> div[class *= 'name it_440']").html();
                    var datasubtitle = $(".tipsy_item> .subtitle").html();
                    //console.log(dataname +" ~ "+datasubtitle);
                    var datastring = $("li[data-name='"+dataname+"'][data-subtitle='"+datasubtitle+"']").attr("data-hash");
                    defindex = datastring.substring(datastring.indexOf(",")+1,datastring.indexOf(",",datastring.indexOf(",")+1));
                    quality = datastring.substring(datastring.indexOf(",",datastring.indexOf(",")+1)+1);
                    //console.log(defindex +" ~ "+type);
                    var flags = $("li[data-name='"+dataname+"'][data-subtitle='"+datasubtitle+"']").attr("data-flags");
                    //If uncraftable change quality
                    if(flags && flags.indexOf("Uncraftable")!=-1){
                        quality=600;
                    }
                    //If its a crate change float
                    if(datasubtitle.indexOf("Supply Crate")!=-1){
                        newindex = parseInt($(".tipsy_item>.attributes").text().replace( /^\D+/g, ''));
                        if(!isNaN(newindex)) // Make sure we get a realy number
                            floatindex = newindex;
                    }
                    
                    defindex = altDefindexs(backpackPriceData, defindex);

                    console.log("Searching for price of: ");
                    console.log("Defindex-"+defindex);
                    console.log("Quality-"+quality);
                    console.log("Float Value-"+floatindex);

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
                    
                    if(jQuery('#itemPriceBox')){
                        jQuery('#itemPriceBox').remove();
                    }
                    $(".tipsy_item").append("<div id='itemPriceBox' style='margin-bottom:10px;border-style:solid;border-width:3px;border-color:#5E5E5E;'>"+
                                                             "<table style='border-spacing:0'><tr><td><img width='25px' style='float:left; margin-left:5px; margin-top:3px' src='http://backpack.tf/favicon_440.ico?v=3'></img><span style='font-size: "+fontsize+"px;float:left; margin-left:10px;margin-top:5px'>"+itemPrice+"</span></td></tr>"+
                                                             "<tr><td><span style='font-size:10px; margin-bottom:5px;margin-left:5px;margin-right:5px;'>Prices Updated: "+new Date(localStorage.getItem('backpackPriceCache')*1).toLocaleDateString()+" @ "+new Date(localStorage.getItem('backpackPriceCache')*1).toLocaleTimeString()+"</span></td></tr></table></div>");    
               
               } 
            }
        });
        
    }else{
        $('document.body').on('DOMNodeInserted', function(e) {
            if (jQuery(e.target).is('.tipsy tipsy-n')) {
                if(jQuery('#itemPriceBox').length==0){
                    $("tipsy-inner")[0].append( {after:"<div id='itemPriceBox' style='margin-bottom:10px;margin-right:20px;border-style:solid;border-width:3px;border-color:#5E5E5E;'><p>Local eb storage is not active or availible on this browser."+
                                                             " Backpack.tf prices will not be avaible until local storage is available.</p></div>"});
                }
            }
        });
    }
    
},10);

//Backpack.tf prices
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

//Trading Essentials Text
setTimeout(function(){
    if(!$('#te_title').length)
    {
        $("#main>.wrapper").prepend("<div id='te_title' style='height:50px;border-radius:8px;width:25%;background: linear-gradient(#1A1A1A,#151515);cursor:default;margin-bottom:10px;'><span style='line-height:50px'><font size=5 color='#FF9900' face='Arial'><center>TF2 Trading Essentials</center></font></span></div>");
    }
},5);