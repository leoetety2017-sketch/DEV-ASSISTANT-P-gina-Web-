import React, { useState } from 'react';

// --- Ícone de Prancheta (Clipboard) ---
const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="bi bi-clipboard">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3z"/>
  </svg>
);

// --- Componente da Base de Conhecimento (Exemplos de Prompt) ---
const knowledgeBasePrompts = [
  "Componente React de formulário de login com email e senha.",
  "Função em Python que usa 'requests' para fazer uma requisição GET.",
  "Estrutura HTML com cabeçalho, corpo e rodapé.",
  "Servidor Express.js simples com uma rota GET."
];

const KnowledgeBase = ({ onPromptSelect }) => (
  <div className="knowledge-base">
    <h3 className="knowledge-base-title">Ou comece com um exemplo:</h3>
    <div className="prompts-grid">
      {knowledgeBasePrompts.map((prompt, index) => (
        <button key={index} className="prompt-suggestion" onClick={() => onPromptSelect(prompt)}>
          {prompt}
        </button>
      ))}
    </div>
  </div>
);


// --- Componente Principal da Aplicação ---
function App() {
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCode = () => {
    if (!prompt) {
      alert("Por favor, digite uma descrição para o código a ser gerado.");
      return;
    }
    
    setIsLoading(true);
    setSummary('');
    setGeneratedCode('');

    setTimeout(() => {
      let fakeSummary = '';
      let fakeGeneratedCode = '';
      const lowerCasePrompt = prompt.toLowerCase();

      if (lowerCasePrompt.includes('login')) {
        fakeSummary = `Componente de formulário de login em React. Inclui campos para email e senha, além de um botão de submissão. Utiliza o hook "useState" para gerenciar o estado dos campos do formulário.`;
        fakeGeneratedCode = `import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(\`Login com: \${email}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  );
}`;
      } else if (lowerCasePrompt.includes('python') || lowerCasePrompt.includes('requests')) {
        fakeSummary = `Script Python que demonstra como fazer uma requisição GET para uma API JSON usando a biblioteca 'requests'. O script busca dados de uma URL de exemplo e imprime o conteúdo da resposta.`;
        fakeGeneratedCode = `import requests
import json

def fetch_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Lança exceção para códigos de erro HTTP
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar dados: {e}")
        return None

data = fetch_data('https://api.github.com/users/reactjs')
if data:
    print(json.dumps(data, indent=2))
`;
      } else if (lowerCasePrompt.includes('html')) {
        fakeSummary = `Estrutura básica de um documento HTML5. Inclui as tags essenciais como <!DOCTYPE>, <html>, <head> (com <meta> e <title>) e <body> (com <header>, <main>, <footer>).`;
        fakeGeneratedCode = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título da Página</title>
</head>
<body>
    <header>
        <h1>Cabeçalho</h1>
    </header>
    <main>
        <p>Conteúdo principal.</p>
    </main>
    <footer>
        <p>Rodapé</p>
    </footer>
</body>
</html>`;
      } else if (lowerCasePrompt.includes('express')) {
        fakeSummary = `Servidor web básico usando Express.js em Node.js. Ele cria uma rota GET na raiz ('/') que responde com uma mensagem "Olá, Mundo!". Ideal para iniciar uma API REST.`;
        fakeGeneratedCode = `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Olá, Mundo com Express!');
});

app.listen(port, () => {
  console.log(\`Servidor rodando em http://localhost:\${port}\`);
});`;
      } else {
        fakeSummary = `Este é um componente React de exemplo chamado "MeuComponente". Ele renderiza um título e um parágrafo. É um ótimo ponto de partida para um componente de apresentação estático.`;
        fakeGeneratedCode = `// Código gerado a partir do prompt: "${prompt}"
function MeuComponente() {
  return (
    <div>
      <h1>Olá, Mundo!</h1>
      <p>Este é um componente de exemplo.</p>
    </div>
  );
}`;
      }

      setSummary(fakeSummary);
      setGeneratedCode(fakeGeneratedCode);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode).then(() => {
        alert("Código copiado para a área de transferência!");
      }).catch(err => {
        console.error('Falha ao copiar o texto: ', err);
        alert("Falha ao copiar o código.");
      });
    }
  };

  const handlePromptSelect = (selectedPrompt) => {
    setPrompt(selectedPrompt);
  };

  return (
    <main className="main-container">
      
      <header className="app-header">
        <h1 className="text-5xl font-bold text-glow">
          Dev Prototype Helper
        </h1>
        <p className="text-xl text-gray-400 mt-2">
          Digite sua ideia e deixe a IA criar a base do seu código.
        </p>
      </header>

      <KnowledgeBase onPromptSelect={handlePromptSelect} />

      <div className="prompt-section">
        <textarea 
          className="prompt-textarea"
          placeholder="Ex: Crie um componente React que busca e exibe uma lista de usuários de uma API."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
        />
        <button className="btn-futuristic" onClick={handleGenerateCode} disabled={isLoading}>
          {isLoading ? 'Gerando...' : 'Gerar Código'}
        </button>
      </div>

      {(generatedCode || isLoading) && (
        <div className="code-output-container">
          {isLoading && <div className="loading-overlay"><span>Analisando seu pedido...</span></div>}
          
          {summary && (
            <div className="code-summary">
              <p>{summary}</p>
            </div>
          )}

          <div className="code-output-header">
            <span>Código Gerado</span>
            <button className="btn-copy" onClick={handleCopyCode} title="Copiar Código" disabled={!generatedCode}>
              <ClipboardIcon />
              Copiar
            </button>
          </div>
          <pre className="code-output">
            <code>
              {generatedCode || ''}
            </code>
          </pre>
        </div>
      )}

    </main>
  );
}

export default App;
