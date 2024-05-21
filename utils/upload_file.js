document.getElementById('uploadButton').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput.files.length > 0) {
        fetch('https://justin.com/api/v3/files', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('File uploaded successfully, redirecting...');
            const newTabUrl = `newTab.html?key=${encodeURIComponent(data.key)}`;
            window.open(newTabUrl, '_blank');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('File upload failed.');
        });
    }
});
