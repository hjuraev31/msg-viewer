# msg-viewer and analyzer

## Overview

**msg-viewer and analyzer** is a web application designed to simplify the process of viewing and analyzing `.msg` email files. This tool allows users to upload an `.msg` file, view its content, and receive a virus check report from VirusTotal. It is built with Python and Flask for the backend, and HTML, CSS, and JavaScript for the frontend.

## Features

- **Upload and View `.msg` Files**: Easily upload `.msg` email files and view their content directly in your browser.
- **Virus Check Report**: Get a detailed virus check report for your email files from VirusTotal.
- **User-Friendly Interface**: Simple and intuitive interface for easy navigation and usage.

## Installation

To get started with **msg-viewer and analyzer**, you'll need to install the following Python libraries:

```bash
pip install pywin32 json os flask requests uuid
```

## Usage
- 1 Clone the repository:
```bash
https://github.com/hjuraev31/msg-viewer.git
```

- 2 Navigate to the project directory:
```bash
cd msg-viewer
```

- 3 Start the application:
```bash
python main.py
```

- 4 Open index.html from the frontend branch in your web browser and upload your .msg file to view its content and receive the virus check report.

## Technologies Used
- Backend: Python, Flask
- Frontend: HTML, CSS, JavaScript
- Others: win32com, pythoncom, json, os, requests, uuid

## Contributing
We welcome contributions from the community! If you'd like to contribute, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes and commit them (git commit -m 'Add some feature').
- Push to the branch (git push origin feature-branch).
- Open a Pull Request.
