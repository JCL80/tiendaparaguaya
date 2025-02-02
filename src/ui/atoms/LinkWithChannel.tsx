"use client";
import Link from "next/link";
import { type ComponentProps } from "react";

export const LinkWithChannel = ({
	href,
	...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) => {

	if (!href.startsWith("/")) {
		return <>a</>
		return <Link {...props} href={href} />;
	}

	return <Link {...props} href={href} />;
};