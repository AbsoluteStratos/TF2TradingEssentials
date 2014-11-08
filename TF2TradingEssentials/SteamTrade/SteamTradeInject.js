setTimeout(function() {
    $$(".pagecontent")[0].insert({before:"<div><center><h1 style='margin-top:20px;font-size:30px;'>Team Fortress 2 Trading Essentials</h1></center>"+
                                  " <center><h2 style = 'font-size:20px;'>The tool that makes TF2 trading safer and easier</h2></center></div>"});
    $$(".trade_area")[0].insert({before:"<div id='steamRep' style ='float:top;border-style:solid;border-width:5px;border-color:#5E5E5E;margin-bottom:20px'><center><p>Looks like Steam Rep is not avaible at this time.</p></center></div>"});
    
    $$(".filter_ctn")[0].children[0].replace("<div class='selectableNone'>" +
                                             "<div style='margin-top:-20px;float:right;height:25px margin-bottom:`10px;'>" +
                                             "<input style='margin-top:-100px;width:50px' class='filter_search_box' type='text' id='filteramount' value='' placeholder='Amount' autocomplete='off'>" +
                                             "<div id='addxfiltered' style='margin-left:5px; margin-bottom:10px; margin-top:2px' class='pagebtn'>Add X</div>" +
                                             "<div id='addallfiltered' style='margin-left:5px; margin-bottom:10px; margin-top:2px' class='pagebtn'>256 Trade</div>"+
                                             " <div id='cleartrade' style='margin-left:5px; margin-bottom:10px; margin-top:2px' class='pagebtn'>Clear Trade</div>"+
                                             "<div id='stop' style='margin-left:5px; margin-bottom:10px; margin-top:2px' class='pagebtn'>Stop</div></div></div>");
    
    $$("#footer")[0].insert({before:"<div><center><h4 style='margin-top:20px;font-size:15px;'>Team Fortress Trading Essentials Copyrighted By: Absolute Stratos</h4></center>"+
                             "<center><h5>Powered By: <a href='http://steamrep.com/' target='_blank'>SteamRep</a> and <a href='http://backpack.tf' target='_blank'>Backpack.tf</a></h5></center></div>"});
    var runner = true;
    
    function addItem(item){ 
        if(item.getElementsByTagName('div')[0] && item.getElementsByTagName('div')[0].id.indexOf("item440_2")==0) {
            //var itemid = item.firstChild.id.slice(10);
            try{
                MoveItemToTrade(item.getElementsByTagName('div')[0]);
                
            }catch(err){}
        }
    }
    
    function removeItem(item){
        try{
            MoveItemToInventory(item);
        }catch(err){}
    }
    
    function theAddLooper (a,i,amount){
        var items = jQuery("div[id*= 'inventory_'][id*='_440_2']:last>.inventory_page").find('.itemHolder');
        if(i < items.length && a < amount && runner){  
            if(jQuery(items[i]).css('visibility') != 'hidden' && jQuery(items[i]).css('display') != 'none'){   
                if(items[i].getElementsByTagName('div')[0]) {
                    if(items[i].getElementsByTagName('div')[0].id) {
                        var orgid = items[i].getElementsByTagName('div')[0].id;
                        addItem(items[i]);
                        theAddWaiter(a,i,amount,orgid);
                    }else{
                        i+=1;
                        theAddLooper(a,i,amount);
                    }
                }else{
                    i+=1;
                    theAddLooper(a,i,amount);
                }
            }else{
                i+=1;
                theAddLooper(a,i,amount);
            }
        }
    }
    
    function theClearLooper (){
        var items =jQuery("#your_slots>div[id*='your_slot_']>.slot_inner").find("div[id*='item440_2_']");
        if(items.length > 0 && runner){
            var orgid = items[items.length-1].id;
            removeItem(items[items.length-1]);
            setTimeout(function(){theClearWaiter(orgid);},250);
        }
    }
    
    function theAddWaiter (a,i,amount,orgid){
        var newid=jQuery("#your_slots>div[id*='your_slot_']>.slot_inner").find('#'+orgid);
        if(newid[0]){
            if(orgid==newid[0].id) {
                a+=1;
                i+=1;
                theAddLooper(a,i,amount);
                return;
            }
        }
        setTimeout(function (){theAddWaiter(a,i,amount,orgid);},5);
    }
    
    function theClearWaiter (orgid){
        var newid =  jQuery("#your_slots>div[id*='your_slot_']>.slot_inner").find("#"+orgid);
        if(newid.length>0){
            setTimeout(function (){theClearWaiter(orgid);},5); 
            return;
        }
        theClearLooper();
        
    }
    
    $('addxfiltered').observe('click', function(event) {
        var amount = parseInt($('filteramount').getValue());
        if(!isNaN(amount)) {
            if(amount>256){
                amount = 256;
                $('filteramount').setValue('256');
            }
            runner = true;
            theAddLooper(0,0,amount);
        }
    });
    $('addallfiltered').observe('click', function(event) {
        runner = true;
        theAddLooper(0,0,256);
    });
    $('cleartrade').observe('click',function(event){
        runner = true;
        theClearLooper()
    });
    $('stop').observe('click',function(event){
        runner = false;
    });
    
}, 10);

//Steamrep and account info code
setTimeout(function(){
    if(g_ulTradePartnerSteamID){
        var steamid64 = g_ulTradePartnerSteamID;
        var srj = jQuery.ajax({ url:"https://steamrep.com/api/beta2/reputation/" + steamid64 + "?json=1&extended=1", dataType:'json'})
        .done(function(data) { 
            if(data){
                var picurl = data['steamrep']['avatar'].replace('/\/gi',"/");
                var steamName = data['steamrep']['displayname'];
                var steam32 = data['steamrep']['steamID32'];
                var steam64 = data['steamrep']['steamID64'];
                var joinDate = new Date(data['steamrep']['membersince']*1000).toLocaleDateString();
                var syncDate = new Date(data['steamrep']['lastsynctime']*1000).toLocaleDateString();
                
                var banstuff =  data['steamrep']['reputation']['full'];
                var profiletype = "<h4 style='float:right;color: #33CC33;font-size:15px; margin-left: 5px; margin-right:10px;'>Normal</h4>";
                var tradeban = "<h4 style='float:right;color: #33CC33;font-size:15px; margin-left: 5px; margin-right:10px;'>None</h4>";
                var vacban = "<h4 style='float:right;color: #33CC33;font-size:15px; margin-left: 5px; margin-right:10px;'>Normal</h4>";
                var tban = data['steamrep']['tradeban'];
                if (banstuff.length > 1 || tban=="2" || tban=="3") {
                    var tagclasstype = '';
                    if (banstuff.indexOf("SCAMMER")!=-1) {
                        profiletype = "<h4 style='float:right;color: #FF0000;font-size:15px; margin-left: 5px;  margin-right:10px;'>Scammer</h4>";
                    }
                    else if (tban =="2") {
                        profiletype = "<h4 style='float:right;color: #FF0000;font-size:15px; margin-left: 5px; margin-right:10px;'>Scammer</h4>";
                        tradeban = "<h4 style='float:right;color: #FF0000;font-size:15px; margin-left: 5px;  margin-right:10px;'>Valve Trade Ban</h4>";
                    } else if (tban =="3") {
                        profiletype = "<h4 style='float:right;color: #E6E600;font-size:15px; margin-left: 5px;   margin-right:10px;'>Caution</h4>";
                        tradeban = "<h4 style='float:right;color: #E6E600;font-size:15px; margin-left: 5px; margin-right:10px;'>Valve Trade Probation</h4>";
                    }
                        else if (banstuff.indexOf("CAUTION")!=-1) {
                            profiletype = "<h4 style='float:right;color: #E6E600;font-size:15px; margin-left: 5px; margin-right:10px;'>Caution</h4>";
                        }
                        else if (banstuff.indexOf("ADMIN")!=-1) {
                            profiletype = "<h4 style='float:right;color: #33CC33;font-size:15px; margin-left: 5px; margin-right:10px;'>Trusted Admin</h4>";
                        }
                            else if (banstuff.indexOf("TRUSTED")!=-1) {
                                profiletype = "<h4 style='float:right;color: #33CC33;font-size:15px; margin-left: 5px; margin-right:10px;'>Trusted</h4>";
                            }
                            else if (banstuff.indexOf("MIDDLEMAN")!=-1) {
                                profiletype = "<h4 style='float:right;color: #33CC33;font-size:15px; margin-left: 5px; margin-right:10px;'>Trusted Middleman</h4>";
                            }else{}                          
                }
                if( data['steamrep']['vacban']&&data['steamrep']['vacban']!=0){
                    var vacban = "<h4 style='float:right;color: #FF0000;font-size:15px; margin-left: 5px; margin-right:10px;'>Banned</h4>";
                }
                
                jQuery('#steamRep').html("<table><tr><td style='width:"+jQuery('#steamRep').width()+"px'><span style='float:left'><h3 style='float:top;font-size:20px;margin-left:20px; margin-top:10px;margin-bottom:5px'>You're currently in trade with:</h3>"+
                                         "</span><span style = 'float:right'><a href='https://steamrep.com/profiles/"+steam64+"' target='_blank'><img style = 'border:0px;margin-top:10px; margin-right:20px;' src='http://steamrep.com/data/ico/logo03.png' alt='SR' height='18px'></a></span>"+
                                         "<span style = 'float:right'><a href='http://backpack.tf/id/"+steam64+"' target='_blank'><img style='border:0; margin-top:10px; margin-right:10px' src='http://backpack.tf/images/logo_440.svg' alt='BP.tf' height='18px'></a></span>"+
                                         "<span style = 'float:right'><a href='http://steamcommunity.com/profiles/"+steam64+"' target='_blank'><img style='border:0; margin-top:10px; margin-right:10px' src='http://cdn4.store.steampowered.com/public/images/v5/globalheader_logo.png' alt='Steam' height='18px'></a></span></td></tr></table>"+
                                         "<div style = 'margin-left:20px;'><table><tr><td style='width:"+jQuery('#steamRep').width()+"px'><span style = 'float:left'><img src='"+picurl+"' alt='Steam Avatar'></img></span>"+
                                         "<span style = 'float:left'><div style = 'margin-bottom:10px;margin-left:5px;border-style:solid;border-width:3px;border-color:#5E5E5E;'>"+
                                         "<h4 style='font-size:15px; margin-left: 10px; margin-top:5px; margin-right:10px;'>Steamname: "+steamName+"</h4>"+
                                         "<h4 style='font-size:15px; margin-left: 10px; margin-top:5px; margin-right:10px;'>SteamID32: "+steam32+"</h4>"+
                                         "<h4 style='font-size:15px; margin-left: 10px; margin-top:5px; margin-right:10px;'>SteamID64: "+steam64+"</h4>"+
                                         "<h4 style='font-size:15px; margin-left: 10px; margin-top:5px; margin-right:10px; margin-bottom: 5px;'>Joined Steam: "+joinDate+"</h4></div></span>"+
                                         "<span id='steamRepPic' style='float:right;margin-right:20px;'></span>"+
                                         "<span style='float:right'><div style = 'margin-bottom:10px;margin-right:5px;border-style:solid;border-width:3px;border-color:#5E5E5E;'>"+
                                         "<table style='border-spacing:0'><tr><td style='padding-top:6px;'><span style='float:left'><h4 style='font-size:15px; margin-left: 10px;'>Reputation Status: </h4></span><span style='float:left'>"+profiletype+"</span></td></tr></table>"+
                                         "<table style='border-spacing:0'><tr><td style='padding-top:6px;'><span style='float:left'><h4 style='font-size:15px; margin-left: 10px;'>Trade Ban Status: </h4></span><span style='float:left'>"+tradeban+"</span></td></tr></table>"+
                                         "<table style='border-spacing:0'><tr><td style='padding-top:6px;'><span style='float:left'><h4 style='font-size:15px; margin-left: 10px;'>VAC Status: </h4></span><span style='float:left'>"+vacban+"</span></td></tr></table>"+
                                         "<h4 style='font-size:15px; margin-left: 10px; margin-top:5px; margin-bottom:4px;'>Updated: "+syncDate+"</h4>"+
                                         "</span></td></tr></table></div>");
                if(profiletype.indexOf("Normal")!=-1){
                    jQuery('#steamRepPic').html("<img src='https://steamrep.com/js/SilverShield1.png' height='64' width='64' alt='Steam Rep Sheild'></img>");
                }else if(profiletype.indexOf("Caution")!=-1){
                    jQuery('#steamRepPic').html("<img src='https://steamrep.com/js/CautionShield1.png' height='64' width='64' alt='Steam Rep Sheild'></img>");
                }else if(profiletype.indexOf("Scammer")!=-1){
                    jQuery('#steamRepPic').html("<img src='https://steamrep.com/js/RedShield1.png' height='64' width='64' alt='Steam Rep Sheild'></img>");
                }else{
                    jQuery('#steamRepPic').html("<img src='https://steamrep.com/js/GreenShield1.png' height='64' width='64' alt='Steam Rep Sheild'></img>");
                }
                
            }
        });
    }
    
},5);

//Backpack.tf prices
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

setTimeout(function(){
    var hoverEleme = null;
    var othersItems = false;
    var theirItems = null;
    var yourItems = null;
    jQuery(".itemHolder>div[id*='item440_2_']").live('mouseenter', function() { hoverEleme = this; othersItems = false;});
    jQuery("#your_slots>div[id*='your_slot_']>.slot_inner>div[id*='item440_2_']").live('mouseenter', function() { hoverEleme = this; othersItems = false;});
    jQuery("#their_slots>div[id*='their_slot_']>.slot_inner>div[id*='item440_2_']").live('mouseenter', function() { hoverEleme = this; othersItems = true;});
    if(typeof(Storage)!=="undefined"){
        
        if(localStorage.getItem('backpackPriceCache')){
            if((1000*60*60*24)+parseInt(localStorage.getItem('backpackPriceCache'))< parseInt(new Date().getTime())||!(localStorage.getItem('backpackPrices'))){
                localStorage.setItem('backpackPriceCache',new Date().getTime()); 
                try{
                    jQuery.ajax({url:"http://backpack.tf/api/IGetPrices/v3/?format=jsonp&key=52b8b9224dd7b8fd458b4567&names=1",type:"GET",dataType:"jsonp",success:function(data){localStorage.setItem('backpackPrices',JSON.stringify(data))}});
                }catch(err){} 
            }
        }else{
            localStorage.setItem('backpackPriceCache',new Date().getTime()); 
            jQuery.ajax({url:"http://backpack.tf/api/IGetPrices/v3/?format=jsonp&key=52b8b9224dd7b8fd458b4567&names=1",type:"GET",dataType:"jsonp",success:function(data){localStorage.setItem('backpackPrices',JSON.stringify(data))}});
        }
        
        
        jQuery.ajax({
            url: "http://api.steampowered.com/IEconItems_440/GetPlayerItems/v0001/?SteamID="+g_steamID+"&format=json&key=9E35E15F84D8483CB0502D0B68ECA324",
            cache: false,
            dataType: 'json',
            success: function( data ){
                yourItems = data;
            }
        });
        
        jQuery.ajax({
            url: "http://api.steampowered.com/IEconItems_440/GetPlayerItems/v0001/?SteamID="+g_ulTradePartnerSteamID+"&format=json&key=9E35E15F84D8483CB0502D0B68ECA324",
            cache: false,
            dataType: 'json',
            success: function( data ){
                theirItems = data;
            }
        })
        
        
        jQuery('#mainContent').on('DOMNodeInserted', function(e) {
            var itemPrice = "No Price Found";
            if (jQuery(e.target).is('#hover')) {
                
                if(localStorage.getItem('backpackPriceCache')){
                    var backpackPriceData = jQuery.parseJSON(localStorage.getItem('backpackPrices'));
                    var itemId = hoverEleme.id.slice(10);
                    var userdata = null;
                    var type = 6;
                    var key, floatindex = 0;
                    var fontsize = 15;
                    if(othersItems == true){
                        userdata = theirItems;
                        
                    }else{
                        userdata = yourItems; 
                    }
                    if(userdata == null){
                        itemPrice = "Looks like Steam API is down";
                    }else{
                        for(var i = 0; i<userdata['result']['items'].length;i++){
                            if(userdata['result']['items'][i]['id']==itemId){
                                key = userdata['result']['items'][i]['defindex'];
                                //Weird crate alt index thingy
                                if(key == 5041 || key == 5045){
                                   key = 5022; 
                                }
                                type= userdata['result']['items'][i]['quality'];
                                if(jQuery('.item_desc_description>.item_desc_descriptors>.descriptor').text().indexOf('Crate Series #')!=-1 && jQuery('#hover_item_icon').attr('alt').indexOf('Key')==-1){
                                    floatindex =  userdata['result']['items'][i]['attributes'][0]['float_value'];
                                }
                                if(userdata['result']['items'][i]['flag_cannot_craft'] && userdata['result']['items'][i]['flag_cannot_craft']==true){
                                    type = 600;
                                }
                                i= userdata['result']['items'].length;
                            }
                        }
                        key = altKeys(key);
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
                    }
                    
                    if(type == 5){
                        itemPrice =  "Cannot Price Accurately";  
                    }
                    if(key == 20005){
                        itemPrice = "Cannot Price Chem. Sets";   
                    }
                    
                    if(jQuery('#itemPriceBox')){
                        jQuery('#itemPriceBox').remove();
                    }
                    $$(".item_desc_description")[0].insert( {after:"<div id='itemPriceBox' style='margin-bottom:10px;margin-right:20px;border-style:solid;border-width:3px;border-color:#5E5E5E;'>"+
                                                             "<table style='border-spacing:0'><tr><td><img width='25px' style='float:left; margin-left:5px; margin-top:3px' src='http://backpack.tf/favicon_440.ico?v=3'></img><span style='font-size: "+fontsize+"px;float:left; margin-left:10px;margin-top:5px'>"+itemPrice+"</span></td></tr>"+
                                                             "<tr><td><span style='font-size:10px; margin-bottom:5px;margin-left:5px;margin-right:5px;'>Prices Updated: "+new Date(localStorage.getItem('backpackPriceCache')*1).toLocaleDateString()+" @ "+new Date(localStorage.getItem('backpackPriceCache')*1).toLocaleTimeString()+"</span></td></tr></table></div>"});    
                }
            }
        });
        
    }else{
        jQuery('#mainContent').on('DOMNodeInserted', function(e) {
            if (jQuery(e.target).is('#hover')) {
                if(jQuery('#itemPriceBox').length==0){
                    $$(".item_desc_description")[0].insert( {after:"<div id='itemPriceBox' style='margin-bottom:10px;margin-right:20px;border-style:solid;border-width:3px;border-color:#5E5E5E;'><p>Local eb storage is not active or availible on this browser."+
                                                             " Backpack.tf prices will not be avaible until local storage is available.</p></div>"});
                }
            }
        });
    }
    
},5);