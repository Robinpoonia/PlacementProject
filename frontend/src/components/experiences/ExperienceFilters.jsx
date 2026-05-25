const rounds = [
'All',
'OT',
'Technical',
'HR'
];

export default function ExperienceFilters({
search,
setSearch,
selected,
setSelected
}){

return(

<div
className="
mb-10
space-y-5
"
>

<input

value={search}

onChange={(e)=>
setSearch(
e.target.value
)
}

placeholder="
Search company
"

className="
w-full
rounded-xl
bg-[#121a2d]
p-5
text-white
"
/>

<div
className="
flex
gap-3
"
>

{

rounds.map(
(item)=>(
<button

key={item}

onClick={()=>
setSelected(
item
)
}

className={`
px-6
py-3
rounded-xl

${
selected===item

?

'bg-cyan-500 text-white'

:

'bg-[#121a2d] text-gray-400'

}
`}

>

{item}

</button>
)
)

}

</div>

</div>

);

}