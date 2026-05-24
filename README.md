# n8n-nodes-nalu-ai

<p align="center">
  <img src="nodes/NaluAi/nalu.svg" alt="NaLU AI Logo" width="100" height="100">
</p>

Este é o nó oficial de comunidade do n8n para a **[NaLU AI](https://naluai.dev)**, permitindo integrar extração e validação semântica de dados diretamente nos seus fluxos de automação.

A **NaLU AI** extrai o que o usuário *realmente* quis dizer — nomes, CPF, CNPJ, CEP, e-mail, telefone, placas e datas — de linguagem natural, sem confundir saudações com dados e sem alucinações.

---

## 🚀 Funcionalidades (13 Validadores Prontos)

Com este nó único, você pode arrastar e configurar os 13 validadores baseados em IA da NaLU AI:

*   **Validate Name (`validate_name`)**: Extrai nome completo, ignorando saudações (como "Bom dia") e títulos.
*   **Validate Reply Context (`validate_reply`)**: Entende o contexto conversacional complexo (como diferenciar uma contraproposta de "48 parcelas" de um valor fixo de "R$ 48").
*   **Validate CEP (`validate_cep`)**: Extrai o CEP brasileiro e retorna o endereço completo enriquecido.
*   **Validate CPF (`validate_cpf`)**: Valida e extrai CPF com cálculo de dígito mod 11.
*   **Validate CNPJ (`validate_cnpj`)**: Valida e extrai CNPJ com cálculo de dígito mod 11.
*   **Validate Handoff (`validate_handoff`)**: Detecta intenção semântica de falar com um atendente humano.
*   **Validate Yes/No (`validate_yes_no`)**: Detecta respostas afirmativas ou negativas em qualquer idioma, inclusive de forma indireta.
*   **Validate Phone (`validate_phone`)**: Extrai número de telefone completo com DDD validado pela Anatel.
*   **Validate Email (`validate_email`)**: Extrai e-mail corrigindo erros comuns de digitação (ex: gamil -> gmail.com).
*   **Validate Birthdate (`validate_birthdate`)**: Identifica data de nascimento em qualquer formato e detecta se o usuário é menor de idade.
*   **Validate License Plate BR (`validate_plate_br`)**: Extrai placa de veículos no formato Mercosul e antigo.
*   **Validate Postal Code (`validate_postal_code`)**: Validação de códigos postais internacionais.
*   **Validate Cancel Intent (`validate_cancel_intent`)**: Identifica intenção de cancelamento.

---

## 📦 Instalação no n8n

Para instâncias de n8n auto-hospedadas (Self-Hosted), você pode instalar este nó com apenas alguns cliques:

1.  Acesse o painel do seu n8n e vá em **Settings (Configurações) > Community Nodes (Nós da Comunidade)**.
2.  Clique em **Install a community node (Instalar um nó da comunidade)**.
3.  Digite o nome do pacote npm: `n8n-nodes-nalu-ai`.
4.  Aceite os termos e clique em **Install**.

Pronto! O nó **NaLU AI** já estará disponível no buscador do seu canvas.

---

## 🔑 Autenticação

Para usar o nó, você precisará de um Token de Acesso da NaLU AI:

1.  Crie uma conta gratuita em **[naluai.dev](https://naluai.dev)** (você ganha 3.000 créditos grátis por mês).
2.  Copie o seu **Bearer Token** no painel da NaLU AI.
3.  No n8n, ao criar o nó da NaLU AI, selecione **Create New Credential** e cole o seu token no campo correspondente.

---

## 🛠️ Desenvolvimento Local

Se você deseja clonar este repositório e rodar modificações locais:

### Pré-requisitos
*   Node.js (v22 ou superior) instalado.
*   npm instalado.

### Passos para Desenvolvimento
1.  Clone este repositório no seu computador.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento do n8n com carregamento dinâmico (hot-reload):
    ```bash
    npm run dev
    ```
    *Este comando irá compilar o código TypeScript, iniciar um n8n local e recarregar automaticamente toda vez que você fizer alterações nos arquivos.*

---

## 📄 Licença

[MIT](LICENSE.md) © [NaLU AI Team](https://naluai.dev)
