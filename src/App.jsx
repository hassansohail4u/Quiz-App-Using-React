import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(false);
  const [count, setCount] = useState(0)
  const [marks, setMarks] = useState(0)
  let [seconds , setSeconds] = useState(5)
  let [minutes , setMinutes] = useState(5)
  const [time , settime] = useState(300)
  let randomIndex = []
  let shuffleArr = []
  let userAnswer = ""


  useEffect(() => {
    getData();

  }, [])

     useEffect(()=>{
         if(time <= 0 || result){
          setresult(true); // Show result when time ends
          return;
         }
         const timer = setInterval(() => {
          settime((Time) => Time - 1);
        }, 1000);
    
        return () => clearInterval(timer);
    
      },[time,result]);
      

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
    console.log(randomIndex);

    return shuffleArr
    
  }



 

  return (
    <>
    <h1>{minutes}:{seconds}</h1>
      {questions &&
        <div>
          <h1>Q{count + 1}: {questions[count].question.text}</h1>
          {shuffleArray([...questions[count].incorrectAnswers, questions[count].correctAnswer]).map((answer, index) => {
            return (
              <div key={index}>
                <input type="radio" id={answer} name="answer" onClick={(e) => {
                  userAnswer = e.currentTarget.id
                  console.log(userAnswer);



                }} />
                <label htmlFor={answer} >{answer}</label>
              </div>
            )
          })}
          <button onClick={() => {
            userAnswer === questions[count].correctAnswer ? (setMarks(marks + 10), console.log("right")) : console.log("wrong")



            if (count > 8) {
              setResult(true)
              setQuestions(null)
            } else {
              setCount(count + 1)

            }

          }}>Next</button>

        </div>}
      {result && <h1>Result agaya {marks}/100</h1>}
      {error && <h1>Error occured</h1>}
      {loading && <h1>Loading...</h1>}
    </>
  );
}

export default App;
