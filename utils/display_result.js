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

function displayData(data) {
    //=====================commented lines for test========================
    // const resultDiv = document.getElementById('result');
    // resultDiv.textContent = JSON.stringify(data, null, 2);
    //=====================commented lines for test========================
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


document.addEventListener('DOMContentLoaded', () => {
    const key = getQueryParam('key').split('uploads\\');

    if (key) {
        setTimeout(() => {
            fetchData(key[1]).then(data => {
                if (data) {
                    displayData(data);
                } else {
                    console.error('No data returned from API');
                }
            });
        }, 3000);
    } else {
        console.error('Key parameter not found in URL');
    }
});
