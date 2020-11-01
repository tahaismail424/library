let myLibrary = [];
const libTable = document.querySelector('.library');
const newBookButton = document.querySelector('.new-book');
let trash = document.getElementsByClassName('trash-button');
let toggleRead = document.getElementsByClassName('toggle-read')

function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this["page count"] = pageCount;
    this["read status"] = read;
}

const deathlyHollows = new Book("Harry Potter and the Sorcer's Stone",
"J.K. Rowling", 607, true);

const theHobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, true);

const prideAndPrejudice = new Book("Pride and Prejudice", "Jane Austen",
432, false);

myLibrary.push(deathlyHollows);
myLibrary.push(theHobbit);
myLibrary.push(prideAndPrejudice);

updateLibrary();

newBookButton.addEventListener('click', addNewBook);

function addNewBook() {
    let newBook = new Book();
    for (let i in newBook) {
        do {

            newBook[i] = window.prompt(`Please enter ${i} of the book`)
            if (!validInput(newBook)) alert("Input was not valid. Please enter \
            a title, author, valid integer page count, and 'read' or 'not read' as to \
            whether you have read the book or not");
            if (newBook[i] === null) return;
            
        }

        while (!validInput(newBook));
    }
    newBook["read status"].toLowerCase === 'read' ? newBook["read status"] = true :
    newBook["read status"] = false;
    myLibrary.push(newBook); 
    updateLibrary();
}

function updateLibrary() {
    //clears table so not adding onto existing table
    while (libTable.rows.length > 1) {
        libTable.deleteRow(-1)
    }
    for (let book in myLibrary) {
        libTable.insertRow();
        let tmp = myLibrary[book];
        for (let attr in tmp) {
            let newAttr = libTable.rows[libTable.rows.length - 1].insertCell();
            //display yes or no depending on if I've read the book or not
            if (typeof(tmp[attr]) === 'boolean') {
                tmp[attr] ? newAttr.textContent = 'Yes' : 
                newAttr.textContent = 'No';
                let readButton = document.createElement("button");
                readButton.classList.add('toggle-read');
                readButton.addEventListener("click", changeReadStatus)
                newAttr.appendChild(readButton)
            }
    
            else newAttr.textContent = tmp[attr];
        }
        //add delete button for each book
        newAttr = libTable.rows[libTable.rows.length - 1].insertCell();
        let trashBook = document.createElement("button");
        trashBook.classList.add("trash-button")
        trashBook.addEventListener("click", deleteBook);
        newAttr.appendChild(trashBook)
    }
}

function validInput(bookInput) {

    let valid = false;

    for (let attr in bookInput) {
        if (bookInput[attr] !== undefined) {
            switch (attr) {
                case "title":
                    (typeof bookInput[attr] === 'string' || bookInput[attr] === null) ? 
                    valid = true : valid = false;
                    break;
                case "author":
                    (typeof bookInput[attr] === 'string' || bookInput[attr] === null) ? valid = true : valid = false;
                    break;
                case "page count":
                    let input;
                    (bookInput["page count"] !== null) ? input = parseInt(bookInput["page count"]) :
                    input = null;
                    (Number.isInteger(input) || input === null) ? valid = true: valid = false;
                    break;
                case "read status":
                    (bookInput["read status"].toLowerCase() === 'read' ||
                    bookInput["read status"].toLowerCase() === 'not read' ||
                    bookInput["read status"].toLowerCase() === 'notread' ||
                    bookInput["read status"].toLowerCase() === 'no') ? valid = true : valid = false;
                    break;
            }
        }
    }
    return valid;
}


function deleteBook(e) {
    let bookNo = e.target.parentNode.parentNode.rowIndex - 1;
    myLibrary.splice(bookNo, 1);
    updateLibrary();
}



function changeReadStatus(e) {
    let bookNo = e.target.parentNode.parentNode.rowIndex - 1;
    myLibrary[bookNo]["read status"] ? myLibrary[bookNo]["read status"] = false : 
    myLibrary[bookNo]["read status"] = true;
    updateLibrary();
}

