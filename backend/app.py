from flask import request ,Flask , jsonify , render_template, Response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from flask_cors import CORS
from datetime import datetime
from werkzeug.utils import secure_filename
from flask_mail import Mail, Message
from random import randint

app = Flask(__name__)
mail=Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'onlyobsession2021@gmail.com'
app.config['MAIL_PASSWORD'] = 'onlyobsession2003'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///user.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.config['SECRET_KEY'] = 'secretartist'
CORS(app)

db = SQLAlchemy(app)



def serializer(user):

    user_data = {}
    user_data['id'] = user.id
    user_data['firstName'] = user.firstName
    user_data['lastname'] = user.lastname
    user_data['email'] = user.email
    user_data['typeofart'] = user.typeofart
    user_data['age'] = user.age
    user_data['phoneNumber'] = user.phoneNumber
    user_data['location'] = user.location
    user_data['imgprofile'] = user.imgprofile
    user_data['imgcover'] = user.imgcover
    user_data['spotifyid'] = user.spotifyid
    user_data['bio'] = user.bio
    user_data['created'] = user.created
    user_data['public_id'] = user.public_id
    user_data['prix'] = user.prix
    user_data['youtubelink'] = user.youtubelink
    user_data['otp'] = user.otp
    user_data['confirmation'] = user.confirmation
    return user_data

def searchserializer(users):
    output = []
    for user in users:
        user_data = {}
        user_data['firstName'] = user.firstName
        user_data['lastname'] = user.lastname
        user_data['email'] = user.email
        user_data['typeofart'] = user.typeofart
        user_data['age'] = user.age
        user_data['phoneNumber'] = user.phoneNumber
        user_data['location'] = user.location
        user_data['imgprofile'] = user.imgprofile
        user_data['imgcover'] = user.imgcover
        user_data['bio'] = user.bio
        user_data['created'] = user.created
        user_data['public_id'] = user.public_id
        user_data['prix'] = user.prix

        output.append(user_data)
     
    return output
def serializerwithpass(obj):
    output = []
    for user in obj:
        user_data = {}
        user_data['firstName'] = user.firstName
        user_data['lastname'] = user.lastname
        user_data['password'] = user.password
        user_data['email'] = user.email
        user_data['bio'] = user.bio
        user_data['typeofart'] = user.typeofart
        user_data['age'] = user.age
        user_data['prix'] = user.prix
        user_data['phoneNumber'] = user.phoneNumber
        user_data['location'] = user.location
        user_data['imgprofile'] = user.imgprofile
        user_data['imgcover'] = user.imgcover  
        user_data['created'] = user.created
        user_data['public_id'] = user.public_id


        output.append(user_data)
            
    return output



class Img(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.Text, unique=True, nullable=False)
    name = db.Column(db.Text, nullable=False)
    mimetype = db.Column(db.Text, nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    bio = db.Column(db.Text() )
    email = db.Column(db.String(120), unique=True, nullable=False)
    location = db.Column(db.String(120), nullable=False)
    imgprofile = db.Column(db.Integer,unique=True)
    imgcover =db.Column(db.Integer, unique=True)
    password = db.Column(db.String(60), nullable=False)
    typeofart= db.Column(db.String(60), nullable=False)
    age=db.Column(db.Integer)
    prix=db.Column(db.Integer, default=0)
    phoneNumber=db.Column(db.Integer ,  nullable=False)
    public_id=db.Column(db.String(120), nullable=False, unique=True)
    spotifyid=db.Column(db.String(120))
    youtubelink=db.Column(db.String(250))
    confirmation=db.Column(db.Boolean, default=False)
    otp= db.Column(db.Integer)
    created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"User('username {self.firstName}','bio :{self.bio}', 'email :{self.email}', 'password :{self.password}', 'imgcover :{self.imgcover}', 'prix :{self.prix}','pubid: {self.public_id}')"




@app.route('/youtube',methods=['POST'])
def youtube():
    if request.method == 'POST':
        data = request.get_json()
        if not data['id']:
            return jsonify({'message' : 'No data found!'})
        user = User.query.filter_by(public_id=data['id']).first()        
        if not user:
            return jsonify({'message' : 'No user found!'})
        
        link=data.get("youtubelink",None)
        youtubelink=link.split("=")[1]
        print(youtubelink)
        # https://www.youtube.com/watch?v=9kRgVxULbag
        
        if youtubelink is not None :
            user.youtubelink = youtubelink
            db.session.commit()

            return jsonify({"message":"youtube link updated"})

        return jsonify({"message":"they are no data"})
    else: 
        return jsonify({'message' :'incorect method'})
    
    
    



@app.route('/spotify',methods=['POST'])
def spotify():
    if request.method == 'POST':
        data = request.get_json()
        if not data['id']:
            return jsonify({'message' : 'No data found!'})
        user = User.query.filter_by(public_id=data['id']).first()        
        if not user:
            return jsonify({'message' : 'No user found!'})
        spotifyid=data.get("spotifyid",None)
            
        if spotifyid is not None :
            user.spotifyid = spotifyid
            db.session.commit()

            return jsonify({"message":"spotifyid updated"})

        return jsonify({"message":"they are no data"})
    else: 
        return jsonify({'message' :'incorect method'})
    
    
    
@app.route('/uploadprofile', methods=['POST'])
def uploadprofile():
    pic = request.files['pic']
    publicid = request.form.get("id")
    # print("*"*25)
    if not pic:
        return jsonify({'message' : 'No pic uploaded!'})
    if not publicid:
        return jsonify({'message' : 'No data found!'})
    user = User.query.filter_by(public_id=publicid).first()   
    if not user:
        return jsonify({'message' : 'No user found!'})  
    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype
    if not filename or not mimetype:
        return jsonify({'message' : 'Bad upload!'})

    img = Img(img=pic.read(), name=filename, mimetype=mimetype)
    db.session.add(img)   
    db.session.commit()
    db.session.refresh(img)
    user.imgprofile = img.id  
    db.session.commit()

    return jsonify({'message' : 'Img Uploaded!'})


@app.route('/uploadcover', methods=['POST'])
def uploadcover():
    pic = request.files['pic']
    publicid = request.form.get("id")
    # print("*"*25)
    if not pic:
        return jsonify({'message' : 'No pic uploaded!'})
    if not publicid:
        return jsonify({'message' : 'No data found!'})
    user = User.query.filter_by(public_id=publicid).first()   
    if not user:
        return jsonify({'message' : 'No user found!'})  
    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype
    if not filename or not mimetype:
        return jsonify({'message' : 'Bad upload!'})

    img = Img(img=pic.read(), name=filename, mimetype=mimetype)
    db.session.add(img)   
    db.session.commit()
    db.session.refresh(img)
    user.imgcover = img.id  
    db.session.commit()

    return jsonify({'message' : 'Img Uploaded!'})



@app.route('/view/<int:id>')
def get_img(id):
    img = Img.query.filter_by(id=id).first()
    if not img:
        return 'Img Not Found!', 404

    return Response(img.img , mimetype=img.mimetype)

@app.route("/confirm", methods=["POST"])
def confirm():
    data= request.get_json()
    user = User.query.filter_by(public_id=data['id']).first()
    if not user:
        return jsonify({"msg":"incorrect user"})
    try:
        print(data["clientcode"] )
    except  :
        return jsonify({"msg":"incorrect"})
    if user.otp == int(data["clientcode"]):
        user.confirmation=True
        db.session.commit()
        return jsonify({"msg":"correct"})
    else :
        return jsonify({"msg":"incorrect"})
    
    
@app.route("/resend", methods=["POST"])
def resend():
    data= request.get_json()
    user = User.query.filter_by(public_id=data['id']).first()
    if not user:
        return jsonify({"msg":"incorrect user"})
    otp=randint(000000,999999)
    msg = Message(subject='Onlyobsession confirmation email', sender = 'onlyobsession2021@gmail.com', recipients = [user.email])
    bodymsg="Please use the verification code to confirm your account {}".format(otp)
    msg.body=str(otp)
    mail.send(msg)
    user.otp =otp
    db.session.commit()
    return jsonify({"msg":"resendit"})
    
    
@app.route("/contact", methods=["POST"])
def contact():
    data= request.get_json()
    email = data['email']

    messsage = data['message']    
    if email == ""  or messsage =="":
        return jsonify({"msg":"invalid information"})
    msg = Message(subject='User Contact', sender = 'onlyobsession2021@gmail.com', recipients = ['onlyobsession2021@gmail.com'])
    bodymsg="\n Email : {} \n \n message :  {}".format(email,messsage)
    msg.body=bodymsg
    mail.send(msg)
    
    return jsonify({"msg":"correct"})


@app.route('/singup',methods=["GET","POST"])
def singup():
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user :
            return jsonify({"message":"exist"})
        print(data['email'])
        password=generate_password_hash(data['password'], method='sha256')
        public_id=str(uuid.uuid4())
        otp=randint(000000,999999)
        msg = Message(subject='Onlyobsession confirmation email', sender = 'onlyobsession2021@gmail.com', recipients = [data['email']])
        bodymsg="Please use the verification code to confirm your account {}".format(otp)
        msg.body=str(otp)
        mail.send(msg)
                
        # user_1=User(public_id=public_id,firstName="Mokhles",lastname="lajili",email="mokhles@gmail.com",location="tunisa monastir",img="firs.jpg",password="123azerty",typeofart="Dancer",age=24,phoneNumber=24258369,,location="anywhere")
        print("otp houa ",otp)
        new_user=User(otp=otp,public_id=public_id,password=password,firstName=data['firstName'],lastname=data['lastName'],email=data['email'],typeofart=data['select'],age=data['age'],phoneNumber=data['phoneNumber'],location=data['location'].lower())
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message":"User created","public_id":"{}".format(public_id)})
        
    else:
        
        return jsonify({"message": "Invalid method "})

    

@app.route('/login',methods=["POST"])
def login():
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()

        if user:
            if check_password_hash(user.password, data['password']):
                
                if user.confirmation:
                    return jsonify({"message":"exist","id":user.public_id,"confirmation":"yes"}),200
                else :
                    return jsonify({"message":"exist","id":user.public_id,"confirmation":"no"}),200

            else:
                return jsonify({"message":"incorect"})

        return jsonify({"message":"incorect"})
       
    else:
        
        return jsonify({"message":"method incorrect"})

@app.route('/profile',methods=["POST"])
def profile():
    if request.method == 'POST':
        data = request.get_json()
        if not data['id']:
            return jsonify({'message' : 'No data found!'})
        user = User.query.filter_by(public_id=data['id']).first() 
        if not user:
            return jsonify({'message' : 'No user found!'})    
        output = serializer(user)       
        return jsonify({"message":"exist","data":output})
    else: 
        return jsonify({'message' :'incorect method'})
    

@app.route('/bio',methods=["POST"])
def bio():
    if request.method == 'POST':
        data = request.get_json()
        if not data['id']:
            return jsonify({'message' : 'No data found!'})
        user = User.query.filter_by(public_id=data['id']).first()        
        if not user:
            return jsonify({'message' : 'No user found!'})
        bio=data.get("bio",None)
       
        prix=data.get("prix",None)
        name=data.get("name",None)
        lastname=data.get("last_name",None)
        if name is not None and lastname is not None :
            if name != "" :
                user.firstName = name
            if lastname != "":
                user.lastname=lastname
            db.session.commit()
            return jsonify({"message":"first Name and Last Name updated","name": user.firstName ,"lastName": user.lastname})
        
            
            
        if bio is not None :
            user.bio = bio
            db.session.commit()

            return jsonify({"message":"Bio updated"})

        elif prix is not None :
            user.prix = int(prix) 
            db.session.commit()
            return jsonify({"message":"prix updated"})
    

        return jsonify({"message":"they are no data"})
    else: 
        return jsonify({'message' :'incorect method'})
    
    
    

@app.route('/verif',methods=["POST"])
def verif():
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter_by(public_id=data['id']).first()      
        

        if user:
            if check_password_hash(user.password, data["data"]['current_password']):
                password=generate_password_hash(data["data"]['password'], method='sha256')
                user.password =password
                db.session.commit()
                return jsonify({"message":"password updated"}),200
            else:
                return jsonify({"message":"verify your current password"})

        return jsonify({"message":"incorect user"})
       
    else:
        
        return jsonify({"message":" incorrect method"})
    
    
    


@app.route('/search',methods=["POST"])
def search():
    if request.method == 'POST':
        data = request.get_json()

        user = User.query.filter_by(public_id=data['public_id']).first()      
        

        if user and user.typeofart=="organizer":
            if data["location"]=="":
                artist=User.query.filter_by(typeofart=data['artisttype']).all() 
                output = searchserializer(artist)
                return jsonify({"data":output}),200
            else:
                artist=User.query.filter_by(typeofart=data['artisttype'],location=data["location"].lower()).all() 
                output = searchserializer(artist)
                return jsonify({"data":output}),200
        else:
            return jsonify({"message":"verify your information"})

        return jsonify({"message":"incorect user"})
       
    else:
        
        return jsonify({"message":" incorrect method"})
    
        
    
    
    
    
    
    
    
if __name__ == '__main__':
    app.run()