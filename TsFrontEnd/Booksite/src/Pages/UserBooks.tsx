import { Dispatch, SetStateAction, useContext, useEffect } from "react"
import { boxIdContext, useCookie, xexample } from "./Home";
import DialogBox from "./DialogBox";

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

type bookStateType = {
    books:bookType[]
    setBooks:Dispatch<SetStateAction<bookType[]>>
    getBooks: () => void
}

// export default function AllBooks(){
const AllBooks:React.FC<bookStateType> = ({books,getBooks}) => {

    // const [Books, setBooks] = useState<bookType[]>([]);
    // const [myCookie, setCookie] = useState<string>("");
    const myCookie = useContext(useCookie);
    const data = useContext(xexample);
    const boxCon = useContext(boxIdContext);

    // async function getBooks(){
    //     const url:string = import.meta.env.VITE_API_URL+"BookInfoModels/allBooks/"+myCookie;
    //     console.log(url);
    //     const response = await fetch(url,{
    //         headers:{
    //             "tokenId": myCookie
    //         }
    //     })
    //     if(!response.ok){
    //         return;
    //     }
    //     const data = await response.json();
    //     setBooks(data);
    // }


    async function DeleteBlog(bid:string | undefined) {
        try{
            if(confirm("do you realy want to remove this book")){
                const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/${bid}`,{
                    method:"DELETE",
                    headers:{
                        "tokenId": myCookie!
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
        function initialData(){
            getBooks();
            console.log("userbooks");
        };
        initialData();
    },[])
    

    return <div className="w-auto h-5/6 overflow-auto flex flex-col items-center justify-start gap-3">
        {(books.length > 0) && books.map((item) => {
            return(
            <div className="w-5/6 h-48 flex flex-row justify-between gap-5 rounded-sm border-2 border-white box-border " key={item?.bid}>
                <div className="">
                    <img src={import.meta.env.VITE_API_URL+"getImage/"+item?.imageUrl} alt={item?.imageUrl} className="h-full" />
                </div>
                <div className="h-full flex flex-col justify-around py-6">
                    <h3 className=" text-2xl mb-2 font-bold text-start">{item?.title}</h3>
                    <p className=" text-start text-gray-200">Auther-{item?.author}</p>
                    {/* <p className="m-2">Publisher-{item?.publisher}</p> */}
                    <p className=" text-start text-gray-200">Type-{item?.type}</p>
                    <p className=" text-xl text-start text-white font-semibold">Rs-{item?.price}</p>
                    {/* <p className="m-2">Published On-{item?.dop}</p> */}
                    {/* <p className="m-2">Date Of Creation-{item?.doc}</p> */}
                    <DialogBox bId={item!.bid} getBooks={getBooks} />
                </div>
                <div className="h-full flex flex-col justify-start items-center mt-5 mr-5">
                    <button className="m-2 h-8 w-16 bg-orange-600 hover:scale-105 text-white font-bold p-1 rounded transition-all" onClick={() => {boxCon?.setBoxId(`${item?.bid}`); data?.toggleBox();}} >Edit</button>
                    <button className="m-2 mb-3 h-8 w-16 border-2 border-orange-600 text-orange-600 hover:scale-105 font-bold p-1 rounded transition-all" onClick={() => {DeleteBlog(item?.bid)}}>Delete</button>
                    <p className="text-sm">Published On</p>
                    <p className="text-sm">{item?.dop}</p>
                </div>
            </div>)
        })} 
        {books.length == 0 && <h3>No Data</h3>}
    </div>
}

export default AllBooks;