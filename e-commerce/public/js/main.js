//Headers Scroll
let header = document.querySelector("header")

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})
// Products Arrays
const products = [
    {
        "id": 1,
        "title": "Nike React Infinity Run",
        "brand": "NIKE",
        "gender": "MEN",
        "category": "RUNNING",
        "price": 16000,
        "is_in_inventory": true,
        "items_left": 3,
        "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
        "slug": "nike-react-infinity-run-flyknit",
        "featured": 0
    },
    {
        "id": 2,
        "title": "Nike React Miler",
        "brand": "NIKE",
        "gender": "MEN",
        "category": "RUNNING",
        "price": 13000,
        "is_in_inventory": true,
        "items_left": 3,
        "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg",
        "slug": "nike-react-miler",
        "featured": 0
    },
    {
        "id": 3,
        "title": "Nike Air Zoom Pegasus 37",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "RUNNING",
        "price": 12000,
        "is_in_inventory": true,
        "items_left": 3,
        "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-33b0a0a5-c171-46cc-ad20-04a768703e47/air-zoom-pegasus-37-womens-running-shoe-Jl0bDf.jpg",
        "slug": "nike-air-zoom-pegasus-37",
        "featured": 0
    },
    {
        "id": 4,
        "title": "Nike Joyride Run Flyknit",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "RUNNING",
        "price": 18000,
        "is_in_inventory": true,
        "items_left": 3,
        "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99a7d3cb-e40c-4474-91c2-0f2e6d231fd2/joyride-run-flyknit-womens-running-shoe-HcfnJd.jpg",
        "slug": "nike-joyride-run-flyknit",
        "featured": 0
    },
    {
        "id": 5,
        "title": "Nike Mercurial Vapor 13 Elite FG",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "FOOTBALL",
        "price": 25000,
        "is_in_inventory": true,
        "items_left": 3,
        "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg",
        "slug": "nike-mercurial-vapor-13-elite-fg",
        "featured": 0
    },
    {
        "id": 6,
        "title": "Nike Phantom Vision Elite Dynamic Fit FG",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "FOOTBALL",
        "price": 15000,
        "is_in_inventory": true,
        "items_left": 3,
        "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/s1amp7uosrn0nqpsxeue/phantom-vision-elite-dynamic-fit-fg-firm-ground-soccer-cleat-19Kv1V.jpg",
        "slug": "nike-phantom-vision-elite-dynamic-fit-fg",
        "featured": 0
    },
    {
        "id": 7,
        "title": "Nike Phantom Venom Academy FG",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "FOOTBALL",
        "price": 80000,
        "is_in_inventory": true,
        "items_left": 3,
        "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/whegph8z9ornhxklc8rp/phantom-venom-academy-fg-firm-ground-soccer-cleat-6JVNll.jpg",
        "slug": "nike-phantom-venom-academy-fg",
        "featured": 0
    },
    {
        "id": 8,
        "title": "Nike Mercurial Vapor 13 Elite Tech Craft FG",
        "brand": "NIKE",
        "gender": "MEN",
        "category": "FOOTBALL",
        "price": 145000,
        "is_in_inventory": true,
        "items_left": 3,
        "image": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/vhbwnkor8sxt8qtecgia/mercurial-vapor-13-elite-tech-craft-fg-firm-ground-soccer-cleat-l38JPj.jpg",
        "slug": "nike-mercurial-vapor-13-elite-tech-craft-fg",
        "featured": 0
    }
];


//get the product list and elements

const productList = document.getElementById('productList')
const cartItemsElement = document.getElementById('cartItems')
const cartTotalElement = document.getElementById('cartTotal')

//  Store Cart Items In Local Storage

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Render Product On Page
function renderProducts() {
    productList.innerHTML = products
        .map((product) => `
    <div class="product">
    <img src="${product.image}" alt="${product.title}" class="product-img">
    <div class="product-info">
      <h2 class="product-title">${product.title}</h2>
      <p class="product-price">${product.price.toLocaleString('en-In', {
            maximumFractions: 2,
            style: 'currency',
            currency: 'INR'
        })}</p>
      <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
    </div>
  </div>
    `)
        .join("");
    ///Add to cart

    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (let i = 0; i < addToCartButtons.length; i++) {
        const addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener('click', addToCart)
    }
}

// Add to cart

function addToCart(event) {
    const productID = parseInt(event.target.dataset.id);

    const product = products.find((product) => product.id === productID);

    if (product) {
        //If  product already in cart
        const existingItem = cart.find((item) => item.id === productID);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            }
            cart.push(cartItem);
        }
        //change add to cart text to added
        event.target.textContent = 'Added';
        updateCartIcon();
        SaveToLocalStorage();
        rednerCartItems();
        calculateCartTotal();
    }
}

function removeFromCart(event) {
    const productID = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productID);
    SaveToLocalStorage();
    rednerCartItems();
    calculateCartTotal();
    updateCartIcon();


}
// Quantity change
function changeQuantity(event) {
    const productID = parseInt(event.target.dataset.id);
    const quantity = parseInt(event.target.value)

    if (quantity > 0) {
        const cartItem = cart.find((item) => item.id === productID);
        cartItem.quantity = quantity;
        SaveToLocalStorage();
        calculateCartTotal();
        updateCartIcon();

    }
}

//SaveToLocalStorage

function SaveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

//Render product on cart page
function rednerCartItems() {
    cartItemsElement.innerHTML = cart.map((item) => `
        <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" />
            <div class="cart-item-info">
              <h2 class="cart-item-title">${item.title}</h2>
              <input
                class="cart-item-quantity"
                type="number"
                min="1"
                name=""
                value="${item.quantity}"
                data-id="${item.id}"
              />
            </div>
            <h2 class="cart-item-price">${item.price.toLocaleString('en-In', {
        maximumFractionsDigits: 2,
        style: 'currency',
        currency: 'INR'
    })}</h2>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
          </div>
        `
    )
        .join("");

    //Remove  From cart
    const removeButtons = document.getElementsByClassName('remove-from-cart');
    for (let i = 0; i < removeButtons.length; i++) {
        const removeButton = removeButtons[i];
        removeButton.addEventListener('click', removeFromCart)
    }

    // Quantity change
    const quantityInputs = document.querySelectorAll('.cart-item-quantity')
    quantityInputs.forEach((input) => {
        input.addEventListener('change', changeQuantity)
    })

}

//calculate total

function calculateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Total: ${total.toLocaleString('en-In', {
        maximumFractionsDigits: 2,
        style: 'currency',
        currency: 'INR'
    })}`;
}

//Check If On cart page
if (window.location.pathname.includes("cart.html")) {
    rednerCartItems();
    calculateCartTotal();
} else if (window.location.pathname.includes("success.html")) {
    clearCart();
} else {
    renderProducts();
}

// Empty cart on successfull payment
function clearCart() {
    cart = [];
    SaveToLocalStorage();
    updateCartIcon();

}


//cart icon quantity
const cartIcon = document.getElementById('cart-icon')

function updateCartIcon() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartIcon.setAttribute('data-quantity', totalQuantity)
}

updateCartIcon()

function updateCartIconOnCartChange() {
    updateCartIcon();
}

window.addEventListener('storage', updateCartIconOnCartChange);

function updateCartIcon() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    const cartIcon = document.getElementById('cart-icon')
    cartIcon.setAttribute(
        'data-quantity', totalQuantity
    )
}
