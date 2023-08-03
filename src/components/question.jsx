import { getValue } from "@testing-library/user-event/dist/utils";
import { useState } from "react";

export default function Question(props) {
  //destructuring from props.questionObj
  const { answers, question, difficulty, correct_answer } = props.questionObj;

  return (
    <div className="flex flex-col justify-start py-8">
      <p className="font-semibold text-2xl">
        {question}
        <span className="text-lg mx-5">({difficulty})</span>
      </p>
      <ul className="flex flex-row gap-5 py-4 flex-wrap">
        {answers.map((answerObj, index) => {
          return (
            <li
              key={index}
              // what a ternary to handle classes
              className={
                `${props.result ? `${answerObj.answer == correct_answer ? "correct" : `opacity-40 ${answerObj.clicked ? "answered" : "answer"}`}` 
                : `${answerObj.clicked ? "answered" : "answer"}`}`
              }
              onClick={() => props.onClick(answerObj.answer)}
            >
              {answerObj.answer}
            </li>
          );
        })}
      </ul>
      <br />
      <hr />
    </div>
  );
}
