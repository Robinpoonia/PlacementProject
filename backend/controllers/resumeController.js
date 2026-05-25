const User=
require('../models/User');

exports.uploadResume=
async(
req,
res
)=>{

try{

if(!req.user){

return res
.status(401)
.json({
message:
'Login required'
});

}

if(!req.file){

return res
.status(400)
.json({
message:
'Choose PDF'
});

}

const user=
await User.findById(
req.user._id
);

user.resumeUrl=
req.file.filename;

await user.save();

res.json({

message:
'Uploaded',

resume:
user.resumeUrl

});

}

catch(err){

console.log(err);

res.status(500)
.json({

message:
err.message

});

}

};

exports.getResume=
async(
req,
res
)=>{

const user=
await User.findById(
req.params.id
);

res.json({

resume:
user.resumeUrl

});

};

exports.getAllResumes =
async(req,res)=>{

try{

const users =
await User.find({

role:'senior',

resumeUrl:{
$exists:true,
$ne:null
}

})

.select(
'name resumeUrl role'
);

res.json(
users
);

}

catch(err){

res
.status(500)
.json({
message:
err.message
});

}

};