var run= "False";
function inject_page_script () { 
    // script_file lives in the extension 
    script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", chrome.extension.getURL("SteamTrade/SteamTradeInject.js"));
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
}
chrome.storage.local.get('steamTools',function(data){
	if(data.steamTools == "True"){
		inject_page_script();
	}
});