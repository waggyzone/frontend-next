import { useSession } from "next-auth/react";
import React, { MouseEventHandler, useState } from "react";
import Button from "../Button";
import Image from "next/image";

const Card: React.FC<{
  id: string;
  title?: string;
  name?: string;
  breed?: string;
  price?: number;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  onAdd: Function;
}> = ({ id, title,name, price, onEdit, onDelete, onAdd, image, ...restProps }) => {
  const [quantity, setQuantity] = useState(1);
  const { data: session, status } = useSession();
  console.log("hia");
  return (
    <div className="rounded-md overflow-hidden shadow-lg bg-white" key={restProps.key}>
      <div className=" flex flex-1 py-2">
        <div className="flex-[0.9]  flex gap-2  ">
          {image ? (
            <Image
              className="h-48 w-40 -my-2 flex-none bg-cover text-center overflow-hidden rounded-l-md"
              src="https://res.cloudinary.com/dabzajcsi/image/upload/v1682020253/images/vvhtyoag1nrjrfniiutz.jpg"
              width={100}
              height={100}
              alt={`${title}`}
              loading="lazy"
            />
          ) : (
            <div
              role="status"
              className=" animate-pulse flex items-center justify-center  h-48 w-40 bg-gray-300 rounded  -my-2 dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512">
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          )}

          <div className="font-bold text-xl ">
            {title}
            <p className="text-gray-700 text-base">{name}</p>
            <div className="pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                &#8377; {price}
              </span>
            </div>
          </div>
        </div>

        {session?.user.role == "admin" ? (
          <div className="flex-[0.1] space-y-4">
            <Button
              onClick={onEdit}
              enableIcon
              type="edit"
              className="bg-slate-300 rounded-md shadow-md hover:scale-105"
            />
            <Button
              onClick={onDelete}
              enableIcon
              type="delete"
              className="bg-slate-300 rounded-md shadow-md hover:scale-105"
            />
          </div>
        ) : (
          <div>
            <Button
              onClick={(event) => {
                event.preventDefault();
                onAdd(id, quantity);
              }}
              enableIcon
              type="cart"
              className="bg-slate-300 rounded-md shadow-md hover:scale-105"
            />
            <div className="h-7 flex flex-row bg-red-600 rounded-full items-center">
              <button
                className="bg-slate-500 rounded-l-full h-7 w-5 flex items-center justify-center"
                onClick={() => setQuantity((prev) => prev + 1)}>
                +
              </button>
              <span className="px-1 w-fit">{quantity}</span>
              <button
                className="bg-slate-500 rounded-r-full h-7 w-5 flex items-center justify-center"
                onClick={() =>
                  setQuantity((prev) => {
                    if (prev > 1) {
                      return prev - 1;
                    }
                    return prev;
                  })
                }>
                -
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Card;
