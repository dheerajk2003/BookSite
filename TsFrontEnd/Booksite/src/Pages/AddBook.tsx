import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { getCookie } from "../global/cokies";

// type bookType = {
//     author:string
//     bid:string
//     doc:string
//     dop?:string
//     id:string
//     price:number
//     publisher?:string
//     title:string
//     type:string
// } | null

export default function AddBook(){

    const myCookie = getCookie();
    const [imageFile, setImageFile] = useState<File | null>();
    const [bookInfoS, setBookInfoS] = useState({
        title : "",
        author: "",
        price: Number,
        type: "",
        publisher: "",
        dop: "",
        id: myCookie,
        imageUrl: ""
    });

    function handleChange(event:ChangeEvent<HTMLInputElement>){
        const target = event.target as HTMLInputElement;
        const {name , value} = target;
        setBookInfoS({...bookInfoS, [name]: value});
    }

    const handleFileSubmit = async () => {
        // const extensionName = imageFile?.type;
        console.log("img in bookinfo",bookInfoS.imageUrl)
        const formData = new FormData();
        formData.append('file', imageFile!);

        const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/uploadImage`,{
            method:'POST',
            headers:{
                "tokenId": myCookie
            },
            body: formData
        })
        const data = response.json();
        console.log("fileupload res" , response,data);
    }

    async function handleSubmit(event:FormEvent){
        console.log("imageUrl",bookInfoS.imageUrl);
        
        event.preventDefault();
        await handleFileSubmit();
        const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels`,{
            method: "POST",
            headers:{
                "tokenId": myCookie,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookInfoS),
        })
        if(!response.ok){
            alert("could'nt add book please retry");
            return;
        }
        alert("Added 1 Book");
        const data = await response.json();
        console.log("from addbook" , data , response);
        location.reload();
    }


    const onFileChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return;
        
        setImageFile(e.target.files[0])

        // await setBookInfoS({...bookInfoS, imageUrl: imageFile?.name!})
        

    }

    useEffect(() => {
        setBookInfoS({...bookInfoS, imageUrl: imageFile?.name!})
    },[imageFile])

    return(
        <div className="w-2/5 h-full">
            <div className="w-full h-14">
                <h3 className="font-bold text-2xl text-gray-200 text-center">Add a Book</h3>
            </div>
            <form onSubmit={handleSubmit} id="addForm">
                <div className="w-full flex flex-row px-5 m-4 items-center justify-center">
                    <div className="w-1/4 p-1 bg-white rounded-l-full">
                        <p className="text-black text-right m-1 ">Title</p>
                    </div>
                    <input className="p-1 h-10 border-2 border-white bg-transparent rounded-r-full" type="text" placeholder="" name="title" value={bookInfoS.title} onChange={handleChange} />
                </div>
                <div className="w-full flex flex-row px-5 m-4 items-center justify-center">
                    <div className="w-1/4 p-1 bg-white rounded-l-full">
                        <p className="text-black text-right m-1 ">Author</p>
                    </div>
                    <input className="p-1 h-10 border-2 border-white bg-transparent rounded-r-full" type="text" placeholder="" name="author" value={bookInfoS.author} onChange={handleChange} />
                </div>
                <div className="w-full flex flex-row px-5 m-4 items-center justify-center">
                    <div className="w-1/4 p-1 bg-white rounded-l-full">
                        <p className="text-black text-right m-1 ">Price</p>
                    </div>
                    <input className="p-1 h-10 border-2 border-white bg-transparent rounded-r-full" type="number" placeholder="" name="price" value={bookInfoS.price.toString()} onChange={handleChange} />
                </div>
                <div className="w-full flex flex-row px-5 m-4 items-center justify-center">
                    <div className="w-1/4 p-1 bg-white rounded-l-full">
                        <p className="text-black text-right m-1 ">Type</p>
                    </div>
                    <input className="p-1 h-10 border-2 border-white bg-transparent rounded-r-full" type="text" placeholder="" name="type" value={bookInfoS.type} onChange={handleChange} />
                </div>
                <div className="w-full flex flex-row px-5 m-4 items-center justify-center">
                    <div className="w-1/4 p-1 bg-white rounded-l-full">
                        <p className="text-black text-right m-1 ">Publisher</p>
                    </div>
                    <input className="p-1 h-10 border-2 border-white bg-transparent rounded-r-full" type="text" placeholder="" name="publisher" value={bookInfoS.publisher} onChange={handleChange} />
                </div>
                <div className="w-full flex flex-row px-5 m-4 items-center justify-center">
                    <div className="w-1/4 p-1 bg-white rounded-l-full">
                        <p className="text-black text-right m-1 ">Date</p>
                    </div>
                    <input className="w-48 h-10 p-1 border-2 border-white bg-transparent rounded-r-full" type="date" placeholder="" name="dop" value={bookInfoS.dop} onChange={handleChange} />
                </div>
                <div className="w-full flex flex-col px-5 m-4 items-center justify-center">
                    {imageFile && <img className="w-32" src={URL.createObjectURL(imageFile)} /> }
                    <input className="h-10 w-64 border-2 border-white bg-transparent rounded-full file:h-10 file:bg-white file:text-black file:border-none" type="file" id="file" name="file" placeholder="select Image" required onChange={(e) => {
                        onFileChange(e);
                    } } />
                </div>
                <div className="w-full flex flex-row px-5 m-4 items-center justify-center">
                    <button className="w-64 h-10 bg-orange-600 text-white rounded-full font-semibold text-lg" type="submit" >Add</button>
                </div>
            </form>
        </div>
    )
}