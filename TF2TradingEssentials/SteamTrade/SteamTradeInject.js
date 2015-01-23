//Get chrome extension url then remove storage div
var chrome_extension_url = jQuery('#chrome_url').html();
jQuery('#chrome_url').remove();

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
                var picurl = jQuery(".trade_offer#trade_theirs").find("div.avatarIcon>a>img").attr("src").replace(".jpg","_medium.jpg");
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
                                         "</span><span style = 'float:right'><a href='https://steamrep.com/profiles/"+steam64+"' target='_blank'><img style = 'border:0px;margin-top:10px; margin-right:20px;' src='"+chrome_extension_url +"Images/trade_steamreplogo.png' alt='SR' height='18px'></a></span>"+
                                         "<span style = 'float:right'><a href='http://backpack.tf/profiles/"+steam64+"' target='_blank'><img style='border:0; margin-top:10px; margin-right:10px' src='"+chrome_extension_url +"Images/trade_bptflogo.png' alt='BP.tf' height='18px'></a></span>"+
                                         "<span style = 'float:right'><a href='http://steamcommunity.com/profiles/"+steam64+"' target='_blank'><img style='border:0; margin-top:10px; margin-right:10px' src='"+chrome_extension_url +"Images/trade_steamlogo.png' alt='Steam' height='18px'></a></span></td></tr></table>"+
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
                    jQuery('#steamRepPic').html("<img src='"+chrome_extension_url +"Images/SRSilverShield.png' height='64' width='64' alt='Steam Rep Sheild'></img>");
                }else if(profiletype.indexOf("Caution")!=-1){
                    jQuery('#steamRepPic').html("<img src='"+chrome_extension_url +"Images/SRYellowShield.png' height='64' width='64' alt='Steam Rep Sheild'></img>");
                }else if(profiletype.indexOf("Scammer")!=-1){
                    jQuery('#steamRepPic').html("<img src='"+chrome_extension_url +"Images/SRRedShield.png' height='64' width='64' alt='Steam Rep Sheild'></img>");
                }else{
                    jQuery('#steamRepPic').html("<img src='"+chrome_extension_url +"Images/SRGreenShield.png' height='64' width='64' alt='Steam Rep Sheild'></img>");
                }
                
            }
        });
    }
    
},5);

setTimeout(function(){
    var hoverEleme = null;
    var othersItems = false;
    var currentDefindex = 0;
    var theirItems = null;
    var yourItems = null;
    var active = false;

    jQuery("body").on('mouseenter',".itemHolder>div[id*='item440_2_']", function() { 
        hoverEleme = this; 
        othersItems = false;
    });
    jQuery("#your_slots>div[id*='your_slot_']>.slot_inner").on('mouseenter',"div[id*='item440_2_']", function() { 
        hoverEleme = this;
        othersItems = false;
    });

    jQuery("#their_slots>div[id*='their_slot_']>.slot_inner").on('mouseenter',"div[id*='item440_2_']", function() { 
        hoverEleme = this; 
        othersItems = true;
    });

    if(typeof(Storage)!=="undefined"){
        var protocol = "https";
        if (window.location.protocol != "https:")
            protocol = "http";

        jQuery.ajax({
            url: protocol+"://steamcommunity.com/profiles/"+g_steamID+"/inventory/json/440/2",
            dataType: 'json',
            success: function( data ){
                yourItems = data;
            },
            error: function(data){
                console.log(data);
            }
        });
        
        jQuery.ajax({
            url: protocol+"://steamcommunity.com/profiles/"+g_ulTradePartnerSteamID+"/inventory/json/440/2",
            dataType: 'json',
            success: function( data ){
                theirItems = data;
            }
        });

        jQuery('#hover').styleListener({ 
            // the styles that you want to monitor for changes
            styles: ['display'],
            
            // function to be called when a monitored style changes 
            changed: function(style, newValue, oldValue, element) {

                if(newValue != 'none' && !active)
                {  
                    active = true;
                    if(othersItems == true){
                        userItems = theirItems;   
                    }
                    else{
                        userItems = yourItems;
                    }
                    CreateBptfPriceBox(hoverEleme, userItems);
                }
                else
                {
                    active = false;
                }

            }
            
        }); 
    }
    else{
        if(jQuery('#itemPriceBox').length==0){
            $$(".item_desc_description")[0].insert( {after:"<div id='itemPriceBox' style='margin-bottom:10px;margin-right:20px;border-style:solid;border-width:3px;border-color:#5E5E5E;'><p>Local storage is not active or availible on this browser."+
                                                     " Backpack.tf prices will not be avaible until local storage is available.</p></div>"});
        }
    }
},5);

function CreateBptfPriceBox(hoverEleme, userItems)
{
    var itemPrice = "No Price Found";
    if(localStorage.getItem('backpackPriceCache')){
        var backpackPriceData = jQuery.parseJSON(localStorage.getItem('backpackPrices'));
        var itemId = hoverEleme.id.slice(10);
        var quality = 6;
        var defindex, floatindex = 0;
        var fontsize = 15;

        if(userItems != null){
            var classid = userItems["rgInventory"][itemId.toString()]["classid"];
            var instanceid = userItems["rgInventory"][itemId.toString()]["instanceid"];

            var defindex = userItems["rgDescriptions"][classid+"_"+instanceid]["app_data"]["def_index"];
            var quality = userItems["rgDescriptions"][classid+"_"+instanceid]["app_data"]["quality"];
            var floatindex = 0;

            //Check to see if its a crate, if so adjust float value to series number
            jQuery.each(userItems["rgDescriptions"][classid+"_"+instanceid]["tags"], function(i, val) {
                if(val["internal_name"] == "Supply Crate"){
                    var name = userItems["rgDescriptions"][classid+"_"+instanceid]["name"];
                    if(name.indexOf('#')!=-1)
                        floatindex = name.substring(name.indexOf('#')+1); //cannot just request numbers due to year crates
                }
            });
            //Check if crate and if theres a float
            jQuery.each(userItems["rgDescriptions"][classid+"_"+instanceid]["descriptions"], function(i, val) {
                if(val.value == "( Not Usable in Crafting )")
                    quality = 600;
            });
            //Check for alt defindex value
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
        }
        
        if(quality == 5){
            itemPrice =  "Cannot Price Accurately";  
        }
        if(defindex == 20005){
            itemPrice = "Cannot Price Chem. Sets";   
        }
        
        if(jQuery('#itemPriceBox')){
            jQuery('#itemPriceBox').remove();
        }

        if(userItems == null){
            jQuery("#hover").find(".item_desc_description").append("<div id='itemPriceBox' style='margin-bottom:10px;margin-right:20px;border-style:solid;border-width:3px;border-color:#5E5E5E;'>"+
                                                 "<table style='border-spacing:0'><tr><td><span style='font-size: "+fontsize+"px;float:left; margin-left:10px;margin-top:5px'>Appears Steam Community Inventory is Down  D:</span></td></tr>"+
                                                 "<tr><td><span style='font-size:10px; margin-bottom:5px;margin-left:5px;margin-right:5px;'>Prices Updated: "+new Date(localStorage.getItem('backpackPriceCache')*1).toLocaleDateString()+" @ "+new Date(localStorage.getItem('backpackPriceCache')*1).toLocaleTimeString()+"</span></td></tr></table></div>");
        }
        else{
             jQuery("#hover").find(".item_desc_description").append("<div id='itemPriceBox' style='margin-bottom:10px;margin-right:20px;border-style:solid;border-width:3px;border-color:#5E5E5E;'>"+
                                                 "<table style='border-spacing:0'><tr><td><img width='25px' style='float:left; margin-left:5px; margin-top:3px' src='"+chrome_extension_url +"Images/bptf_price_icon.png'></img><span style='font-size: "+fontsize+"px;float:left; margin-left:10px;margin-top:5px'>"+itemPrice+"</span></td></tr>"+
                                                 "<tr><td><span style='font-size:10px; margin-bottom:5px;margin-left:5px;margin-right:5px;'>Prices Updated: "+new Date(localStorage.getItem('backpackPriceCache')*1).toLocaleDateString()+" @ "+new Date(localStorage.getItem('backpackPriceCache')*1).toLocaleTimeString()+"</span></td></tr></table></div>");
        }
    }
}


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

/*!
 * jQuery Style Listener
 * http://techfoobar.com/jquery-style-listener/
 * 
 * Copyright (c) 2013 Vijayakrishnan Krishnan
 * Released under the MIT License
 * http://techfoobar.com/jquery-style-listener/LICENSE.MIT
 */
(function(c){c.fn.styleListener=function(f){if(typeof f=="object"){var g=(f.styles!=undefined&&c.isArray(f.styles))?f.styles:[],h=(f.changed!=undefined&&typeof f.changed=="function")?f.changed:function(){},e=f.interval!=undefined?f.interval:250;this.each(function(){var i=c(this);b(i,g);d(i,g,h,e)})}else{if(typeof f=="string"){switch(f){case"destroy":this.each(function(){var i=c(this);if(i.data("stlI")!=undefined){i.removeData("stlI")}if(i.data("stliT")!=undefined){clearInterval(i.data("stliT"));i.removeData("stliT")}});break}}}};function b(f,g){var h={},e;for(e=0;e<g.length;e++){h[g[e]]=a(f.get(0))[g[e]]}f.data("stlI",h)}function d(f,g,i,e){var h=setInterval(function(){var j="not-set",k,l="";for(k=0;k<g.length;k++){l=f.data("stlI")[g[k]];j=a(f.get(0))[g[k]];if(l!==j){i(g[k],j,l,f)}f.data("stlI")[g[k]]=j}},e);f.data("stliT",h)}function a(e){var f=null;if(window.getComputedStyle&&typeof window.getComputedStyle=="function"){f=window.getComputedStyle(e)}else{if(e.currentStyle){f=e.currentStyle}}return f}})(jQuery);