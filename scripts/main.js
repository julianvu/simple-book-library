let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    const hasRead = read ? "has been read" : "not read yet";
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      hasRead
    );
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary();
}

function deleteBookByTitle(title) {
  myLibrary = myLibrary.filter((book) => {
    console.log(book.title !== title);
    book.title !== title;
  });
  displayLibrary();
}

function displayLibrary() {
  const library = document.createElement("div");
  library.className = "row row-cols-4 g-5";
  myLibrary.forEach((book) => {
    const column = document.createElement("div");
    column.className = "col";
    const bookElement = document.createElement("div");
    bookElement.className = "card rounded-3";
    bookElement.style.width = "18rem";
    const bookElementHeader = document.createElement("div");
    bookElementHeader.className = "d-flex flex-row justify-content-between";
    const bookElementBody = document.createElement("div");
    bookElementBody.className = "card-body";
    const cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.textContent = book.title;

    const deleteCard = document.createElement("button");
    deleteCard.className = "btn-close";
    deleteCard.dataset.title = book.title;

    const cardAuthor = document.createElement("p");
    cardAuthor.textContent = book.author;
    const cardPages = document.createElement("p");
    cardPages.textContent = book.pages + " pages";
    const cardRead = document.createElement("p");
    cardRead.className = "d-flex align-items-center";
    cardRead.textContent = "Has been read: ";
    const readIcon = document.createElement("i");
    readIcon.className = book.read
      ? "bi bi-check text-success"
      : "bi bi-x text-danger";
    readIcon.style.fontSize = "2rem";
    cardRead.appendChild(readIcon);

    bookElementHeader.appendChild(cardTitle);
    bookElementHeader.appendChild(deleteCard);
    bookElementBody.appendChild(bookElementHeader);
    bookElementBody.appendChild(cardAuthor);
    bookElementBody.appendChild(cardPages);
    bookElementBody.appendChild(cardRead);
    bookElement.appendChild(bookElementBody);
    column.appendChild(bookElement);
    library.appendChild(column);
  });
  document.querySelector("#library").innerHTML = library.innerHTML;
}

const myModal = new bootstrap.Modal(document.getElementById("new-book-modal"));
const newBookButton = document
  .getElementById("new-book")
  .addEventListener("click", () => {
    myModal.toggle();
  });
document
  .getElementById("new-book-modal")
  .addEventListener("shown.bs.modal", () => {
    document.getElementById("title-input").focus();
  });

const addBookButton = document
  .getElementById("add-book-btn")
  .addEventListener("click", () => {
    const title = document.getElementById("title-input").value;
    const author = document.getElementById("author-input").value;
    const pages = document.getElementById("pages-input").value;
    const readFlag = document.getElementById("read-input").checked;
    const book = new Book(title, author, pages, readFlag);
    addBookToLibrary(book);
    myModal.hide();
  });

document.addEventListener("click", (event) => {
  if (event.target.matches(".btn-close")) {
    deleteBookByTitle(event.target.dataset.title);
  }
});
