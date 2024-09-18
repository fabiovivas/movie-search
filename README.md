# Movie Search

Este programa foi desenvolvido para buscar por uma sentença em um conjunto de arquivos de dados de filmes e exibir quais e quantos arquivos contêm a palavra-chave. A busca é realizada utilizando indexação invertida duplicada para garantir uma pesquisa eficiente.

## Requisitos

- Node.js

## Instruções de Instalção

1. **Clonar o projeto para sua máquina ou fazer o download**
    ```bash
   git clone https://github.com/fabiovivas/movie-search.git

2. **Instalar dependencias**
    ```bash
   npm install

## Instruções de Uso

1. **Gerar Índices**

   Antes de rodar a aplicação, é necessário gerar os índices. Utilize o seguinte comando para gerar os índices:

   ```bash
   node src/generate-index/index.js

2. **Rodar a aplicação**

   Para executar o programa rode o seguinte comando:

   ```bash
   node src/index.js "sentença para pesquisa"

## Instruções de testes

1. **Gerar testes unitários e cobertura de testes**
    ```bash
   npm test

## Futuras melhorias

- Atualmente a pasta com os filmes estão no próprio projeto. Uma melhoria seria coloca-las em um servidor.
- Atualmente a pasta com os arquivos indexados são gerados no próprio projeto. Em consonancia com a alteração anterior é interessante grava-la em um servidor.
- Com as duas alterações anteriores, os caminhos das pastas e arquivos devem ir para um arquivo .env
- Passar a aplicação para typescript
- Fazer uma programação orientada à interfaces, para ficar mais desacoplado.

