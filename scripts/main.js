/**/
const Current=document.querySelector('.current');
const NextDay=document.querySelector('.next-day');
const ThirdDay=document.querySelector('.third-day');
const Search=document.querySelector('.search');
let userLocation;
const WeekDays=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const NavList=document.querySelector('.list');
const Ham=document.querySelector('.hamburger-menu');
let d=new Date();

//API to get current user location
fetch('http://api.ipstack.com/check?access_key=a0739f416059ad56444bddf4670be616')
.then((resp) => resp.json())
.then(function(data){
    userLocation=data.city;
    getWeatherAPI(userLocation);
}
);

//API to get weather based on user location
function getWeatherAPI(userCity){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=7ae36aae9bf44689b98141319210105&q=${userCity}&days=3`)
    .then((resp) => resp.json())
    .then(function(data){
        displayCurrent(data);
        displayNextDay(data);
        displayLastDay(data);
    }
    );
}

//function to display current day weather
function displayCurrent(data){
    let windDir=getWind(data.current.wind_dir);
    Current.innerHTML=`<div class="d-flex justify-content-between bg-light-grey px-2">
    <p class="day m-0 py-2 pr-2">${WeekDays[d.getDay()]}</p>
    <p class="day m-0 py-2 pr-2">${d.getDate()}${months[d.getMonth()]}</p>
</div>
<div class="py-4 px-4">
    <h2 class="country pt-3">${data.location.name}</h2>
    <div class="d-flex justify-content-between align-items-center flex-wrap py-3">
        <h3 class="temp">${data.current.temp_c}&#176;C</h3>
        <div class="w-25"><img src="${data.current.condition.icon}" alt="weather-status"></div>
    </div>
    <p class="condition py-3">${data.current.condition.text}</p>
    <div class="d-flex mt-3">
        <div class="mr-3 d-flex">
            <div class="w-50"><img src="icons/icon-umberella.png" alt=""></div>
            <span class="ml-2">${data.current.humidity}%</span>
        </div>
        <div class="mr-3 d-flex">
            <div class="w-50"><img src="icons/icon-wind.png" alt=""></div>
            <span class="ml-2">${data.current.wind_kph}km/h</span>
        </div>
        <div class="mr-3 d-flex">
            <div class="w-50"><img src="icons/icon-compass.png" alt=""></div>
            <span class="ml-2">${windDir}</span>
        </div>
    </div>
</div>`
}

//function to convert 16 point compass direction to a normal direction
function getWind(wind){
    if(wind[0]==='N') return 'North';
    if(wind[0]==='W') return 'West';
    if(wind[0]==='S') return 'South';
    if(wind[0]==='E') return 'East';
}

//function to display next day forecast
function displayNextDay(data){
    let nextDay=getNextDay();
    NextDay.innerHTML=`<div class="d-flex justify-content-center next-day-top">
    <p class="day m-0 py-2 pr-2">${nextDay}</p>
</div>
<div class="py-4">
    <div class="day-time mt-1 mx-auto">
        <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="">
    </div>
    <div class="mb-5">
        <h3 class="temp">${data.forecast.forecastday[1].day.maxtemp_c}&#176;C</h3>
        <p class="temp">${data.forecast.forecastday[1].day.mintemp_c}&#176;C</p>
    </div>
    <p class="condition py-3">${data.forecast.forecastday[1].day.condition.text}</p>
</div>`
}

//function to get next day
function getNextDay(){
    if(d.getDay()==6){
        return WeekDays[0];
    }
    else return WeekDays[d.getDay()+1]
}

//function to display third day forecast
function displayLastDay(data){
    let thirdDay=getThirdDay();
    ThirdDay.innerHTML=`<div class="d-flex justify-content-center bg-light-grey">
    <p class="day m-0 py-2 pr-2">${thirdDay}</p>
</div>
<div class="py-4">
    <div class="day-time mt-1 mx-auto">
        <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="">
    </div>
    <div class="mb-5">
        <h3 class="temp">${data.forecast.forecastday[2].day.maxtemp_c}&#176;C</h3>
        <p class="temp">${data.forecast.forecastday[2].day.mintemp_c}&#176;C</p>
    </div>
    <p class="condition py-3">${data.forecast.forecastday[2].day.condition.text}</p>
</div>`
}

//function to get third day 
function getThirdDay(){
    if(d.getDay()==5){
        return WeekDays[0];
    }
    else if(d.getDay()==6) return WeekDays[1];
    else return WeekDays[d.getDay()+2];
}

//function to search for city
Search.addEventListener('keyup',function(){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=7ae36aae9bf44689b98141319210105&q=${Search.value}&days=3`)
    .then((resp) => resp.json())
    .then(function(data){
        displayCurrent(data);
        displayNextDay(data);
        displayLastDay(data);
    }
    );
});

//Hamburger navbar button function for small screens
Ham.addEventListener('click',function(){
    if(NavList.classList.contains('nav-visible')){
        NavList.classList.remove('nav-visible');
        NavList.classList.add('nav-not-visible');
    }
    else if(NavList.classList.contains('nav-not-visible')){
        NavList.classList.add('nav-visible');
        NavList.classList.remove('nav-not-visible');
    }
    console.log(NavList.classList);
})



//WIP for night mode

/*const Search=document.querySelector('.search');
const Current=document.querySelector('.current');
const NextDay=document.querySelector('.next-day');
const ThirdDay=document.querySelector('.third-day');
const ChangeTheme=document.querySelector('.change-theme');
const Body=document.querySelector('body');
const Title=document.querySelector('.title');
const SubTitle=document.querySelector('.sub-title');
const ListItem=Array.from(document.querySelectorAll('.list-item'));
const SearchBtn=document.querySelector('.search-button');
const Footer=document.querySelector('#footer');
let ThemeArr = [
    Search,
    Current,
    NextDay,
    ThirdDay,
    ChangeTheme,
    Body,
    Title,
    SubTitle,
    ListItem,
    SearchBtn,
    Footer
]
ChangeTheme.addEventListener('click',function(){
    const NavItems=ThemeArr.filter(function(themeItem){
        if(themeItem===ListItem){
            ThemeArr.splice(8,1);
            return true;
        }
    })
    ThemeArr.forEach(function(themeItem){
        if(themeItem.style.backgroundColor==='rgb(30, 32, 43)'){
            themeItem.style.backgroundColor='white'
        }
    })
})*/