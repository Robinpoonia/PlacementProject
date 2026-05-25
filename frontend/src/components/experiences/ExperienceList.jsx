import ExperienceCard
from './ExperienceCard';

export default function ExperienceList({
experiences
}){

if(
!experiences.length
){

return(

<div
className="
text-center
text-gray-400
"
>

No experiences found

</div>

);

}

return(

<div
className="
space-y-8
"
>

{

experiences.map(
(item)=>(

<ExperienceCard

key={
item._id
}

experience={
item
}

/>

)

)

}

</div>

);

}