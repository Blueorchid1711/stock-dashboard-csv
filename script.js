// JavaScript to fetch stock data from backend and render charts.
// Dynamically updates chart and 52-week stats when a company is selected.

let chart;

function loadCSV(company) {
    fetch(`/data/${company}`)
        .then(res => res.json())
        .then(data => {
            const dates = data.dates;
            const closes = data.closes;
            const high = Math.max(...closes).toFixed(2);
            const low = Math.min(...closes).toFixed(2);

            document.getElementById("stockName").innerText = company.split('.')[0];
            document.getElementById("info").innerHTML = `
                <strong>52-Week High:</strong> ₹${high}<br>
                <strong>52-Week Low:</strong> ₹${low}
            `;

            if (chart) chart.destroy();
            const ctx = document.getElementById("chart").getContext("2d");
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: company,
                        data: closes,
                        borderColor: 'blue',
                        fill: false
                    }]
                }
            });
        });
}
