if(typeof(Storage)!=="undefined")
{
	chrome.storage.local.set({'steamTools':"True"});
	chrome.storage.local.set({'outpostBump':"False"});
	chrome.storage.local.set({'outpostTools':"True"});
}
else
{
// Sorry! No web storage support..
}