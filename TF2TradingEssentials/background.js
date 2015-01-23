if(typeof(Storage)!=="undefined")
{
	chrome.storage.local.get('steamTools', function(obj) {
          if(obj.steamTools == null)
          	chrome.storage.local.set({'steamTools':'True'}, function(){ console.log("default steamTools value assigned"); });

    });

    chrome.storage.local.get('outpostTools', function(obj) {
          if(obj.outpostTools == null)
          	chrome.storage.local.set({'outpostTools':'True'}, function(){ console.log("default outpostTools value assigned"); });
    });
}
else
{
// Sorry! No web storage support..
}


// Listens when new request
chrome.webRequest.onHeadersReceived.addListener(function(details) {
  for (i = 0; i < details.responseHeaders.length; i++) {
 	//If the header is the csp
    if (isCSPHeader(details.responseHeaders[i].name.toUpperCase())) {
    	var csp = details.responseHeaders[i].value;
    	// edit connect-src to allow calls to steam rep
    	csp = csp.replace('connect-src', "connect-src 'self' https://steampowered.com https://*.steampowered.com https://steamcommunity.com https://steamrep.com http://steampowered.com http://*.steampowered.com http://steamcommunity.com http://steamrep.com http://backpack.tf 'unsafe-eval'");
    	details.responseHeaders[i].value = csp;
    }
  }
  //Add access control allow orgin header for steam api call
  details.responseHeaders.push({
  	name: "Access-Control-Allow-Origin",
    value: "*"
  });
  return { // Return the new HTTP header
    responseHeaders: details.responseHeaders
  };
}, {
  urls: ["*://steamcommunity.com/tradeoffer/*","*://steamcommunity.com/trade/*"],
  types: ["main_frame"]
}, ["blocking", "responseHeaders"]);
 
function isCSPHeader(headerName) {
  return (headerName == 'CONTENT-SECURITY-POLICY') || (headerName == 'X-WEBKIT-CSP');
}


//Update the backpack.tf local storage
function update_bptf_prices () {
	console.log("Updating Backpack.tf Prices")
	//Get the latest bp.tf prices
	try{
		$.ajax({
			url:"http://backpack.tf/api/IGetPrices/v3/?format=json&key=52b8b9224dd7b8fd458b4567&names=1",
			type:"GET",
			dataType:"json",
			success:function(data){
				if(data["response"]["success"]==1)
					chrome.storage.local.set({'backpackPrices':JSON.stringify(data)})
					chrome.storage.local.set({'backpackPriceCache':new Date().getTime()});
			},
			error:function(data){
				console.log(data);
			}
		});
		//chrome.storage.local.get(function(result){console.log(result)})
	}catch(err){console.log(err)} 
}

chrome.storage.local.get('backpackPriceCache', function(data){
	if(data.backpackPriceCache == null){
		update_bptf_prices();
	}
	else if((1000*60*60*24)+parseInt(data.backpackPriceCache)< parseInt(new Date().getTime())){
		update_bptf_prices();
	}
});

chrome.storage.local.get('backpackPrices', function(data){
	if(data.backpackPrices == null){
		update_bptf_prices();
	}
});