from flask import Flask, request, jsonify, render_template
import os, random



app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'apk_file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    apk = request.files['apk_file']
    if apk.filename == '':
        return jsonify({"error": "No file selected"}), 400

    filename = apk.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    apk.save(file_path)

    # Dummy analysis
    file_size_kb = os.path.getsize(file_path) // 1024
    permissions_count = random.randint(10, 50)
    has_sms_permission = random.choice([True, False])
    has_camera_permission = random.choice([True, False])
    prediction = "Fake" if "fake" in filename.lower() else "Safe"

    features = [
        {"feature": "File Name", "value": filename},
        {"feature": "Prediction", "value": prediction},
        {"feature": "Permissions Count", "value": permissions_count},
        {"feature": "File Size (KB)", "value": file_size_kb},
        {"feature": "Has SMS Permission", "value": "Yes" if has_sms_permission else "No"},
        {"feature": "Has Camera Permission", "value": "Yes" if has_camera_permission else "No"}
    ]

    details = [
        {"title": "Filename", "description": filename},
        {"title": "File Size", "description": f"{file_size_kb} KB"},
        {"title": "Analysis Type", "description": "Dummy static analysis with risk scoring"}
    ]

    return jsonify({
        "filename": filename,
        "features": features,
        "details": details
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    app.run(host="0.0.0.0", port=port, debug=True)
