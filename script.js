let myLibrary = [];
let id = null;
let mouseDown = false;

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
const closeBtn = document.createElement('input');

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
inputField.setAttribute('id','input-field');
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
closeBtn.setAttribute('type','button');
closeBtn.setAttribute('id','close');
closeBtn.setAttribute('value','x');

library.classList.add('library');


function Book(title, author) {
    this.title = title
    this.author = author
}

//shows the input box for adding books
function addBookToLibrary() {
    body.appendChild(inputField);
    inputField.append(titleDiv, authorDiv, submitBookBtn, closeBtn);
    titleDiv.append(titleLabel, inputTitle);
    authorDiv.append(authorLabel, inputAuthor);
}

//actually submits the info and changes the screen?
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
    id = e.target.parentNode.getAttribute('id');
    console.log(id);
    myLibrary.splice(id,1);
    e.target.parentNode.remove();
}

//pops up the edit box to edit the information
const editBook = (e) => {
    id = e.target.parentNode.getAttribute('id');
    inputTitle.value = myLibrary[id].title;
    inputAuthor.value = myLibrary[id].author;
    body.appendChild(inputField);
    inputField.append(titleDiv, authorDiv, editBookBtn, closeBtn);
    titleDiv.append(titleLabel, inputTitle);
    authorDiv.append(authorLabel, inputAuthor);

}

//submits the actual edit
const submitEdit = (e) => {
    myLibrary[id].title = inputTitle.value;
    myLibrary[id].author = inputAuthor.value;

    clearScreen();
    printLibrary();
    removeInputs();

    inputTitle.value = '';
    inputAuthor.value = '';
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

//removing input from screen
const removeInputs = () => {
    inputField.removeChild(inputField.lastChild);
    inputField.remove();
}

const closeInputField = (e) => {
    console.log('close');
}

//Events
addBookBtn.addEventListener('click', addBookToLibrary);
submitBookBtn.addEventListener('click', submitBook);
editBookBtn.addEventListener('click', submitEdit);
closeBtn.addEventListener('click',removeInputs);

