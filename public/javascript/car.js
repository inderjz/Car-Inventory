async function newCarHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('#car').value.trim();
    const car_model = document.querySelector('#model').value.trim();
    const price_paid = document.querySelector('#retail-price').value.trim();
    const resell_value = document.querySelector('#resale-price').value.trim();
    const notes = document.querySelector('#notes').value.trim();

    const response = await fetch(`/api/car`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        car_model,
        price_paid,
        resell_value,
        notes
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/inventory');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-car').addEventListener('submit', newCarHandler);