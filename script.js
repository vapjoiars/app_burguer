function calculateTotal() {
  const burgerType = document.getElementById('burgerType');
  const selectedOption = burgerType.options[burgerType.selectedIndex];
  const price = parseFloat(selectedOption.getAttribute('data-price'));
  const quantity = parseInt(document.getElementById('quantity').value);
  const totalPrice = price * quantity;
  document.getElementById('totalPrice').textContent = `Total: R$${totalPrice.toFixed(2)}`;
}

function copyPixKey() {
  const pixKey = document.getElementById('pixKey').textContent;
  const tempInput = document.createElement('input');
  tempInput.value = pixKey;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('Chave Pix copiada: ' + pixKey);
}

function orderBurger(latitude, longitude) {
  const customerName = document.getElementById('customerName').value;
  if (customerName.trim() === "") {
      alert("Por favor, insira seu nome.");
      return;
  }

  const phoneNumber = '55984250248';
  const burgerType = document.getElementById('burgerType').value;
  const quantity = document.getElementById('quantity').value;
  const totalPrice = document.getElementById('totalPrice').textContent.split(': R$')[1];
  const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const message = `Olá, meu nome é ${customerName}. Gostaria de pedir ${quantity} ${burgerType}(s). Total: R$${totalPrice}. Minha localização: ${locationLink}.`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });
  } else {
      alert("Geolocalização não é suportada por este navegador.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  orderBurger(latitude, longitude);
}

function showError(error) {
  let errorMsg = "";
  switch(error.code) {
      case error.PERMISSION_DENIED:
          errorMsg = "Usuário negou a solicitação de Geolocalização.";
          break;
      case error.POSITION_UNAVAILABLE:
          errorMsg = "Informações de localização não estão disponíveis.";
          break;
      case error.TIMEOUT:
          errorMsg = "A solicitação para obter a localização do usuário expirou.";
          break;
      case error.UNKNOWN_ERROR:
          errorMsg = "Ocorreu um erro desconhecido.";
          break;
  }
  alert(errorMsg);
}

document.addEventListener('DOMContentLoaded', calculateTotal);
