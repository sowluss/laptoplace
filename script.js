// Variables
const items = document.querySelector('#stock-list');






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
        getItemInfo(item);
    
        //  reads HTML information of the selected item

        function getItemInfo(item) {
            console.log(item);
        }
}
}
