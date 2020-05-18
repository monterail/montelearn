import React, { FunctionComponent, ChangeEvent } from "react";

import InputErrors from "@/components/InputErrors";

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
};

const InputWithLabel: FunctionComponent<Props> = ({
  label,
  placeholder,
  type,
  id,
  onChange,
  errors,
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label
          className="block text-red-300 text-sm font-bold mb-2 cursor-pointer w-full lg:w-3/4"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className="shadow-xs appearance-none bg-gray-athens rounded-lg w-full lg:w-3/4 p-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-300 font-roboto-mono"
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errors && <InputErrors errors={errors} />}
    </div>
  );
};

InputWithLabel.defaultProps = {
  label: "Label",
  placeholder: `"placeholder" default value`,
  type: "text",
};

export default InputWithLabel;
