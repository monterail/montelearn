import { rem } from "@/theming/utils";

export default function ContentWidth({ as: Component = "div", style = {}, ...props }) {
  return (
    <Component
      css={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: rem(1024),
        width: "100%",
        ...style,
      }}
      {...props}
    />
  );
}
