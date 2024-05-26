from flask import Flask, jsonify, request
from folder_manager import generate_unique_folder
import os
from msg_parser import parse_message
from flask_cors import CORS
from vt_api import get_file_report
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

        return jsonify({
            'message':'success',
            'uuid':unique_folder_path, 
        }), 200

    else:
        return jsonify({
            'message':'File upload failed, or invalid file type',
        }), 400

@app.route('/api/delete_file/<string:uuid>', methods=['POST'])
def delete_report():
    return 1

@app.route('/api/vt_analysis/<string:uuid>', methods=['POST'])
def vt_analysis(uuid):
    path = r'C:\Users\hjura\OneDrive\Рабочий стол\SWE\msg-viewer-backend\msg-viewer\uploads'
    report = get_file_report(path+'\/'+uuid+r'\message.msg')
    if report:
        return report
    else:
        return jsonify({
            'message':'Error while getting report from the server!',
        }), 500

@app.route('/api/msg_parser/<string:uuid>', methods=['POST'])
def msg_email_parser(uuid):

    destination = os.path.join('uploads/'+ uuid,'message.msg')
    base_directory = r"C:\Users\hjura\OneDrive\Рабочий стол\SWE\msg-viewer-backend\msg-viewer"
    full_path = os.path.join(base_directory, destination)
    parsed_msg = parse_message(full_path, os.path.join(base_directory,'uploads/'+uuid))
    
    if parsed_msg:
        result = {
            "message": "Key received successfully",
            "data": parsed_msg,
        }
        
        return jsonify(result), 200
    else:
        return jsonify({
            'message': 'Server error!', 
        }), 500

def allowed_file(filename):
    ALLOWED_EXTS = ['msg']
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTS

if __name__ == '__main__':
    app.run(debug=True)