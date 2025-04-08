"use client";

import { Footer } from "@/components/Footer";
import { ProfileUser } from "@/components/ProfileUser";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Home() {
	const [username, setUsername] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState("");
	const [showProfile, setShowProfile] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!inputValue.trim()) return setErrorMessage("Digite um nome de usuário");

		setLoading(true);
		setUsername(inputValue.trim());
		setShowProfile(true);
		setLoading(false);
		setInputValue("");
	};

	return (
		<>
			{showProfile ? (
				<section className="bg-slate-900 min-h-screen px-4 py-10">
					<div className="max-w-6xl mx-auto mb-6">
						<button
							type="button"
							onClick={() => setShowProfile(false)}
							className="flex items-center gap-2 text-white hover:underline transition"
						>
							<ArrowLeft size={20} />
							<span>Voltar</span>
						</button>
					</div>
					<ProfileUser username={username} />
				</section>
			) : (
				<main className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center px-4">
					<section className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8">
						<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
							GitHub Finder
						</h1>

						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-4 w-full"
						>
							<label htmlFor="username" className="text-gray-700 font-semibold">
								Usuário do GitHub
							</label>
							<input
								type="text"
								id="username"
								placeholder="Digite o nome de usuário"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
							/>

							{errorMessage && (
								<p className="text-red-500 text-sm">{errorMessage}</p>
							)}

							<button
								type="submit"
								disabled={loading}
								className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
							>
								{loading ? "Buscando..." : "Buscar"}
							</button>
						</form>
					</section>
				</main>
			)}
			<Footer />
		</>
	);
}
