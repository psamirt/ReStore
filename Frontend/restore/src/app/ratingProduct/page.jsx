"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/navbar/navbar";

const Rating = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitRating = async () => {
    try {
      const response = await axios.put(
        `https://re-store.onrender.com/categories/technology/rating`,
        {
          rate: rating,
          id: productId,
          comment: comment,
        }
      );
      if (response.status === 200) {
        router.push(`/home/${productId}`);
      } else {
        console.log("Error al enviar calificación");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      <Navbar/>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            fill={star <= rating ? "yellow" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => handleRatingClick(star)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        ))}
      </div>
      <p className="text-yellow-500 mt-2">{rating} out of 5 stars</p>
      <textarea
        className="mt-4 p-2 border border-gray-300 rounded"
        placeholder="Leave a comment"
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={submitRating}
      >
        Submit
      </button>
    </div>
  );
};

export default Rating;
