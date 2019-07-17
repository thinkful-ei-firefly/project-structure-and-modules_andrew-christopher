'use strict';

const STORE = (function () {
  
  const foo = "bar";
  
  let items = [
    {id: cuid(), name: "apples", checked: false, isEditing: false},
    {id: cuid(), name: "oranges", checked: false, isEditing: false},
    {id: cuid(), name: "milk", checked: true, isEditing: false},
    {id: cuid(), name: "bread", checked: false, isEditing: false}
  ];
  let hideCompleted = false;
  let searchTerm = null;
  
  function findById() {
    return items.find((item) => id === item.id); 
  }

  function addItem(name) {
    try {
      item.validateName(name);
      this.items.push(item.create(name));
    }
    catch(error) {
      console.log(`Cannot add item: ${error.message}`)
    }
    
    function findAndToggleChecked(id) {
      this.findById(id).checked = !this.findById(id).checked;
    }
  }

    function findAndUpdateName(id, newName) {
      try {
        item.validateName(newName);
        this.findById(id).name = newName;
      }
      catch(error) {
        console.log(`Cannot update name: ${error.message}`);
      }

    function findAndDelete(id) {
      this.items = this.items.filter(item => item.id !== id);
    }

    function toggleCheckedFilter() {
      this.hideCheckedItems = !this.hideCheckedItems;
    }

    function setSearchTerm(val) {
      STORE.searchTerm = val;
    }

  }

  return {items,
      hideCompleted,
      searchTerm,
      findById,
      addItem,
      findAndToggleChecked,
      findAndUpdateName,
      findAndDelete,
      toggleCheckedFilter,
      setSearchTerm
  };
}());

