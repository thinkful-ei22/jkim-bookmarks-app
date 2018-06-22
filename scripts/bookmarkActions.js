'use strict';
/* global store, $,  api, */


const bookmarkActions = function() {

  const generateBookmarkHtml = function(bookmarksList) {

    let bookmarkHtml = bookmarksList.map(item => {
      if (item.expanded) {
        return `<li data-item-id='${item.id}'>
        <h3 class='expandable'>${item.title}</h3>
        <p>${item.rating} star(s)</p>
        <p>${ item.desc ? item.desc : '' }</p>
        <p><a href='${item.url}' target='_blank'>Visit</a></p>
        <button class='js-delete-button' type='button'>Delete</button>
      </li>`;
      } else {
        return `<li data-item-id='${item.id}'>
        <h3 class='expandable'>${item.title}</h3>
        <p>${item.rating} star(s)</p>
      </li>`;
      }
    });

    return bookmarkHtml;
  };

  const render = function() {

    const bookmarkButton = '<button class=\'js-add-bookmark-button\' type=\'button\'>Add Bookmark</button>';

    const bookmarkForm = `<form id='js-add-form'>
    <fieldset>
      <p>Create a new bookmark:</p>
        <input id='js-title' type='text' placeholder='Title'> <br>
        <input id='js-url' type='text' placeholder='URL'> <br>
        <textarea rows=5 columns=200 placeholder="Description"></textarea>
        <p>Star rating:</p>
        <input type='radio' name='rating' value='1 star'> 1 
        <input type='radio' name='rating' value='2 stars'> 2
        <input type='radio' name='rating' value='3 stars'> 3
        <input type='radio' name='rating' value='4 stars'> 4
        <input type='radio' name='rating' value='5 stars'> 5 <br>
        <input type='submit'>
        <input type ='submit' value = 'Cancel' id = 'cancel'>
    </fieldset>
  </form>`;
    
    const minimumRating = `<form id='css-rating' name='minimumRating'>
        <div>
          <select id='js-minimum-rating'>
            <option>Minimum Rating</option>
            <option value='1 star'>1 star</option>
            <option value='2 stars'>2 stars</option>
            <option value='3 stars'>3 stars</option>
            <option value='4 stars'>4 stars</option>
            <option value='5 stars'>5 stars</option>
            <option value='1 star'>View All</option>
          </select>
          </div>
          </form>`;
      
    let chosenElements = store.bookmarksList.filter( item => item.rating >= store.minRating);

    const htmlElements = generateBookmarkHtml(chosenElements);

    if (store.isAdding) {
      $('.js-add-buttons').html(bookmarkForm + minimumRating);
      $('.js-bookmarks').html(htmlElements);
    } 
    else {
      $('.js-add-buttons').html(bookmarkButton + minimumRating);
      $('.js-bookmarks').html(htmlElements);
    }
  };

  const findBookmarkObject = function (id) {
    return store.bookmarksList.find(item => item.id === id);
  };

  const handleExpandBookmark = function () {
    $('.js-bookmarks').on('click', '.expandable', event => {
      let id = $(event.currentTarget).closest('li').data('item-id');
      let isExpanding = findBookmarkObject(id);
      store.expandBookmark(isExpanding);
      render();
    });
  };

  const handleAddingBookmark = function () {
    $('.js-add-buttons').on('click', '.js-add-bookmark-button', event => {
      store.toggleIsAdding();
      render();
    });
  };

  const handleSubmitBookmark = function () {
    $('.js-add-buttons').on('submit', '#js-add-form', event => {
      event.preventDefault();
      let rating = $('input[type=radio][name=rating]:checked').val();
      rating = parseInt(rating.split(' ')[0]);
      const newBookmark = {
        title: $('#js-title').val(),
        url: $('#js-url').val(),
        desc: $('#js-desc').val(),
        rating: rating
      };
      
      api.createBookmark(newBookmark, item => {
        store.addBookmark(item);
        store.toggleIsAdding();
        render();
      });
      if (!newBookmark.title || !newBookmark.url || !newBookmark.rating) {
        alert('Please fill in every field');
      }
    });
  };

  const handleCancelClicked = function () {
    $('.js-add-buttons').on('submit', '#js-add-form#cancel', function(event) {
      store.isAdding = !store.isAdding;
      render();
    });
  };

  const handleMinRating = function () {
    $('.js-add-buttons').on('change', '#js-minimum-rating', event => {
      let selectedRating = $('#js-minimum-rating').val();
      selectedRating = parseInt(selectedRating.split(' ')[0]);
      store.minRating = selectedRating;
      render();
    });
  };

  const handleDeleteBookmark = function () {
    $('.js-bookmarks').on('click', '.js-delete-button', event => {
      let deletedId = $(event.currentTarget).closest('li').data('item-id');
      api.deleteBookmark(deletedId, () => {
        store.deleteBookmark(deletedId);
        render();
      });
    });
  };


  const bindEventListeners = function () {
    handleExpandBookmark();
    handleAddingBookmark();
    handleSubmitBookmark();
    handleMinRating();
    handleDeleteBookmark();
    findBookmarkObject();
    handleCancelClicked();
  };


  return {
    render,
    bindEventListeners,
  };

}();