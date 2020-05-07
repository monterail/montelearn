import { rem } from "@project/core/lib/utils/theming";

export default function StyledContainer({ style = {}, ...props }) {
  return (
    <div
      css={{
        margin: rem(8, 48),
        ...style,
      }}
      {...props}
    />
  );
}
