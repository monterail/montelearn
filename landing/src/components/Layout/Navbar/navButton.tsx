import Link from "next/link";

import { COLOR_WHITE } from "@project/core/lib/const/theming";
import { rem, hexToRGBA } from "@project/core/lib/utils/theming";

export default function NavButton ({ href, text, css = {}, ...props } : { href : string, text: string, css?: any }) {
	return (
		<Link href={href}>
			<a
				type="submit"
				css={{
					backgroundColor: "transparent",
					border: `1px solid ${COLOR_WHITE}`,
					borderRadius: rem(100),
					color: COLOR_WHITE,
					cursor: "pointer",
					fontFamily: "inherit",
					fontSize: rem(18),
					margin: 0,
					padding: rem(5, 20),
					textAlign: "down",
					...css,

					":hover": {
						backgroundColor:
							hexToRGBA(COLOR_WHITE, 0.2),
					},
				}}
				{...props}>{text}</a>
		</Link>
	)
}
