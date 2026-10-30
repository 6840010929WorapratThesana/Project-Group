/* ==========================================
   ก๋วยเตี๋ยวซิ่ง - Interactive Cart Script
   ========================================== */

let cart = [];

function addCustomToCart(itemName, itemPrice, soupSelectId, noodleSelectId) {
  const soup = document.getElementById(soupSelectId).value;
  const noodle = document.getElementById(noodleSelectId).value;
  
  const fullTitle = `${itemName} (${noodle} + ซุป${soup})`;
  
  cart.push({
    name: fullTitle,
    price: itemPrice
  });

  updateCartUI();
  alert(`เพิ่ม "${fullTitle}" ลงในตะกร้าซิ่งเรียบร้อยแล้ว!`);
}

function addSideToCart(itemName, itemPrice) {
  cart.push({
    name: itemName,
    price: itemPrice
  });

  updateCartUI();
  alert(`เพิ่ม "${itemName}" ลงในตะกร้าซิ่งเรียบร้อยแล้ว!`);
}

function updateCartUI() {
  const cartBadge = document.getElementById('cartBadge');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');

  cartBadge.innerText = cart.length;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p class="text-secondary text-center my-3">ยังไม่มีรายการในตะกร้า</p>';
    cartTotalPrice.innerText = '฿0';
    return;
  }

  let listHTML = '<ul class="list-group list-group-flush bg-transparent">';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    listHTML += `
      <li class="list-group-item bg-transparent text-light d-flex justify-content-between align-items-center border-secondary px-0">
        <div>
          <span class="fw-bold d-block">${item.name}</span>
        </div>
        <div class="d-flex align-items-center">
          <span class="text-warning me-3 fw-bold">฿${item.price}</span>
          <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="removeFromCart(${index})">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </li>
    `;
  });

  listHTML += '</ul>';
  cartItemsList.innerHTML = listHTML;
  cartTotalPrice.innerText = `฿${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function checkout() {
  if (cart.length === 0) {
    alert('กรุณาเลือกรายการอาหารใส่ตะกร้าก่อนสั่งซื้อครับ');
    return;
  }
  
  alert('ขอบคุณที่สั่งซื้อก๋วยเตี๋ยวซิ่ง! เรือซิ่งกำลังออกบึ่งไปส่งคุณถึงหน้าบ้านแล้วครับ 🏎️💨');
  cart = [];
  updateCartUI();
  
  const cartModalEl = document.getElementById('cartModal');
  const modal = bootstrap.Modal.getInstance(cartModalEl);
  if (modal) {
    modal.hide();
  }
}