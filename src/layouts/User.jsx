import UserLoginPage from "./UserLoginPage"
import UserPage from "./UserPage"

import { useUsers } from "../provider/appProvider"

const User = () => {
    const {logged} = useUsers()
    console.log(logged)

    return (
        <main className="main">
            {
               logged
                ? <UserPage />
                : <UserLoginPage />
            }
        </main>
    )
}

export default User