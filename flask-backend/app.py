from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

todos = []  # Global variable

@app.route('/todos', methods=['GET', 'POST', 'PUT', 'DELETE'])
def handle_todos():
    global todos  # Use global here if you're reassigning to todos
    if request.method == 'POST':
        todo = request.json
        todo['important'] = False
        todos.append(todo)
        return jsonify(todo), 201

    elif request.method == 'PUT':
        updated_todos = request.json
        todos = updated_todos  # Reassigning to global variable
        return jsonify(todos), 200

    elif request.method == 'DELETE':
        todo_to_delete = request.json
        todos = [todo for todo in todos if todo['id'] != todo_to_delete['id']]  # Reassigning
        return jsonify(todos), 200

    else:
        return jsonify(todos)

@app.route('/')
def home():
    return "Welcome to the Todo App!"

if __name__ == '__main__':
    app.run(debug=True)
