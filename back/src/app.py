from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from models import db

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

if __name__ == '__main__':
    app.run()
