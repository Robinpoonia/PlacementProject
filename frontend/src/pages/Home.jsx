import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {

const user =
JSON.parse(
localStorage.getItem(
'user'
)
);

const role =
user?.user?.role
||
user?.role;

const actionText =

role === 'junior'

?

'View Resume'

:

'Share Your Story';

const actionLink =

role === 'junior'

?

'/resume'

:

'/experiences/new';

const features = [

{
icon:(
<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
</svg>
),

title:
"100% Anonymous",

description:
"Your identity is never revealed. Share freely without fear."
},

{
icon:(
<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/>
</svg>
),

title:
"Company-Wise",

description:
"Browse experiences organized by company and interview round."
},

{
icon:(
<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
d="M17 20h5v-2a3 3 0 00-5.356-1.857"/>
</svg>
),

title:
"Senior → Junior",

description:
"Seniors share real experiences to help juniors prepare better."
}

];

return (

<div
className="
min-h-screen
bg-gradient-to-br
from-[#0a0f1a]
to-[#1a2332]
"
>

<section
className="
pt-32
pb-20
px-4
"
>

<div
className="
max-w-6xl
mx-auto
text-center
"
>

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
mb-8
inline-block
"

>

<span
className="
px-5
py-2
bg-cyan-500/10
border
border-cyan-500/20
rounded-full
text-cyan-400
text-sm
"
>

🚀 MCA Launchpad • MANIT Bhopal

</span>

</motion.div>


<motion.h1

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
text-5xl
md:text-7xl
font-bold
text-white
mb-6
"

>

Launch Your

<span
className="
text-cyan-400
"
>

Placement Journey

</span>

</motion.h1>


<p
className="
text-xl
text-gray-400
mb-10
max-w-3xl
mx-auto
leading-relaxed
"
>

A placement platform for MCA students at MANIT Bhopal.

Share interview experiences,
explore resumes,
and learn from seniors.

</p>


<div
className="
flex
flex-col
sm:flex-row
items-center
justify-center
gap-4
"
>

<Link

to="/experiences"

className="
px-8
py-4
bg-cyan-500
hover:bg-cyan-600
text-white
rounded-xl
transition
"

>

Browse Experiences →

</Link>


<Link

to={
actionLink
}

className="
px-8
py-4
bg-white/5
hover:bg-white/10
text-white
rounded-xl
border
border-white/10
transition
"

>

{
actionText
}

</Link>

</div>

</div>

</section>



<section
className="
px-4
pb-24
"
>

<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
max-w-6xl
mx-auto
"
>

{

features.map(
(
feature,
index
)=>(

<motion.div

key={index}

whileHover={{
y:-5
}}

className="
bg-[#1a1f2e]/60
border
border-cyan-500/20
rounded-3xl
p-8
"

>

<div
className="
w-14
h-14
bg-cyan-500/10
rounded-xl
flex
items-center
justify-center
text-cyan-400
mb-5
"
>

{
feature.icon
}

</div>

<h3
className="
text-2xl
font-bold
text-white
mb-3
"
>

{
feature.title
}

</h3>

<p
className="
text-gray-400
leading-relaxed
"
>

{
feature.description
}

</p>

</motion.div>

)

)

}

</div>

</section>



<footer
className="
border-t
border-white/10
py-10
text-center
"
>

<h2
className="
text-3xl
font-bold
text-cyan-400
"
>

MCA Launchpad

</h2>

<p
className="
text-gray-400
mt-3
"
>

Made with ❤️ by @rpstylish

</p>

<p
className="
text-gray-600
text-sm
mt-2
"
>

MCA • MANIT Bhopal

</p>

</footer>

</div>

);

};

export default Home;