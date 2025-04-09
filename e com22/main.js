// Shared application state and initialization
window.App = {
    products: [
        {
            id: 1,
            title: "Wireless Noise Cancelling Headphones",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
            description: "Premium wireless headphones with active noise cancellation and 30-hour battery life."
        },
        {
            id: 2,
            title: "Smart Watch with Fitness Tracker",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
            description: "Stay connected with notifications, track your workouts, and monitor your health."
        },
        {
            id: 3,
            title: "Compact Bluetooth Speaker",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600",
            description: "Portable speaker with 12-hour playtime and waterproof design."
        },
        {
            id: 4,
            title: "Professional DSLR Camera",
            price: 899.99,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
            description: "Capture stunning photos with this 24MP DSLR camera with 4K video."
        },
        {
            id: 5,
            title: "Ergonomic Wireless Keyboard",
            price: 79.99,
            image: "https://th.bing.com/th/id/OIP.87x5HHSAX8_a3fN3hdAVBQHaE8?w=254&h=180&c=7&r=0&o=5&pid=1.7",
            description: "Comfortable split-design keyboard with quiet mechanical switches."
        },
        {
            id: 6,
            title: "Ultra HD 4K Monitor",
            price: 399.99,
            image: "https://th.bing.com/th?q=Gaming+PC+Monitor+4K&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=PK&setlang=en&adlt=strict&t=1&mw=247",
            description: "27-inch 4K monitor with HDR support and 99% sRGB color accuracy."
        },
        {
            id: 7,
            title: "Wireless Gaming Mouse",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
            description: "High-precision gaming mouse with customizable RGB lighting."
        },
        {
            id: 8,
            title: "External SSD Drive",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600",
            description: "1TB portable SSD with blazing fast transfer speeds."
        },
        {
            id: 9,
            title: "Noise Cancelling Earbuds",
            price: 149.99,
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
            description: "True wireless earbuds with active noise cancellation."
        },
        {
            id: 10,
            title: "Mechanical Keyboard",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
            description: "RGB mechanical keyboard with customizable switches."
        },
        {
            id: 11,
            title: "Portable Charger",
            price: 39.99,
            image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600",
            description: "10000mAh power bank with fast charging capability."
        },
        {
            id: 12,
            title: "Smart Home Hub",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600",
            description: "Control all your smart devices from one central hub."
        }
    ],
    cart: JSON.parse(localStorage.getItem('cart')) || []
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count on page load
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
});

// Initialize search after products load
if (document.getElementById('search-input')) {
    import('./js/search.js').then(module => {
        // Cleanup previous search when navigating in SPA
        if (window.searchCleanup) window.searchCleanup();
    });
}










































