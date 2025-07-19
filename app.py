
from flask import Flask, render_template, jsonify
import csv
import os

app = Flask(__name__)

@app.route('/')
def index():
    csv_folder = os.path.join(app.root_path, 'data')
    files = [f for f in os.listdir(csv_folder) if f.endswith('.csv')]
    return render_template('index.html', companies=files)

@app.route('/data/<filename>')
def get_data(filename):
    file_path = os.path.join(app.root_path, 'data', filename)
    dates, closes = [], []
    with open(file_path, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            dates.append(row['Date'])
            closes.append(float(row['Close']))
    return jsonify({'dates': dates, 'closes': closes})

if __name__ == '__main__':
    app.run(debug=True)
