// App.js
import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionPage from "./components/question";
import PracticePage from "./components/practice";
// import QuizPage from "./components/quiz";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/practice" element={<PracticePage />} />
        <Route
          path="/quiz/:quiz_number/question/:question_no"
          element={<QuestionPage />}
        />
        {/* <Route path="/app/quiz/:quiz_number">
          <QuizPage />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
