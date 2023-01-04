let myLibrary = [];

function Book(title, author) {
    this.title = title
    this.author = author
}

Book.prototype.getTitle = function() {
    return this.title;
}

function addBookToLibrary() {

}

// temporary manual books
const book1 = new Book('book1', 'jasper');
const book2 = new Book('book2', 'jasper');
myLibrary.push(book1, book2);
console.log(myLibrary);

//Query selectors and elements
const library = document.querySelector('.library');

//printing the library
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

