import { getStore } from "@netlify/blobs";

// GET  /api/data?key=registros   -> devolve o texto salvo (ou vazio)
// POST /api/data?key=registros   -> salva o texto enviado no corpo da requisição
export default async (req) => {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response("Parâmetro 'key' é obrigatório", { status: 400 });
  }

  const store = getStore("controle-ponto");

  if (req.method === "GET") {
    const value = await store.get(key);
    return new Response(value ?? "", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  if (req.method === "POST") {
    const body = await req.text();
    await store.set(key, body);
    return new Response("ok", { status: 200 });
  }

  return new Response("Método não permitido", { status: 405 });
};

export const config = {
  path: "/api/data",
};
