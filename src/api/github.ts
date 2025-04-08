import type { NextApiRequest, NextApiResponse } from "next";
import LRU from "lru-cache";

const rateLimit = new LRU({
	max: 100, // número máximo de IPs a serem armazenados
	ttl: 1000 * 60, // tempo de vida em cache (1 minuto)
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	if (!ip) {
		return res.status(400).json({ message: "IP não identificado." });
	}

	const requests = rateLimit.get(ip as string) || 0;

	if (requests >= 10) {
		return res
			.status(429)
			.json({
				message:
					"Limite de requisições atingido. Tente novamente em instantes.",
			});
	}

	rateLimit.set(ip as string, requests + 1);

	const { username, type = "user" } = req.query;

	if (!username) {
		return res.status(400).json({ message: "Usuário não informado." });
	}

	const url =
		type === "repos"
			? `https://api.github.com/users/${username}/repos`
			: `https://api.github.com/users/${username}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (response.status !== 200) {
			return res
				.status(response.status)
				.json({ message: "Erro ao buscar dados do GitHub." });
		}

		return res.status(200).json(data);
	} catch (error) {
		return res.status(500).json({ message: "Erro interno do servidor." });
	}
}
