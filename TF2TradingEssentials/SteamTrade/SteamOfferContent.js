var run= "False";

function inject_page_script () {
	//Add temp storage div to transfer chrome extension url
    var $div = jQuery('<div />').appendTo('body');
    $div.attr('id', 'chrome_url');
    $div.attr('style', 'display: none;');
    $div.text(chrome.extension.getURL(""));

    // script_file lives in the extension
    script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", chrome.extension.getURL("SteamTrade/SteamOfferInject.js"));
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
}

if(typeof(Storage)!=="undefined")
{
	//Check to see if we need to update bp.tf prices
	if(localStorage.getItem('backpackPriceCache')){
        chrome.storage.local.get('backpackPriceCache', function(data){
        	if(parseInt(localStorage.getItem('backpackPriceCache'))<parseInt(data.backpackPriceCache) || !(localStorage.getItem('backpackPrices'))){
        		console.log("Updating Backpack.tf Prices");
        		localStorage.setItem('backpackPriceCache',data.backpackPriceCache);
        	}
        });
		 chrome.storage.local.get('backpackPrices', function(data){
        	localStorage.setItem('backpackPrices',data.backpackPrices);
        });
	}
	else{
		chrome.storage.local.get('backpackPriceCache', function(data){
        	localStorage.setItem('backpackPriceCache',data.backpackPriceCache);
        });
		chrome.storage.local.get('backpackPrices', function(data){
        	localStorage.setItem('backpackPrices',data.backpackPrices);
        });
	}

	//Check steam tool settings
	chrome.storage.local.get('steamTools',function(data){
		if(data.steamTools == "True"){
			inject_page_script();
		}
	});
}
else
{
// Sorry! No web storage support..
}