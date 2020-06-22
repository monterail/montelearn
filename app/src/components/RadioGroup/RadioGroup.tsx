import SvgCheckmark from "@/components/svg/SvgCheckmark";
import { themes } from "@/constants/radioGroupThemes";

type Props<T> = {
  className?: string;
  isLocked: boolean;
  isCorrect: (option: T) => boolean;
  isSelected: (option: T) => boolean;
  onClick: (option: T) => void;
  optionKey: string;
  options: T[];
};

function RadioGroup<T extends Record<string, string | string[]>>({
  className = "",
  isLocked,
  isCorrect,
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
        const selectedThemes = isCorrect(option) ? themes.selectedCorrect : themes.selected;
        const nonSelectedThemes = isCorrect(option)
          ? themes.nonSelectedCorrect
          : themes.nonSelected;
        const theme = isSelected(option) ? selectedThemes : nonSelectedThemes;
        const cursorClass = isLocked ? "cursor-none" : "cursor-pointer";
        return (
          <div
            data-testid="radio-group"
            className={`inline-flex ${cursorClass} max-w-screen-md rounded-full items-center py-4 pl-4 pr-8 transition-colors duration-100 ${theme.containerClass} ${className}`}
            onClick={handleClick(option)}
            onKeyPress={(event) => (event.key === "Enter" ? handleClick(option) : null)}
            role="radio"
            aria-checked={isSelected(option)}
            tabIndex={0}
            key={`option-${option.answer}`}
          >
            <span
              className={`flex items-center content-center border-2 mr-4 rounded-full p-1 w-6 h-6 ${theme.circleClass}`}
            >
              {isSelected(option) && <SvgCheckmark isCorrect={isCorrect(option)} />}
            </span>
            <span className={`font-medium text-xl font-roboto-mono select-none ${theme.textClass}`}>
              {option[optionKey]}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default RadioGroup;
