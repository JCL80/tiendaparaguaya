"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ComponentProps } from "react";

export const LinkWithChannel = ({
	href,
	...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) => {
	const { channel } = useParams<{ channel?: string }>();
	// console.log("channel" , 	channel)
	// console.log("href" , 	href)

	if (!href.startsWith("/")) {
		return <>a</>
		return <Link {...props} href={href} />;
	}

	const encodedChannel = encodeURIComponent(channel ?? "");
	const hrefWithChannel = `/${encodedChannel}${href}`;
	return <Link {...props} href={href} />;
};