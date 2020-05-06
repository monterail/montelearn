import { rem } from "@/theming/utils";

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
