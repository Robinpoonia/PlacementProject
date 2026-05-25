import ExperienceForm from '../components/experiences/ExperienceForm';
import ResumeUpload from '../components/resumes/ResumeUpload';

export default function NewExperience() {

const user =
JSON.parse(
localStorage.getItem(
'user'
)
);

return (

<div
className="
min-h-screen
pt-28
px-6
"
>

<div
className="
max-w-4xl
mx-auto
space-y-8
"
>

{
user?.role
===

'senior'

&&

(
<ResumeUpload/>
)
}

<ExperienceForm/>

</div>

</div>

);

}