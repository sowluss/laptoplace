// Variables
const items = document.querySelector('#stock-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody');






// Event Listeners

loadEventListeners();

function loadEventListeners() {
    // when a new stock item is added
    items.addEventListener('click', buyItem);
}


// Functions

function buyItem(e) {
    e.preventDefault();
// use delegation to find the item that was added

if(e.target.classList.contains('add-to-cart')) {
        //  Read the item values
        const item = e.target.parentElement.parentElement;

        // read the values
        getLaptopInfo(item);
    
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
                        <img src="${item.image}" width=200>
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

        }


}
}
