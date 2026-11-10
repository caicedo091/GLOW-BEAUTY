from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2 import Error

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
app.json.ensure_ascii = False  # Configuración para Flask moderno
def conectar_bd():
    try:
        # Usamos la conexión directa de Supabase con el puerto 5432
        uri_conexion = "postgresql://postgres.ofsgyhfvwrsityxwqzct:chicassuperpoderosas@aws-1-ca-central-1.pooler.supabase.com:5432/postgres"
        conexion = psycopg2.connect(uri_conexion)
        cursor = conexion.cursor()
        return conexion, cursor
    except (Exception, Error) as error:
        print("DETALLE DEL ERROR DE CONEXIÓN:", error)
        return None, None

@app.route("/")
def inicio():
    return "¡El servidor backend de Glow Beauty está conectado correctamente!"

@app.route("/api/empleados")
def obtener_empleados():
    conn, cur = conectar_bd()
    if conn is not None:
        try:
            cur.execute("SELECT id_empleados, nombre, cargo FROM empleados;")
            filas = cur.fetchall()
            cur.close()
            conn.close()

            empleados = []
            for fila in filas:
                empleados.append({
                    "id": fila[0],
                    "nombre": fila[1],
                    "apelllido": fila[1],  # Asumiendo que el nombre completo está en la misma columna
                    "telefono": fila[1],  # Asumiendo que el teléfono está en la misma columna, ajustar según la estructura real
                    "cargo": fila[2]
                })

            app.config['JSON_AS_ASCII'] = False 
            return jsonify(empleados)
        except Exception as e:
            print("Error al ejecutar la consulta SQL:", e)
            return jsonify({"error": "Error al consultar la tabla empleados"})
            
    return jsonify({"error": "No se pudo conectar a la base de datos"})

@app.route("/api/agendar-citas", methods=["POST"])
def agendar_cita():
    datos = request.get_json()
    nombre = datos.get("nombre")
    telefono = datos.get("telefono")
    servicio = datos.get("servicio")
    fecha = datos.get("fecha")
    hora = datos.get("hora")
    
    conn, cur = conectar_bd()
    if conn is not None:
        try:
            cur.execute(
                "INSERT INTO citas (nombre, telefono, servicio, fecha, hora) VALUES (%s, %s, %s, %s, %s);",
                (nombre, telefono, servicio, fecha, hora)
            )
            conn.commit()
            cur.close()
            conn.close()
            return jsonify({"mensaje": "¡Cita agendada con éxito!"}), 201
        except Exception as e:
            print("Error al guardar la cita:", e)
            return jsonify({"error": "No se pudo registrar la cita"}), 500
            
    return jsonify({"error": "Error de conexión con la base de datos"}), 500
if __name__ == "__main__":
    app.run(debug=True)