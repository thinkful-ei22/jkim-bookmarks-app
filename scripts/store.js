'use strict';
/* global bookmarkActions, */

// const store = {
//   list: [{
//      "title": "title",
//      "url": "url",
//      }],
//   expanded: false
//   isAdding: false,
//   minRating: false
// }


const store = function() {

  const addBookmark = function(bookmark) {
    // push bookmarks to the store array 
    bookmark.expanded = false;
    store.bookmarksList.push(bookmark);
  };

  const deleteBookmark = function (deletedId) {
    // remove bookmarks from the store array
    store.bookmarksList = store.bookmarksList.filter(item => item.id !== deletedId);
  };  

  const expandBookmark = function (isExpanding) {
    // show detailed view of the chosen bookmark
    if (isExpanding.expanded === false) {
      isExpanding.expanded = true;
    } else {
      isExpanding.expanded = false;
    }
  };

  const toggleIsAdding = function() {
    this.isAdding = !this.isAdding;
  };


  return {
    bookmarksList: [],
    isAdding: false,
    minRating: 1,

    addBookmark,
    deleteBookmark,
    expandBookmark,
    toggleIsAdding,
  };

}();





