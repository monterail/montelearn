import { rem } from "../../theming/utils";

export default function ContentWidth({ as: C = 'div', style = {}, ...props }) {
  return <C style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: rem(1024), width: '100%', ...style }} {...props} />
}
