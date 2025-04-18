import axios from "axios";
import { useEffect, useState } from "react";
import { Commet } from "react-loading-indicators";

function App() {

  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(false);
  const [count, setCount] = useState(0)
  const [marks, setMarks] = useState(0)
  let randomIndex = []
  let shuffleArr = []
  let userAnswer = ""

  useEffect(() => {
    getData();

  }, [])


  async function getData() {
    try {
      const questions = await axios("https://the-trivia-api.com/v2/questions");
      setQuestions(questions.data);

    } catch (error) {
      setError(true);

    } finally {
      setLoading(false);
    }
  }

  function shuffleArray(arr) {
    for (let i = 0; i < arr.length; i++) {

      let random = Math.floor(Math.random() * arr.length);
      if (randomIndex.includes(random)) {
        i--

      } else {
        randomIndex.push(random)
      }
    }

    for (let i = 0; i < randomIndex.length; i++) {
      shuffleArr.push(arr[randomIndex[i]])
    }

    return shuffleArr
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-500 to-fuchsia-500 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl w-full max-w-3xl p-8 space-y-8">
          <h1 className="text-2xl font-extrabold text-gray-800 animate-fade-in text-center">Quiz App</h1>

          {questions && <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-full transition-all duration-500"
              style={{ width: `${((count + 1) / 10) * 100}%` }}
            ></div>
          </div>
          }
          {questions && (
            <div className="space-y-6">
              <h1 className="text-2xl font-extrabold text-gray-800">
                Q{count + 1}:
                <span className="ml-2 text-purple-700">{questions[count].question.text}</span>
              </h1>

              <div className="grid gap-4">
                {shuffleArray([
                  ...questions[count].incorrectAnswers,
                  questions[count].correctAnswer,
                ]).map((answer, index) => (
                  <label
                    key={index}
                    htmlFor={answer}
                    className="block border border-purple-300 rounded-lg px-5 py-3 bg-purple-50 text-gray-800 cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id={answer}
                        name="answer"
                        className="accent-purple-600"
                        onClick={(e) => {
                          userAnswer = e.currentTarget.id;
                        }}
                      />
                      <span className="text-lg">{answer}</span>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={() => {
                  userAnswer === questions[count].correctAnswer
                    ? setMarks(marks + 10)
                    : setMarks(marks);
                  count > 8
                    ? (setResult(true), setQuestions(null))
                    : setCount(count + 1);
                }}
                className=" mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-bold text-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                Next ➡️
              </button>
            </div>
          )}

          {result && (
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-extrabold text-green-600 animate-bounce">
                🎉 Quiz Completed!
              </h1>
              <p className="text-xl font-semibold text-gray-800">
                Your Score: <span className="text-purple-700">{marks}/100</span>
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-100 rounded-lg shadow">
                  <h2 className="font-bold text-green-700 text-lg">Correct Answers ✅</h2>
                  <p className="text-2xl font-bold text-green-600">{marks / 10}</p>
                </div>
                <div className="p-4 bg-red-100 rounded-lg shadow">
                  <h2 className="font-bold text-red-700 text-lg">Incorrect Answers ❌</h2>
                  <p className="text-2xl font-bold text-red-600">{10 - marks / 10}</p>
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 py-3 px-6 rounded-lg bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all duration-300 cursor-pointer"
              >
                Restart Quiz 🔁
              </button>
            </div>
          )}

          {error && (
            <h1 className="text-2xl font-semibold text-center text-red-600">
              ❌ Error occurred. Please try again.
            </h1>
          )}

          {loading && (
            <h1 className="text-2xl font-bold text-center text-indigo-600 animate-pulse my-[20px]">
              <Commet color="blue" size="medium" text="" textColor="" />
            </h1>
          )}
        </div>
      </div>
    </>
  );


}

export default App;
