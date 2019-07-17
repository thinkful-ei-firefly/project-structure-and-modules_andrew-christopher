'use strict';

const STORE = {
  items: [
    {id: cuid(), name: "apples", checked: false, meetsSearchCritera: false},
    {id: cuid(), name: "oranges", checked: false, meetsSearchCritera: false},
    {id: cuid(), name: "milk", checked: true, meetsSearchCritera: false},
    {id: cuid(), name: "bread", checked: false, meetsSearchCritera: false}
  ],
  hideCompleted: false,
  searchInProgress: false
};

function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="Edit js-item-edit">
            <span class="button-label">Edit</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');

  // set up a copy of the store's items in a local variable that we will reassign to a new
  // version if any filtering of the list occurs
  let filteredItems = STORE.items;

  // if the `hideCompleted` property is true, then we want to reassign filteredItems to a version
  // where ONLY items with a "checked" property of false are included
  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  if (STORE.searchInProgress) {
      filteredItems = filteredItems.filter(item => item.meetsSearchCritera);
  }

  // at this point, all filtering work has been done (or not done, if that's the current settings), so
  // we send our `filteredItems` into our HTML generation function 
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false, meetsSearchCritera: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
}


function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}


// name says it all. responsible for deleting a list item.
function deleteListItem(itemId) {
  console.log(`Deleting item with id  ${itemId} from shopping list`)

  // as with `addItemToShoppingLIst`, this function also has the side effect of
  // mutating the global STORE value.
  //
  // First we find the index of the item with the specified id using the native
  // Array.prototype.findIndex() method. Then we call `.splice` at the index of 
  // the list item we want to remove, with a removeCount of 1.
  const itemIndex = STORE.items.findIndex(item => item.id === itemId);
  STORE.items.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in STORE
    const itemIndex = getItemIdFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
  });
}

// Toggles the STORE.hideCompleted property
function toggleHideFilter() {
  STORE.hideCompleted = !STORE.hideCompleted;
}

// Places an event listener on the checkbox for hiding completed items
function handleToggleHideFilter() {
  $('.js-hide-completed-toggle').on('click', () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

//User can type in a search term and the displayed list will be filtered by ITEM NAMES only containing that search term
function searchForItem() {
    //On button "Search for Item" submitted
    $('#js-search-item').submit(function(e) {
        e.preventDefault();
        const searchQuery = $('.js-search-item').val();
        const searchable = STORE.items;
        for (let i = 0; i < searchable.length; i++){
            //Search each Item name and compare against input
            let currentItem = searchable[i];
            currentItem.meetsSearchCritera = ((currentItem.name).includes(searchQuery));
            }
        STORE.searchInProgress = true;
        renderShoppingList();
})}

function exitSearch() {
    //On button "exit search mode" clicked,
    $('#js-search-item').on('click', '#exit-search-button', e => {
        event.preventDefault();
        STORE.searchInProgress = false;
        renderShoppingList();
    })
}


//User can edit the title of an item
function EditItemTitle() {
    $('.js-shopping-list').on('click', '.js-item-edit', e => {
        const itemID = getItemIdFromElement(e.currentTarget);
        const itemIndex = STORE.items.findIndex(item => item.id === itemID);
        let thisItem = STORE.items[itemIndex];
        let input = prompt(`Please Enter the New Item Name for '${thisItem.name}'`, thisItem.name)
        thisItem.name = input;
        renderShoppingList();

    })}



// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideFilter();
  searchForItem();
  exitSearch();
  EditItemTitle();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
