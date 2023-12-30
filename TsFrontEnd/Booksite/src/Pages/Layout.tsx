import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { getCookie } from "../global/cokies"
import { useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import AllBooks from "./UserBooks";
import UsersBooks from "./UsersBooks";

type bookType = {
    author:string
    bid:string
    doc:string
    dop?:string
    id:string
    price:number
    publisher?:string
    title:string
    type:string,
    imageUrl: string
} | null

interface booksType{
    books:bookType[] 
    setBooks:Dispatch<SetStateAction<bookType[]>>;
}

const bStateContext = createContext<booksType|undefined>(undefined);

export default function Layout() {
    const [seeAll, setSeeAll] = useState(false);
    const [books, setBooks] = useState<bookType[]>([]);
    let myCookie:string;
    let navigate = useNavigate();
    useEffect(() => {
        myCookie = getCookie();
        if (!myCookie || myCookie == undefined || myCookie == "") {
            navigate("/login");
        }
        getBooks();
    }, [])

    async function getBooks(){
        const url:string = import.meta.env.VITE_API_URL+"BookInfoModels/allBooks/"+myCookie;
        console.log(url);
        const response = await fetch(url,{
            headers:{
                "tokenId": myCookie
            }
        })
        if(!response.ok){
            return;
        }
        const data = await response.json();
        setBooks(data);
    }

    return (<div className="w-screen h-screen flex flex-row mt-16">
        <bStateContext.Provider value={{books,setBooks}}>
            <AddBook/>
            <div>
                <button onClick={() => setSeeAll(!seeAll)}>{seeAll ? "My Books" : "AllBooks"}</button>
                {seeAll ? <UsersBooks/> : <AllBooks  />}
            </div>
        </bStateContext.Provider>
    </div>)
}