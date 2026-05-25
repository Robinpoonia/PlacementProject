const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema =
new mongoose.Schema({

email:{
type:String,
required:true,
unique:true,
lowercase:true,
trim:true
},

password:{
type:String,
required:function(){
return !this.googleId;
}
},

googleId:{
type:String,
sparse:true
},

name:{
type:String,
required:true,
trim:true
},

scholarNo:{
type:String,
required:true,
unique:true
},

role:{
type:String,
enum:[
'admin',
'junior',
'senior',
'boss'
],
required:true
},

resumeUrl:{
type:String,
default:''
},

isActive:{
type:Boolean,
default:true
}

},
{
timestamps:true
}
);

userSchema.pre(
'save',
async function(next){

if(
!this.isModified(
'password'
)
){
return next();
}

if(this.password){

const salt =
await bcrypt.genSalt(10);

this.password =
await bcrypt.hash(
this.password,
salt
);

}

next();

}
);

userSchema.methods.comparePassword =
async function(password){

return bcrypt.compare(
password,
this.password
);

};

module.exports =
mongoose.model(
'User',
userSchema
);