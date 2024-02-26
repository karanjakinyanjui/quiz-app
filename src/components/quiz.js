import React from "react";
import Question from "./components/question";

import questionsData from "../data/questions";

const Questionnaire = () => {
  return (
    <div className="container mx-auto">
      {questionsData.slice(0, 65).map((question, index) => (
        <Question key={index} {...question} />
      ))}
    </div>
  );
};

export default Questionnaire;
