from flask import Flask, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/pokemon/<int:id>')
def pokemon(id):
    try:
        response = requests.get(f"https://pokeapi.co/api/v2/pokemon/{id}")
        response.raise_for_status()  # This will raise an HTTPError if the HTTP request returned an unsuccessful status code
        
        data = response.json()
        return jsonify({"data": data})

    except requests.RequestException as e:
        return jsonify({"error": f"Unable to fetch data from PokeAPI: {e}"}), 500



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")