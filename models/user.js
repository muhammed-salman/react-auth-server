const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcrypt-nodejs');

//Define User Model
const userSchema=new Schema({
	email: {type:String, unique: true, lowercase: true},
	password: String
});

//on save Hook, encrypt password
//Before saving the model, run this function
userSchema.pre('save',function(next){
	const user=this;//get access to user model

	//generate a salt then run callback
	bcrypt.genSalt(10,function(err,salt){
		
		if(err){return next(err);}

		// hash(encrypt) our password using the salt
		bcrypt.hash(user.password,salt,null,function(err,hash){
			if(err){return next(err);}

		//overwrite plain password with the encrypted one	
			user.password=hash;
			next();
		});
	});
});

//compare passwords
userSchema.methods.comparePassword=function(candidatePassword,callback){
	bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
		if(err){return callback(err);}

		callback(null,isMatch);
	});
} 

//Create Model Class
const ModelClass=mongoose.model('user',userSchema);

//Export Model
module.exports=ModelClass;