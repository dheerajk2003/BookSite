import { createContext, useState } from "react"
// import { getCookie } from "../global/cokies"
// import AddBook from "./AddBook"
// import AllBooks from "./UserBooks"
import Login from "./Login"
import Register from "./Register"
import Nav from "../global/Nav"
// import UsersBooks from "./UsersBooks"
import Layout from './Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom"
//import UpdateBook from "./updateBook"

interface dBoxtype{
    dbox:boolean 
    toggleBox: () => void
}

interface boxIdType{
    boxId:string 
    setBoxId:React.Dispatch<React.SetStateAction<string>>;
}

export const xexample = createContext<dBoxtype | undefined>(undefined);
export const boxIdContext = createContext<boxIdType |undefined>(undefined);

export default function Home(){
    const [dbox,setDbox] = useState(false);
    const [boxId,setBoxId] = useState("");
    // const [seeAll, setSeeAll] = useState(false);
    // const ck = getCookie();
    
    function toggleBox(){
        if(dbox){
            setDbox(false);
            setBoxId("");
            location.reload();
        }
        else{
            setDbox(true);
        }
    }

    const dbxType:dBoxtype = {
        dbox,
        toggleBox
    };

    return (<div className="m-0 p-0 box-border">
        <Nav />
        
        {/* <button onClick={() => setSeeAll(!seeAll)} >{seeAll ? "MyBooks" : "AllBooks"}</button> */}
        <boxIdContext.Provider value={{boxId,setBoxId}}>
        <xexample.Provider value={dbxType}>


            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>


                {/* <Register />
                <Login />
                <AddBook />
            
                {seeAll ? <UsersBooks /> : <AllBooks />} */}
                {/* <AllBooks />
                <UsersBooks /> */}
        </xexample.Provider>
        </boxIdContext.Provider>
        {/* <UpdateBook bookId="AEC52483-EBCE-4C71-8788-43C371B5027C" /> */}
    </div>)
}