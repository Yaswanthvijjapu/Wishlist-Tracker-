document.getElementById('addItemButton').addEventListener('click', async function () {
    const itemName = document.getElementById('itemName').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const itemPrice = document.getElementById('itemPrice').value;
  
    // Validate form data
    if (itemName && itemCategory && itemPrice) {
      try {
        const response = await fetch('http://localhost:5000/api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: itemName,
            category: itemCategory,
            price: itemPrice,
          }),
        });
        
  
        const data = await response.json();
        if (data.success) {
          alert('Item added to wishlist!');
          window.close();  // Close the popup
        } else {
          alert('Error adding item');
        }
      } catch (error) {
        alert('Failed to add item');
        console.error(error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  });
  