const User =
require('../models/User');

const jwt =
require('jsonwebtoken');

const {
validationResult
}
=
require(
'express-validator'
);

const getRoleFromScholar =
require(
'../utils/getRole'
);

const generateToken =
(
id,
role
) => {

return jwt.sign(

{
id,
role
},

process.env.JWT_SECRET,

{
expiresIn:
'30d'
}

);

};


// REGISTER

const register =
async (
req,
res
) => {

try {

const errors =
validationResult(
req
);

if (
!errors.isEmpty()
) {

return res
.status(400)
.json({

errors:
errors.array()

});

}

const {

email,
password,
name,
scholarNo

}

=

req.body;


const exists =
await User.findOne({

$or:[

{
email
},

{
scholarNo
}

]

});


if (
exists
) {

return res
.status(400)
.json({

message:
'User already exists'

});

}


const role =

getRoleFromScholar(
scholarNo
);


const user =
await User.create({

email,

password,

name,

scholarNo,

role

});


const token =
generateToken(

user._id,

user.role

);


res
.status(201)
.json({

_id:
user._id,

email:
user.email,

name:
user.name,

scholarNo:
user.scholarNo,

role:
user.role,

token

});

}

catch (
err
) {

res
.status(500)
.json({

message:
err.message

});

}

};


// LOGIN

const login =
async (
req,
res
) => {

try {

const errors =
validationResult(
req
);

if (
!errors.isEmpty()
) {

return res
.status(400)
.json({

errors:
errors.array()

});

}

const {

email,
password

}

=

req.body;


const user =
await User.findOne({

email

});


if (

user

&&

await user.comparePassword(
password
)

) {

if (
!user.isActive
) {

return res
.status(403)
.json({

message:
'Account disabled'

});

}

const token =
generateToken(

user._id,

user.role

);

return res.json({

_id:
user._id,

email:
user.email,

name:
user.name,

scholarNo:
user.scholarNo,

role:
user.role,

token

});

}


return res
.status(401)
.json({

message:
'Invalid email or password'

});

}

catch (
err
) {

res
.status(500)
.json({

message:
err.message

});

}

};


// GOOGLE LOGIN

const googleCallback =
async (
req,
res
) => {

try {

const token =
generateToken(

req.user._id,

req.user.role

);

res.redirect(

`${process.env.FRONTEND_URL}/auth/google/success?token=${token}`

);

}

catch (
err
) {

res.redirect(

`${process.env.FRONTEND_URL}/login?error=auth_failed`

);

}

};


module.exports = {

register,

login,

googleCallback

};