"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { NotProfile } from "./NotProfile";

interface ProfileUserProps {
	username: string | null;
}

interface Repo {
	name: string;
	description: string;
	html_url: string;
}

interface Profile {
	name: string;
	location: string;
	bio: string;
	public_repos: number;
	avatar_url: string;
}

export const ProfileUser = ({ username }: ProfileUserProps) => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [repos, setRepos] = useState<Repo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const loadData = async () => {
			if (!username) return;

			try {
				setLoading(true);
				setError(false);

				const [profileRes, reposRes] = await Promise.all([
					fetch(`/api/github?username=${username}`),
					fetch(`/api/github?username=${username}&type=repos`),
				]);

				if (!profileRes.ok) {
					setError(true);
					setLoading(false);
					return;
				}

				const profileData = await profileRes.json();
				const reposData = await reposRes.json();

				setProfile(profileData);
				setRepos(Array.isArray(reposData) ? reposData : []);
			} catch (err) {
				console.error("Erro ao buscar dados:", err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [username]);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin" />
			</div>
		);
	}

	if (error || !profile) {
		return (
			<>
				<Head>
					<title>Usuário não encontrado</title>
				</Head>
				<NotProfile />
			</>
		);
	}

	return (
		<>
			<Head>
				<title>{profile.name} - Perfil</title>
			</Head>
			<motion.section
				className="max-w-6xl mx-auto px-4 py-10"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className="text-center space-y-4">
					<Image
						src={profile.avatar_url}
						alt="Avatar"
						width={200}
						height={200}
						className="w-24 h-24 rounded-full mx-auto border-4 border-white object-cover"
					/>
					<h1 className="text-3xl font-bold text-white">{profile.name}</h1>
					<p className="text-gray-300">{profile.bio}</p>
					<p className="text-sm text-gray-400">{profile.location}</p>
					<p className="text-sm text-gray-400">
						{profile.public_repos} repositórios públicos
					</p>
				</div>

				{repos.length > 0 && (
					<div className="mt-10">
						<h2 className="text-2xl font-semibold text-white text-center mb-6">
							Repositórios
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{repos.map((repo, index) => (
								<motion.div
									key={repo.name + index.toString()}
									className="bg-[#2C3E50] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.3, delay: index * 0.05 }}
								>
									<h3 className="text-xl font-semibold text-white mb-2">
										{repo.name}
									</h3>
									<p className="text-gray-300 text-sm mb-4">
										{repo.description || "Sem descrição"}
									</p>
									<a
										href={repo.html_url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
									>
										<FaGithub />
										<span>Ver no GitHub</span>
									</a>
								</motion.div>
							))}
						</div>
					</div>
				)}
			</motion.section>
		</>
	);
};
