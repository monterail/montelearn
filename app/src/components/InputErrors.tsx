import React, { FunctionComponent } from "react";

type Props = {
  errorName: string;
  errors: string[];
};

const InputErrors: FunctionComponent<Props> = ({ errorName = "", errors = [] }) => {
  return (
    <div>
      {errors.map((error: string, idx: number) => (
        <p className="text-red-monterail font-bold mt-2" key={`${errorName}-error-${idx}`}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default InputErrors;
