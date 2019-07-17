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
  return {items, hideCompleted, searchTerm};
}() );