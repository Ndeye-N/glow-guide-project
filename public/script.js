/**
 * Name: Ndeye Maguette Ndiaye
 * Date: 04.17.2026
 * CSC 372-01
 * Description: Main frontend logic for GlowGuide. Handles API requests for 
 * adding products, displaying the shelf, and fetching daily inspiration.
 */

async function fetchProducts() {
    const shelfContainer = document.getElementById('shelfContainer');
    if (!shelfContainer) return; // Exit if the container isn't on the current page

    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        
        shelfContainer.innerHTML = products.map(p => `
            <div class="product-card">
                <h3>${p.name}</h3>
                <p><strong>Brand:</strong> ${p.brand}</p>
                <p><strong>Type:</strong> ${p.type}</p>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error loading shelf:', err);
    }
}

const form = document.getElementById('productForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const newProduct = {
            name: document.getElementById('name').value,
            brand: document.getElementById('brand').value,
            type: document.getElementById('type').value
        };

        try {
            await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });

            form.reset();
            fetchProducts();
        } catch (err) {
            console.error('Error adding product:', err);
        }
    });
}

async function fetchQuote() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    if (!quoteText) return; 

    try {
        const res = await fetch('https://dummyjson.com/quotes/random');
        const data = await res.json();
        quoteText.innerText = `"${data.quote}"`;
        quoteAuthor.innerText = `- ${data.author}`;
    } catch (err) {
        quoteText.innerText = "Be kind to your skin today.";
    }
}

fetchProducts();
fetchQuote();