'use strict';
/* global bookmarkActions, api, store */



$(document).ready(function () {
  // call to the API and get the current data. 
  bookmarkActions.bindEventListeners();
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach(bookmark => store.addBookmark(bookmark));
    bookmarkActions.render();
  });
});