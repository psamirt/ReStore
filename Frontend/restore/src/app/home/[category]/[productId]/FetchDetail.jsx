"use client";
import Image from "next/image";
import Boton from "@/app/components/Button/Button";
import BackButton from "@/app/components/backButton/BackButton";
import NotFound from "./notFound";
import { addToCart } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "@/app/components/loader/Loader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import HomeContainer from "@/app/components/HomeContainer/HomeContainer";

export function DetailId({ param }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const { data: session, status } = useSession();
  const [post, setPost] = useState({ result: [] });
  const [ofertas, setOfertas] = useState({ result: [] });
  const [onCart, setOnCart] = useState(false);
  const [cookieValue, setCookieValue] = useState(null);
  useEffect(() => {
    setCookieValue(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("User_id"))
        ?.split("=")[1]
    );
  }, []);

  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  }, [addedToCart]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://re-store.onrender.com/categories/technology/Detail/${param}`
      );
      setPost(response.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://re-store.onrender.com/categories/technology/Ofertas`
      );
      setOfertas(response.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!addedToCart) {
      if (cart.some((cartItem) => cartItem.productId === param))
        setOnCart(true);
    }
  }, [addedToCart]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    return dispatch(
      addToCart(
        post.result[0]._id,
        session?.user.id,
        cookieValue,
        post.result[0].precio,
        post.result[0]?.Ofertas
      )
    );
  };

  if (post.message) return <NotFound />;

  const calculateDiscountedPrice = () => {
    if (post?.result[0]?.Ofertas && post.result[0].precio) {
      const descuento = parseFloat(post.result[0].Ofertas) / 100;
      const precio = parseFloat(post.result[0].precio);
      const precioConDescuento = precio - precio * descuento;
      return precioConDescuento.toFixed(2);
    }
    return null;
  };
  const precioConDescuento = calculateDiscountedPrice();

  return (
    <div className="container mx-auto px-4 my-8">
      {!post.result[0] ? (
        <Loader />
      ) : (
        <div>
          {console.log(post)}
          <BackButton />
          <div className="grid md:grid-cols-2 gap-4 mb-12 mt-4">
            <div className="relative rounded-lg aspect-square shadow-md shadow-slate-200 md:justify-self-center ">
              <Image
                className="aspect-square rounded-lg object-contain"
                src={post.result[0].background_image}
                alt={post.result[0].name}
                fill
              />
            </div>
            <div className="grid gap-4 text-gray-600">
              <h2 className="text-xl font-semibold text-blue-900">
                {post.result[0].name} {post.result[0].Marca}
              </h2>
              <div className="flex items-center mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      star <= post.result[0].rating.totalStars
                        ? "yellow"
                        : "none"
                    }
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ))}
                <p className="text-xs text-gray-500 ml-2">
                  {post.result[0].rating.totalStars}
                </p>
              </div>
              <p className="text-blue-900 text-xl font-semibold">
                Estado: {post.result[0].state}
              </p>
              {precioConDescuento ? (
                <p className="text-blue-900 text-xl font-semibold">
                  Precio:{" "}
                  <span className="text-red-500 line-through">
                    ${post.result[0].precio}
                  </span>{" "}
                  <span className="">${precioConDescuento}</span>
                </p>
              ) : (
                <p className="text-blue-900 text-xl font-semibold">
                  Precio: ${post.result[0].precio}
                </p>
              )}
              <div className="flex gap-4 align-middle">
                <span className="justify-self-start">
                  <Boton
                    onClick={() => handleAddToCart()}
                    text={"Añadir al carrito"}
                  >
                    Añadir al carrito
                  </Boton>
                </span>
                {addedToCart ? (
                  !onCart ? (
                    <p className="self-center font-medium text-green-500">
                      Agregado exitósamente
                    </p>
                  ) : (
                    <p className="self-center font-medium text-red-500">
                      Ya agregaste este producto al carrito
                    </p>
                  )
                ) : null}
              </div>
            </div>
          </div>
          <div className="grid  gap-4 mb-8">
            <div className="grid gap-2">
              <h3 className="text-blue-900 text-xl font-medium">
                Descripción:{" "}
              </h3>
              <p className="text-gray-600 leading-normal text-sm">
                {post.result[0].Description}
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="text-xl font-semibold text-blue-900">
                También te puede interesar:
              </h3>
              <HomeContainer data={ofertas}></HomeContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
