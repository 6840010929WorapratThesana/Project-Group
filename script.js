let cart = [];

function addCustomToCart(itemName, price, soupSelectId, noodleSelectId) {
    const soup = document.getElementById(soupSelectId).value;
    const noodle = document.getElementById(noodleSelectId).value;
    const fullName = `${itemName} (${soup} / ${noodle})`;
    
    cart.push({ name: fullName, price: price });
    updateCartUI();
}

function addSideToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const list = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalPrice');

    badge.innerText = cart.length;

    if (cart.length === 0) {
        list.innerHTML = `<p class="text-secondary text-center my-3">ยังไม่มีรายการในตะกร้า</p>`;
        totalEl.innerText = `฿0`;
        return;
    }

    let html = '<ul class="list-group list-group-flush bg-transparent">';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <li class="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center px-0">
                <div>
                    <span class="fw-bold">${item.name}</span>
                    <br><small class="text-warning">฿${item.price}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </li>
        `;
    });

    html += '</ul>';
    list.innerHTML = html;
    totalEl.innerText = `฿${total}`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}