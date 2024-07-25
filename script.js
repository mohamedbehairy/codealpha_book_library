document.addEventListener("DOMContentLoaded", () => {
  const addBookForm = document.getElementById("add-book-form");
  const bookList = document.getElementById("book-list");
  const searchBookInput = document.getElementById("search-book");
  const borrowHistoryList = document.getElementById("borrow-history-list");

  let books = [];
  let borrowHistory = [];

  // Load books and history from localStorage
  if (localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"));
    renderBooks(books);
  }

  if (localStorage.getItem("borrowHistory")) {
    borrowHistory = JSON.parse(localStorage.getItem("borrowHistory"));
    renderHistory(borrowHistory);
  }

  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const category = document.getElementById("book-category").value;

    const book = { title, author, category };
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks(books);

    addBookForm.reset();
  });

  bookList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const title = e.target.dataset.title;
      books = books.filter((book) => book.title !== title);
      localStorage.setItem("books", JSON.stringify(books));
      renderBooks(books);

      const date = new Date().toLocaleString();
      borrowHistory.push({ title, date });
      localStorage.setItem("borrowHistory", JSON.stringify(borrowHistory));
      renderHistory(borrowHistory);
    }
  });

  borrowHistoryList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.dataset.index;
      borrowHistory.splice(index, 1);
      localStorage.setItem("borrowHistory", JSON.stringify(borrowHistory));
      renderHistory(borrowHistory);
    }
  });

  searchBookInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
  });

  function renderBooks(books) {
    bookList.innerHTML = books
      .map(
        (book) => `
              <li>
                  <span>${book.title} by ${book.author} [${book.category}]</span>
                  <button data-title="${book.title}">Borrow</button>
              </li>
          `
      )
      .join("");
  }

  function renderHistory(history) {
    borrowHistoryList.innerHTML = history
      .map(
        (record, index) => `
              <li>
                  <span>${record.title} borrowed on ${record.date}</span>
                  <button data-index="${index}">Delete</button>
              </li>
          `
      )
      .join("");
  }
});
