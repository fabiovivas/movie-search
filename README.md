# Movie Search

Este programa foi desenvolvido para buscar por uma sentença em um conjunto de arquivos de dados de filmes e exibir quais e quantos arquivos contêm a palavra-chave. A busca é realizada utilizando indexação invertida duplicada para garantir uma pesquisa eficiente.

## Introdução

Este projeto envolve a busca de informações em um conjunto de arquivos que contêm dados sobre filmes, incluindo título, ano, elenco e equipe. Os dados estão armazenados na pasta `data`.

## Requisitos

- Node.js

## Instruções de Instalção

1. **Clonar o projeto para sua máquina ou fazer o download**
    ```bash
   git clone https://github.com/fabiovivas/movie-search.git
   
2. **Clonar o projeto para sua máquina ou fazer o download**

## Instruções de Uso

1. **Gerar Índices**

   Antes de rodar a aplicação, é necessário gerar os índices. Utilize o seguinte comando para gerar os índices:

   ```bash
   node src/generate-index/index.js
