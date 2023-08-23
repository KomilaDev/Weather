let city = document.querySelector('.city');
function addLeadingZero(d) {
    return (d < 10) ? '0' + d : d;
}

function getUserTime(t) {
    const weekday = ["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];

    let Y = t.getFullYear();
    let M = addLeadingZero(t.getMonth() + 1);
    let d = addLeadingZero(t.getDate());
    let w = weekday[t.getDay()];
    
    return `${d}.${M}.${Y}  ${w}`;
}


let arr;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        arr = {
            lat : position.coords.latitude,
            lon : position.coords.longitude
        }
    }) 
}

const API_KEY = '72a4c7d8f00b3448b00dcc8a2800f206';

setTimeout(() => {
    if(arr) {

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${arr.lat}&lon=${arr.lon}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(today => doIt(today))
    }

        
}, 10)
        city.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric`)
                    .then(res => res.json())
                    .then(data => doIt(data))
            }
        })


function doIt(dat) {
    let date1 = document.querySelector('p.date1');
    let cityName = document.querySelector('p.cityName1');
    let temp1 = document.querySelector('h2.temp1');
    let weather1 = document.querySelector('p.weather1')

    let todayDate = new Date(dat.dt * 1000);

    date1.textContent = getUserTime(todayDate);
    if(dat.sys.country) {
        cityName.textContent = `${dat.name} ${dat.sys.country}`
    } else {
        cityName.textContent = `${dat.name}`
    }
    temp1.innerHTML = `${Math.round(dat.main.temp)}&deg;`
    weather1.innerHTML = `${dat.weather[0].description}`
}