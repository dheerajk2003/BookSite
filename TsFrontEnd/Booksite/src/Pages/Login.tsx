import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { getCookie, setCookie } from "../global/cokies"
import { Link, useNavigate } from "react-router-dom";
import { useCookie } from "./Home";

type typeLogin = {
    setCk:Dispatch<SetStateAction<string>>
}

const Login :React.FC<typeLogin> = ({setCk}) => {
    const navigate = useNavigate();
    const myCookie = useContext(useCookie);
    
    async function UserLogin() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}RegistrationModels/Login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": `${username}`,
                    "password": `${password}`
                })
            })
            if (!response.ok) {
                console.error(`Failed to fetch data. Status: ${response.status}`);
                alert("Problem in login, try again");
                return null;
            }

            const userData: string = await response.json();
            if (userData) {
                setCookie(userData);
                setCk(getCookie());
            }
        }
        catch (error) {
            console.log("error" + error);
            return null;
        }
    }

    if(myCookie){
        navigate("/")
    }

    useEffect(() => {
        console.log("Login", myCookie);
    },[])

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <section className="flex justify-center items-center h-screen w-screen bg-gradient-to-b from-10% from-black via-neutral-500 via-70% to-gray-200">
            <div className="max-w-md w-full bg-transparent rounded p-6 space-y-4">
                <div className="mb-4 w-32 h-32 rounded-full flex flex-col justify-end items-center bg-gradient-to-b from-yellow-500 via-orange-600 mx-auto">
                    <h2 className="text-3xl font-bold text-white">Sign In</h2>
                </div>
                <div>
                    <input className="w-full p-3 text-lg bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 focus:border-4 focus:border-gray-600" type="text" placeholder="Email" value={username} onChange={(e) => {setUsername(e.target.value)}} />
                </div>
                <div>
                    <input className="w-full p-3 text-lg bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 focus:border-4 focus:border-gray-600" type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <div>
                    <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 rounded text-sm font-bold text-gray-50 transition duration-200" onClick={UserLogin}>Login</button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="mt-2">Not a user yet? <Link className="text-sm text-orange-600 hover:underline" to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;