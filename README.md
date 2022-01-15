<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p> 

## Description

Nest is a framework for building efficient, scalable <a href="http://nodejs.org" target="_blank">Node.js</a> server-side applications. It uses modern JavaScript, is built with  <a href="http://www.typescriptlang.org" target="_blank">TypeScript</a> (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

<p>Under the hood, Nest makes use of <a href="https://expressjs.com/" target="_blank">Express</a>, but also, provides compatibility with a wide range of other libraries, like e.g. <a href="https://github.com/fastify/fastify" target="_blank">Fastify</a>, allowing for easy use of the myriad third-party plugins which are available.</p>

--- Novo Projeto
git clone https://github.com/nestjs/typescript-starter.git project
cd project
npm install
npm run start

--- Pacotes Instalados
npm install --save @nestjs/typeorm typeorm pg

Se você estiver usando o Windows, use SET como prefixo:
"scripts": {
    "dev": "SET NODE_ENV=development && nodemon index.js",
  },
Mas se você estiver usando MacOS, remova a palavra - chave SET e use:
"scripts": {
    "dev": "NODE_ENV=development && nodemon index.js",
},
Então, em poucas palavras

se você estiver usando o Windows, use o prefixo SET antes de seus scripts de execução e remova SET do MacOS (provavelmente LINUX também) como mostrado acima.