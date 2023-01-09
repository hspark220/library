let myLibrary = [];

//initializing elements and selectors
const body = document.querySelector('body');
const library = document.createElement('div');
const inputField = document.createElement('fieldset');
const titleDiv = document.createElement('div');
const titleLabel = document.createElement('label');
const inputTitle = document.createElement('input');
const authorDiv = document.createElement('div');
const authorLabel = document.createElement('label');
const inputAuthor = document.createElement('input');
const submitBookBtn = document.createElement('input');
const addBookBtn = document.createElement('input');
const editBookBtn = document.createElement('input');

//appending selectors
titleLabel.append('Title')
authorLabel.append('Author')
body.append(library, addBookBtn);

//setting attributes
titleDiv.setAttribute('class','title-div');
authorDiv.setAttribute('class','author-div');
titleLabel.setAttribute('for','input-title');
authorLabel.setAttribute('for','input-author');
inputField.setAttribute('class','add-book-fieldset');
inputTitle.setAttribute('type', 'text');
inputTitle.setAttribute('id', 'input-title');
inputAuthor.setAttribute('type', 'text');
inputAuthor.setAttribute('id', 'input-author');
submitBookBtn.setAttribute('type', 'button');
submitBookBtn.setAttribute('id', 'submit-book');
submitBookBtn.setAttribute('value','submit');
addBookBtn.setAttribute('type', 'button');
addBookBtn.setAttribute('id', 'add-book');
addBookBtn.setAttribute('value', 'add book');
editBookBtn.setAttribute('type', 'button');
editBookBtn.setAttribute('id', 'edit-book');
editBookBtn.setAttribute('value','edit');

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
    inputField.append(titleDiv, authorDiv, submitBookBtn);
    titleDiv.append(titleLabel, inputTitle);
    authorDiv.append(authorLabel, inputAuthor);
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
    removeInputs();
    

}

const deleteBook = (e) => {
    const id = e.target.parentNode.getAttribute('id');
    myLibrary.splice(id,1);
    e.target.parentNode.remove();
    console.log(myLibrary);
}

const editBook = (e) => {
    body.appendChild(inputField);
    inputField.append(titleDiv, authorDiv, editBookBtn);
    titleDiv.append(titleLabel, inputTitle);
    authorDiv.append(authorLabel, inputAuthor);
}

const submitEdit = (e) => {
    console.log(e.target.getAttribute('type'));
    
}


//printing the library
const printLibrary = () => {
    for(let i = 0; i < myLibrary.length; i++) {
        const book = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const deleteBookBtn = document.createElement('input');
        const editBookBtn = document.createElement('input');

        book.setAttribute('id',i);
        deleteBookBtn.setAttribute('type','button')
        deleteBookBtn.setAttribute('id','delete-book');
        editBookBtn.setAttribute('type','button')
        editBookBtn.setAttribute('id','edit-book');

        deleteBookBtn.addEventListener('click', deleteBook);
        editBookBtn.addEventListener('click', editBook);
    
        book.classList.add('book');
    
        book.append(bookTitle, bookAuthor, deleteBookBtn, editBookBtn);
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

const removeInputs = () => {
    inputField.removeChild(submitBookBtn);
    inputField.remove();
}


//Events
addBookBtn.addEventListener('click', addBookToLibrary);
submitBookBtn.addEventListener('click', submitBook);
editBookBtn.addEventListener('click', submitEdit);


