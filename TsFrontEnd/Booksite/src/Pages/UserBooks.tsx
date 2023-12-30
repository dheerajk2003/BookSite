import { useContext, useEffect, useState } from "react"
import { getCookie } from "../global/cokies"
import { boxIdContext, xexample } from "./Home";
import DialogBox from "./DialogBox";

export default function AllBooks(){

    const [Books, setBooks] = useState<bookType[]>([]);
    const [myCookie, setCookie] = useState<string>("");
    const data = useContext(xexample);
    const boxCon = useContext(boxIdContext);

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


    async function DeleteBlog(bid:string | undefined) {
        try{
            if(confirm("do you realy want to remove this book")){
                const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/${bid}`,{
                    method:"DELETE",
                    headers:{
                        "tokenId": myCookie
                        // "tokenId" : "bef96006-beed-4022-8cf5-0a8264b5231d"
                    }
                })
                console.log("res from del" + response);
            }
            getBooks();
        }
        catch(error){
            console.log("error - " + error);
        }
    }


    useEffect(() => {
        async function initialData(){
            if(!myCookie){
                const theCookie:string = getCookie();
                setCookie(theCookie);
            }
            await getBooks();
        };
        initialData();
    },[myCookie])
    

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


    return <div className="w-auto">
        {Books.map((item) => {
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
                <DialogBox bId={item!.bid}  />
                <button className="m-2" onClick={() => {boxCon?.setBoxId(`${item?.bid}`); data?.toggleBox();}} >Edit</button>
                <button className="m-2" onClick={() => {DeleteBlog(item?.bid)}}>Delete</button>
            </div>)
        })}
    </div>
}