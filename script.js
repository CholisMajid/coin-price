document.addEventListener('DOMContentLoaded', () => {
    fetchCryptoData();
    document.getElementById('search-input').addEventListener('input', filterCrypto);
});

let cryptoData = [];
const perPage = 50; 
const searchPerPage = 50; 

async function fetchCryptoData() {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        cryptoData = data;
        displayCryptoData(data);
    } catch (error) {
        console.error('Error fetching the crypto data:', error);
    }
}

async function fetchSearchCryptoData(query) {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${searchPerPage}&page=1&sparkline=false`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const filteredData = data.filter(crypto => 
            crypto.name.toLowerCase().includes(query.toLowerCase())
        );
        displayCryptoData(filteredData);
    } catch (error) {
        console.error('Error fetching the search crypto data:', error);
    }
}

function displayCryptoData(data) {
    const cryptoContainer = document.getElementById('crypto-container');
    cryptoContainer.innerHTML = ''; // Clear previous results
    data.forEach(crypto => {
        const cryptoCard = document.createElement('div');
        cryptoCard.className = 'crypto-card';
        
        cryptoCard.innerHTML = `
            <img src="${crypto.image}" alt="${crypto.name}">
            <h2>${crypto.name}</h2>
            <p>$${crypto.current_price.toLocaleString()}</p>
        `;
        
        cryptoContainer.appendChild(cryptoCard);
    });
}

function filterCrypto() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    if (searchTerm === '') {
        fetchCryptoData(); // Jika pencarian kosong, tampilkan data default
    } else {
        fetchSearchCryptoData(searchTerm);
    }
}
