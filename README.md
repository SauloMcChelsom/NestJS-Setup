<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  


<p align="center"><h1 align="center">Documentação</h1></p>

</br></br>

<p align="center"><a href="http://nestjs.com/" target="blank">[ PT-BR ]</a></p>

<p align="center"><a href="http://nestjs.com/" target="blank"> EN-USA </a></p>

</br></br>
<p align="right">Autor<a href="http://nestjs.com/" target="blank"> Saulo McChelsom</a></p>

## Introdução
NestJS-Setup é uma infraestrutura back-end para iniciar um projeto sem precisar de configurar
[NestJS-Setup](https://github.com/nestjs/nest) link para teste online.

## Instalação

Verificando a versão instalada do NodeJS
```bash
# deve ser igual ou superior a v16.13.2
node --version
```

Verificando a versão instalada do NPM
```bash
# deve ser igual ou superior a 8.3.2
npm --version
```
> caso não tenha o NodeJS instalado na sua maquina, por favor seguir esse [tutorial](https://nodejs.org/en/)

Criar um diretorio para o projeto
```bash
mkdir cd C:\workspaces\
```

Cloning the Repository
```bash
git clone -b develop https://github.com/SauloMcChelsom/NestJS-Setup.git
```

Entrar na pasta
```bash
cd NestJS-Setup
```

Installing dependencies
```bash
npm install
```

## Inicializar

Running the app mode development
```bash
$ npm run start:dev
```

Running the app mode production
```bash
$ npm run start:prod
```

Test unit
```bash
$ npm run test:unit
```

Test e2e
```bash
$ npm run test:e2e
```

## Tecnologias utilizadas

-  **PostgreSQL**
-  **TypeORM**
-  **Firebase**
-  **RxJS**
-  **TypeScript**
-  **NestJS**
-  **Jest**
-  **swagger**
-  **Heroku**
-  **Redis**

## Implementações

FUNDAMENTALS
-  **Middleware**
-  **Exception filters**
-  **Pipes**
-  **Guards**
-  **Interceptors**
-  **Custom decorators**
-  **Custom providers**
-  **Asynchronous providers**
-  **Dynamic modules**
-  **Injection scopes**
-  **Circular dependency**
-  **Module reference**
-  **Lazy-loading modules**
-  **Execution context**
-  **Lifecycle events**
-  **Platform agnosticism**
-  **Testing**

TECHNIQUES
-  **Database**
-  **Configuration**
-  **Validation**
-  **Caching**
-  **Serialization**
-  **Versioning**
-  **Task scheduling**
-  **Queues**
-  **Events**
-  **Compression**
-  **File upload**
-  **Streaming files**
-  **HTTP module**
-  **Model-View-Controller**
-  **Performance (Fastify)**
-  **Server-Sent Events**

SECURITY
-  **Authentication**
-  **Authorization**
-  **Encryption and Hashing**
-  **Helmet**
-  **CORS**
-  **CSRF Protection**
-  **Rate limiting**

WEBSOCKETS
-  **Gateways**
-  **Exception filters**
-  **Pipes**
-  **Guards**
-  **Interceptors**
-  **Adapters**

## Convenção

Variavel simples
```js
let numero_cartao_de_debito = 8425778
```

Variavel que representa uma entidade
```js
// variavel que representa uma entidade, dominio ou objeto deve ser declarodo junto com sua propriedade.
// sempre respeitando a ordem entidade+propriedade 
let usuario_nome = 'mary'
```

Metodos
```js
calcularContasDeDebitos(){
...
}
```

Classes
```js
class ContasDeDebitos {
...
}
```

Arquivos
```bash
./contasDeDebitos.components.ts
```
> se sua classe esta precisando acessar um recurso de outro modulo, sua classe não pode acessa um model ou repositorio, deve sempre acessar o service.

## Estrutura de arquivos e diretorios

Segue detalhamento de como deve ser a criação das novas funcionalidades do sistema NestJS-Setup. qualquer coisa fora deste padrão deve ser corrigido.

- [`./CDN`](#cdn)
- [`./src`](#src)
	- [`./config`](#config)
	-  [`./entity`](#entity)
	-  [`./lib`](#lib)
	-  [`./modules`](#modules)
		-  [`./user`](#user)
			-  [`./dto`](#dto)
			-  [`./interface`](#interface)
			-  [`./mapper`](#mapper)
			-  [user.controller.ts](#controller)
			-  [user.model.ts](#model)
			-  [user.module.ts](#module)
			-  [user.repository.ts](#repository)
			-  [user.service.ts](#service)
	-  [`./services`](#services)
	-  [`./views`](#views)
-  [.app.heroku_commands](#heroku_commands)
-  [.env.development](#development)
-  [.env.production](#production)
-  [.env.tests](#tests)
-  [.redis.heroku_commands](#redis)
-  [connection-database-for-test-unit.ts](#routes)
-  [INSOMNIA_NESTJS_SETUP_V1.json](#routes)
-  [jest-custom-match.js](#routes)
-  [jest.config.ts](#routes)
-  [jest.e2e.ts](#routes)
-  [npm-install](#routes)
-  [ormconfig.js](#routes)
-  [Procfile](#routes)
-  [tsconfig.json](#routes)

### cdn
Arquivos `.jpg` `.png` `.mp4` `.mp3` `.pdf` e outros, enviados pelo usuarios. Todos os arquivos que o usuario subiu com o uploads, são enviados para essa pasta,
da mesma forma, esse diretorio também e ultilizado para fazer todo processo de download.
```
CDN
```

### src
Arquivos src
```
src
```

### config
Arquivos de configuração que pode ser ultilizados em outras parte do sistema
```
src/config
```

### entity
Todas as entidades do sistema
```
src/entity
```
### lib
modulos de funcionalidades, são chamados por construtor para realizar uma função 
```
src/lib
```
### modules
modulos principal do sistema
```
src/modules
```

### user
arquivos de paginas web para exemplos
```
src/modules/user
```

### dto
arquivos de paginas web para exemplos
```
src/modules/user/dto
```

### interface
arquivos de paginas web para exemplos
```
src/modules/user/interface
```

### mapper
arquivos de paginas web para exemplos
```
src/modules/user/mapper
```

### controller
os dados são recebidos por dto, e retorna um mepper
```
src/modules/user/controller
```

### model
uma unidade, que realiza uma execução especifica, unica...
```
src/modules/user/model
```

### module
arquivos de paginas web para exemplos
```
src/modules/user/module
```

### repository
são classe customizada de acesso ao banco com orm
```
src/modules/user/repository
```

### service
um conjuto de varias unidade para a realização de uma tarefas, os metodos são chamados por interface ou variavel tipadas, retorna uma etidade
```
src/modules/user/service
```

### services
modulos de serviços, são chamados por uri para realizar uma tarefas especificas
```
src/services
```
### views
arquivos de paginas web para exemplos
```
src/view
```

## Get Started

### lib

### modules

### services




