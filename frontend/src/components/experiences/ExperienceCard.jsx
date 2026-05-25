import { useState } from 'react';

export default function ExperienceCard({
experience
}){

const[
show,
setShow
]=
useState(false);

console.log(
experience
);

return(

<>

<div

className="
bg-[#121a2d]
rounded-3xl
p-8
cursor-pointer
"

onClick={()=>
setShow(
true
)
}

>

<h2
className="
text-4xl
font-bold
text-white
"
>

{
experience.company
}

</h2>

<p
className="
text-cyan-400
mb-6
"
>

{
experience.roundType
}

</p>

<p
className="
text-gray-300
line-clamp-3
"
>

{
experience.description
}

</p>

<button
className="
mt-6
text-cyan-400
"
>

View Full →

</button>

</div>



{

show

&&

<div
className="
fixed
inset-0
bg-black/70
z-50
flex
justify-center
items-center
p-6
"
>

<div
className="
bg-[#121a2d]
w-full
max-w-3xl
rounded-3xl
p-10
relative
"
>

<button

onClick={()=>
setShow(
false
)
}

className="
absolute
top-6
right-6
text-white
text-3xl
"

>

×

</button>


<h1
className="
text-5xl
font-bold
text-white
mb-4
"
>

{
experience.company
}

</h1>


<p
className="
text-cyan-400
"
>

Round:
{
experience.roundType
}

</p>


<p
className="
mt-2
text-white
"
>

Author:

{

experience.user?.name

||

'Unknown'

}

</p>


<div
className="
mt-8
text-gray-300
"
>

{
experience.description
}

</div>



{

experience
.user
?.resumeUrl

?

(

<div
className="
mt-8
"
>

<a

href={

`${import.meta.env.VITE_API_URL}/uploads/${experience.user.resumeUrl}`

}

target="_blank"

rel="noreferrer"

className="
inline-block
bg-cyan-500
px-6
py-4
rounded-xl
text-white
"

>

View Resume

</a>

</div>

)

:

(

<div
className="
mt-8
text-red-400
"
>

Resume not uploaded

</div>

)

}

</div>

</div>

}

</>

);

}