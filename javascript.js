const addBookbtn = document.querySelector(".add-btn");
const dialog = document.querySelector(".add-dialog");
const closeButton = document.querySelector(".dialog-close-btn");
const commitButton = document.querySelector(".dialog-add-btn");
const cardsContainer = document.querySelector(".cards-container")

const myLibrary = [];

function Book(title, author, pages) {
    if (!new.target) {
        throw Error("You must use the 'new' Operator");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read = false;

    addBookToLibrary(this);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    renderCard(book);
}

function getBooks() {
    myLibrary.forEach(book => console.log(book));
}

function toggleRead(book) {
    book.read = book.read ? false : true;
}

commitButton.addEventListener("click", (e) => {
    const form = document.querySelector(".dialog-main")

    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const tileInput = document.querySelector("#title")
    const authorInput = document.querySelector("#author")
    const pagesInput = document.querySelector("#pages")

    const newbook = new Book(tileInput.value, authorInput.value, pagesInput.value);
    form.reset();
    dialog.close();
});

function renderCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", book.id);

    const title = document.createElement("div");
    title.classList.add("card-title");
    title.innerText = book.title;

    const author = document.createElement("div");
    author.classList.add("card-author");
    author.innerText = book.author;

    const pages = document.createElement("div");
    pages.classList.add("card-pages");
    pages.innerText = `${book.pages} Seiten`;

    const readButton = document.createElement("button");
    readButton.classList.add("card-read-btn");
    readButton.innerText = "not read";

    readButton.addEventListener("click", (e) => {
        toggleRead(book);
        if (book.read === true) {
            readButton.style.background = "green"
            readButton.innerText = "read";
        } else {
            readButton.style.background = "red"
            readButton.innerText = "not read";
        }
    })

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card-delete-btn");
    deleteButton.innerText = "delete";

    deleteButton.addEventListener("click", () => {
        card.remove();
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readButton);
    card.appendChild(deleteButton);

    const container = document.querySelector(".cards-container");
    container.appendChild(card);
}


addBookbtn.addEventListener("click", (e) => {
    dialog.showModal()
});

closeButton.addEventListener("click", (e) => {
    dialog.close();
});