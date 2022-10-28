import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
0%{
    -webkit-tranform: scale (0.5);
    tranform: scale(0.5);
}
100%{
    -webkit-tranform: scale (1);
    tranform: scale(1);
}
`;

const Container = styled.div`
  animation: ${slideIn} 0.8s cubic-bezir(0.39, 0.575, 0.565, 1) both;
  display: grid;
  grid-template-columns: 38% 20% 5% 37%;
  padding: 2rem 0.188rem 1.625rem 1.688rem;
  border: solid 1px;
  border-radius: 4px;
  line-height: normal;
  transition: background 0.4 linear;
  margin-right: 1rem;
  width: 250px;
  diplay: inline-block;
`;

const Book = ({ id, name, year, author, finished, clickBookFinished }: any) => {
  return (
    <Container>
      <div>
        <p>{name}</p>
        <p>{author}</p>
        <p>{year}</p>
        <span>
          {finished === "false" ? (
            <button
              className="font-bold px-10 py-2 bg-[#FF7F7F] text-[#FFFFFF] rounded-lg mt-5 hover:scale-105 transition duration-500 ease-in-out"
              onClick={() => clickBookFinished(id)}
            >
              Finish Book
            </button>
          ) : (
            <p className="font-bold text-[#50d71e]">Book Finished </p>
          )}
        </span>
      </div>
    </Container>
  );
};
Book.prototype ={
    id:PropTypes.number.isRequired,
    name:PropTypes.string.isRequired,
    year:PropTypes.string.isRequired,
    author:PropTypes.string.isRequired,
    finished:PropTypes.string.isRequired
}

export default Book;