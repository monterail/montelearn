import React, { FC, useState, MouseEvent } from "react";
import onClickOutside from "react-onclickoutside";

import { DropdownOption } from "@/types/Generic";

type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  options: DropdownOption[];
  value: string;
  handleChange: (option: DropdownOption) => void;
};

const Dropdown: FC<Props> & {
  handleClickOutside?: VoidFunction;
} = ({ label, options, value, handleChange, placeholder = "" }) => {
  const [open, setOpen] = useState(false);

  const showDropdown = () => {
    setOpen(true);
  };

  const hideDropdown = () => {
    setOpen(false);
  };

  const handleOptionClick = (option: DropdownOption) => (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleChange(option);
    hideDropdown();
  };

  const selectedOption = options.find((option) => option.value === value);

  Dropdown.handleClickOutside = () => hideDropdown();

  return (
    <div>
      {label && <label className="block text-red-300 text-sm font-bold mb-2 w-full">{label}</label>}
      <div
        className="
          relative
          shadow-xs appearance-none bg-gray-athens rounded-lg w-full p-4
          text-gray-300 leading-tight focus:outline-none
          placeholder-gray-300 font-roboto-mono cursor-pointer
        "
        onClick={showDropdown}
      >
        {selectedOption?.name || placeholder}
        {open && (
          <div style={{ top: "52px" }} className="absolute left-0 right-0 bg-white z-50 shadow-xs">
            {options.map((option) => (
              <div
                key={option.value}
                className="p-4 hover:bg-gray-athens cursor-pointer"
                onClick={handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Dropdown.prototype = {};

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
