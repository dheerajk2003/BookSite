import { useEffect, useState } from "react";
import { delCookie, getCookie } from "./cokies"
export default function Nav(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    function logOut(){
        setIsLoggedIn(false);
        delCookie();
        location.reload();
    }

    useEffect(() => {
        const myCookie = getCookie();
        if(!myCookie || myCookie == undefined || myCookie == ""){
            setIsLoggedIn(false);
        }
        else{
            setIsLoggedIn(true);
        }
    },[])

    return(
        <div className="w-screen h-16 absolute top-0 left-0 m-0 p-0 flex flex-row content-between items-center bg-transparent">
            <h3 className="text-2xl font-bold text-white">The Book Site</h3>
            <button style={{display: isLoggedIn ? "block" : "none"}} className="pointer-events-auto ml-8 rounded-md bg-purple-50 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-purple-600 hover:border-t-purple-200" onClick={logOut}>LogOut</button>
        </div>
    )
}