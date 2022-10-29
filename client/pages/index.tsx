import { useState, useEffect } from "react";
import { contractAddress } from "../config";
import { ethers } from "ethers";

import library from "../abi/Library.json";

import { NextPage } from "next";
import Book from "./components/Book";

declare let window: any;

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookYear, setBookYear] = useState("");
  const [bookFinished, setBookFinished] = useState("no");
  const [booksFinished, setBooksFinished] = useState([]);
  const [booksUnFinished, setBooksUnFinished] = useState([]);
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      const goerliChainId = "0x5";
      if (chainId !== goerliChainId) {
        alert("You are not connected to Goerli network");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask: ", error);
    }
  };

  const sumbitBook = async () => {
    let book = {
      name: bookName,
      year: bookYear,
      author: bookAuthor,
      finished: bookFinished == "yes" ? true : false,
    };

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const libraryContract = new ethers.Contract(
          contractAddress,
          library.abi,
          signer
        );
        let libraryTx = await libraryContract.addBook(
          book.name,
          book.year,
          book.author,
          book.finished
        );
        console.log(libraryTx);
      } else {
        console.log("Ethereum object down not exist");
      }
    } catch (error) {
      console.log("Error submiting new book", error);
    }
  };
  const getBooks = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const libraryContract = new ethers.Contract(
          contractAddress,
          library.abi,
          signer
        );
        let booksFinished = await libraryContract.getFinishedBooks();
        let booksUnFinished = await libraryContract.getUnFinishedBooks();

        console.log(booksFinished, booksUnFinished);
        setBooksFinished(booksFinished);
        setBooksUnFinished(booksUnFinished);
      } else {
        console.log("Ethereum object down not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clickBookFinished = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const libraryContract = new ethers.Contract(
          contractAddress,
          library.abi,
          signer
        );
        let libraryTx = await libraryContract.setFinished(id, true);
        console.log(libraryTx);
      } else {
        console.log("Ethereum object down not exist");
      }
    } catch (error) {
      console.log("Error change book Status", error);
    }
  };
  return (
    <div className="flex flex-col items-center bg-[#f3f6f4] text-[#6a50aa] min-h-screen pb-20">
      <div className="transition hover:rotate-180 hover:scale-106 transition duration-500 ease-in-out"></div>
      <h2 className="text-3xl font-bold mb-20 mt-12">
        Manage your personal Library
      </h2>
      {currentAccount === "" ? (
        <button
          className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition ease-in-out"
          onClick={connectWallet}
        >
          Connect wallet
        </button>
      ) : (
        <div>
          <div className="text-3xl font-bold mb-20-12">
            <h4>Wallet connected: {currentAccount}</h4>
          </div>
          <div className="text-xl font-semibold mb-20 mt-4">
            <input
              className="text-xl font-bold mb-2 mt-1"
              type="text"
              placeholder="Book name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <br />
            <input
              className="text-xl font-bold mb-2 mt-1"
              type="text"
              placeholder="Book author"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
            />
            <br />
            <input
              className="text-xl font-bold mb-2 mt-1"
              type="text"
              placeholder="Book year"
              value={bookYear}
              onChange={(e) => setBookYear(e.target.value)}
            />
            <br />
            <label>
              Have you finished reding this book ?
              <select
                value={bookFinished}
                onChange={(e) => setBookFinished(e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <button
              className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition ease-in-out"
              onClick={sumbitBook}
            >
              Add Book
            </button>
          </div>
          <div>
            <div className="flex flex-col justify-center items-center">
              <div className="font-semibold text-lg text-center mb-4">
                Books List
              </div>
              <button
                className="text-xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
                onClick={getBooks}
              >
                Get Books
              </button>
              {booksUnFinished.length > 0 ? (
                <div className="font-semibold text-lg text-center mb-4 mt-5">
                  Books Unfinished ({booksUnFinished.length})
                </div>
              ) : (
                <div></div>
              )}
              <div className="flex flex-row justify-center items-center">
                {booksUnFinished.map((book) => (
                  <Book
                    key={book.id}
                    id={book.id}
                    name={book.name}
                    year={book.year.toString()}
                    author={book.author}
                    finished={book.finished.toString()}
                    clickBookFinished={clickBookFinished}
                  />
                ))}
              </div>
              {booksFinished.length > 0 ? (
                <div className="font-semibold text-lg text-center mb-4 mt-5">
                  Books finished ({booksUnFinished.length})
                </div>
              ) : (
                <div></div>
              )}
              <div className="flex flex-row justify-center items-center">
                {booksFinished.map((book) => (
                  <Book
                    key={book.id}
                    id={book.id}
                    name={book.name}
                    year={book.year.toString()}
                    author={book.author}
                    finished={book.finished.toString()}
                    clickBookFinished={clickBookFinished}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
