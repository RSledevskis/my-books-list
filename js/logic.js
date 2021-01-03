let selectedBookstId = null;

// Book Class: Represents a Book
class Schema {
    constructor(id, title, author, year, available) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.year = year;
      this.available = available;
    }
  }
  
  // UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
      books.forEach((book) => UI.addBookToList(book));
    }

    static removeBooks() {
      let el = document.querySelector('#book-list');
      while(el.hasChildNodes()) {
        el.removeChild(el.firstChild);
      }
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td style="display: none";>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>${book.available}</td>
        <td><a href="#" class="btn btn-primary a-btn-slide-text">Edit</a></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
        el.parentElement.parentElement.remove();
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      setTimeout(() => {
          document.querySelector('.alert').remove();
      }, 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#year').value = '';
      document.querySelector('#available').value = '';

      selectedBookstId = null;
    }

    static setEditedBookMode(book) {
      document.querySelector('#title').value = book[0].title;
      document.querySelector('#author').value = book[0].author;
      document.querySelector('#year').value = book[0].year;
      document.querySelector('#available').value = book[0].available;

      document.querySelector('input[class*="secondary"]').classList.remove("disabled");
      document.querySelector('input[class*="primary"]').classList.add("disabled");
    }

    static updateEditableBook(book, title, author, year, available) {
      book[0].title = title;
      book[0].author = author;
      book[0].year = year;
      book[0].available = available;

      document.querySelector('input[class*="secondary"]').classList.add("disabled");
      document.querySelector('input[class*="primary"]').classList.remove("disabled");

      return book;
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;

      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }

    static getBook(id) {
        let books = Store.getBooks();
        let selectedBook = books.filter(obj => obj.id === id);
        return selectedBook;
    };
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    };
  
    static removeBook(id) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.id === id) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }

    static updateBook(book) {
        const books = Store.getBooks();
        const elementsIndex = books.findIndex(elementment => elementment.id === selectedBookstId);

        books[elementsIndex].title = book[0].title;
        books[elementsIndex].author = book[0].author;
        books[elementsIndex].year = book[0].year;
        books[elementsIndex].available = book[0].available;

        localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('#book-form > input[value="Add Book"]').addEventListener('click', (e) => {
    e.preventDefault();
    randomId = Math.floor(Math.random() * 1000);
      
    const id = randomId.toString();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    const available = document.querySelector('#available').value;
      
    if (title === '' || author === '' || year === '' || available === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      const book = new Schema(id, title, author, year, available);
    
      UI.addBookToList(book);
      Store.addBook(book);
      UI.showAlert('Book Added', 'success');
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
    const selectedElement = e.target;

    if (selectedElement.classList.contains('delete')) {
        UI.deleteBook(selectedElement);
        Store.removeBook(
            selectedElement.parentElement.parentNode.firstElementChild.textContent
        );
        UI.showAlert('Book Removed!', 'success');
      }
  });

  // Event: Retrieve book data 
  document.querySelector('#book-list').addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-primary')) {
        selectedBookstId = e.target.parentElement.parentNode.firstElementChild.textContent;
        let requestedBook = Store.getBook(selectedBookstId);
        UI.setEditedBookMode(requestedBook);
    }
});

// Event: Update book
document.querySelector('#book-form > input[value="Update info"]').addEventListener('click', (e) => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    const available = document.querySelector('#available').value;
  
    if (title === '' || author === '' || year === '' || available === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      let requestedBook = Store.getBook(selectedBookstId);
      const updatedBook = UI.updateEditableBook(requestedBook, title, author, year, available);

      Store.updateBook(updatedBook);
      UI.clearFields();
      UI.showAlert('Book Updated!', 'success');
      UI.removeBooks();
      UI.displayBooks();
    }
});

