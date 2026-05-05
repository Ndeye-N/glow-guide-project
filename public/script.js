/**
 * Name: Ndeye Maguette Ndiaye
 * Date: 05.04.2026
 * CSC 372-01
 * Description: Main frontend logic for GlowGuide and handles Skincare Shelf (Full CRUD) and Inspiration API.
 */

async function fetchProducts() {
    const shelfContainer = document.getElementById('shelfContainer');
    if (!shelfContainer) return;

    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        
        shelfContainer.innerHTML = products.map(p => `
            <div class="product-card" id="product-${p.id}">
                <div id="view-mode-${p.id}">
                    <h3>${p.name}</h3>
                    <p><strong>Brand:</strong> ${p.brand}</p>
                    <p><strong>Type:</strong> ${p.type}</p>
                    <div class="card-actions">
                        <button onclick="showEditForm(${p.id})" class="edit-btn">Edit</button>
                        <button onclick="deleteProduct(${p.id})" class="delete-btn">Delete</button>
                    </div>
                </div>
                <div id="edit-mode-${p.id}" style="display: none;">
                    <input type="text" id="edit-name-${p.id}" value="${p.name}" class="edit-input">
                    <input type="text" id="edit-brand-${p.id}" value="${p.brand}" class="edit-input">
                    <input type="text" id="edit-type-${p.id}" value="${p.type}" class="edit-input">
                    <div class="card-actions">
                        <button onclick="saveEdit(${p.id})" class="save-btn">Save</button>
                        <button onclick="hideEditForm(${p.id})" class="cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error loading shelf:', err);
    }
}

function showEditForm(id) {
    document.getElementById(`view-mode-${id}`).style.display = 'none';
    document.getElementById(`edit-mode-${id}`).style.display = 'block';
}

function hideEditForm(id) {
    document.getElementById(`view-mode-${id}`).style.display = 'block';
    document.getElementById(`edit-mode-${id}`).style.display = 'none';
}

async function saveEdit(id) {
    const newName = document.getElementById(`edit-name-${id}`).value;
    const newBrand = document.getElementById(`edit-brand-${id}`).value;
    const newType = document.getElementById(`edit-type-${id}`).value;

    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: newName, 
                brand: newBrand, 
                type: newType 
            })
        });

        if (response.ok) {
            console.log("Update successful");
            fetchProducts();
        } else {
            alert("Could not update the product in the database.");
        }
    } catch (err) {
        console.error('Update failed:', err);
    }
}

async function deleteProduct(id) {
    if (confirm("Are you sure you want to remove this product?")) {
        try {
            await fetch(`/api/products/${id}`, { method: 'DELETE' });
            fetchProducts(); 
        } catch (err) {
            console.error('Delete failed:', err);
        }
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
        } catch (err) { console.error('Error adding product:', err); }
    });
}

async function getInspiration() {
    const quoteDisplay = document.getElementById('quote-box');
    if (!quoteDisplay) return; 
    try {
        const res = await fetch('https://api.quotable.io/random?tags=inspirational');
        const data = await res.json();
        quoteDisplay.innerText = `"${data.content}" — ${data.author}`;
    } catch (err) { 
        quoteDisplay.innerText = "Be kind to your skin today. — GlowGuide"; 
    }
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        alert("Logging out...");
        window.location.href = 'login.html'; 
    });
}
fetchProducts();
getInspiration();