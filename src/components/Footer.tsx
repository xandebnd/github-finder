export const Footer = () => {
	return (
		<footer className="w-full bg-slate-900 py-6">
			<div className="container mx-auto text-center">
				<p className="text-gray-400 text-sm">
					Desenvolvido por{" "}
					<a
						href="https://github.com/xandebnd"
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 hover:underline hover:text-blue-400 transition"
					>
						Alexandre Bandeira
					</a>{" "}
					&copy; {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
};
