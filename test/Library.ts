import { expect } from "chai";
import { ethers } from "hardhat";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

describe("Library contract", () => {
  let Library;
  let library: any;
  let owner: any;

  const NUM_UNFINISHED_BOOK = 5; //DUMMY DATA
  const NUM_FINISHED_BOOK = 3;

  let unfinishedBookList: any;
  let finishedBookList: any;

  function verifyBook(bookChain: any, book: any) {
    expect(book.name).to.equal(bookChain.name);
    expect(book.year.toString()).to.equal(book.year.toString());
    expect(book.author).to.equal(bookChain.author);
  }
  function verifyBookList(booksFromChain: any, bookList: any) {
    expect(booksFromChain.length).to.not.equal(0);
    expect(bookList.length).to.equal(bookList.length);
 
    for (let i = 0;i< bookList.length; i++) {
      const bookChain = booksFromChain[i];
      const book = bookList[i];
      verifyBook(bookChain, book);
    }
  }

  beforeEach(async function () {
    Library = await ethers.getContractFactory("Library");
    library = await Library.deploy();
    [owner] = await ethers.getSigners();

    unfinishedBookList = [];
    finishedBookList = [];

    for (let i = 0; i < NUM_UNFINISHED_BOOK; i++) {
      let book = {
        name: getRandomInt(1, 1000).toString(),
        year: getRandomInt(1800, 2022).toString(),
        author: getRandomInt(1, 1000).toString(),
        finished: false,
      };
      await library.addBook(book.name, book.year, book.author, book.finished);
      unfinishedBookList.push(book);
    }

    for (let i = 0; i < NUM_FINISHED_BOOK; i++) {
      let book = {
        name: getRandomInt(1, 1000).toString(),
        year: getRandomInt(1800, 2022).toString(),
        author: getRandomInt(1, 1000).toString(),
        finished: true,
      };
      await library.addBook(book.name, book.year, book.author, book.finished);
      finishedBookList.push(book);
    }
  });
  describe("Add a book", () => {
    it("should emit Addbook event", async () => {
      let book = {
        name: getRandomInt(1, 1000).toString(),
        year: getRandomInt(1800, 2022).toString(),
        author: getRandomInt(1, 1000).toString(),
        finished: true,
      };

      await expect(
        await library.addBook(book.name, book.year, book.author, book.finished)
      )
        .to.emit(library, "AddBook")
        .withArgs(owner.address, NUM_UNFINISHED_BOOK + NUM_FINISHED_BOOK);
    });
  });

  describe("Get Books", () => {
    it("Should return the correct unfinished books", async () => {
      const booksFromChain = await library.getUnFinishedBooks();
      expect(booksFromChain.length).to.equal(NUM_UNFINISHED_BOOK);
      verifyBookList(booksFromChain, unfinishedBookList);
    });
    it("Should return the correct finished books", async () => {
      const booksFromChain = await library.getFinishedBooks();
     expect(booksFromChain.length).to.equal(NUM_FINISHED_BOOK);
    verifyBookList(booksFromChain, finishedBookList);
    });
  });

  describe("setFinished", () => {
    it("should emit setFinished event", async () => {
      const BOOK_ID = 0;
      const BOOK_FINISHED = true;

      await expect(library.setFinished(BOOK_ID, BOOK_FINISHED))
        .to.emit(library, "SetFinished")
        .withArgs(BOOK_ID, BOOK_FINISHED);
    });
  });
});
