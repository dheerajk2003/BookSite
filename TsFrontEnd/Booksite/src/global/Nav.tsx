import React, { Dispatch, SetStateAction, useContext } from "react";
import { delCookie } from "./cokies";
import { useCookie } from "../Pages/Home";

type navType = {
    setMyCookie:Dispatch<SetStateAction<string>>
}

const Nav:React.FC<navType> = ({setMyCookie}) => {
    const myCookie = useContext(useCookie);
    function logOut(){
        delCookie();
        setMyCookie("");
        // location.reload();
    }

    return(
        <div className="w-screen h-16 absolute top-0 left-0 m-0 p-0 pl-5 flex flex-row justify-between items-center bg-transparent">
            <h3 className="text-2xl font-bold text-white">The Book Site</h3>
            <button style={{display: !myCookie ? "none" : "block"}} className="pointer-events-auto ml-8 rounded-md px-5 py-1 pb-2 mr-5 text-lg font-semibold leading-5 border-2 border-orange-600 text-orange-600 hover:border-orange-200" onClick={logOut}>Logout</button>
        </div>
    )
}

export default Nav;