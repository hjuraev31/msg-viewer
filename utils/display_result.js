function fetchData(key) {
    const apiUrl = `http://127.0.0.1:5000/api/msg_parser/${key}`;
    
    return fetch(apiUrl, {method: 'POST'})
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function getFileName(path) {
    const parts = path.split('\\');
    return parts[parts.length - 1];
}


function displayMsgData(data) {
    let attachments = [];
    for(val of data.data.attachments) {
        attachments.push(getFileName(val));
    }
    document.getElementById('email-subject').innerText = data.data.subject;
    document.getElementById('email-from').innerText = data.data.from;
    document.getElementById('email-to').innerText = data.data.to;
    document.getElementById('email-cc').innerText = data.data.cc;
    document.getElementById('email-bcc').innerText = data.data.bcc;
    document.getElementById('email-attachments').innerText = attachments;
    document.getElementById('email-date').innerText = data.data.date;
    document.getElementById('email-body').innerText = data.data.body;
}

//=================================================CHART FOR REPORT========================================

const ctx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
        label: 'Dataset',
        data: [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)', // Blue
          'rgba(255, 99, 132, 0.8)',  // Red
          'rgba(75, 192, 192, 0.8)',  // Green
          'rgba(255, 206, 86, 0.8)',  // Yellow
          'rgba(255, 159, 64, 0.8)',  // Orange
          'rgba(153, 102, 255, 0.8)', // Purple
          'rgba(210, 105, 30, 0.8)',  // Brown
          'rgba(169, 169, 169, 0.8)'  // Gray
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}`;
            }
          }
        },
        legend: {
            position: 'right',
        },
        title: {
          display: false,
          text: 'VT report'
        }
      }
    }
  });

function updateChart(data) {
    pieChart.data.labels = Object.keys(data);
    pieChart.data.datasets[0].data = Object.values(data);
    pieChart.update();
  }
  
async function fetchReportData(key) {
    const response = await fetch(`http://127.0.0.1:5000/api/vt_analysis/${key}`, {method: 'POST'});
    const data = await response.json();
    updateChart(data);
}


document.addEventListener('DOMContentLoaded', () => {
    const key = getQueryParam('key').split('uploads\\');
    if (key) {
        setTimeout(() => {
            fetchReportData(key[1]);
            fetchData(key[1]).then(data => {
                if (data) {
                    displayMsgData(data);
                } else {
                    console.error('No data returned from API');
                }
            });
        }, 3000);
        
    } else {
        console.error('Key parameter not found in URL');
    }
});







