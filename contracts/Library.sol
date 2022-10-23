// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Library {
    struct Book {
        uint256 id;
        string name;
        uint256 year;
        string author;
        bool finished;
    }
    Book[] private bookList;
    mapping(uint256 => address) bookOwner;
    event AddBook(address recipient, uint256 bookId);

    function addBook(
        string memory name,
        uint16 year,
        string memory author,
        bool finished
    ) external {
        uint256 bookId = bookList.lenght;
        bookList.push(Book(bookId, name, year, author, finished));
        bookOwner[bookId] = msg.sender;
        emit AddBook(msg.sender, bookId);
    }
}
