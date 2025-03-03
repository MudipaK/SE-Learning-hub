document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and certification cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');
    const certCategories = document.querySelectorAll('.cert-category');

    // Register certification content with global search
    if (window.searchableContentRegistry) {
        const certificationContent = [];
        
        // Create searchable entries for all certifications
        certCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const category = card.getAttribute('data-category');
            const link = card.querySelector('.cert-btn').getAttribute('href');
            
            certificationContent.push({
                title: title,
                description: description,
                url: 'certifications.html#' + category,
                keywords: [
                    title,
                    category,
                    'certification',
                    'certificate',
                    card.querySelector('.cert-level').textContent
                ]
            });
        });
        
        // Add categories themselves
        certCategories.forEach(category => {
            const categoryId = category.id;
            const categoryTitle = category.querySelector('h2').textContent;
            
            certificationContent.push({
                title: categoryTitle,
                description: `${categoryTitle} and related certifications`,
                url: 'certifications.html#' + categoryId,
                keywords: [categoryTitle, 'certifications', 'certificates', categoryId]
            });
        });

        // Register with global search
        window.searchableContentRegistry.registerContent('certifications', certificationContent);
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // First, hide all categories
            certCategories.forEach(category => {
                category.style.display = 'none';
            });

            // Show all categories for 'all' filter
            if (filter === 'all') {
                certCategories.forEach(category => {
                    category.style.display = 'block';
                });
                return;
            }

            // For specific filters, show relevant categories and cards
            if (filter === 'free') {
                document.getElementById('free-certifications').style.display = 'block';
            } else {
                // Show category based on filter
                certCategories.forEach(category => {
                    if (category.id.includes(filter)) {
                        category.style.display = 'block';
                    }
                });
            }

            // Handle individual cards visibility
            certCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (categories && categories.includes(filter)) {
                    card.closest('.cert-category').style.display = 'block';
                }
            });
        });
    });

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const noResultsMessage = document.querySelector('.no-results-message');

    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        let hasResults = false;

        if (searchTerm === '') {
            certCards.forEach(card => {
                card.style.display = 'block';
                card.closest('.cert-category').style.display = 'block';
            });
            noResultsMessage.classList.remove('show');
            return;
        }

        certCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category').toLowerCase();
            
            if (cardTitle.includes(searchTerm) || 
                cardDesc.includes(searchTerm) || 
                cardCategory.includes(searchTerm)) {
                card.style.display = 'block';
                card.closest('.cert-category').style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
                // Only hide category if all its cards are hidden
                const category = card.closest('.cert-category');
                const visibleCards = category.querySelectorAll('.cert-card[style="display: block"]');
                if (visibleCards.length === 0) {
                    category.style.display = 'none';
                }
            }
        });

        // Show/hide no results message
        if (!hasResults) {
            noResultsMessage.classList.add('show');
        } else {
            noResultsMessage.classList.remove('show');
        }
    }

    // Handle form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    // Real-time search
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    // Reset search when clicking filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            searchInput.value = '';
            noResultsMessage.classList.remove('show');
        });
    });

    // Handle direct navigation from search
    if (window.location.hash) {
        const category = window.location.hash.substring(1);
        const filterButton = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all certification cards
    certCards.forEach(card => observer.observe(card));

    // Sticky header adjustment
    const navbar = document.querySelector('.main-nav');
    const filters = document.querySelector('.cert-filters');
    const headerHeight = navbar.offsetHeight;

    filters.style.top = `${headerHeight}px`;

    // Handle scroll for sticky filters
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (scrollPos > headerHeight) {
            filters.classList.add('sticky');
        } else {
            filters.classList.remove('sticky');
        }
    });

    // Rating stars interaction
    const stars = document.querySelectorAll('.stars');
    stars.forEach(starContainer => {
        const rating = parseInt(starContainer.textContent.match(/★/g).length);
        starContainer.innerHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    });
});