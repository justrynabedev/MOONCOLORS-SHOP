import os
from flask import Flask, render_template, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
import random


load_dotenv()

app = Flask(__name__)
CORS(app)

MONGO_URI = os.getenv("MONGO_URI")
cliente = MongoClient(MONGO_URI)

db = cliente["mooncolors_shop"]
coleccion_articulos = db["articulos"]

# Ruta 1: La API devuelve el index.html como ruta principal
@app.route("/")
def home():
    return render_template("index.html")


# Ruta 2: La API que devuelve los datos de la base de datos (Backend)
@app.route("/api/articulos", methods=["GET"])
def obtener_articulos():
    try:
        # Traemos todos los documentos de MongoDB
        articulos_db = list(coleccion_articulos.find({"Portada" : False}))
        
        # Creamos una lista vacía para guardar los datos limpios
        articulos_limpios = []
        
        # Recorremos cada artículo que nos dio Mongo
        for art in articulos_db:
            formato_correcto = {
                "id": str(art["_id"]), # Convertimos el ObjectId raro de Mongo a texto
                "titulo": art.get("titulo", "Sin título"),
                "descripcion": art.get("descripcion", ""),
                "precio": art.get("precio", 0.0),
                "imagen_url": art.get("imagen_url", "") # Tu foto de AWS S3
            }
            articulos_limpios.append(formato_correcto)
            
        # Enviamos la lista terminada al navegador
        return jsonify(articulos_limpios)

    except Exception as e:
        # Si algo falla (ej. sin internet), avisamos del error
        return jsonify({"error": "Fallo en la base de datos", "detalle": str(e)}), 500

@app.route("/api/portada", methods=["GET"])
def obtener_portada():
    try: 
        #Traemos solo las imágenes cuyo campo "Portada" sea True
        fotos_portada_lista = list(coleccion_articulos.find({"Portada": True}))
        foto_portada = random.choice(fotos_portada_lista)
        imagen = {"imagen_url" : foto_portada.get("imagen_url", "")}

        return jsonify(imagen)
    
    except Exception as e:
        # Si algo falla (ej. sin internet), avisamos del error
        return jsonify({"error": "Fallo en la base de datos", "detalle": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
