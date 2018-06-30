'use strict';
/* global  $ api store */
// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  function generateItemElement(item) {
    return `
      <li class='js-item-element' data-item-id='${item.id}'>         
        <h2 class='js-title'>${item.title} </h2>      
        <div class='rating'>Rating: ${item.rating} stars</div> 
        <div class='${item.collapsed ? 'hidden' : ''}'>               
          <p>${item.desc}</p>
          <a href='${item.url}' target='_blank'><button>Visit</button></a>
          <button class='js-delete-button'>Delete Bookmark</button>
        </div>
      </li>
    `;
  }

  function generateCreateBookmarkForm() {
    return `
    <div>
    <form class='js-create-form'>
      <label>Title:<input class='create-title' required type='text' placeholder='espn'></label>
      <label>Url:<input class='create-url' required type='url' placeholder='https://www.espn.com'></label>
      <label>Description:</label><textarea rows=5 columns=200 required type='text' placeholder="Description" class ='create-description'></textarea>
      <label>Rating:<select name='rating' class='create-rating'>
          <option value='5'>5 stars</option>
          <option value='4'>4 stars</option>
          <option value='3'>3 stars</option>
          <option value='2'>2 stars</option>
          <option value='1'>1 star</option>
        </select></label>
      <button class='submit'>Add Bookmark</button>
    </form>
    </div>
    `;
  }

  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }

  function render() {

    let items = store.items;
    const isExpanding = generateCreateBookmarkForm();

    if (store.isAdding) {
      $('.create-form').html(isExpanding);
    }

    items = items.filter(element => element.rating >= store.filterLevel);

    const bookmarkListString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListString);

  }


  function handleToggleCollapsed() {
    $('.js-bookmark-list').on('click', '.js-title', event => {
      const id = getItemIdFromElement(event.currentTarget);
      store.toggleExpanded(id);
      render();
    });
  }

  function handleDelete() {
    $('.js-bookmark-list').on('click', '.js-delete-button', event => {
      if (confirm('Are you sure?') ) {
        const id = getItemIdFromElement(event.currentTarget);
        api.deleteBookmark(id, () => {
          store.deleteBookmarkStore(id);
          render();
            
        });
      } 
    });
  }

  function handleCreateBookmark() {
    $('.container').on('click', '.create-bookmark', event => {
      event.preventDefault();
      store.toggleAddForm();
      render();
    });
  }


  function handleCreateFormSubmit() {
    $('.container').on('submit', 'form', event => {
      event.preventDefault();
      const title = $('.create-title').val();
      const url = $('.create-url').val();
      const description = $('.create-description').val();
      const rating = $('.create-rating').val();

      if (store.items) {
        const formData = {
          'title': title,
          'url': url,
          'desc': description,
          'rating': rating
        };


        const refresh = function () {
          api.getItems((items) => {
            store.items = [];
            items.forEach((item) => store.addItem(item));
            render();

          });
        };

        api.createBookmark(formData, refresh);

      } else {
        store.createFormChecker = false;
        render();
      }
    });
  }


  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  function filterByRating() {
    $('.createNewAndFilter').on('change', '.select-rating-filter', event => {
      const filterValue = +$('.select-rating-filter option:selected').val();
      store.filterLevel = filterValue;
      render();

    });
  }

  function bindEventListeners() {
    handleToggleCollapsed();
    getItemIdFromElement();
    handleDelete();
    handleCreateBookmark();
    generateCreateBookmarkForm();
    handleCreateFormSubmit();
    filterByRating();


  }

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
})();
