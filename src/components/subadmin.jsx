import React,{
useEffect,
useState
}
from "react";

import axios
from "axios";
import { API_URL } from "../config";

const SubAdmin = ()=>{

const [users,
setUsers]
=
useState([]);

const token =
localStorage.getItem(
"token"
);

// GET USERS

const getUsers =
async()=>{

try{

const res =
await axios.get(

`${API_URL}/register`,

{

headers:{
authorization:
token
}

}

);

setUsers(
res.data.data
);

}

catch(error){

console.log(
error
);

}

};

// MAKE ADMIN

const makeAdmin =
async(id)=>{

try{

const res =
await axios.put(

`${API_URL}/register/make-admin/${id}`,

{},

{

headers:{

authorization:
token

}

}

);

alert(
res.data.message
);

getUsers();

}

catch(error){

console.log(
error
);

alert(

error.response
?.data
?.message

||

"Error"

);

}

};

useEffect(()=>{

getUsers();

// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

const removeAdmin =
async(id)=>{
console.log(
"TOKEN ==",
token
)
try{

await axios.put(

`${API_URL}/register/remove-admin/${id}`,

{},

{

headers:{
authorization:
token
}

}

)

alert(
"Admin Removed"
)

getUsers()

}

catch(error){

alert(

error.response
?.data
?.message

)

}

}

return(

<div
className=
"p-5"
>

<h1
className=
"text-3xl font-bold mb-5"
>

SubAdmin Panel

</h1>

<table
className=
"w-full border"
>

<thead>

<tr
className=
"bg-gray-300"
>

<th className="border p-2">
Name
</th>

<th className="border p-2">
Email
</th>

<th className="border p-2">
Role
</th>

<th className="border p-2">
Action
</th>

</tr>

</thead>

<tbody>

{

users.map(
(item)=>(

<tr
key={
item._id
}

className=
"text-center"
>

<td
className=
"border p-2"
>

{
item.name
}

</td>

<td
className=
"border p-2"
>

{
item.email
}

</td>

<td
className=
"border p-2"
>

{
item.role
}

</td>

<td
className=
"border p-2"
>

{

item.role
===

"user"

?

<button

onClick={()=>

makeAdmin(
item._id
)

}

className=
"bg-green-500 text-white px-3 py-1 rounded"

>

Make Admin

</button>

:

item.role
===

"admin"

?

<button

onClick={()=>

removeAdmin(
item._id
)

}

className=
"bg-red-500 text-white px-3 py-1 rounded"

>

Remove Admin

</button>

:

<span>

No Action

</span>

}

</td>

</tr>

)

)

}

</tbody>

</table>

</div>

);

};

export default SubAdmin;