import requests
import json

api_key = "73ad9c896bddde43ebc05d270e751dae284673843e36545ca7db5cec838563d2"
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

def get_file_report(path):

    api_key = "73ad9c896bddde43ebc05d270e751dae284673843e36545ca7db5cec838563d2"
    headers = {
        "accept": "application/json",   
        "x-apikey": api_key
    }

    url = upload_file(path, headers)['data']['links']['self']
    response = requests.get(url, headers=headers)
    return json.loads(response.text)['data']['attributes']['stats']
