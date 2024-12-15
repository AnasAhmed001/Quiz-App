import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

function App() {
  const [question, setQuestion] = useState([]);
  const [questionState, setQuestionState] = useState(0);

  const checkedInput = useRef([]);
  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //shuffle array

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  function nextQuestion(index) {
    const checkedButton = checkedInput.current.find((input) => input.checked);
    if (checkedButton) {
      const selectedValue = checkedButton.value;
      console.log("Selected answer:", selectedValue);
    }

    questionState < question.length - 1
      ? setQuestionState(questionState + 1)
      : alert("questions Ended");
  }

  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Quiz App
      </h1>
      {question.length > 0 ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "10px",
          
        }}>
          <h1>
            {questionState + 1}: {question[questionState].question.text}
          </h1>
          <ul>
            {shuffleArray([
              ...question[questionState].incorrectAnswers,
              question[questionState].correctAnswer,
            ]).map((item, index) => {
              return (
                <li key={index}>
                  <input
                    type="radio"
                    name="choice"
                    id={item}
                    value={item}
                    ref={(el) => (checkedInput.current[index] = el)}
                  />
                  <label htmlFor={item}>{item}</label>
                </li>
              );
            })}
          </ul>
          <button onClick={() => nextQuestion()}>Next {question.length}</button>
        </div>
      ) : (
        <h1 style={{
          display: "flex",
          justifyContent: "center",
        }}>Loading...</h1>
      )}
    </>
  );
}

export default App;
