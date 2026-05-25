const router =
require('express')
.Router();

const upload =
require('../middlewares/upload');

const {
uploadResume,
getResume,
getAllResumes
}
=
require(
'../controllers/resumeController'
);

const {
protect
}
=
require(
'../middlewares/auth'
);

// Upload resume
router.post(
'/',
protect,
upload.single(
'resume'
),
uploadResume
);

router.get(
'/resumes',
getAllResumes
);

router.get(
'/:id',
getResume
);

module.exports=
router;