import { FunctionComponent } from "react";

type Props = {
  errors?: string[];
};

const InputErrors: FunctionComponent<Props> = ({ errors = [] }) => {
  return (
    <div data-testid="input-errors">
      {errors.map((error: string, idx: number) => {
        const errorId = `error-${idx}`;
        return (
          <p className="text-red-monterail font-bold mt-2" key={errorId} data-testid={errorId}>
            {error}
          </p>
        );
      })}
    </div>
  );
};

export default InputErrors;
