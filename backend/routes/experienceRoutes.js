const jwt =
require('jsonwebtoken');

const User =
require('../models/User');

exports.protect =
async(
req,
res,
next
)=>{

try{

const token =

req.headers.authorization
?.startsWith(
'Bearer'
)

?

req.headers.authorization
.split(' ')[1]

:

null;

if(
!token
){

return res
.status(401)
.json({

message:
'Not authorized'

});

}

const decoded =

jwt.verify(
token,
process.env.JWT_SECRET
);

req.user =

await User
.findById(
decoded.id
)
.select(
'-password'
);

next();

}

catch(err){

res
.status(401)
.json({

message:
'Invalid token'

});

}

};



exports.requireSenior =
(

req,
res,
next

)=>{

if(

req.user.role
===

'senior'

||

req.user.role
===

'boss'

||

req.user.role
===

'admin'

){

return next();

}

return res
.status(403)
.json({

message:
'You do not have permission to perform this action'

});

};