# Como contribuir

Obrigado por querer ajudar com o StepUp Calçados!

## Fluxo de trabalho
1. Crie uma branch a partir da `main`: `git checkout -b feat/nome-da-feature`
2. Faça suas alterações em pequenos commits
3. Teste no navegador (veja o checklist abaixo)
4. Atualize o `CHANGELOG.md` e a documentação, se necessário
5. Abra um Pull Request descrevendo o que mudou

## Padrão de commits
Use o formato `tipo: descrição curta`:

| Tipo | Quando usar |
|---|---|
| `feat` | nova funcionalidade |
| `fix` | correção de erro |
| `docs` | mudanças na documentação |
| `style` | formatação, sem mudar lógica |
| `refactor` | reorganização de código |
| `chore` | tarefas gerais (estrutura, configs) |

Exemplo: `feat: adiciona contador no ícone do carrinho`

## Padrões de código
- Arquivos e pastas: minúsculo, sem acento, separados por hífen (`card-produto.css`)
- Classes CSS no padrão BEM: `card-produto__titulo`, `btn--primario`
- JavaScript: `camelCase` para variáveis e funções, `MAIUSCULO` para constantes
- Indentação com 2 espaços
- Uma responsabilidade por arquivo

## Checklist antes de enviar
- [ ] Funciona no Chrome e no Firefox
- [ ] Funciona no celular (layout responsivo)
- [ ] Sem erros no console do navegador
- [ ] Caminhos de CSS/JS/imagens funcionando em todas as páginas
