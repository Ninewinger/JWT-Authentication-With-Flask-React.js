from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from models import db, User

app = Flask(__name__)
app.config['DEBUG'] = True
app.config["env"] = "development"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///back/db/database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret'
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
app.secret_key = 'super secret key'
jwt = JWTManager(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'message': 'Username already exists'}), 400
    if not username:
        return jsonify({'message': 'Username is required'}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'message': 'Email already exists'}), 400
    if not email:
        return jsonify({'message': 'Email is required'}), 400
    if not password:
        return jsonify({'message': 'Password is required'}), 400

    user = User(username=username, email=email, password=password)
    user.save()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User or password does not match'}), 400

    if user.password != password:
        return jsonify({'message': 'User or password does not match'}), 400

    return jsonify({'token': create_access_token(identity=user.id)}), 200

@app.route('/private', methods=['GET'])
@jwt_required
def private():
    return jsonify({'message': 'private'}), 200


if __name__ == '__main__':
    app.run(debug=True)
