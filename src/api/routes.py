"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None: 
        return jsonify({"msg": "no email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if user is None or not check_password_hash(user.password, password):
        return jsonify({"msg": "invalid email and/or password"}), 401


    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@api.route("/signup", methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None: 
        return jsonify({"msg": "no email or password"}), 400
    

    user= User.query.filter_by(email=email).one_or_none()
    if user: 
        return jsonify({"msg": "an account with that already exists"}), 409
    hash_ps = generate_password_hash(password)

    user= User(email=email, password=hash_ps, is_active=True)
    db.session.add(user)
    db.session.commit()
    response_body={"msg": "account successfully created", "user": user.serialize()}
    return jsonify(response_body), 201



# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"msg": "user not found"}), 404
    return jsonify(logged_in_as=current_user), 200





@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
