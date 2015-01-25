
function inject_page_script_new () { 
    // script_file lives in the extension 
    script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", chrome.extension.getURL("Outpost/outpostInjectNew.js"));
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
}

chrome.storage.local.get('outpostTools',function(data){
	if(data.outpostTools == "True"){
		inject_page_script_new();
	}
});

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