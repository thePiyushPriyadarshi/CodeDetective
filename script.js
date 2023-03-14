const inputSearch=document.querySelector("#input");
const searchBtn = document.querySelector("btn-search");
const searchForm = document.querySelector("[data-searchForm]")
const profile = document.querySelector(".profile-content"); 
const errorMsg = document.querySelector("[error-Msg]");
const notfound = document.querySelector(".not-found-container");
const loading = document.querySelector(".loading");
const defaultPage = document.querySelector(".default");
const btnmode = document.getElementById("btn-mode");
const modetext = document.getElementById("mode-text");
const modeicon = document.getElementById("mode-icon");
let darkMode = false;
let username; 

searchForm.addEventListener("submit",(e)=>{
profile.classList.remove("active"); 
notfound.classList.remove("active");
defaultPage.classList.add("hide"); 
loading.classList.add("active");
  e.preventDefault();
  username =inputSearch.value; 
  fetchDetails();
}); 
searchForm.addEventListener(
    "keydown",
    function (e) {
      if (!e) {
        var e = window.event;
      }
      if (e.key == "Enter") {
        if (input.value !== "") {
            profile.classList.remove("active"); 
            otfound.classList.remove("active");
            defaultPage.classList.add("hide"); 
            loading.classList.add("active");
            username =inputSearch.value; 
            fetchDetails();
        }
      }
    },
    false
  );
async function fetchDetails(){
    loading.classList.add("active");
    try{
        const response = await fetch( `https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await response.json(); 
        if(data.status!="success"){
            throw data;
        } 
        notfound.classList.remove("active");
        profile.classList.add("active");
        loading.classList.remove("active");
        renderDetails(data);
    }
    catch(err){ 
            profile.classList.remove("active"); 
            loading.classList.remove("active");
            notfound.classList.add("active"); 
            errorMsg.innerText=`${err?.message}`;
    }
}

function renderDetails(data){
    const easy = document.querySelector("[data-easy]");
    const medium = document.querySelector("[data-medium]");
    const hard= document.querySelector("[data-hard]");
    const user = document.querySelector("[data-username]");
    const rank = document.querySelector("[data-rank]");
    const acceptance = document.querySelector("[data-acceptance]");

    easy.innerText =`${data?.easySolved} / ${data?.totalEasy}`;
    medium.innerText =`${data?.mediumSolved} / ${data?.totalMedium}`;
    hard.innerText =`${data?.hardSolved} / ${data?.totalHard}`;
    user.innerText = username;
    rank.innerText = `Rank : ${data?.ranking}`;
    acceptance.innerText = `Acceptance Rate : ${data?.acceptanceRate} %`;
    handleSlider(data);
}
function handleSlider(data){
    const sliderEasy= document.querySelector("[slider-easy]");
    const sliderMedium= document.querySelector("[slider-medium]");
    const sliderHard= document.querySelector("[slider-hard]");
    
    sliderEasy.value= `${data?.easySolved}`; 
    sliderEasy.max= `${data?.totalEasy}`;

    sliderMedium.value= `${data?.mediumSolved}`;
    sliderMedium.max= `${data?.totalMedium}`;

    sliderHard.value= `${data?.hardSolved}`;
    sliderHard.max= `${data?.totalHard}`;
}

//Dark Mode
btnmode.addEventListener("click", function () {
  console.log("dark mode");
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});
function darkModeProperties() {
  document.documentElement.style.setProperty("--lm-bg", "#141D2F");
  document.documentElement.style.setProperty("--lm-bg-content", "#1E2A47");
  document.documentElement.style.setProperty("--lm-text", "white");
  document.documentElement.style.setProperty("--lm-text-alt", "white");
  document.documentElement.style.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/sun-icon.svg";
  document.documentElement.style.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}
function lightModeProperties() {
  document.documentElement.style.setProperty("--lm-bg", "#F6F8FF");
  document.documentElement.style.setProperty("--lm-bg-content", "#FEFEFE");
  document.documentElement.style.setProperty("--lm-text", "#4B6A9B");
  document.documentElement.style.setProperty("--lm-text-alt", "#2B3442");
  document.documentElement.style.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/moon-icon.svg";
  document.documentElement.style.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}
