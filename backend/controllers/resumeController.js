const User =
require(
"../models/User"
);

exports.uploadResume =
async(
req,
res
)=>{

try{

if(
!req.user
){

return res
.status(401)
.json({

message:
"Login required"

});

}

if(
!req.file
){

return res
.status(400)
.json({

message:
"Choose PDF"

});

}

console.log(
req.file
);

const user =
await User.findById(
req.user._id
);

user.resumeUrl =
req.file.path;

await user.save();

res.json({

message:
"Uploaded",

resume:
user.resumeUrl

});

}

catch(err){

console.log(
err
);

res
.status(500)
.json({

message:
err.message

});

}

};

exports.getResume =
async(
req,
res
)=>{

try{

const user =
await User.findById(
req.params.id
);

if(
!user
){

return res
.status(404)
.json({

message:
"User not found"

});

}

res.json({

resume:
user.resumeUrl

});

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

exports.getAllResumes =
async(
req,
res
)=>{

try{

const users =
await User.find({

role:
"senior",

resumeUrl:{

$exists:true,

$ne:null

}

})

.select(
"name resumeUrl role"
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