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
    //Crate Alts
    if(key==5041 || key ==5045){
        return 5022;
    }
    //Name Tag Alt
    if(key==5020){
        return 2093;
    }
    return key;
}
//Backpack.tf prices
setTimeout(function(){

    if(typeof(Storage)!=="undefined"){
        
        if(localStorage.getItem('backpackPriceCache')){
            if((1000*60*60*24)+parseInt(localStorage.getItem('backpackPriceCache'))< parseInt(new Date().getTime())||!(localStorage.getItem('backpackPrices'))){
                localStorage.setItem('backpackPriceCache',new Date().getTime()); 
                try{
                    jQuery.ajax({url:"http://backpack.tf/api/IGetPrices/v3/?format=jsonp&key=52d9a7c84dd7b8c67e8b4570&names=1",type:"GET",dataType:"jsonp",success:function(data){localStorage.setItem('backpackPrices',JSON.stringify(data))}});
                }catch(err){} 
            }
        }else{
            localStorage.setItem('backpackPriceCache',new Date().getTime()); 
            jQuery.ajax({url:"http://backpack.tf/api/IGetPrices/v3/?format=jsonp&key=52d9a7c84dd7b8c67e8b4570&names=1",type:"GET",dataType:"jsonp",success:function(data){localStorage.setItem('backpackPrices',JSON.stringify(data))}});
        }
        
        jQuery('body').on('DOMNodeInserted', function(e) {
            var itemPrice = "No Price Found";

            if (jQuery(e.target).hasClass("tipsy") && $(".tipsy_item >div[class*= '440']").length != 0) {

                if(localStorage.getItem('backpackPriceCache')){
                    var backpackPriceData = jQuery.parseJSON(localStorage.getItem('backpackPrices'));
                    var userdata = null;
                    var type = 6;
                    var key,floatindex = 0;
                    var fontsize = 15;
                   
                    var dataname = $(".tipsy_item> div[class *= 'name it_440']").html();
                    var datasubtitle = $(".tipsy_item> .subtitle").html();
                    //console.log(dataname +" ~ "+datasubtitle);
                    var datastring = $("li[data-name='"+dataname+"'][data-subtitle='"+datasubtitle+"']").attr("data-hash");
                    key = datastring.substring(datastring.indexOf(",")+1,datastring.indexOf(",",datastring.indexOf(",")+1));
                    type = datastring.substring(datastring.indexOf(",",datastring.indexOf(",")+1)+1);
                    //console.log(key +" ~ "+type);
                    var flags = $("li[data-name='"+dataname+"'][data-subtitle='"+datasubtitle+"']").attr("data-flags");
                    if(flags && flags.indexOf("Uncraftable")!=-1){
                        type=600;
                    }
                    key = altKeys(key);
                    if(datasubtitle.indexOf("Locked Crate")!=-1){
                        var index = $(".tipsy_item>.attributes").text().indexOf("Series #:")+10;
                        floatindex = parseInt( $(".tipsy_item>.attributes").text().substring(index,index+2));
                        //console.log(floatindex);
                    }
                    //console.log(key+" ~ "+type);
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
                                itemPrice +=" Refined"; 
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
//Trading Essentials Text
setTimeout(function(){
    $("#main>.wrapper").prepend("<div style='height:50px;border-radius:8px;width:25%;background: linear-gradient(#1A1A1A,#151515);cursor: default;margin-bottom:10px;'><span style='line-height:50px'><font size=5 color='#FF9900' face='Arial'><center>TF2 Trading Essentials</center></font></span></div>");
},5);