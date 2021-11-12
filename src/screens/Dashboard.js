import { useAuth } from "context/AuthContext"


function Dashboard() {
    const { user} = useAuth()
    console.log(user)
    return (
        <>

         

            <h2>
               Dashboard
            </h2>
        </>
    )
}

export default Dashboard