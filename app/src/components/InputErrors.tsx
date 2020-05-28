import { FunctionComponent } from "react";

type Props = {
  errors?: string[];
};

const InputErrors: FunctionComponent<Props> = ({ errors = [] }) => {
  return (
    <div>
      {errors.map((error: string, idx: number) => (
        <p className="text-red-monterail font-bold mt-2" key={`error-${idx}`}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default InputErrors;
