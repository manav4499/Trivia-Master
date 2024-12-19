import axios from 'axios';
import { useState, useEffect } from 'react';
import "./Quiz.css";


export default function Quiz({ category, showQuiz }) {

    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [isAnswered, setIsAnswered] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [finalScore, setFinalScore] = useState();
    const [allCorrectOptions, setallCorrectOptions] = useState([]);


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    useEffect(() => {
        const fetchingData = async () => {
            const response = await axios({
                method: 'get',
                url: 'https://opentdb.com/api.php',
                params: {
                    amount: 5,
                    category: category,
                    type: "multiple"
                }
            })

            let allQuestionsDetails = await response.data.results;
            let allQuestions = allQuestionsDetails.map(item => item.question)
            let allWrongOptions = allQuestionsDetails.map(item => item.incorrect_answers)
            let correctAnswers = await allQuestionsDetails.map(item => item.correct_answer) ;
            setallCorrectOptions(await correctAnswers);


            console.log(correctAnswers);


            let allOptions = allWrongOptions.map((wrongOptions, index) => {
                return shuffleArray([...wrongOptions, correctAnswers[index]]);
            });


            setQuestions(allQuestions);
            setOptions(allOptions);
        }

        fetchingData();
    }, [category])


    const resetOptionColor = () => {
        const allOptionButton = document.querySelectorAll(".option-button");
        allOptionButton.forEach(element => {
            element.style = "background-color : none;"
        });
    }


    //updating question number 
    const updateQuestionNumber = () => {
        setIsAnswered(true);
        setQuestionNumber((num) => num + 1);
        resetOptionColor();
        console.log(questionNumber);

        if (questionNumber === 5) {
            console.log(answers);
            console.log(allCorrectOptions);
            let score = 0;
            for (let i = 0; i < 5; i++) {
                if (answers[i] == allCorrectOptions[i]) {
                    score += 1;
                }
            }
            setFinalScore(score);
        }

    }



    //Selecting the answer 
    const selectingAnswer = (index, option) => {
        setAnswers((answer) => [...answer, option]);
        setIsAnswered(false);
        resetOptionColor();
        document.getElementById(index).style = "background-color : #e6c200 ;";
    }

    const decodeHtmlEntities = (htmlString) => {
        const parser = new DOMParser().parseFromString(htmlString, "text/html");
        return parser.documentElement.textContent;
      };


    return (<div>
        {questionNumber > 5 ? <div className='quiz-container'>
            <h2>Your Score</h2>
            <p>You got {finalScore} out of 5 questions correct.</p><br/><br/>
            <button className="category-button" onClick={() => { showQuiz(false) }}>Play Again</button>
        </div> :
            <div className='quiz-container'>
                <center><h1 class=".question-title" >Question {questionNumber} of {questions.length}</h1></center>
                <p>{decodeHtmlEntities(questions[questionNumber - 1])}</p>
                <div>
                    {/* buttons for option */}
                    {options[questionNumber - 1]?.map((option, index) => (
                        <button id={index} class="option-button" key={index} onClick={() => { selectingAnswer(index, option) }}>{decodeHtmlEntities(option)}</button>
                    ))}
                </div>
                <button disabled={isAnswered} class="continue-button" onClick={updateQuestionNumber}>Continue</button>
            </div>
        }
    </div>)
}