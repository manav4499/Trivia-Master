import "../Components/TriviaCategory.css";

export default function TriviaCategory({updateCategory, startQuiz, unableContinue}){

    
    return(<div class="container">
    <h2 >Choose your trivia category</h2><br/>
    <div class="categories">
        <button class="category-button" id="General Knowledge" onClick={()=>{updateCategory("General Knowledge")}}>General Knowledge</button>
        <button class="category-button" id="Film" onClick={()=>{updateCategory("Film")}} >Film</button>
        <button class="category-button" id="Music" onClick={()=>{updateCategory("Music")}} >Music</button>
        <button class="category-button" id="Television" onClick={()=>{updateCategory("Television")}} >Television</button>
        <button class="category-button" id="Video Games" onClick={()=>{updateCategory("Video Games")}}>Video Games</button>
    </div>
    <div>
        <button disabled={unableContinue} class="continue-button " onClick={()=>{startQuiz(true)}} >Continue</button>
    </div>
    </div>)
}