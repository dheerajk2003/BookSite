import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import AddBook from "./AddBook";
import AllBooks from "./UserBooks";
import { useCookie } from "./Home";

type bookType = {
    author: string
    bid: string
    doc: string
    dop?: string
    id: string
    price: number
    publisher?: string
    title: string
    type: string,
    imageUrl: string
} | null

interface booksType {
    books: bookType[]
    setBooks: Dispatch<SetStateAction<bookType[]>>;
}

const bStateContext = createContext<booksType | undefined>(undefined);
export const seeAllContext = createContext<boolean | undefined>(undefined);

export default function Layout() {
    const [books, setBooks] = useState<bookType[]>([]);
    const myCookie = useContext(useCookie);

    useEffect(() => {
        getBooks();
        console.log("Layout");
    }, [])


    async function getBooks() {
        try {
            const url: string = import.meta.env.VITE_API_URL + "BookInfoModels/allBooks/" + myCookie;
            // const allUrl: string = `${import.meta.env.VITE_API_URL}BookInfoModels`;
            console.log(url);
            const response = await fetch(url, {
                headers: {
                    "tokenId": myCookie!
                }
            })
            if (!response.ok) {
                console.log("error while getting books ", response, myCookie);
                return;
            }
            const data = await response.json();
            setBooks(data);
            console.log("books ------------ ", data);
        }
        catch (error) {
            console.log("in catch get books ", error);
        }
    }


    return (<div className="w-screen h-screen flex flex-row pt-16">
        <bStateContext.Provider value={{ books, setBooks }}>
            <AddBook getBooks={getBooks} />
            <div className="h-full w-3/5">
                <div className="w-full h-14">
                    <h3 className="font-bold text-2xl text-gray-200 text-center mt-5">Books</h3>
                </div>
                {/* <div className="w-full">
                        <button className="h-10 w-24 bg-orange-600 text-white font-bold p-1 rounded" onClick={() => { setSeeAll(!seeAll); getBooks() }}>{seeAll ? "My Books" : "AllBooks"}</button>
                    </div> */}
                <AllBooks books={books} setBooks={setBooks} getBooks={getBooks} />
            </div>
        </bStateContext.Provider>
    </div>)
}