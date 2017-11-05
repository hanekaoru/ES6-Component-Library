var cook = function (cks) {
	var ckarr = cks.split(';'), ck = {};
	if (ckarr.length) {
		for (var i = 0; i < ckarr.length; i++) {
			if (/backendlogin/i.test(ckarr[i]) && ckarr[i].indexOf('PageBackendLogin') == -1) {
				var subcks = ckarr[i].replace('BackendLogin=', '').split('&');
				if (subcks.length) {
					for (var j = 0; j < subcks.length; j++) {
						var ar = subcks[j], a = ar.indexOf('='), o = { 1: ar.substr(0, a), 2: ar.substr(a + 1) }
						ck[o[1].replace(/^\s*|\s*$/g, '')] = decodeURIComponent(o[2]) || '';
					}
					return ck;
				}
			}
		}
	}
	return false;
}(document.cookie);

export default cook;
