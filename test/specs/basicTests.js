const BooksPage = require('../pageobjects/books.page');

describe('My Books List exists', () => {
    it('page should be opened', () => {
        BooksPage.open();
        expect(BooksPage.addBoookBtn).toBeExisting();
    });
});

describe('Add Book to My Books List', () => {
    it('book should be added', () => {
        BooksPage.open();
        expect(BooksPage.addBoookBtn).toBeExisting();
        BooksPage.addBook('Book test', 'Rainers Sledevskis', '2020', '1');
        browser.waitUntil(
            () => $('#book-list > tr').isDisplayed(),
            {
                timeout: 5000,
                timeoutMsg: 'Book text to be displayed after 5s'
            })
    });
});

describe('Edit Book from My Books List', () => {
    it('book should be edited', () => {
        BooksPage.open();
        expect(BooksPage.addBoookBtn).toBeExisting();
        browser.waitUntil(
            () => $('#book-list > tr').isDisplayed(),
            {
                timeout: 5000,
                timeoutMsg: 'Book text to be displayed after 5s'
            })
        BooksPage.editBook('Book test - edited', 'Rainers Sledevskis - edited', '2021', '10');
        expect($('td:nth-child(2)')).toHaveTextContaining('Book test - edited');
    });
});

describe('Remove Book from My Books List', () => {
    it('book should be deleted', () => {
        BooksPage.open();
        browser.waitUntil(
            () => $('#book-list > tr').isDisplayed(),
            {
                timeout: 5000,
                timeoutMsg: 'Book text to be displayed after 5s'
            })
        BooksPage.deleteBook();
        browser.waitUntil(
            () => BooksPage.alertSuccess.isDisplayed(),
            {
                timeout: 5000,
                timeoutMsg: 'Alert message to be displayed after 5s'
            })
    });
});