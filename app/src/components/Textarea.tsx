import React, { FunctionComponent } from "react";
import JSONPretty from "react-json-pretty";

type Props = {
  value: string;
  label?: string;
  placeholder?: string;
};

const DEFAULT_CLASSES = `
  shadow-xs appearance-none rounded-lg w-full p-4
  text-gray-300 leading-tight focus:outline-none
  placeholder-gray-300 font-roboto-mono resize-none
  bg-white min-h-json
`;

const Textarea: FunctionComponent<Props> = ({ value, label, placeholder = "" }) => {
  return (
    <div>
      {label && (
        <label className="block text-red-300 text-sm font-bold mb-2 cursor-pointer w-full lg:w-3/4">
          {label}
        </label>
      )}
      <JSONPretty data={value || placeholder} className={DEFAULT_CLASSES} />
    </div>
  );
};

export default Textarea;
