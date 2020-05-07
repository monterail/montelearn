import React, { ReactNode } from 'react';
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import auth from "@/components/Auth";

export default function Layout({ children } : { children: ReactNode }) {
	const NavbarWithAuth = auth(Navbar);
	return (
		<>
			<NavbarWithAuth redirect={false}/>
			{children}
			<Footer/>
		</>
	);
}