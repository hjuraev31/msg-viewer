import requests
import json

api_key = "73ad9c896bddde43ebc05d270e751dae284673843e36545ca7db5cec838563d2"
path = r'C:\Users\hjura\OneDrive\Рабочий стол\SWE\msg-viewer\uploads\2f8724a6-83dc-4990-9161-f433ff6985e8\1ST.xlsx'

headers = {
    "accept": "application/json",   
    "x-apikey": api_key
}

def upload_file(path, headers):
    url = "https://www.virustotal.com/api/v3/files"
    files = { 
        "file": (path, open(path, "rb")) 
    }
    response = requests.post(url, files=files, headers=headers)
    return json.loads(response.text)

def get_file_report(path, api_key, headers):
    url = upload_file(path, headers)['data']['links']['self']

    response = requests.get(url, headers=headers)
    print(response.text)
    return json.loads(response.text)

get_file_report(path, api_key, headers)