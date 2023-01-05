let myLibrary = [];

function Book(title, author) {
    this.title = title
    this.author = author
}

Book.prototype.getTitle = function() {
    return this.title;
}

function addBookToLibrary() {
    clearScreen();

    const tempTitle = document.getElementById('input-title');
    const tempAuthor = document.getElementById('input-author');
    const tempBook = new Book(tempTitle.value, tempAuthor.value);
    myLibrary.push(tempBook);
    
    printLibrary();
}

// temporary manual books
const book1 = new Book('book1', 'jasper');
const book2 = new Book('book2', 'jasper');
myLibrary.push(book1, book2);
console.log(myLibrary);

//Query selectors and elements
const library = document.querySelector('.library');
const addBookBtn = document.getElementById('addBook');
const inputTitle = document.getElementById('input-title');

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

const clearScreen = () => {
    const oldBooks = document.querySelectorAll('.book');
    oldBooks.forEach(oldBook => {
        oldBook.remove();
    });
}


addBookBtn.addEventListener('click', addBookToLibrary);

