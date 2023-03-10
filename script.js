let myLibrary = [];
let id = null;

//initializing elements and selectors
const body = document.querySelector('body');
const library = document.querySelector('.library');
const addBookBtn = document.getElementById('add-book');
const inputField = document.createElement('fieldset');
const titleDiv = document.createElement('div');
const titleLabel = document.createElement('label');
const inputTitle = document.createElement('input');
const authorDiv = document.createElement('div');
const authorLabel = document.createElement('label');
const inputAuthor = document.createElement('input');
const submitBookBtn = document.createElement('input');
const editBookBtn = document.createElement('input');
const closeBtn = document.createElement('input');

const readDiv = document.createElement('div');
const readLabel = document.createElement('label');
const readCheck = document.createElement('input');


//appending selectors
titleLabel.append('Title:');
authorLabel.append('Author:');
readLabel.append('Read:')

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
editBookBtn.setAttribute('type', 'button');
editBookBtn.setAttribute('id', 'edit-submit');
editBookBtn.setAttribute('value','edit');
closeBtn.setAttribute('type','button');
closeBtn.setAttribute('id','close');
closeBtn.setAttribute('value','x');

readDiv.setAttribute('class','read-div');
readLabel.setAttribute('for','read-check');
readLabel.setAttribute('value','Read');
readCheck.setAttribute('id','read-check');
readCheck.setAttribute('type','checkbox');




function Book(title, author, read) {
    this.title = title
    this.author = author
    this.read = read
}

//shows the input box for adding books
function addBookToLibrary() {
    body.appendChild(inputField);
    inputField.append(titleDiv, authorDiv, readDiv, closeBtn, submitBookBtn);
    titleDiv.append(titleLabel, inputTitle);
    authorDiv.append(authorLabel, inputAuthor);
    readDiv.append(readLabel, readCheck);
    inputTitle.focus();
}

//actually submits the info and changes the screen?
const submitBook = () => {
    if(inputTitle.value == '') {return}; 
    if(inputAuthor.value == '') { inputAuthor.value = 'anonymous'};

    const tempBook = new Book(inputTitle.value, inputAuthor.value, readCheck.checked);
    myLibrary.push(tempBook);
    clearScreen();
    printLibrary();
    removeInputs();
}
const submitBookEnter = (e) => {
    const buttonID = e.target.parentNode.parentNode.lastChild.getAttribute('id');
    if (e.key=== "Enter") {
        if(buttonID === 'submit-book') {
            e.preventDefault();
            submitBook();
        } else {
            e.preventDefault();
            submitEdit();
        }
        
    }
}

const deleteBook = (e) => {
    id = e.target.parentNode.getAttribute('id');
    myLibrary.splice(id,1);
    e.target.parentNode.remove();
}

//pops up the edit box to edit the information
const editBook = (e) => {
    id = e.target.parentNode.getAttribute('id');
    inputTitle.value = myLibrary[id].title;
    inputAuthor.value = myLibrary[id].author;
    readCheck.checked = myLibrary[id].read;
    body.appendChild(inputField);
    inputField.append(titleDiv, authorDiv, readDiv, editBookBtn, closeBtn);
    titleDiv.append(titleLabel, inputTitle);
    authorDiv.append(authorLabel, inputAuthor);
    inputTitle.focus();
}



//submits the actual edit
const submitEdit = (e) => {
    myLibrary[id].title = inputTitle.value;
    myLibrary[id].author = inputAuthor.value;
    myLibrary[id].read = readCheck.checked;
    
    clearScreen();
    printLibrary();
    removeInputs();    
}

const checkBook = (e) => {
    id = e.target.parentNode.getAttribute('id');
    myLibrary[id].read = !myLibrary[id].read;
    console.log(myLibrary[id].read);
    e.target.value = myLibrary[id].read === true ? 'read' : 'not read';

    //add styling difference
}

//printing the library
const printLibrary = () => {
    for(let i = 0; i < myLibrary.length; i++) {
        const book = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const deleteBookBtn = document.createElement('input');
        const editBookBtn = document.createElement('input');
        
        const bookReadCheck = document.createElement('input');

        book.setAttribute('id',i);
        bookTitle.setAttribute('class','book-title');
        bookAuthor.setAttribute('class','book-author');
        deleteBookBtn.setAttribute('type','button')
        deleteBookBtn.setAttribute('id','delete-book');
        deleteBookBtn.setAttribute('value','x');
        editBookBtn.setAttribute('type','button')
        editBookBtn.setAttribute('id','edit-book');
        editBookBtn.setAttribute('value','edit');

        bookReadCheck.setAttribute('type', 'button');
        bookReadCheck.setAttribute('id','book-read-check');

        

        deleteBookBtn.addEventListener('click', deleteBook);
        editBookBtn.addEventListener('click', editBook);
        bookReadCheck.addEventListener('click',checkBook);
    
        book.classList.add('book');
    
        
        book.append(bookTitle, bookAuthor, bookReadCheck, deleteBookBtn, editBookBtn);
        library.appendChild(book);
    
        bookTitle.textContent =  `"${myLibrary[i].title}"`;
        bookAuthor.textContent = `-${myLibrary[i].author}`; 
        bookReadCheck.value = myLibrary[i].read === true ? 'read' : 'not read';
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
    inputTitle.value = '';
    inputAuthor.value = '';
    readCheck.checked = false;
    inputField.removeChild(inputField.lastChild);
    inputField.remove();
}



//Events
addBookBtn.addEventListener('click', addBookToLibrary);
submitBookBtn.addEventListener('click', submitBook);
editBookBtn.addEventListener('click', submitEdit);
closeBtn.addEventListener('click',removeInputs);
inputAuthor.addEventListener('keypress', submitBookEnter);
inputTitle.addEventListener('keypress', submitBookEnter);
