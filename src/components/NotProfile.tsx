import { AlertTriangle } from "lucide-react";

export const NotProfile = () => {
	return (
		<section className="container mx-auto min-h-screen flex items-center justify-center px-4">
			<div className="text-center bg-slate-800 p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-700">
				<div className="flex justify-center mb-4">
					<AlertTriangle className="text-yellow-400 w-10 h-10" />
				</div>
				<h2 className="text-white text-2xl font-bold mb-2">
					Usuário não encontrado
				</h2>
				<p className="text-gray-300 mb-4">
					Houve um erro ao buscar este usuário. Verifique o nome digitado ou
					tente novamente mais tarde.
				</p>
				<button
        type="button"
					onClick={() => window.location.reload()}
					className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white font-semibold"
				>
					Tentar novamente
				</button>
			</div>
		</section>
	);
};
