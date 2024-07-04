const modalOpen = document.querySelector('button[type="button"]');
const dialog = document.querySelector("dialog");
const modalClose = document.querySelector("span");

const form = document.querySelector("form");
const submitButton = form.querySelector('button[type="submit"]');

modalOpen.addEventListener("click", () => {
  dialog.showModal();
});

modalClose.addEventListener("click", () => {
  dialog.close();
});

const myLibrary = [];


class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
    toggleRead() {
        this.status = this.status === "Read" ? "Not read yet" : "Read";
    }
}

function addBookToLibrary() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let readingStatus = "";

    const radioCheck = form.querySelectorAll('input[type="radio"]');

    radioCheck.forEach((radio) => {
        if (radio.checked) readingStatus = radio.value;
    });


    let newBook = new Book(title, author, pages, readingStatus);

    if (title !== "" &&
        author !== "" &&
        pages !== "" &&
        readingStatus !== ""
    ) {
        myLibrary.push(newBook);
        render();
    }
    
    form.reset();
}


function toggleRead(index) {
    myLibrary[index].toggleRead();
    render();
}

function render() {
    let libraryEl = document.querySelector(".library > div");
    libraryEl.innerHTML = '';

    myLibrary.forEach((book, index) =>{
        const bookEl = document.createElement('div');
        bookEl.classList.add('bookEl');

        bookEl.innerHTML = `<h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Status:</strong> ${book.status}</p>`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.setAttribute('data-index', index);
        removeButton.textContent = 'Remove';
        
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-button');
        toggleButton.setAttribute('data-index', index);
        toggleButton.textContent = 
            book.status === 'Read' ? 'Mark not read' : 'Mark read';
        bookEl.appendChild(toggleButton);
        bookEl.appendChild(removeButton);
        libraryEl.appendChild(bookEl);    
        
    });

    const getAllRemoveButtons = document.querySelectorAll(".remove-button");
    getAllRemoveButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
        removeBook(index);
        });
    });

    const getToggleButtons = document.querySelectorAll('.toggle-button');
    getToggleButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            changeStatus(index);
        });
    });

}

function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
}

function changeStatus(index) {
    myLibrary[index].toggleRead();
    render();
}


submitButton.addEventListener("click", () => {
    addBookToLibrary();
});

