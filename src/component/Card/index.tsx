import React from "react";

const Card: React.FC<{
  key?: string | number;
  title?: string;
  brandname?: string;
  price?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}> = ({ key, title, brandname, price, onEdit, onDelete }) => {
  return (
    <div className="rounded-md overflow-hidden shadow-lg bg-white" key={key}>
      <div className="px-6 py-4 flex flex-1 ">
        <div className="flex-[0.9]">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{brandname}</p>
        </div>
        <div className="flex-[0.1] space-y-4">
          <button className="bg-blue-500" onClick={onEdit(key)}>
            Edit
          </button>
          <button className="bg-red-500" onClick={onDelete(key)}>
            Delete
          </button>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {price}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};

export default Card;
