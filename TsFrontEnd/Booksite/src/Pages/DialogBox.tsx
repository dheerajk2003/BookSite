import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { boxIdContext, useCookie, xexample } from "./Home";

interface dialogBoxProps {
    bId: string;
    getBooks: () => void;
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

const DialogBox: React.FC<dialogBoxProps> = ({ bId, getBooks }) => {

    const box = useContext(xexample);
    const boxCon = useContext(boxIdContext);
    const myCookie = useContext(useCookie);
    const [bookInfoS, setBookInfoS] = useState<BookInfoModel>({
        bid: "",
        id: "",
        title: "",
        author: "",
        price: 0,
        type: "",
        publisher: "",
        dop: "",
        doc: ""
    });


    const fetchBookData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/${bId}`, {
                headers: {
                    "tokenId": myCookie!
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


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setBookInfoS({ ...bookInfoS, [name]: value });
    }


    async function handleSubmit(event: FormEvent) {
        try {
            event.preventDefault();

            const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/${bId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "tokenId": myCookie!
                },
                body: JSON.stringify(bookInfoS),
            });
            getBooks();
            box?.toggleBox();
            if (!response.ok) {
                console.log("failed to update", response);
                return;
            }
            console.log("from update ");
            console.log("from update after getBooks");
        }
        catch (error) {
            console.log("error in update", error);
        }
    }

    useEffect(() => {
        console.log("in the dialog");
        fetchBookData();
    }, [bId])

    return (
        <>
        <div style={{display: box?.dbox ? "block" : "none"}} className="w-screen h-screen absolute top-0 left-0 bg-gray-600 opacity-30"></div>
        <dialog open={box?.dbox} style={{ display: (boxCon?.boxId == bId) ? "" : "none" }} className="w-screen h-screen absolute top-0 left-0 bg-transparent flex flex-col items-center justify-center z-10">
            
            <div className="z-20 bg-gray-800 p-10 rounded-xl">
                <div className="">
                    <button onClick={box?.toggleBox} className="bg-red-600 px-2 mb-5 float-right">X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="Title" name="title" value={bookInfoS.title} onChange={handleChange} className="w-44 h-8 border-2 border-white rounded-full mb-3 pl-2 bg-transparent"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Author" name="author" value={bookInfoS.author} onChange={handleChange} className="w-44 h-8 border-2 border-white rounded-full mb-3 pl-2 bg-transparent"/>
                    </div>
                    <div>
                        <input type="number" placeholder="Price" name="price" value={bookInfoS.price} onChange={handleChange} className="w-44 h-8 border-2 border-white rounded-full mb-3 pl-2 bg-transparent"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Type" name="type" value={bookInfoS.type} onChange={handleChange} className="w-44 h-8 border-2 border-white rounded-full mb-3 pl-2 bg-transparent"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Publisher" name="publisher" value={bookInfoS.publisher} onChange={handleChange} className="w-44 h-8 border-2 border-white rounded-full mb-3 pl-2 bg-transparent"/>
                    </div>
                    <div>
                        <input type="date" placeholder="Publish Date" name="dop" value={bookInfoS.dop} onChange={handleChange} className="w-44 h-8 border-2 border-white rounded-full mb-3 pl-2 bg-transparent"/>
                    </div>
                    <div>
                        <button type="submit" className="bg-orange-600 px-5 py-2 rounded-full hover:scale-105 font-semibold">Update</button>
                    </div>
                </form>
            </div>
        </dialog>
        </>
    )
}

export default DialogBox;