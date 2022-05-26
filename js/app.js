const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
    
})

const buscarClima = (e) => {
    e.preventDefault();

    console.log('Buscando el Clima...')
    // VARIABLES
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    // CLEAN HTML
    clearHTML()
    // VALIDATING THE FORM
    if (ciudad === '' || pais === '') {
        // Error
        mostrarError('Both fields are required');
        return;
    }

    // CONSUMMIR API
    consultarAPI(ciudad, pais);
}


const mostrarError = (mensaje) => {
    const alert = document.querySelector('.bg-red-100');

    if (!alert) {
        // CREAR ALERTA
        const alert = document.createElement('div');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3','rounded', 'max-w-md', 'mx-auto', 'text-center');

        alert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 4000);

    }

}

const consultarAPI = async (ciudad, pais) => {


    const appid = '3417f8523074b214fc5bd1f4e587d1a7';
    const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`);

    /** 
    fetch(url)
        .then(respuesta => respuesta.json())
        .then( datos => console.log(datos))
*/
    datos = await url.json();
    console.log(datos)
    if(datos.cod === "404") {
        mostrarError('City not Found')
      } else {
        mostrarClima(datos)
      }
    }



const mostrarClima = (datos) => {
    let { name, main: { temp, temp_max, temp_min }} = datos;
    const {weather: {0: type_weather,}} = datos

    const farenheit_btn = document.querySelector('#farenheit');
    const celsius_btn = document.querySelector('#celsius');
    const kelvin_btn = document.querySelector('#kelvin');

    let centigrados = kelvinToCentigrados(temp);
    let max = kelvinToCentigrados(temp_max);
    let min = kelvinToCentigrados(temp_min);
    const weather_type = type_weather.main;
    

    /** CREATING THE TEMPERATURE **/
    const cityname = document.createElement('p');
    cityname.innerHTML = `Weather in: ${name}`;
    cityname.classList.add('font-bold', 'text-2xl')

    const description = document.createElement('p');
    description.textContent = type_weather.description;

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados.toFixed(1)} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    /** CREATING THE MAX TEMPETARURE **/
    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max Temperature: ${max.toFixed(1)} &#8451;`;
    tempMax.classList.add('text-xl')

    /** CREATING THE MIN TEMPERTARURE **/ 
    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min Temperature: ${min.toFixed(1)} &#8451;`
    tempMin.classList.add('text-xl')

    const resultadoDiv = document.createElement('div');

    icons(weather_type, resultadoDiv);

    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(cityname);
    resultadoDiv.appendChild(description);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    resultado.appendChild(resultadoDiv);

}

// CONVERTION FUNCTIONS


const kelvinToCentigrados = grados => parseInt(grados - 273.15);
const kelvinToFarenheit = grados => parseInt( (grados - 273.15) * 1.8000 + 32);

// SHOWING TEMPERATURE


const ShowKtoF = (main) => {
    let centigrados = kelvinToFarenheit(centigrados)
    let max = kelvinToCentigrados(max);
    let min = kelvinToCentigrados(min);
}

const ShowKtoC = (main) => {
    let centigrados = kelvinToCentigrados(centigrados);
    let max = kelvinToCentigrados(max);
    let min = kelvinToCentigrados(min);
}

const myFunction = (event) => {
    click = event.target.id;
    console.log(click)
    return click;
    
}

const clearHTML = () => {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

const icons = (weather, div) => {
    
    const icon = document.createElement('img');
    icon.classList.add('h-32', 'm-auto');
    let animatedIcon = ''


    switch (weather) {
        case 'Clouds':
            animatedIcon = 'animated/cloudy-day-1.svg';
            icon.src = animatedIcon;
            div.appendChild(icon);
        break;

        case 'Clear':
            animatedIcon = 'animated/day.svg';
            icon.src = animatedIcon;
            div.appendChild(icon);
        break

        case 'Drizzle':
            animatedIcon = 'animated/rainy-4.svg';
            icon.src = animatedIcon;
            div.appendChild(icon);
        break

        case 'Rain':
            animatedIcon = 'animated/rainy-5.svg';
            icon.src = animatedIcon;
            div.appendChild(icon);
        break

        case 'Thunderstorm':
            animatedIcon = 'animated/thunder.svg';
            icon.src = animatedIcon;
            div.appendChild(icon);
        break

        case 'Snow':
            animatedIcon = 'animated/snowy-5.svg';
            icon.src = animatedIcon;
            div.appendChild(icon);
    }

}
