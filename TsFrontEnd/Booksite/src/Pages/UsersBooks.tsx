import { useEffect, useState } from "react"
import { getCookie } from "../global/cokies"

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

export default function UsersBooks(){
    const [Books,setBooks] = useState<(bookType)[]>();
    const myCookie = getCookie();

    async function getAllBooks(){
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels`,{
                method: "GET",
                headers:{
                    "tokenId": myCookie
                }
            })
            if(!response.ok){
                console.log("cannot receave data");
                return null;
            }
            const data = await response.json();
            setBooks(data);
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        getAllBooks();
    },[])

    return(
        <>
            {Books?.map((item) => {
            return(
            <div className="w-full flex flex-row" key={item?.bid}>
                <img src={import.meta.env.VITE_API_URL+"getImage/"+item?.imageUrl} alt={item?.imageUrl} className="w-32" />
                <p className="m-2">Title-{item?.title}</p>
                <p className="m-2">Auther-{item?.author}</p>
                <p className="m-2">Publisher-{item?.publisher}</p>
                <p className="m-2">Price-{item?.price}</p>
                <p className="m-2">Type-{item?.type}</p>
                <p className="m-2">Published On-{item?.dop}</p>
                <p className="m-2">Date Of Creation-{item?.doc}</p>
            </div>)
        })}
        </>
    )
}