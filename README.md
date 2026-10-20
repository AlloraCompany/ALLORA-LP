## Allora Company LP

### Informações do Projeto
- Landing Page Allora Company
- **Status:** Publicado

### Domínio & Hospedagem
- **Domínio principal:** https://www.alloracompany.com/
- **Linguagens:** React e TypeScript
- **Hospedagem:** Vercel (conta da Allora; deploy automático a cada push em `main`)
- **DNS:** Squarespace Domains

### Responsáveis
- **Desenvolvimento / Implementação:** Felipe
- **Gestão:** Allora Company

### Propostas comerciais (páginas estáticas)
- Cada proposta é uma pasta em `public/propostas/<cliente-vN>/` com um `index.html` e seus assets.
- Ela abre em `https://www.alloracompany.com/propostas/<cliente-vN>` graças ao rewrite curinga em `next.config.ts`. Não é preciso mexer em configuração para publicar uma nova: basta criar a pasta e dar push.
- Convenção do nome: cliente em minúsculas, sem acento, seguido da versão (`soouenergia-v1`, `soouenergia-v2`...). Versão nova é pasta nova; a antiga continua acessível.
- No HTML, usar caminhos absolutos para os assets (`/propostas/<cliente-vN>/img/...`) e manter `<meta name="robots" content="noindex, nofollow">` para a proposta não aparecer em buscadores.

