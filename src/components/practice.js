import React from "react";

const data = {
  correct: 42,
  partiallyCorrect: 13,
  incorrect: 10,
  level: "intermediate",
  score: "78%",
};

const instructions = [
  "The duration of the test course is 45 minutes.",
  "You are allowed to use a non-programmable calculator during the test.",
  "Ensure you have a stable internet connection throughout the duration of the test.",
  "Read each question carefully and double-check your answers before submitting.",
  "Do not communicate with anyone else or refer to any external resources during the test.",
  "Once you finish the test, click on the submit button to end the assessment.",
];

const Practice = () => {
  return (
    <div>
      {/* Practice test  */}
      <div className="mx-5 md:mx-10 lg:mx-20 text-gray-600">
        <div className="relative">
          <div className="p-4 ">
            <h2 className="text-xl text-center sm:text-2xl ">
              AWS Cloud Practitioner Essentials (Training Course)
            </h2>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-amber-500 to-pink-500"></div>
        </div>

        <div className="">
          <div className="relative">
            <p className="text-xl py-2 text-start sm:text-2xl">Instructions</p>
            <div className="absolute bottom-0 left-25% transform -translate-x-1/7 w-10 h-1 bg-gradient-to-r from-amber-500 to-pink-500"></div>
          </div>

          <p className=" my-2">Before you start</p>

          <div className="my-2 mx-5">
            <ol className="list-decimal">
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          <p className="my-2">
            Get ready for the best practice Experience. All the best!!
          </p>
        </div>

        <div className="">
          <div className="relative">
            <p className="text-xl py-2 text-start my-2 sm:text-2xl">Attempts</p>
            <div className="absolute bottom-0 left-25% transform -translate-x-1/7 w-10 h-1  bg-gradient-to-r from-amber-500 to-pink-500"></div>
          </div>

          <p>
            <a
              href="/previous-attempts"
              className=" bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent"
            >
              Click here
            </a>{" "}
            to view previous attempts.
          </p>
        </div>

        <div className="my-3">
          <a
            href="#"
            className=" inline-block rounded bg-gradient-to-r from-amber-500 to-pink-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 f"
          >
            Start the test
          </a>
        </div>
      </div>

      {/* completion */}
      <div>
        <div className="my-2 bg-green-50 py-5 w-full">
          <div className="flex justify-center">
            <div className="text-center mx-2 ">
              <h2 class="text-3xl font-bold py-3 sm:text-4xl">
                Hi, Kinyanjui Karanja
              </h2>
              <p className="my-2">
                You have successfully completed{" "}
                <span className=" bg-transparent  md:bg-green-500  text-green-500 font-bold md:font-normal md:text-inherit rounded-2xl px-0 md:px-2">
                  Cloud Commander AWS Aptitude Test
                </span>
              </p>
            </div>
          </div>
          <div className="mx-3 md:mx-32 lg:mx-72 my-4 px-4 py-8 flex flex-wrap  justify-start md:justify-center align-middle  items-center shadow-2xl gap-4 text-xs">
            {/* Correct */}
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0 text-center">
                <p className="text-gray-500">Correct</p>
                <p className="font-bold">{data.correct}</p>
              </div>
            </div>

            {/* Partially Correct */}
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0 text-center">
                <p className="text-gray-500">Partially Correct</p>
                <p className="font-bold">{data.partiallyCorrect}</p>
              </div>
            </div>

            {/* Incorrect */}
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0 text-center">
                <p className="text-gray-500">Incorrect</p>
                <p className="font-bold">{data.incorrect}</p>
              </div>
            </div>

            {/* Level */}
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="text-center">
                <p className="text-gray-500">Level</p>
                <p className="font-bold">{data.level}</p>
              </div>
            </div>

            {/* Score */}
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="text-center">
                <p className="text-gray-500">Score</p>
                <p className="font-bold">{data.score}</p>
              </div>
            </div>

            {/* Share */}
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="text-center">
                <a
                  href="#"
                  className=" inline-block rounded bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Share
                </a>
              </div>
            </div>
          </div>

          <div className="m-3 flex justify-center items-center gap-14 text-xs">
            <div className="sm:inline-flex sm:shrink-0 items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500 font-semibold">0-45%</p>

                <p className="font-medium">Beginner</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500 font-semibold">46-75%</p>

                <p className="font-medium">intermediate</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="">
                <p className="text-gray-500 font-semibold">76-100%</p>
                <p className="font-medium">Professional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
