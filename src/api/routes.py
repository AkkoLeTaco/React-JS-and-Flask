"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/')
def sitemap():
    return generate_sitemap(app)

@api.route('/user', methods=['GET'])
def handle_hello():
    users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users))
    return jsonify(all_users)

@api.route('/signup', methods=['POST'])
def send_user():
    request_body = request.get_json()
    new_user = User(email=request_body['email'], password=request_body['password'], is_active=request_body['is_active'])
    db.session.add(new_user)
    db.session.commit()
    return f"The new user {request_body['email']} was created sucessfully", 200

@api.route('/user/<int:user_id>', methods=['GET'])
def one_user(user_id):
    user1 = User.query.get(user_id)
    return jsonify(user1.email), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "username or password error"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)
    return jsonify(response_body), 200

@api.route("/protected", methods=["GET"])
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200