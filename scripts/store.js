'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {



  const addItem = function(item) {
    item.collapsed = true;
    this.items.push(item);
  };

  const toggleExpanded = function(id) {
    const Item = this.items.find(bookmark => bookmark.id === id);
    Item.collapsed = !Item.collapsed;
  };

  const deleteBookmarkStore = function(id) {
    const currentItem = this.items.find(bookmark => bookmark.id === id);
    const currentIndex = this.items.indexOf(currentItem);
    this.items.splice(currentIndex, 1);
  };

  const toggleAddForm = function() {
    this.isAdding = !this.isAdding;
  };


  return {
    items: [],
    isAdding: true,
    filterLevel: 1,
    createFormChecker: true,

    addItem,
    toggleExpanded,
    deleteBookmarkStore,
    toggleAddForm,

  };
}());