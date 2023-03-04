import { useSession } from "next-auth/react";
import React, { MouseEventHandler, useState } from "react";
import Button from "../Button";

const Card: React.FC<{
  id: string;
  title?: string;
  brandname?: string;
  price?: number;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  onAdd: Function;
}> = ({ id, title, brandname, price, onEdit, onDelete, onAdd, ...restProps }) => {
  const [quantity, setQuantity] = useState(1);
  const { data: session, status } = useSession();

  return (
    <div className="rounded-md overflow-hidden shadow-lg bg-white" key={id}>
      <div className="px-6 py-4 flex flex-1 ">
        <div className="flex-[0.9]">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{brandname}</p>
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
            <div className=" flex flex-row">
              <button
                className="bg-slate-500 rounded-full h-5 w-5 flex items-center justify-center"
                onClick={() => setQuantity((prev) => prev + 1)}>
                +
              </button>
              <span>{quantity}</span>
              <button
                className="bg-slate-500 rounded-full h-5 w-5 flex items-center justify-center"
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
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {price}
        </span>
      </div>
    </div>
  );
};
export default Card;
