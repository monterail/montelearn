import { COLOR_GEYSER } from "@project/core/lib/const/theming";
import { rem } from "@project/core/lib/utils/theming";

export default function StyledInput({ css = {}, ...props }) {
  return (
    <input
      css={{
        padding: rem(10),
        fontSize: rem(16),
        borderRadius: rem(10),
        border: `${rem(2)} solid ${COLOR_GEYSER}`,
        margin: rem(10),
        ...css,
      }}
      {...props}
    />
  );
}
