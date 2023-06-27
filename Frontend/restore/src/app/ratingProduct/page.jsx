"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/navbar/navbar";

const Rating = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value, 10));
  };

  const submitRating = async () => {
    try {
      const response = await axios.post(
        `https://re-store.onrender.com/categories/technology/rating`,
        {
          rate: rating,
          id: productId,
        }
      );
      if (response.status === 200) {
        router.push(`/home` + productId);
      } else {
        console.log("Error al enviar calificación");
      }
    } catch (error) {
      Controller.error(error);
    }
  };
  return (
    <div>
        <Navbar/>
      <h3>Calificar producto</h3>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={handleRatingChange}
      />
      <button onClick={submitRating}>Enviar calificación</button>
    </div>
  );
};

export default Rating;
