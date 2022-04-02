<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">NestJS-Setup é uma infraestrutura back-end para iniciar um projeto sem precisar de configurar</p>
 

# Documentação Arquitetural do sismtema NestJS-Setup

[NestJS-Setup](https://github.com/nestjs/nest) link para teste online.

## Installation

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

## Estrutura de arquivos e diretorios

Arquivos `.jpg` `.png` `.mp4` `.mp3` `.pdf` e outros, enviados pelo usuarios. Todos os arquivos que o usuario subiu com o uploads, são enviados para essa pasta,
da mesma forma, esse diretorio também e ultilizado para fazer todo processo de download.
```
CDN
```

Arquivos de configuração que pode ser ultilizados em outras parte do sistema
```
src/config
```

Todas as entidades do sistema
```
src/entity
```

modulos de funcionalidades, são chamados por construtor para realizar uma função 
```
src/lib
```

modulos principal do sistema
```
src/modules
```

modulos de serviços, são chamados por uri para realizar uma tarefas especificas
```
src/services
```

arquivos de paginas web para exemplos
```
src/view
```
# Estrutura de convenção
Segue detalhamento de como deve ser a criação das novas funcionalidades do sistema NestJS-Setup. qualquer coisa fora deste padrão deve ser corrigido.

Convenção
```bash
# variavel simples
let numero_cartao_de_debito = 8425778

# variavel que representa uma entidade, dominio ou objeto deve ser declarodo junto com sua propriedade.
# sempre respeitando a ordem entidade+propriedade 
let usuario_nome = 'mary'
```

```bash
# metodos

calcularContasDeDebitos(){
...
}
```

```bash
# classes

class ContasDeDebitos{
...
}
```

```bash
# arquivos

./contasDeDebitos.components.ts
```




