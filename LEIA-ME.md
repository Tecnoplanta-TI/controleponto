# Controle de Ocorrências de Ponto — deploy no Netlify

## Estrutura
- `public/index.html` — o app (a tela que todo mundo acessa)
- `netlify/functions/data.js` — a função que salva/lê os dados (usa Netlify Blobs, incluso grátis no Netlify, sem precisar configurar banco de dados externo)
- `netlify.toml` — configuração do projeto
- `package.json` — dependência necessária (`@netlify/blobs`)

## Como publicar (via GitHub — recomendado, já que o deploy vai ficar automático)

1. Crie um repositório novo no GitHub (pode ser privado), por exemplo `controle-ponto`.
2. Dentro desta pasta, no terminal:
   ```
   git init
   git add .
   git commit -m "Primeira versão do controle de ponto"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/controle-ponto.git
   git push -u origin main
   ```
3. No painel do Netlify (app.netlify.com): **Add new site → Import an existing project → GitHub** → autorize e escolha esse repositório.
4. O Netlify lê o `netlify.toml` sozinho e já preenche certinho:
   - Build command: (pode deixar em branco, não tem build)
   - Publish directory: `public`
   - Functions directory: `netlify/functions`
5. Clique em "Deploy site". Em ~1 minuto você recebe a URL fixa (tipo `https://seu-site.netlify.app`) — é esse link que RH e encarregados vão usar todo dia.
6. **A partir daí, todo `git push` pra `main` atualiza o site sozinho** — então se algum dia eu (ou outra pessoa) mudar o `index.html`, é só commitar e o Netlify republica automaticamente.

### Opção alternativa — Netlify CLI (sem GitHub)
1. `npm install -g netlify-cli`
2. Dentro desta pasta: `npm install`
3. `netlify deploy --prod`
4. Siga as instruções na tela (login/criar conta Netlify, escolher "criar novo site").


## Não precisa configurar nenhum banco de dados
O Netlify Blobs já vem ativado automaticamente em qualquer site no Netlify — não precisa criar conta em Firebase, Supabase, etc. Os dados ficam armazenados na conta Netlify do próprio site.

## Testando depois do deploy
1. Abra a URL publicada.
2. Clique em "Importar da MATRIZ" e envie um `.xlsx` de teste.
3. Abra a mesma URL em outra aba (ou peça pra outra pessoa abrir) — os dados importados devem aparecer lá também, confirmando que o salvamento compartilhado está funcionando.

## Rotina diária sugerida
- RH: todo dia, abre a URL fixa e importa o arquivo do dia (o app ignora automaticamente linhas já importadas antes, então não duplica se importar duas vezes sem querer).
- Encarregados: acessam sempre a mesma URL, filtram pelo próprio nome e preenchem as justificativas.
