// VARIABLES
const items = document.querySelector('#stock-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');



// EVENT LISTENERS

loadEventListeners();

function loadEventListeners() {
    // when a new stock item is added
    items.addEventListener('click', buyItem);

    // when the remove button is clicked
    shoppingCartContent.addEventListener('click', removeItem);

    // ClearCart Button
    clearCartBtn.addEventListener('click', clearCart);

    //  Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}


// FUNCTIONS

function buyItem(e) {
    e.preventDefault();
    // use delegation to find the item that was added

    if (e.target.classList.contains('add-to-cart')) {
        //  Read the item values
        const item = e.target.parentElement.parentElement;

        // read the values
        getLaptopInfo(item);

    }
}

//  reads HTML information of the selected item

function getLaptopInfo(item) {
    //   create an object with item data
    const laptopInfo = {
        image: item.querySelector('img').src,
        name: item.querySelector('h5').textContent,
        price: item.querySelector('span').textContent,
        id: item.querySelector('button').getAttribute('data-id')
    }
    // Insert into the shopping cart
    addIntoCart(laptopInfo);
}
// Display the selected laptop in the shopping cart

function addIntoCart(item) {
    //  create a <tr>
    const row = document.createElement('tr');

    //  build a template 
    row.innerHTML = `
                <tr>
                    <td>
                        <img src="${item.image}" width=100>
                    </td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>
                    <a href="#" class="remove" data-id="${item.id}">X</a>
                    </td>
                </tr>
            `;

    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add item to the storage
    saveIntoStorage(item);
}

// Add items to the local storage
function saveIntoStorage(item) {
    let items = getItemsFromStorage();

    //  Get the item into array
    items.push(item);

    // since storage only contains strings, we have to convert JSON into string
    localStorage.setItem('items', JSON.stringify(items));
}

//   Get content from the storage
function getItemsFromStorage() {

    let items;

    // if something exists in the storage we get the value, otherwise create an empty array
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return (items);
}
 

//  remove item from the DOM
function removeItem(e) {
    let item, itemId;

    // Remove from the DOM
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        item = e.target.parentElement.parentElement;
        itemId = item.querySelector('a').getAttribute('data-id');
    }
    console.log(itemId);
    //  Remove from the Local Storage
    removeItemLocalStorage(itemId);
}
// Remove from Local Storage
function removeItemLocalStorage(id) {
    // get the Local Storage data
    let itemsLS = getItemsFromStorage();

    // Loop through the array and find the index to remove
    itemsLS.forEach(function(itemLS, index) {
        if(itemLS.id === id) {
            itemsLS.splice(index, 1);
        }
    });
   
    // Add the rest of the array 
    localStorage.setItem('items', JSON.stringify(itemsLS)); 
}

//  Clicking Cart Button clears shopping cart
function clearCart() {
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // Clear from Local Storage 
     clearLocalStorage();
}
    // Clears the whole local storage
    function clearLocalStorage() {
        localStorage.clear();
    }

//   Loads when document is ready and prints itms into shopping cart
function getFromLocalStorage() {
    let itemsLS = getItemsFromStorage();

    //  Loop throgh the items and print into the cart
    itemsLS.forEach(function (item) {
        //  create the <tr>
        const row = document.createElement('tr');

        // print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${item.image}" width=200>
                </td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                <a href="#" class="remove" data-id="${item.id}">X</a>
                </td>
            </tr>
            `;
             shoppingCartContent.appendChild(row); 
    });

    //  pops up an "added to cart message" when "Add to Cart" button is clicked
    $(function(){
        $('[data-toggle="popover"]').popover()
      });
}

