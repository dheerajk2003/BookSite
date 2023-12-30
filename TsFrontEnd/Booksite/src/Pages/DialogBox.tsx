import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { boxIdContext, xexample } from "./Home";
import { getCookie } from "../global/cokies";

interface dialogBoxProps {
    bId:string;
}

interface BookInfoModel {
    bid: string;
    title: string;
    price: number;
    author: string;
    type?: string;
    publisher?: string;
    dop?: string;
    doc: string;
    id: string;
  }

 const DialogBox: React.FC<dialogBoxProps> = ({ bId }) => {

    const box = useContext(xexample);
    const boxCon = useContext(boxIdContext);
    const myCookie = getCookie();

    const [bookInfoS, setBookInfoS] = useState<BookInfoModel>({
        bid:"",
        id:"",
        title : "",
        author: "",
        price: 0,
        type: "",
        publisher: "",
        dop: "",
        doc :""
    });

    const fetchBookData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/${bId}`,{
            headers:{
                "tokenId": myCookie
            }
          });
          if (!response.ok) {
            console.error('Failed to fetch book data');
            return;
          }
    
          const data = await response.json();
          setBookInfoS(data);
        } catch (error) {
          console.error('Error fetching book data:', error);
        }
      };

    function handleChange(event:ChangeEvent<HTMLInputElement>){
        const target = event.target as HTMLInputElement;
        const {name , value} = target;
        setBookInfoS({...bookInfoS, [name]: value});
    }

    async function handleSubmit(event:FormEvent){
        event.preventDefault();
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/${bId}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                "tokenId": myCookie
            },
            body: JSON.stringify(bookInfoS),
        });
        if(!response.ok){
            console.log("failed to update");
        }
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        fetchBookData();
    },[bId])

    return(
        <dialog open={box?.dbox} style={{display: (boxCon?.boxId == bId) ? "block" : "none"}} className="bg-slate-500">
            <button onClick={box?.toggleBox} className="bg-red-600">X</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Title" name="title" value={bookInfoS.title} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Author" name="author" value={bookInfoS.author} onChange={handleChange} />
                </div>
                <div>
                    <input type="number" placeholder="Price" name="price" value={bookInfoS.price} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Type" name="type" value={bookInfoS.type} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Publisher" name="publisher" value={bookInfoS.publisher} onChange={handleChange} />
                </div>
                <div>
                    <input type="date" placeholder="Publish Date" name="dop" value={bookInfoS.dop} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit" className="bg-red-600">Update</button>
                </div>
            </form>
        </dialog>
    )
}

export default DialogBox;