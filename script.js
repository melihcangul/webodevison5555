class CurrencyAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE';
    }

    fetchCurrencyRate(fromCurrency, toCurrency, callback) {
        const url = `${this.baseUrl}&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${this.apiKey}`;
        console.log('Fetching URL:', url);  // URL'i konsola yazdırın
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log('Response Status:', response.status);  // Yanıt durumunu yazdırın
                return response.json();
            })
            .then(data => {
                console.log('Fetch API Response:', data);  // Yanıtı konsola yazdırın
                if (callback && data['Realtime Currency Exchange Rate']) {
                    callback(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
                } else {
                    alert('Veri çekme işlemi başarısız.');
                }
            })
            .catch(error => console.error('Error fetching currency rate:', error));
    }
}

// Mevcut işlevsellikleri koruyan kod
const images = [
    { src: 'https://image.milimaj.com/i/milliyet/75/869x477/5f16dcb455428117f80cea94.jpg', desc: 'Ankara, Anıtkabir, 2022' },
    { src: 'https://ankaramedipol.edu.tr/wp-content/uploads/2022/07/image00024-min-scaled.jpeg', desc: 'Ankara Medipol Üniversitesi, 2024' },
    { src: 'https://media-cdn.tripadvisor.com/media/photo-s/01/52/a6/e1/by-night.jpg', desc: 'Kuşadası Tatili, 2016' },
    { src: 'https://www.avis.com.tr/Avis/media/Avis/e-bulten/mayis-e-bulten-2022/avis-2-1056x750_1.jpg?ext=.jpg', desc: 'Samsun, 2019' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Bosphorus_Bridge.jpg/640px-Bosphorus_Bridge.jpg', desc: 'İstanbul Boğazı, 2020' }
];
let currentIndex = 0;

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('profileImage').src = images[currentIndex].src;
    document.getElementById('imageDescription').textContent = images[currentIndex].desc;
    alert('Resmi değiştirdiniz!');
}

function updateContent() {
    const desc = document.getElementById('imageDescription').textContent;
    if (desc === 'Bu fotoğraf Türkiye\'de çekilmiştir ve internetten alınmıştır.') {
        document.getElementById('imageDescription').textContent = images[currentIndex].desc;
    } else {
        document.getElementById('imageDescription').textContent = 'Bu fotoğraf Türkiye\'de çekilmiştir ve internetten alınmıştır.';
    }
}

document.getElementById('profileImage').addEventListener('click', changeImage);
document.getElementById('updateButton').addEventListener('click', updateContent);
document.getElementById('inputField').addEventListener('blur', handleBlur);

function handleBlur() {
    alert('Input alanından çıktınız!');
}

function handleKeydown(event) {
    if (event.key === 'Enter') {
        alert('Enter tuşuna bastınız!');
    }
}

document.addEventListener('keydown', handleKeydown);

function handleResize() {
    alert('Pencere boyutu değiştirildi!');
}

window.addEventListener('resize', handleResize);

// API kullanımı
const currencyApi = new CurrencyAPI('7IDY0NEO2I506FKN');
document.addEventListener('DOMContentLoaded', () => {
    currencyApi.fetchCurrencyRate('BTC', 'USD', (rate) => {
        const currencyContainer = document.getElementById('currency-container');
        currencyContainer.innerHTML = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" alt="Bitcoin">
            <p>Bitcoin -> USD:</p>
            <span>${rate}</span>
        `;
    });
});
