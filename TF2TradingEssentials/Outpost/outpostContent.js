var run= "False";
function inject_page_script () { 
    // script_file lives in the extension 
    script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", chrome.extension.getURL("Outpost/outpostInject.js"));
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
}
chrome.storage.local.get('outpostTools',function(data){
	if(data.outpostTools == "True"){
		inject_page_script();
	}
});