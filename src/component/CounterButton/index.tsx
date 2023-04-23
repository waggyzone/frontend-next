import { useCallback, useEffect, useState } from "react";

const CounterButton: React.FC<{
  id?: string | number;
  defaultValue?: string | number;
  onChange?: Function;
}> = ({ defaultValue, onChange = () => {}, id }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="custom-number-input h-10 w-32">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={() => {
            setValue((prev: any) => {
              if (prev > 1) {
                const val = Number(prev) - 1;
                onChange(val, id);
                return val;
              }
              return prev;
            });
          }}
          data-action="decrement"
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onChange(event.target.value, id);
          }}
          type="number"
          className="removeArrows outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
          name="custom-input-number"
        />
        <button
          onClick={() => {
            setValue((prev: any) => {
              const val = Number(prev) + 1;
              onChange(val, id);
              return val;
            });
          }}
          data-action="increment"
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};

export default CounterButton;
