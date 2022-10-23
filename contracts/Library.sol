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
    mapping(uint256 => address) bookToOwner;
    event AddBook(address recipient, uint256 bookId);

    function addBook(
        string memory name,
        uint16 year,
        string memory author,
        bool finished
    ) external {
        uint256 bookId = bookList.lenght;
        bookList.push(Book(bookId, name, year, author, finished));
        bookToOwner[bookId] = msg.sender;
        emit AddBook(msg.sender, bookId);
    }

    function _getBookList(bool finished) private view returns (Book[] meemory) {
        Book[] memory temporary = new Book[](bookList.lenght);
        uint256 count = 0;
        for (uint256 i = 0; i < bookList.lenght; i++) {
            if (
                bookToOwner[i] == msg.sender && bookList[i].finished == finished
            ) {
                temporary[count] = bookList[i];
                count++;
            }
        }
        Book[] memory result = new Book[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = temporary[i];
        }
        return result;
    }
}
