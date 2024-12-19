import { useState } from 'react';
import './App.css';
import logo from './assets/logo.png';
import TriviaCategory from './Components/TriviaCategory'
import Quiz from './Components/Quiz';

function App() {
  const [showQuiz , setShowQuiz] = useState(false) ;
  const [categoryNumber , setCategoryNumber] = useState("");
  const [disable, setDisable ] = useState(true);

  const updateCategory =(category) =>{
    const allCategoryButton = document.querySelectorAll(".category-button");

    allCategoryButton.forEach(element => {
      element.style = "background-color : none;"
    }); 
    document.getElementById(category).style = "background-color : #e6c200 ;"

    switch (category) {
        case "General Knowledge":
            setCategoryNumber(9);
            break;

        case "Film":
            setCategoryNumber(11);
            break;

        case "Music":
            setCategoryNumber(12);
            break;

        case "Television":
            setCategoryNumber(14);
            break;

        case "Video Games":
            setCategoryNumber(15);
            break;
    }
    setDisable(false);
  }

  const startQuiz = (startQuiz) =>{
    setShowQuiz(startQuiz);
  }
  return (
    <div class="app-container">
    <header><img class="logo" src={logo}></img></header>
    <div>
      { showQuiz ? <Quiz category={categoryNumber} showQuiz={startQuiz}/> : <TriviaCategory updateCategory={updateCategory} startQuiz={startQuiz} unableContinue= {disable}/> }
    </div>
    </div>
  )
}

export default App
