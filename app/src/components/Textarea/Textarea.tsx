import { FunctionComponent } from "react";
import JSONPretty from "react-json-pretty";

import Label from "@/components/Label";

type Props = {
  value: string;
  label?: string;
  placeholder?: string;
};

const DEFAULT_CLASSES = `
  shadow-xs appearance-none rounded-lg w-full p-4
  text-gray-300 leading-tight focus:outline-none
  placeholder-gray-300 font-roboto-mono resize-none
  bg-white min-h-json overflow-auto
`;

const Textarea: FunctionComponent<Props> = ({ value, label, placeholder = "" }) => {
  return (
    <div data-testid="textarea">
      {label && <Label className="block text-sm mb-2">{label}</Label>}
      <JSONPretty data={value || placeholder} className={DEFAULT_CLASSES} />
    </div>
  );
};

export default Textarea;
