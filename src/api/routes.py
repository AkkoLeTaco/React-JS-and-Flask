"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
    new_user = User(email=request_body['email'], password=request_body['password'], first_name=request_body['first_name'], last_name=request_body['last_name'], dob=request_body['dob'])
    db.session.add(new_user)
    db.session.commit()
    return f"The new user {request_body['email']} was created sucessfully", 200

@api.route('/user/<int:user_id>', methods=['GET'])
def one_user(user_id):
    user1 = User.query.get(user_id)
    return jsonify(user1.email), 200

@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    if "email" not in body or body['email'] =="":
        raise APIException("username or password error", status_code=400)
    if "password" not in body or body['password'] == "":
        raise APIException("username or password error", status_code=400)

    user = User.query.filter_by(email=body['email']).first()

    if user == None:
        raise APIException("User not found", status_code=404)
    if body['email'] != user.email:
        raise APIException("User not found", status_code=404)
    else:
        access_token = create_access_token(identity=body['email'])
        return jsonify(access_token=access_token)

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    return jsonify(logged_in_as=current_user), 200