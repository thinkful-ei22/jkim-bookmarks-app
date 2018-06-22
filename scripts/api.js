'use strict';
/* global  */



const api = function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jon';

  const getBookmarks = function(callback) {
  
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'GET',
      success: callback,
    });
  };

  const createBookmark = function (name, callback) {
    
    const newBookmark = JSON.stringify(name);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
    });
  };

  const deleteBookmark = function (id, callback) {
    

    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback,
    });
  };

  
  return {
    getBookmarks,
    createBookmark,
    deleteBookmark
  };
}();