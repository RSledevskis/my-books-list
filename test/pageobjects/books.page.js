const Page = require('./page');

class BooksPage extends Page {

    get titleInputField () { return $('#title') };
    get authorInputField () { return $('#author') };
    get yearInputField () { return $('#year') };
    get availableBooksInputField () { return $('#available') };
    get addBoookBtn () { return $('input[value="Add Book"]') };
    get updateInfoBtn () { return $('input[value="Update info"]') };
    get firstBookToBeDeleted () { return $('td:last-child > a') };
    get firstBookToBeEdited () { return $('td:nth-child(6) > a') };
    get alertSuccess () { return $('div[class="alert alert-success"]') };

    addBook (title, author, year, availableBooks) {
        this.titleInputField.setValue(title);
        this.authorInputField.setValue(author);
        this.yearInputField.setValue(year);
        this.availableBooksInputField.setValue(availableBooks);

        this.addBoookBtn.click();
    }

    deleteBook () {
        this.firstBookToBeDeleted.click();
    }

    editBook (title, author, year, availableBooks) {
        this.firstBookToBeEdited.click();

        this.titleInputField.setValue(title);
        this.authorInputField.setValue(author);
        this.yearInputField.setValue(year);
        this.availableBooksInputField.setValue(availableBooks);

        this.updateInfoBtn.click();
    }

    open () {
        return super.open();
    }
}

module.exports = new BooksPage();