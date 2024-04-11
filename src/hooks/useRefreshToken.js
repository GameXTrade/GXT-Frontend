import axios from "../api/axios"


function useRefreshToken() {
    const refresh = async ()=>{
            const response = await axios.get('/user', {
                withCredentials: true
        })
        console.log(response.data)
        return response.data
    } 
  return (
    <div>useRefreshToken</div>
  )
}

export default useRefreshToken