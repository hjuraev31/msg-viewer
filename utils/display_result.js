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
          'rgba(54, 162, 235, 1)', // Blue
          'rgba(255, 99, 132, 1)',  // Red
          'rgba(75, 192, 192, 1)',  // Green
          'rgba(255, 206, 86, 1)',  // Yellow
          'rgba(255, 159, 64, 1)',  // Orange
          'rgba(153, 102, 255, 1)', // Purple
          'rgba(210, 105, 30, 1)',  // Brown
          'rgba(169, 169, 169, 1)'  // Gray
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
            fetchData(key[1]).then(data => {
                if (data) {
                    displayMsgData(data);
                } else {
                    console.error('No data returned from API');
                }
            });
        }, 3000);
        setTimeout(fetchReportData(key[1]), 3000);
    } else {
        console.error('Key parameter not found in URL');
    }
});



//==============================DELETE REPORT=============================
function deleteReport(key) {
  const apiUrl = `http://127.0.0.1:5000/api/delete_file/${key}`;
  return fetch(apiUrl, {method: 'POST'})
      .then(response => {
        response.json()
        if(response.status == 200) {
          alert('Report has been deleted!');
          window.location.href = '/';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert(`Error: ${error}`);
      });
}

document.getElementById('delete-button').addEventListener('click', () => {
  const key = getQueryParam('key').split('uploads\\');
  deleteReport(key[1]);
});





