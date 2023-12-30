import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { getCookie } from '../global/cokies';

interface BookInfoModel {
  bid: string;
  title: string;
  price: number;
  author?: string;
  type?: string;
  publisher?: string;
  dop?: string;
  doc: string;
  id: string;
}

interface UpdateBookProps {
  bookId: string;
}

const UpdateBook: React.FC<UpdateBookProps> = ({ bookId }) => {
  const [bookInfo, setBookInfo] = useState<BookInfoModel>({
    bid: '',
    title: '',
    price: 0,
    id: '',
    doc: '',
  });

  useEffect(() => {
    // Fetch the existing book data when the component mounts
    fetchBookData();
  }, [bookId]);

  const fetchBookData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/${bookId}`);
      if (!response.ok) {
        console.error('Failed to fetch book data');
        return;
      }

      const data: BookInfoModel = await response.json();
      setBookInfo(data);
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(bookInfo);
    try {
        const myCookie = getCookie()
        const response = await fetch(`${import.meta.env.VITE_API_URL}BookInfoModels/${bookId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            "tokenId": myCookie
            },
            body: JSON.stringify(bookInfo),
        });

        if (response.ok) {
            // Book updated successfully
            //onBookUpdated();
            console.log("data from update"+response);
            const data = response.json();
            console.log("data from update"+data);
        } else {
            console.error('Failed to update book:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={bookInfo.title} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={bookInfo.price} onChange={handleChange} />
      </label>
      {/* Add other fields as needed */}
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBook;