import Link from "next/link";
import Head from "next/head";
import {
  COLOR_GREEN,
  COLOR_WHITE,
} from "@project/core/lib/const/theming";
import Cookie from "js-cookie";

import ContentWidth from "@/components/ContentWidth";
import { rem } from "@project/core/lib/utils/theming";
import NavButton from "@/components/Layout/Navbar/navButton";
import Button from "@/components/Button";
import logout from "@/services/logout";

export default function Navbar({ token } : { token: String }) {
	return (
		<>
		<Head>
			<title>Monterail e-learning</title>
			<meta name="description" content="REST API for building custom e-learning software" />
		</Head>
		<div css={{ backgroundColor: COLOR_GREEN, borderBottom: `1px solid ${COLOR_WHITE}` }}>
			<section css={{ color: COLOR_WHITE, margin: rem(0, 20), }}>
				<ContentWidth
					css={{
						alignItems: "center",
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-between",
						padding: rem(15, 0),
					}}
				>
					<Link href="/"><img css={{ flexShrink: 0 }} alt="Logo" height="27" src="/images/logo.svg" /></Link>
					<div>
						{token
						? <>
							<a>Hi, {Cookie.get("first_name") || "User"}</a>
							<Button onClick={logout} palette="white" type="button" css={{marginLeft: rem(10)}}>Logout</Button>
						</>
						: <>
								<NavButton href="/login" text="Login"/>
								<NavButton href="/register" text="Register" css={{marginLeft: rem(10)}}/>
							</> }
					</div>
				</ContentWidth>
			</section>
		</div>
		</>
	);
}