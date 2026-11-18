# Landing page do Reali

Site institucional em HTML, CSS e JavaScript. Requer Node.js 22.12+ ou 24.

```sh
npm ci
npm run dev
```

Para gerar a versão estática, execute `npm run build`. O diretório `dist/` pode ser servido por um host estático. Use `npm run preview` para conferir o build localmente.

## Configuração editorial

As configurações ficam em `js/content.js`. Recompile após editar.

- `INSTITUTION_REGISTRATION_URL` recebe a URL externa oficial. Enquanto estiver vazia, os atalhos levam à seção de cadastro e a ação final informa a pendência.
- `CANONICAL_URL` recebe a URL pública completa. Se o site for servido em um subdiretório, termine a URL com barra, como em `https://example.com/reali/`. O build gera canonical, Open Graph, sitemap e robots com base nessa URL. Sem ela, o sitemap sai vazio e o robots bloqueia indexação.
- `email`, `privacyUrl`, `termsUrl` e `socials` preenchem o rodapé.
- `team` aceita nome, função, biografia, responsabilidades, foto, LinkedIn e GitHub. Coloque imagens locais em `public/assets/` e referencie-as por `assets/nome-do-arquivo.webp` ou use URLs HTTPS.
- `history` aceita título, descrição, data, foto e texto alternativo para cada marco.

Os vídeos da portaria usam as gravações originais em 1280 × 720 a 24 quadros por segundo. A demonstração da cantina usa `assets/videos/cantina.mp4`. Confira a autorização de uso das gravações antes de publicar. Painel e RealInova utilizam exemplos locais, com identificação na interface.
