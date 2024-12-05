document.addEventListener('DOMContentLoaded', async () => {
  // Quando a página for carregada, já busca o clima de Maricá
  const defaultCity = 'Maricá';
  await fetchWeather(defaultCity);
});

document.querySelector('#search').addEventListener('submit', async (event) => {
  event.preventDefault();

  const cityName = document.querySelector('#city_name').value;

  if (!cityName) {
    document.querySelector("#weather").classList.remove('show');
    showAlert('Você precisa digitar uma cidade...');
    return;
  }

  await fetchWeather(cityName);
});

async function fetchWeather(cityName) {
  const apiKey = 'ca8e3deb04365d9feb3c8a0f156194ea';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
      showInfo({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,
      });
    } else {
      document.querySelector("#weather").classList.remove('show');
      showAlert(`
        Não foi possível localizar...
        <img src="src/images/image.svg">
      `);
    }
  } catch (error) {
    showAlert('Erro ao buscar os dados, tente novamente mais tarde.');
  }
}

function showInfo(json) {
  showAlert('');
  document.querySelector("#weather").classList.add('show');

  document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
  document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;
  document.querySelector('#temp_description').innerHTML = `${json.description}`;
  document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;
  document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`;
  document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
  document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`;
}

function showAlert(msg) {
  document.querySelector('#alert').innerHTML = msg;
}

const pdfViewer = document.getElementById("pdfViewer");
const downloadBtn = document.getElementById("downloadBtn");

// Função para carregar o boletim mais recente
async function fetchLatestBoletim() {
    try {
        const response = await fetch("http://localhost:3000/api/boletins"); // URL do proxy reverso
        if (!response.ok) throw new Error("Erro ao buscar boletins");

        const boletins = await response.json();
        if (boletins.length === 0) {
            console.error("Nenhum boletim encontrado.");
            return;
        }

        const latestBoletim = boletins[boletins.length - 1]; // Último boletim
        const pdfPath = `http://localhost:3000/uploads/${latestBoletim.pdf}`; // Caminho do PDF

        // Atualiza o iframe com o PDF
        pdfViewer.src = pdfPath;

        // Atualiza o botão de download
        downloadBtn.addEventListener("click", () => {
            window.open(pdfPath, "_blank");
        });
    } catch (error) {
        console.error("Erro ao carregar boletim:", error.message);
    }
}

// Carregar boletim ao carregar a página
document.addEventListener("DOMContentLoaded", fetchLatestBoletim);