from flask import Flask, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/opcion1")
def hola():
    data = {"mensaje":"Hola Mundo!"}
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
