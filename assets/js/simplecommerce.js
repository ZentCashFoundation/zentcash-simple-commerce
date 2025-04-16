  window.onload = function () {
        const addressInput = document.getElementById("address");
        const paymentIdASCIIInput = document.getElementById("paymentIdASCII");
        
        paymentIdASCIIInput.addEventListener("input", function () {
        const paymentIdASCII = paymentIdASCIIInput.value.trim();
        const paymentIdHex = asciiToHex(paymentIdASCII).slice(0, 64).padEnd(64, '20');
        paymentId.value = paymentIdHex;
        document.getElementById("paymentId").value = paymentIdHex;
        });

        const savedAddress = localStorage.getItem("zentcash_address");
        if (savedAddress) {
        addressInput.value = savedAddress;
        }

        addressInput.addEventListener("input", function () {
        localStorage.setItem("zentcash_address", addressInput.value.trim());
        });
  };

  window.addEventListener('DOMContentLoaded', applySettingsState);

  function generate() {
    const coinUtils = new ZentCashUtils.CryptoNote()
    const address = document.getElementById("address").value.trim();
    const paymentId = document.getElementById("paymentId").value.trim();

    if ( address.length !== 97) {
      alert("Please enter a valid address.");
      return;
    }

    if (paymentId.length !== 64 && paymentId.length !== 0) {
      alert("Payment ID must be 64 characters long or empty.");
      return;
    }

    localStorage.setItem("zentcash_address", address);
    const integratedAddress = coinUtils.createIntegratedAddress(address, paymentId);
    document.getElementById("integrated-address").innerText = integratedAddress;

    QRCode.toCanvas(document.getElementById('qrcode'), integratedAddress, function (error) {
      if (error) console.error(error);
      console.log("QR generado");
    });
  }

  function settings() {
    const elements = document.querySelectorAll('.settings');
    let shouldShow = true;
  
    if (elements.length && getComputedStyle(elements[0]).display !== 'none') {
      shouldShow = false;
    }
  
    elements.forEach(el => {
      el.style.display = shouldShow ? 'block' : 'none';
    });
  
    localStorage.setItem('settingsView', shouldShow);
  }

  function applySettingsState() {
    const view = localStorage.getItem('settingsView') === 'true';
    document.querySelectorAll('.settings').forEach(el => {
      el.style.display = view ? 'block' : 'none';
    });
  }

  function asciiToHex(str) {
    return Array.from(str)
      .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }