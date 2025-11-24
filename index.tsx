import React from 'react'; // Importa a biblioteca React para criar componentes.
import ReactDOM from 'react-dom/client'; // Importa a biblioteca ReactDOM para interagir com o DOM (a estrutura da página).
import App from './App'; // Importa o componente principal da aplicação, chamado "App".

const rootElement = document.getElementById('root'); // Busca no HTML o elemento que tem o ID 'root'. É lá que a aplicação vai rodar.
if (!rootElement) { // Se o elemento 'root' não for encontrado...
  throw new Error("Não foi possível encontrar o elemento raiz para montar a aplicação"); // ...lança um erro e para a execução.
}

const root = ReactDOM.createRoot(rootElement); // Cria a "raiz" da aplicação React dentro do elemento HTML encontrado.
root.render( // Renderiza (ou seja, desenha na tela) o conteúdo da aplicação.
  <React.StrictMode> {/* Ativa o "Modo Estrito" do React, que ajuda a encontrar e avisar sobre possíveis problemas no código. */}
    <App /> {/* Renderiza o componente principal 'App' que importamos no início. */}
  </React.StrictMode>
);
