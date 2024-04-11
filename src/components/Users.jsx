import { useState, useEffect } from "react"
import axios from "../api/axios";


const Users = () => {
    const [users, setUsers] = useState()
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async()=>{
            try{
                const response = await axios.get('/user',{
                    signal: controller.signal
                });
                console.log(response.data)
                isMounted && setUsers(response.data)

            }catch (err){
                // console.log(err.message)
                console.error(err)
            }
        }
        getUsers();
        return ()=>{
            isMounted = false;
            controller.abort()
        }
    },[]) 
  return (
    <article>
        <div>Users List</div>
        {users?.length
            ?(
                <ul>
                    {users.map((user, i) => <li key={user?.id}>{user?.id},{user?.name}</li>)}
                </ul>
                
            ):<p>No users to display</p>
        }
    </article>
  )
}

export default Users