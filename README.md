# tv-show-api

## Sumário

- [tv-show-api](#tv-show-api)
  - [Sumário](#sumário)
  - [Motivação](#motivação)
  - [Pilha de tecnologia](#pilha-de-tecnologia)
  - [Como rodar](#como-rodar)
    - [Pré-requisitos](#pré-requisitos)
    - [Passo a passo](#passo-a-passo)

## Motivação

Este app consiste em uma API de cadastro e consultas de séries de TV e _streaming_. Ela permite que os usuários cadastrem novas séries informando detalhes como título, data de estreia, idioma, gênero principal e URL do pôster (opcional).

A API possui dois _endpoints_ principais:

1. **[POST]** `/shows`: Este _endpoint_ recebe um JSON no corpo da requisição contendo as propriedades obrigatórias (`title`, `isRunning`, `language` e `mainGenre`) e opcionalmente a URL do pôster (`posterUrl`). Caso algum campo obrigatório esteja faltando no JSON, a API retorna o status 400 juntamente com um JSON de erro indicando que pelo menos um campo obrigatório não foi informado. Se todas as informações forem fornecidas corretamente, a API cadastra a nova série e retorna o status 201 juntamente com um JSON contendo o ID da série cadastrada;

2. **[GET]** `/shows/:title`: Este _endpoint_ recebe um parâmetro de rota (`title`) contendo o título ou parte do título de uma série. A API retorna todas as séries correspondentes ao título informado, ignorando maiúsculas e minúsculas. O resultado é retornado no status 200 como um JSON contendo um array chamado `shows`, que contém os dados de todas as séries correspondentes.

Além disso, a API é capaz de alternar o uso de dois bancos de dados diferentes: PostgreSQL com Prisma (`tvshows-pg`) e MongoDB com o pacote mongodb (`tvshows-mongo`). Os DAOs (_Data Access Objects_) e _Controllers_ são implementados utilizando os conceitos de Injeção de Dependências (DI) e Inversão de Controle (IoC).

Para executar a API, é fornecido um arquivo [`docker-compose.yml`](./docker-compose.yml) que permite criar os contêineres Docker para os bancos de dados e configurar o ambiente de desenvolvimento. Esse é um resumo das funcionalidades e da estrutura geral da TV Show API, permitindo que os usuários cadastrem e consultem séries de TV e _streaming_ de forma simples e eficiente.

Este foi o sétimo repositório de código apresentado no [Curso Superior de TSI](https://www.ifms.edu.br/campi/campus-aquidauana/cursos/graduacao/sistemas-para-internet/sistemas-para-internet) do IFMS como requisito para obtenção da nota parcial das atividades da unidade curricular Linguagem de Programação III.

| [&larr; Repositório anterior](https://github.com/mdccg/decoupled-postal-code-api) | [Próximo repositório &rarr;](#) |
|-|-|

## Pilha de tecnologia

| Papel | Tecnologia |
|-|-|
| Ambiente de execução | [Node](https://nodejs.org/en/) |
| Linguagem de programação | [TypeScript](https://www.typescriptlang.org/) |
| Virtualização de banco de dados | [Docker](https://www.docker.com/) |
| ORM | [Prisma](https://www.prisma.io/) |
| Banco de dados<sup>1</sup> | [MongoDB](https://www.mongodb.com/) |
| Banco de dados<sup>2</sup> | [PostgreSQL](https://www.postgresql.org/) |

## Como rodar

### Pré-requisitos

- [Node](https://nodejs.org/en/download/);
- [Yarn](https://yarnpkg.com/) (opcional);
- [Docker](https://docs.docker.com/engine/install/).

### Passo a passo

1. Clone o repositório de código em sua máquina;
   
2. Abra um shell de comando de sua preferência (prompt de comando, PowerShell, terminal _etc_.);

3. Instale as dependências do projeto através do seguinte comando:

```console
$ npm install
```

Caso esteja utilizando o gerenciador de pacotes Yarn, execute o seguinte comando como alternativa:

```console
$ yarn
```

4. Com o Docker instalado, execute o comando abaixo para levantar o _container_ Docker com o respectivo banco de dados virtualizado. Certifique-se de estar no diretório do arquivo `docker-compose.yml`;

```console
$ docker-compose up -d
```

O parâmetro `-d` serve para desocupar o shell de comando logo após a execução do comando. É uma boa convenção, ao encerrar a execução do app, derrubar o _container_ levantado através do comando:

```console
$ docker-compose down
```

Mas, não se preocupe. As tuplas inseridas no banco de dados não serão deletadas com a derrubada do _container_.

5. Agora, para se certificar de que o Prisma está devidamente configurado em sua máquina, execute o seguinte comando:

```console
$ yarn prisma
```

O script `prisma` está programado para criar uma nova migração no diretório [`prisma/migrations`](./prisma/migrations/).

6. Execute o seguinte comando para executar o app:

Para npm:

```console
$ npm run start
```

Para Yarn:

```console
$ yarn start
```

7. Finalmente, execute o seguinte comando para executar os testes de ponta a ponta:

Para npm:

```console
$ npm run cy:run
```

Para Yarn:

```console
$ yarn cy:run
```
