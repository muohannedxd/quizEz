import { useEffect, useState } from "react";
import Question from "./question";

// used to shuffle the all questions array
function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * array.length);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Questions() {
  /**
   * Handling data display
   */
  // getting all questions
  const [allQuestions, setAllQuestions] = useState([]);
  // random 10 questions from all questions
  const [questions, setQuestions] = useState([]);
  // the total score
  const [score, setScore] = useState(0);
  // to restart the quiz
  const [result, setResult] = useState(false);
  const [newGame, setNewGame] = useState(false)

  // getting data from API
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=50&category=18")
      .then((res) => res.json())
      .then((data) => setAllQuestions(data.results));
  }, [newGame]);

  // filling the ten questions array (useEffect to wait for fetch) and occurs when changing all questions array
  // i mapped each question to a simple object
  useEffect(() => {
    if (allQuestions.length > 0) {
      // Shuffle allQuestions array and select 10
      const selectedQuestions = shuffleArray(allQuestions).slice(0, 10);
      // Transform each question object into the desired format
      const formattedQuestions = selectedQuestions.map((questionObj) => {
        const correctAnswer = questionObj.correct_answer;
        const incorrectAnswers = questionObj.incorrect_answers;
        // Combine correct and incorrect answers and shuffle them
        const allAnswers = shuffleArray([...incorrectAnswers, correctAnswer]);
        // format answers to help applying classes when clicked
        const formattedAnswers = allAnswers.map((answer) => ({
          answer,
          clicked: false,
        }));

        return {
          difficulty: questionObj.difficulty,
          question: questionObj.question,
          answers: formattedAnswers,
          correct_answer: correctAnswer,
        };
      });
      // Set the formatted questions in the state
      setQuestions(formattedQuestions);
    }
  }, [allQuestions]);
  
  console.log(questions)
  /**
   * Handling events
   */


  // handling clicking an answer
  function handleAnswer(questionObj, selectedAnswer) {
    setQuestions((prevQuestion) => {
      return prevQuestion.map((Question) => {
        if (questionObj === Question) {
          // if yes, update and return theupdated answers
          const updatedAnswers = Question.answers.map((Answer) => {
            if (Answer.answer === selectedAnswer) {
              return {
                ...Answer,
                clicked: !Answer.clicked
              }
            } else {
              return {
                ...Answer,
                clicked: false
              }
            }
            //else return the Answer array
            return Answer; 
          })
          return {
            ...Question,
            answers: updatedAnswers
          }
        }
        // else, return the question
        return Question
      });
      
    });
  }

  // to handle score
  function handleScore() {
    if (!result) {
      setResult(true);
      let newScore = 0;
      for (let i = 0; i < questions.length; i++) {
        let selected;
        for (let j = 0; j < questions[i].answers.length; j++) {
          if (questions[i].answers[j].clicked) {
            selected = questions[i].answers[j].answer;
          }
          // Reset 'clicked' for all answers
          questions[i].answers[j].clicked = false;
        }
        if (selected === questions[i].correct_answer) {
          newScore++;
        }
      }
      setScore(newScore);
    } else {
      setScore(0);
      setResult(false);
      setNewGame(newGame => !newGame)
    }
  }

  return (
    <div className="flex flex-col w-[70%] sm:w-[80%] mx-auto my-4">
      <p
        className="w-[80%] mx-auto text-center text-xl font-semibold my-10
                    p-10 border-4 border-darkViolet rounded-3xl"
      >
        Think carefully before answering
      </p>
      {questions.map((questionObj, index) => (
        <Question
          key={index}
          // sending the Question object
          questionObj={questionObj}
          // and the bool "result" for styling the answers
          result={result}
          // and the function to handle click ofcrs
          onClick={(selectedAnswer) =>
            handleAnswer(questionObj, selectedAnswer)
          }
        />
      ))}
      <div className="mx-auto my-10 flex items-center gap-5">
        {result && (
          <p className="text-xl font-semibold">You scored: {score}/10!</p>
        )}
        <button className="btn" onClick={handleScore}>{result ? "Play Again" : "Check Score"}</button>
      </div>
    </div>
  );
}

/**
 * do not slice "const [questions, setQuestions] = useState(shuffleArray(allQuestions).slice(0, 10));"
 * directly, because the fetch does not return immediately (thus the second array is empty)*
 * after slicing. (bcz fetch has not completed yet and sliced an empty array)
 * FIX: useEffect to shuffle and slice into the 2d array

 */
