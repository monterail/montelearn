import {
	COLOR_DON_JUAN,
	COLOR_MILANO_RED,
  COLOR_WHITE,
} from "@project/core/lib/const/theming";

import ContentWidth from "@/components/ContentWidth";
import { rem } from "@project/core/lib/utils/theming";

export default function Footer() {
	return (
		<footer css={{ backgroundColor: COLOR_WHITE, color: COLOR_DON_JUAN, padding: rem(20) }}>
			<ContentWidth css={{ fontSize: rem(14), textAlign: "right" }}>
				Developed with <span css={{ color: COLOR_MILANO_RED }}>&#9829;</span> by Monterail
			</ContentWidth>
    </footer>
	)
}