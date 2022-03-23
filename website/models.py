from . import db

class User(db.Model):
    id = db.Column(db.integer, primary_key=True)
    username = db.Column(db.String(150))
    password = db.Column(db.String(150))

