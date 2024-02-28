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
    <div>
      <div className="mx-1 my-3 lg:mx-48">
        <section className="rounded-xl bg-white ring ring-indigo-50 ">
          <div className="flex flex-row justify-between">
            <div class="sm:flex sm:items-start sm:justify-start">
              <p class="block bg-yellow-300 rounded-t-xl md:rounded-tl-xl md:rounded-tr-none px-5 py-3 text-center text-s font-bold uppercase text-gray-900 transition hover:bg-yellow-400">
                Quiz: &nbsp;{quiz_number}
              </p>
            </div>
            {/* correct/wrong */}
            <div class="flex justify-center">
              {correct.length ? (
                <div>
                  {correct === "Correct" ? (
                    <div>
                      <strong class="-mt-[2px] -me-[2px] inline-flex items-center gap-1 rounded-se-xl rounded-es-xl bg-green-600 px-3 py-1.5 text-white">
                        <span class="text-[10px] font-medium sm:text-xs">
                          Correct!
                        </span>
                      </strong>
                    </div>
                  ) : (
                    <div>
                      <p className="text-"></p>
                      <strong class="-mt-[2px] -me-[2px] inline-flex items-center gap-1 rounded-se-xl rounded-es-xl bg-red-500 px-3 py-1.5 text-white">
                        <span class="text-[10px] font-medium sm:text-xs">
                          Incorrect!
                        </span>
                      </strong>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="px-4 sm:px-6 py-2 lg:px-8">
            <div className="flex items-start sm:gap-8">
              <div>
                <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[15px] font-medium text-white">
                  Question: &nbsp;{question_no}
                </strong>

                {/* Question */}
                <div>
                  <p className="mt-4 mb-2 font-semibold">
                    <Markdown>{question}</Markdown>
                  </p>
                </div>

                <div>
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
                              className="form-checkbox h-5 w-5 text-blue-500 mr-2"
                              checked={selected.includes(choice)}
                              onChange={() => handleCheckboxChange(choice)}
                            />
                          ) : (
                            <input
                              type="radio"
                              className="form-radio h-5 w-5 text-blue-500 mr-2"
                              checked={selected.includes(choice)}
                              onChange={() => handleRadioChange(choice)}
                            />
                          )}
                          <span
                            className={`flex items-center rounded px-4 ${
                              choiceIndex % 2 !== 0
                                ? "bg-purple-100"
                                : "bg-indigo-50"
                            }`}
                          >
                            <span className="mr-2">
                              {String.fromCharCode(97 + choiceIndex)}.&nbsp;
                            </span>
                            <span>
                              <Markdown className="list-">{choice}</Markdown>
                            </span>
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between space-between w-full">
                    <button
                      className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-4 py-2 rounded hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500 transition"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    {/* correct/wrong */}
                    <div class="flex justify-center my-2">
                      {correct.length ? (
                        <div>
                          {correct === "Correct" ? (
                            <div>
                              <strong class="-mt-[2px] -me-[2px] inline-flex items-center gap-1 rounded-se-xl rounded-es-xl bg-green-600 px-3 py-1.5 text-white">
                                <span class="text-[10px] font-medium sm:text-xs">
                                  Correct!
                                </span>
                              </strong>
                            </div>
                          ) : (
                            <div>
                              <p className="text-"></p>
                              <strong class="-mt-[2px] -me-[2px] inline-flex items-center gap-1 rounded-se-xl rounded-es-xl bg-red-500 px-3 py-1.5 text-white">
                                <span class="text-[10px] font-medium sm:text-xs">
                                  Incorrect!
                                </span>
                              </strong>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                    <button
                      className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-4 py-2 rounded hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500 transition"
                      onClick={() => setShowAnswer(!showAnswer)}
                    >
                      {showAnswer ? <p>Hide Answer</p> : <p>Show Answer</p>}
                    </button>
                  </div>
                </div>
                <div>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Question;
