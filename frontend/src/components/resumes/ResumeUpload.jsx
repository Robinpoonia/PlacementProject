import {
useState
}
from 'react';

export default function ResumeUpload(){

const[
file,
setFile
]=
useState();

const upload=
async()=>{

const user=
JSON.parse(
localStorage
.getItem(
'user'
)
);

const data=
new FormData();

data.append(
'resume',
file
);

await fetch(

`${import.meta.env.VITE_API_URL}/api/resume`,

{

method:
'POST',

headers:{

Authorization:
`Bearer ${user.token}`

},

body:data

}

);

alert(
'Uploaded'
);

};

return(

<div
className="
rounded-2xl
bg-[#121a2d]
p-8
"
>

<h2
className="
text-white
text-3xl
mb-6
"
>

Upload Resume

</h2>

<input

type="file"

accept=".pdf"

onChange={
(e)=>

setFile(
e.target.files[0]
)
}

/>

<button

onClick={
upload
}

className="
mt-6
w-full
bg-cyan-500
py-4
rounded-xl
"

>

Upload

</button>

</div>

);

}