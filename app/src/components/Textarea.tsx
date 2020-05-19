import React, { FunctionComponent, ChangeEvent } from "react";

type Props = {
  id: string;
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea: FunctionComponent<Props> = ({
  id,
  label,
  name,
  value,
  placeholder = "",
  handleChange,
  rows = 15,
}) => {
  return (
    <div>
      {label && (
        <label
          className="block text-red-300 text-sm font-bold mb-2 cursor-pointer w-full lg:w-3/4"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className="
          shadow-xs appearance-none rounded-lg w-full p-4
          text-gray-300 leading-tight focus:outline-none
          placeholder-gray-300 font-roboto-mono resize-none
       "
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={value}
        rows={rows}
      />
    </div>
  );
};

export default Textarea;
