document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const moreItemsSections = document.querySelectorAll('.more-items-section');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => 
        {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            productCards.forEach(card => card.style.display = 'none');
            moreItemsSections.forEach(section => section.style.display = 'none');

            if (filterValue === 'all') {
                productCards.forEach(card => card.style.display = 'block');
            } else {
                productCards.forEach(card => {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    }
                });
                const targetSection = document.getElementById(`more-${filterValue}`);
                if (targetSection) {
                    targetSection.style.display = 'grid'; 
                }
            }
        });
    });
    
    const searchInput = document.querySelector('.search-input');
    const categoryFilter = document.querySelectorAll('.search-filter')[0];
    const priceFilter = document.querySelectorAll('.search-filter')[1];
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;
        
        // Combine all product cards (original and 'more items') for search
        const allDisplayableCards = document.querySelectorAll('.products-grid .product-card');

        allDisplayableCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productCategory = card.getAttribute('data-category');
            const productPriceText = card.querySelector('.product-price') ? card.querySelector('.product-price').textContent : '';
            const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, ''));
            
            const categoryMatch = selectedCategory === 'all' || productCategory === selectedCategory;
            
            let priceMatch = true;
            if (selectedPrice === 'under10') {
                priceMatch = productPrice < 99; // Adjust price ranges to match your HTML
            } else if (selectedPrice === '10-20') {
                priceMatch = productPrice >= 99 && productPrice <= 250;
            } else if (selectedPrice === '20-30') {
                priceMatch = productPrice >= 250 && productPrice <= 500;
            } else if (selectedPrice === 'over30') {
                priceMatch = productPrice > 500;
            }
            
            const searchMatch = productName.includes(searchTerm);
            
            // Only show cards that match the current category filter from the buttons
            const activeFilterButton = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            const buttonCategoryMatch = activeFilterButton === 'all' || productCategory === activeFilterButton;

            if (categoryMatch && priceMatch && searchMatch && buttonCategoryMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Hide all 'more items' sections during search to prevent displaying hidden categories
        moreItemsSections.forEach(section => section.style.display = 'none');
    }
    
    searchInput.addEventListener('input', performSearch);
    categoryFilter.addEventListener('change', performSearch);
    priceFilter.addEventListener('change', performSearch);
    
    const inquiryForm = document.querySelector('.inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Thank you for your inquiry! We will contact you soon.');
            this.reset();
        });
    }
    
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productDesc = productCard.querySelector('.product-desc').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            alert(`Quick View: ${productName}\n\n${productDesc}\n\nPrice: ${productPrice}`);
        });
    });

    document.querySelector('.filter-btn[data-filter="all"]').click();
});