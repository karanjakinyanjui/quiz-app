import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionsData from "../data/questions";
import { useNavigate } from "react-router-dom";
import Markdown from "marked-react";

function arraysEqual(arr1, arr2) {
  // If the arrays have different lengths, they can't be equal
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort both arrays
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  // Compare sorted arrays element by element
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}

const saveResponse = (question, response) => {
  const questions = loadQuestions();
  questions[question] = response;
  localStorage.setItem("questions", JSON.stringify(questions));
};

const loadQuestions = () => {
  const response = localStorage.getItem("questions");
  return response ? JSON.parse(response) : {};
};

const loadResponse = (question) => {
  const response = loadQuestions();
  return response[question] || [];
};

const Question = ({ handleResponse = () => {} }) => {
  const [selected, setSelected] = useState([]);
  const [current_question, setQuestion] = useState({});
  const navigate = useNavigate();
  const { quiz_number, question_no } = useParams();
  const [correct, setCorrect] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const { question, choices, multiple, answers } = current_question;

  useEffect(() => {
    const start = parseInt(quiz_number - 1);
    const stop = start + 65;
    const questions = questionsData.slice(start, stop);
    const currentQuestion = questions[question_no];
    setQuestion(currentQuestion);
    setSelected(loadResponse(question_no).selected || []);
  }, [quiz_number, question_no]);

  const handleCheckboxChange = (choice) => {
    if (selected.includes(choice)) {
      setSelected(selected.filter((c) => c !== choice));
    } else {
      setSelected([...selected, choice]);
    }
  };

  const alpha = ["A", "B", "C", "D", "E", "F"];

  const handleRadioChange = (choice) => {
    setSelected([choice]);
  };

  const nextPage = () => {
    const nextQuestion = parseInt(question_no) + 1;
    if (nextQuestion < 65) {
      navigate(`/quiz/${quiz_number}/question/${nextQuestion}`);
    } else {
      navigate(`/quiz/${quiz_number}/results`);
    }
  };

  const handleSubmit = () => {
    const isCorrect = arraysEqual(selected, answers);
    setCorrect(isCorrect ? "Correct" : "Incorrect");
    handleResponse(question, isCorrect);
    saveResponse(question, { selected, answers, isCorrect });
    setTimeout(() => {
      nextPage();
    }, 2000);
  };

  useEffect(() => {
    setSelected(loadResponse(question).selected || []);
    setCorrect(loadResponse(question).isCorrect || "");
    setShowAnswer(false);
  }, [question]);

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-gray-200 p-6">
        <div className="my-6 max-w-screen-md">
          <div className="flex justify-between space-between w-full">
            <div>
              <p>Quiz: {quiz_number}</p>
              <p>Question: {question_no}</p>
            </div>
            {correct.length ? (
              <div>
                {correct === "Correct" ? (
                  <p className="text-green-500">Correct</p>
                ) : (
                  <p className="text-red-500">Incorrect</p>
                )}
              </div>
            ) : null}
          </div>
          <p className="mt-4 mb-2 font-semibold">
            <Markdown>{question}</Markdown>
          </p>
          <div className="flex flex-col">
            {choices &&
              choices.map((choice, choiceIndex) => (
                <label
                  key={choiceIndex}
                  className="inline-flex items-center mb-2"
                >
                  {multiple ? (
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                      checked={selected.includes(choice)}
                      onChange={() => handleCheckboxChange(choice)}
                    />
                  ) : (
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-blue-500"
                      checked={selected.includes(choice)}
                      onChange={() => handleRadioChange(choice)}
                    />
                  )}
                  <span className="ml-2">
                    <Markdown>{choice}</Markdown>
                  </span>
                </label>
              ))}
          </div>
          <div className="flex justify-between space-between w-full">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? <p>Hide Answer</p> : <p>Show Answer</p>}
            </button>
          </div>
          {showAnswer && (
            <div className="mt-4">
              <p className="font-semibold">Correct Answer:</p>
              {answers.map((answer, index) => (
                <p key={index}>
                  <Markdown>
                    {alpha[choices.findIndex((i) => i === answer)] +
                      ". " +
                      answer}
                  </Markdown>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
