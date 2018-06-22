'use strict';
/* global bookmarkActions, api, store */



$(document).ready(function () {
  bookmarkActions.bindEventListeners();
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach(bookmark => store.addBookmark(bookmark));
    bookmarkActions.render();
  });
});