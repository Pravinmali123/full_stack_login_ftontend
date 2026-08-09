import React,{
useEffect,
useState
}
from "react";

import axios
from "axios";
import { API_URL } from "../config";

const Admin=()=>{

const [user,
setUser]
=
useState([]);


const getUser=
async()=>{

try{

const res=
await axios.get(

`${API_URL}/register`

);

setUser(
res.data.data
);

}

catch(error){

console.log(
error
);

}

};



useEffect(()=>{

getUser()

},[])



const deleteUser=
async(id)=>{

try{

await axios.delete(

`${API_URL}/register/deleteregister/${id}`

);

alert(
"User Deleted"
);

getUser();

}

catch(error){

console.log(
error
);

}

};



const updateUser=
async(id)=>{

const name=
prompt(
"Enter New Name"
);

if(!name)
return;

try{

await axios.patch(

`${API_URL}/register/updateregister/${id}`,

{

name

}

);

alert(
"User Updated"
);

getUser();

}

catch(error){

console.log(
error
);

}

};



return(

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-3xl font-bold mb-6">

Admin Panel

</h1>


<div className="bg-white p-5 rounded shadow mb-5">

<h2 className="text-xl">

Total Users :

{user.length}

</h2>

</div>



<table className="w-full bg-white shadow rounded">

<thead>

<tr className="bg-pink-500 text-white">

<th className="p-3">

Name

</th>

<th className="p-3">

Email

</th>

<th className="p-3">

Update

</th>

<th className="p-3">

Delete

</th>

</tr>

</thead>



<tbody>

{

user.map((e)=>(

<tr
key={e._id}
className="text-center border-b"
>

<td className="p-3">

{e.name}

</td>

<td className="p-3">

{e.email}

</td>

<td>

<button

onClick={()=>{

updateUser(
e._id
)

}}

className="bg-yellow-500 px-4 py-2 rounded"

>

Update

</button>

</td>


<td>

<button

onClick={()=>{

deleteUser(
e._id
)

}}

className="bg-red-500 text-white px-4 py-2 rounded"

>

Delete

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

)

}

export default Admin;