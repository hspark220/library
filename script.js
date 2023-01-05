let myLibrary = [];

function Book(title, author) {
    this.title = title
    this.author = author
}

Book.prototype.getTitle = function() {
    return this.title;
}
Book.prototype.getAuthor = function() {
    return this.author;
}

function addBookToLibrary() {
    clearScreen();

    showInputs();
    const tempTitle = document.getElementById('input-title');
    const tempAuthor = document.getElementById('input-author');
    const tempBook = new Book(tempTitle.value, tempAuthor.value);
    myLibrary.push(tempBook);
    tempTitle.value = '';
    tempAuthor.value = '';

    printLibrary();
}

//printing the library
const printLibrary = () => {
    for(let i = 0; i < myLibrary.length; i++) {
        const book = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
    
        book.classList.add('book');
    
        book.append(bookTitle, bookAuthor);
        library.appendChild(book);
    
        bookTitle.textContent =  `${myLibrary[i].title}`;
        bookAuthor.textContent = `${myLibrary[i].author}`; 
    }
}

//clear screen
const clearScreen = () => {
    const oldBooks = document.querySelectorAll('.book');
    oldBooks.forEach(oldBook => {
        oldBook.remove();
    });
}

//showing inputs to add books
const showInputs = () => {
    inputField = document.createElement('fieldset');
    titleLabel = document.createElement('label');
    inputTitle = document.createElement('input');
    authorLabel = document.createElement('label');
    inputAuthor = document.createElement('input');

    titleLabel.append('Title')
    titleLabel.setAttribute('for','input-title')
    authorLabel.append('Author')
    authorLabel.setAttribute('for','input-author')

    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('id', 'input-title');

    inputAuthor.setAttribute('type', 'text');
    inputAuthor.setAttribute('id', 'input-author');


    body.appendChild(inputField);
    inputField.append(titleLabel, inputTitle, authorLabel, inputAuthor);

}


//Query selectors and elements
const body = document.querySelector('body');
const library = document.createElement('div');
const addBookBtn = document.createElement('input');
addBookBtn.setAttribute('type', 'button');
addBookBtn.setAttribute('id', 'addBook');

library.classList.add('library');
body.append(library, addBookBtn);


//Events
addBookBtn.addEventListener('click', addBookToLibrary);

