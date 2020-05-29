import SvgCheckmark from "@/components/svg/SvgCheckmark";

type Props<T> = {
  className?: string;
  isLocked: boolean;
  isSelected: (option: T) => boolean;
  onClick: (option: T) => void;
  optionKey: string;
  options: T[];
};

function RadioGroup<T extends Record<string, string | string[]>>({
  className = "",
  isLocked,
  isSelected,
  onClick,
  optionKey,
  options,
}: Props<T>) {
  const handleClick = (option: T) => (): void => {
    if (!isLocked) {
      onClick(option);
    }
  };

  return (
    <>
      {options.map((option) => {
        const textClass = isSelected(option) ? "text-white" : "text-black";
        const containerClass = isSelected(option) ? "bg-red-monterail" : "bg-red-100";
        const circleClass = isSelected(option)
          ? "bg-white border-red-monterail"
          : "bg-red-100 border-red-200";
        const cursorClass = isLocked ? "cursor-none" : "cursor-pointer";
        return (
          <div
            className={`inline-flex ${cursorClass} rounded-full items-center py-4 pl-4 pr-8 transition-colors duration-100 ${containerClass} ${className}`}
            onClick={handleClick(option)}
            onKeyPress={(event) => (event.key === "Enter" ? handleClick(option) : null)}
            role="radio"
            aria-checked={isSelected(option)}
            tabIndex={0}
            key={`option-${option.answer}`}
          >
            <span
              className={`flex items-center content-center border-2 mr-4 rounded-full p-1 w-6 h-6 ${circleClass}`}
            >
              {isSelected(option) && <SvgCheckmark />}
            </span>
            <span className={`font-medium text-xl font-roboto-mono select-none ${textClass}`}>
              {option[optionKey]}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default RadioGroup;
