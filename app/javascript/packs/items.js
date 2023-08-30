
document.addEventListener('DOMContentLoaded', () => {
  // Grab elements
  const newItemButton = document.getElementById('new-item-button');
  const newItemModal = document.getElementById('new-item-modal');
  const newItemForm = document.getElementById('new-item-form');
  const editItemButtons = document.querySelectorAll('.edit-item-button');
  const editItemModal = document.getElementById('edit-item-modal');
  const editItemForm = document.getElementById('edit-item-form');
  const deleteItemButtons = document.querySelectorAll('.delete-item-button');
  const itemList = document.getElementById('item-list');
  const closeButtons = document.querySelectorAll('.close-modal-button');
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  // Function to open the "New Item" modal
  newItemButton.addEventListener('click', () => {
    newItemModal.style.display = 'block';
  });
  // Function to open the "Edit Item" modal
  editItemButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.id;
      const userId = button.dataset.userId;
      const url = `/items/${itemId}/current_user_selected_item.json`;

      fetch(url)
        .then(response => response.json())
        .then(item => {
          const form = editItemForm;
          form.dataset.itemId = itemId;
          form.dataset.userId = userId;
          editItemForm.action = `/items/${itemId}/update_item`;
          form.querySelector('[name="item[name]"]').value = item.name;
          form.querySelector('[name="item[cost_price]"]').value = item.cost_price;
          form.querySelector('[name="item[sale_price]"]').value = item.sale_price;
          form.querySelector('[name="item[category]"]').value = item.category;
          editItemModal.style.display = 'block';
        });
    });
  });
  editItemForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(editItemForm);
    const itemId = editItemForm.dataset.itemId;

    fetch(`/items/${itemId}/update_item`, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': csrfToken,
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(response => response.json())
    .then(updatedItem => {
      // Update the item's details in the table without reloading the page
      const itemRow = document.querySelector(`tr[data-id="${itemId}"]`);
      itemRow.querySelector('.item-name').textContent = updatedItem.name;
      itemRow.querySelector('.item-cost-price').textContent = updatedItem.cost_price;
      itemRow.querySelector('.item-sale-price').textContent = updatedItem.sale_price;
      itemRow.querySelector('.item-category').textContent = updatedItem.category;

      // Close the modal
      editItemModal.style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
  });

  // Function to close the modals when clicking outside of them
  window.addEventListener('click', event => {
    if (event.target === newItemModal || event.target === editItemModal) {
      newItemModal.style.display = 'none';
      editItemModal.style.display = 'none';
    }
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      newItemModal.style.display = 'none';
      editItemModal.style.display = 'none';
    });
   });

  newItemForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(newItemForm);
    fetch('/items', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': '<%= form_authenticity_token %>',
        'Accept': 'application/json'
      },
      body: formData
    })
      .then(response => response.json())
      .then(item => {
        // Append the new item to the list without reloading the page
        console.log("adding new item")
        const newRow = itemList.insertRow();
        newRow.innerHTML = `
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.category}</td>
          <td>
            <button class="edit-item-button" data-id="${item.id}">Edit</button>
            <button class="delete-item-button" data-id="${item.id}">Delete</button>
          </td>
        `;

        // Reset the form and close the modal
        newItemModal.style.display = 'none';
      })
      .catch(error => console.error('Error:', error));
  });

  // Function to perform AJAX delete
  deleteItemButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.id;
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      if (confirm('Are you sure you want to delete this item?')) {
        fetch(`/items/${itemId}`, { 
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
            'Accept': 'application/json'
          }
        })
          .then(() => {
            // Remove the item row from the table without reloading the page
            const row = button.parentNode.parentNode;
            row.remove();
          })
          .catch(error => console.error('Error:', error));
      }
    });
   });
   
});
