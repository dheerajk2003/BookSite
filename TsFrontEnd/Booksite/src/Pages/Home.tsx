import { createContext, useEffect, useState } from "react"
import Login from "./Login"
import Register from "./Register"
import Nav from "../global/Nav"
import Layout from './Layout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { getCookie } from "../global/cokies";

interface dBoxtype {
    dbox: boolean
    toggleBox: () => void
}

interface boxIdType {
    boxId: string
    setBoxId: React.Dispatch<React.SetStateAction<string>>;
}

export const xexample = createContext<dBoxtype | undefined>(undefined);
export const boxIdContext = createContext<boxIdType | undefined>(undefined);
export const useCookie = createContext<string | undefined>(undefined);

export default function Home() {
    const [dbox, setDbox] = useState(false);
    const [boxId, setBoxId] = useState("");
    const [myCookie, setMyCookie] = useState("");

    function toggleBox() {
        if (dbox) {
            setDbox(false);
            setBoxId("");
        }
        else {
            setDbox(true);
        }
    }

    const dbxType: dBoxtype = {
        dbox,
        toggleBox
    };

    useEffect(() => {
        if (!myCookie) {
            setMyCookie(getCookie());
        }
    }, [myCookie])

    return (<div className="m-0 p-0 box-border">
        

        <boxIdContext.Provider value={{ boxId, setBoxId }}>
            <xexample.Provider value={dbxType}>
                <useCookie.Provider value={myCookie} >
                    <Nav setMyCookie={setMyCookie} />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={myCookie ? <Layout /> : <Navigate to="/login" />} />
                            <Route path="/login" element={myCookie ? <Navigate to="/" /> : <Login setCk={setMyCookie} />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </BrowserRouter>
                </useCookie.Provider>
            </xexample.Provider>
        </boxIdContext.Provider>
    </div>)
}