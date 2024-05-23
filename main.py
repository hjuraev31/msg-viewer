from flask import Flask, jsonify, request
from folder_manager import generate_unique_folder
import os
from msg_parser import parse_message
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def main():
    return {'message' : 'Test run successfully!'}

@app.route('/api/upload_msg', methods=['POST'])
def upload_msg():

    uploaded_file = request.files['file']
    uploads_directory = "uploads"  
    unique_folder_path = generate_unique_folder(uploads_directory)

    uploaded_file.filename = 'message.msg'
    if uploaded_file and allowed_file(uploaded_file.filename):
        destination = os.path.join(unique_folder_path,uploaded_file.filename)
        uploaded_file.save(destination)

        base_directory = r"C:\Users\hjura\OneDrive\Рабочий стол\SWE\msg-viewer-backend\msg-viewer"
        full_path = os.path.join(base_directory, destination)
        parsed_msg = parse_message(full_path, os.path.join(base_directory,unique_folder_path))

        return {
            'message':'success',
            'uuid':unique_folder_path, 
            'result':parsed_msg,
        }

    else:
        return {'error':'File upload failed, or invalid file type'}

@app.route('/delete_report/', methods=['POST'])
def delete_file():
    return 1


@app.route('/api/msg_parser/<string:uuid>', methods=['POST'])
def msg_email_parser(uuid):

    destination = os.path.join('uploads/'+ uuid,'message.msg')
    base_directory = r"C:\Users\hjura\OneDrive\Рабочий стол\SWE\msg-viewer-backend\msg-viewer"
    full_path = os.path.join(base_directory, destination)
    parsed_msg = parse_message(full_path, os.path.join(base_directory,'uploads/'+uuid))

    result = {
        "message": "Key received successfully",
        "data": parsed_msg,
    }
    
    return jsonify(result), 200


def allowed_file(filename):
    ALLOWED_EXTS = ['msg']
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTS

if __name__ == '__main__':
    app.run(debug=True)