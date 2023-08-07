
//grab containers
document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.category-buttons');
  const itemButtonsContainer = document.querySelector('.Items');

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      const url = `/items/fetch_by_category?category=${encodeURIComponent(category)}`;

      // Fetch the CSRF token from the HTML meta tags
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Generate buttons for items with the same category
          const itemButtons = data.map((item) => {
            return `<button>${item.name}</button>`;
          });
          itemButtonsContainer.innerHTML = itemButtons.join('');
        })
        .catch((error) => console.error('Error:', error));
    });
  });
});