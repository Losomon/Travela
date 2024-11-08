from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///travel_planner.db'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30)
db = SQLAlchemy(app)

# User table with email as primary key
class User(db.Model):
    email = db.Column(db.String(100), primary_key=True, unique=True, nullable=False)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    trips = db.relationship('TripPlan', backref='user', lazy=True)

# Trip planning table
class TripPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.String(10), nullable=False)  # Storing as string for simplicity
    end_date = db.Column(db.String(10), nullable=False)
    travelers = db.Column(db.Integer, nullable=False)
    travel_style = db.Column(db.String(50), nullable=False)
    user_email = db.Column(db.String(100), db.ForeignKey('user.email'), nullable=False)

# Register a new user with email as primary key
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 409
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(email=data['email'], username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        session['user_id'] = user.email
        return jsonify({'message': 'Logged in successfully'})
    return jsonify({'message': 'Invalid credentials'}), 401

# Logout route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'})

# Home route with session check
@app.route('/home', methods=['GET'])
def home():
    if 'user_id' in session:
        return jsonify({'message': 'Welcome to the home page!'})
    return jsonify({'message': 'Please log in first'}), 401

# Add trip plan for a logged-in user
@app.route('/travel', methods=['POST'])
def plan_trip():
    if 'user_id' not in session:
        return jsonify({'message': 'Please log in to plan a trip'}), 401
    data = request.get_json()
    new_trip = TripPlan(
        destination=data['destination'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        travelers=data['travelers'],
        travel_style=data['travel_style'],
        user_email=session['user_id']
    )
    db.session.add(new_trip)
    db.session.commit()
    return jsonify({'message': 'Trip planned successfully'})

# Get all trips for the logged-in user
@app.route('/trips', methods=['GET'])
def get_trips():
    if 'user_id' not in session:
        return jsonify({'message': 'Please log in to view trips'}), 401
    trips = TripPlan.query.filter_by(user_email=session['user_id']).all()
    trips_data = [
        {
            'destination': trip.destination,
            'start_date': trip.start_date,
            'end_date': trip.end_date,
            'travelers': trip.travelers,
            'travel_style': trip.travel_style
        }
        for trip in trips
    ]
    return jsonify({'trips': trips_data})

# Initialize the database
if __name__ == '__main__':
    db.create_all()  # Creates the database tables if they don't exist
    app.run(debug=True)
