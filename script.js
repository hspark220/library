let myLibrary = [];

//initializing elements and selectors
const body = document.querySelector('body');
const library = document.createElement('div');
const inputField = document.createElement('fieldset');
const titleLabel = document.createElement('label');
const inputTitle = document.createElement('input');
const authorLabel = document.createElement('label');
const inputAuthor = document.createElement('input');
const submitBookBtn = document.createElement('input');
const addBookBtn = document.createElement('input');

//appending selectors
titleLabel.append('Title')
authorLabel.append('Author')
body.append(library, addBookBtn);

//setting attributes
titleLabel.setAttribute('for','input-title')
authorLabel.setAttribute('for','input-author')
inputTitle.setAttribute('type', 'text');
inputTitle.setAttribute('id', 'input-title');
inputAuthor.setAttribute('type', 'text');
inputAuthor.setAttribute('id', 'input-author');
submitBookBtn.setAttribute('type', 'button');
submitBookBtn.setAttribute('id', 'submit-book');
addBookBtn.setAttribute('type', 'button');
addBookBtn.setAttribute('id', 'addBook');

library.classList.add('library');


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
    body.appendChild(inputField);
    inputField.append(titleLabel, inputTitle, authorLabel, inputAuthor, submitBookBtn);
}

const submitBook = () => {
    
    const tempTitle = document.getElementById('input-title');
    const tempAuthor = document.getElementById('input-author');
    if(tempTitle.value == '') {return}; 
    if(tempAuthor.value == '') { tempAuthor.value = 'anonymous'};

    const tempBook = new Book(tempTitle.value, tempAuthor.value);
    myLibrary.push(tempBook);
    tempTitle.value = '';
    tempAuthor.value = '';
    clearScreen();
    printLibrary();
    removeSubmitForm();

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

const removeSubmitForm = () => {
    inputField.removeChild(titleLabel, inputTitle, authorLabel, inputAuthor);
    titleLabel.remove();
    inputField.remove();
}

//Events
addBookBtn.addEventListener('click', addBookToLibrary);
submitBookBtn.addEventListener('click', submitBook);


