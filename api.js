const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your actual API key

// Function to fetch current stock price
async function fetchCurrentPrice(symbol) {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
    const data = await response.json();
    if (data['Time Series (5min)']) {
        const latestTime = Object.keys(data['Time Series (5min)'])[0];
        return data['Time Series (5min)'][latestTime]['1. open'];
    } else {
        throw new Error('Invalid stock symbol or API limit reached.');
    }
}

// Function to fetch historical data
async function fetchHistoricalData(symbol) {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data['Time Series (Daily)']) {
        return data['Time Series (Daily)'];
    } else {
        throw new Error('Invalid stock symbol or API limit reached.');
    }
}

// Event listener for search button
document.getElementById('searchBtn').addEventListener('click', async () => {
    const symbol = document.getElementById('stockSymbol').value;
    try {
        const price = await fetchCurrentPrice(symbol);
        document.getElementById('priceDisplay').innerText = `$${price}`;
        document.getElementById('priceChange').innerText = 'Price fetched successfully!';
    } catch (error) {
        document.getElementById('priceDisplay').innerText = 'Error fetching price';
        document.getElementById('priceChange').innerText = error.message;
    }
});