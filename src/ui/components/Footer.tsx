import Link from "next/link";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";

export async function Footer() {
	const currentYear = new Date().getFullYear();

	// Mock footer data
	const footerLinks = [
		{
			id: "1",
			name: "Categorias",
			children: [
				{ id: "1-1", name: "Electronicos", url: "/categories/electronicos" },
				{ id: "1-2", name: "Muebles", url: "/categories/muebles" },
				{ id: "1-3", name: "Hogar", url: "/categories/hogar" },
			],
		},
		{
			id: "2",
			name: "Colecciones",
			children: [
				{ id: "2-1", name: "Ofertas", url: "/collections/ofertas" },
				{ id: "2-2", name: "Nuevo", url: "/collections/nuevo" },
			],
		},
		{
			id: "3",
			name: "Nuestra empresa",
			children: [
				{ id: "3-1", name: "Sobre nosotros", url: "/pages/sobre-nosotros" },
				{ id: "3-2", name: "Contacto", url: "/pages/contacto" },
				{ id: "3-3", name: "Politica de privacidad", url: "/pages/politica-privacidad" },
			],
		},
	];

	return (
		<footer className="border-neutral-300 bg-neutral-50">
			<div className="mx-auto max-w-7xl px-4 lg:px-8">
				<div className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-3">
					{footerLinks.map((section) => (
						<div key={section.id}>
							<h3 className="text-sm font-semibold text-neutral-900">{section.name}</h3>
							<ul className="mt-4 space-y-4 [&>li]:text-neutral-500">
								{section.children.map((child) => (
									<li key={child.id} className="text-sm">
										<LinkWithChannel href={child.url}>{child.name}</LinkWithChannel>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="flex flex-col justify-between border-t border-neutral-200 py-10 sm:flex-row">
					<p className="text-sm text-neutral-500">Copyright &copy; {currentYear} Tienda Paraguaya, Inc.</p>
					<p className="flex gap-1 text-sm text-neutral-500">
						Construido por JCL80{" "}
					</p>
				</div>
			</div>
		</footer>
	);
}
