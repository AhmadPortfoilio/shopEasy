// js/search.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    // Configuration
    const config = {
        minSearchLength: 2,
        maxResults: 5,
        debounceTime: 300
    };
    
    // State
    let searchTimeout;
    let activeResults = [];
    
    // Pre-process product data for search (runs once)
    const buildSearchIndex = () => {
        return App.products.map(product => ({
            id: product.id,
            searchText: `${product.title} ${product.description} ${product.category || ''}`.toLowerCase(),
            product: product
        }));
    };
    
    const searchIndex = buildSearchIndex();
    
    // Main search function
    const performSearch = (query) => {
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        // Hide results if query is too short
        if (query.length < config.minSearchLength) {
            hideResults();
            return;
        }
        
        // Use setTimeout for debouncing
        searchTimeout = setTimeout(() => {
            const results = searchProducts(query);
            displayResults(results);
        }, config.debounceTime);
    };
    
    // Product search logic
    const searchProducts = (query) => {
        const queryLower = query.toLowerCase();
        return searchIndex
            .filter(item => item.searchText.includes(queryLower))
            .slice(0, config.maxResults);
    };
    
    // Display results in UI
    const displayResults = (results) => {
        activeResults = results;
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = createNoResultsMessage();
        } else {
            results.forEach(result => {
                searchResults.appendChild(createResultElement(result));
            });
        }
        
        showResults();
        setupResultEventListeners();
    };
    
    // Create DOM elements
    const createResultElement = (result) => {
        const element = document.createElement('div');
        element.className = 'search-result-item';
        element.dataset.id = result.id;
        element.innerHTML = `
            <img src="${result.product.image}" alt="${result.product.title}" loading="lazy">
            <div class="search-result-info">
                <h4>${result.product.title}</h4>
                <p>$${result.product.price.toFixed(2)}</p>
            </div>
        `;
        return element;
    };
    
    const createNoResultsMessage = () => {
        return '<div class="no-results">No products found</div>';
    };
    
    // Event handlers
    const setupResultEventListeners = () => {
        activeResults.forEach(result => {
            const element = document.querySelector(`.search-result-item[data-id="${result.id}"]`);
            if (element) {
                element.addEventListener('click', () => {
                    openProductModal(result.product);
                    resetSearch();
                });
            }
        });
    };
    
    const resetSearch = () => {
        searchInput.value = '';
        hideResults();
    };
    
    // UI visibility control
    const showResults = () => {
        searchResults.style.display = 'block';
    };
    
    const hideResults = () => {
        searchResults.style.display = 'none';
    };
    
    // Click outside handler
    const handleClickOutside = (event) => {
        if (!event.target.closest('.search-container')) {
            hideResults();
        }
    };
    
    // Keyboard navigation
    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'Escape':
                hideResults();
                break;
            case 'Enter':
                performSearch(searchInput.value.trim());
                event.preventDefault();
                break;
        }
    };
    
    // Initialize event listeners
    const initEventListeners = () => {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value.trim());
        });
        
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value.trim());
        });
        
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= config.minSearchLength) {
                performSearch(searchInput.value.trim());
            }
        });
        
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
    };
    
    // Cleanup function (for SPA navigation)
    const cleanup = () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
    };
    
    // Initialize
    initEventListeners();
    
    // For SPA navigation, call cleanup() when leaving the page
    window.searchCleanup = cleanup;
});




document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const searchIcon = document.querySelector('.search-icon');
    
    // Configuration
    const config = {
        minSearchLength: 2,
        maxResults: 5,
        debounceTime: 300
    };
    
    // State
    let searchTimeout;
    let isSearching = false;

    // Build search index
    const buildSearchIndex = () => {
        return window.App.products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            searchText: `${product.title} ${product.description || ''} ${product.category || ''}`.toLowerCase()
        }));
    };

    const searchIndex = buildSearchIndex();

    // Search function
    const performSearch = (query) => {
        if (isSearching) return;
        
        clearTimeout(searchTimeout);
        
        if (query.length < config.minSearchLength) {
            hideResults();
            return;
        }
        
        showLoading();
        
        searchTimeout = setTimeout(() => {
            isSearching = true;
            const results = getSearchResults(query);
            displayResults(results);
            isSearching = false;
        }, config.debounceTime);
    };

    // Get search results
    const getSearchResults = (query) => {
        const queryLower = query.toLowerCase();
        return searchIndex
            .filter(item => item.searchText.includes(queryLower))
            .slice(0, config.maxResults);
    };

    // Display results
    const displayResults = (results) => {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No matching products found</div>';
        } else {
            results.forEach(product => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <div class="search-result-info">
                        <h4>${product.title}</h4>
                        <p>$${product.price.toFixed(2)}</p>
                    </div>
                `;
                item.addEventListener('click', () => {
                    if (window.openProductModal) {
                        window.openProductModal(
                            window.App.products.find(p => p.id === product.id)
                        );
                    }
                    resetSearch();
                });
                searchResults.appendChild(item);
            });
        }
        
        showResults();
        hideLoading();
    };

    // UI Helpers
    const showLoading = () => {
        searchBtn.classList.add('search-loading');
    };
    
    const hideLoading = () => {
        searchBtn.classList.remove('search-loading');
    };
    
    const showResults = () => {
        searchResults.style.display = 'block';
    };
    
    const hideResults = () => {
        searchResults.style.display = 'none';
    };
    
    const resetSearch = () => {
        searchInput.value = '';
        hideResults();
        searchInput.focus();
    };

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value.trim());
    });
    
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch(searchInput.value.trim());
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= config.minSearchLength) {
            performSearch(searchInput.value.trim());
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar-container')) {
            hideResults();
        }
    });
    
    // Keyboard Navigation
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideResults();
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        }
    });
    
    // Cleanup for SPA
    window.searchBarCleanup = () => {
        document.removeEventListener('click', hideResults);
    };
});