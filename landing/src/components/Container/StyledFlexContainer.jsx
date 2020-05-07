export default function StyledFlexContainer({ as: Component = "div", style = {}, ...props }) {
  return (
    <Component
      css={{
        display: "flex",
        width: "100%",
        ...style,
      }}
      {...props}
    />
  );
}
