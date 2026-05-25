function getRoleFromScholar(
scholarNo
){

const batchYear =

Number(
`20${scholarNo.slice(0,2)}`
);

const now =
new Date();

let academicYear =
now.getFullYear();

if(
now.getMonth()<7
){

academicYear--;

}

const diff =
academicYear
-
batchYear;

if(
diff<=0
){

return 'junior';

}

if(
diff===1
){

return 'senior';

}

return 'boss';

}

module.exports =
getRoleFromScholar;