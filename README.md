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
$ jest test only one file
npx jest src\model\comment-entity\test\comment.model.spec.ts

$  porcentagem total da cobertura de teste do jest
jest --coverage --coverageReporters="json-summary" --coverageReporters="text-summary"
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
```js
export class CreateDto {
	@IsNotEmpty()
	@IsNumber()
	publication_id: number;

	@IsNotEmpty()
	@MinLength(1)
	comment: string;
}
```

### interface
```js
export interface CreateInterface {
	comment: string;
	publication_id: number;
	user_id: number;
}
```

### mapper
```js
export class CreateMapper {
	public toMapper(field: ReturnInterface) {
		return {
			id: field.id,
			user_id: field.user_id,
			publication_id: field.publication_id,
			comment: field.comment,
			timestamp: field.timestamp?.toString(),
		};
	}
}
```
mapper comun

-  **authFindOne.mapper.ts**
-  **publicFindOne.mapper.ts**
-  **authList.mapper.ts**
-  **publicList.mapper.ts**
-  **create.mapper.ts**
-  **update.mapper.ts**

## Controller
os dados são recebidos por dto, e retorna um mepper

como deve ser declarado os nome das classe

-  **se e publica ou privado**
-  **lista ou singular**
-  **por entidade+propriedade**

exemplo
```js
public async authListByUserId(...){
...
}
```

todos controller deve conter os decoradores
```js
// qual é o verbo http
@Get('/user/:user_id')
```
```js
// qual a versão da uri e a visibilidade(public ou private)
@Version('1/private')
```
```js
// opcional
// tempo de cache em segundos
@CacheTTL(20)
```
```js
// estrutura de responta para erro
@UseFilters(HttpExceptions)
```
```js
// estrutura de responta para sucesso
@UseInterceptors(HttpResponse)
```
```js
// opcional
// habilitar as respostas de cache automático
@UseInterceptors(CacheInterceptor)
```
para classe auth deve conter o decorador
```js
// implementação da rota protegida com firebase
@UseGuards(JwtAuthGuard)
```
para classe que retorna uma lista, os paramentro obrigatorios são
```js
// classe com auth
@Header(new TOKEN()) token: string
```
```js
//buscar por determinada palavra chave da coluna
@Query('search') search: string
```
```js
//quantidade da lista, minimo 3 maximo 15
@Query('limit') limit = '3'
```
```js
//posição que representa uma coleção
@Query('offset') offset = '0'
```
```js
// ordenar por maior ou menor, valores aceitos ASC|DESC
@Query('order') order: string
```
```js
// coluna que desejar ordenar 
@Query('column') column: string
```
```js
// coluna datatime inicial
@Query('start') start: string
```
```js
// coluna datatime final
@Query('end') end: string
```

exemplo

```js
  @Get('/user/:user_id')
  @Version('1/private')
  @CacheTTL(20)
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptions)
  @UseInterceptors(HttpResponse)
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Listar comentarios por id do usuario' })
  public async authListByUserId(
    @Param('user_id') user_id: number,
    @Query('search') search: string,
    @Query('limit') limit = '3',
    @Query('offset') offset = '0',
    @Query('order') order: string,
    @Query('column') column: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const cls: ClassificationInterface = {
      search: search,
      limit: parseInt(limit) ? parseInt(limit) : 5,
      offset: parseInt(offset) ? parseInt(offset) : 0,
      order: order,
      column: column,
      start: start,
      end: end,
    };
    const { res, count } = await this.service.authListByUserId(user_id, cls);
    const dto = res.map((r) => this.authListMapper.toMapper(r));
    return new OK(dto, code.SUCCESSFULLY_FOUND, null, count);
  }
```

### service
um conjuto de varias unidade para a realização de uma tarefas, os metodos são chamados por interface ou variavel tipadas, retorna uma etidade

o metodo tem o mesmo nome do controller

pouca logica, apenas chama o seu model ou chama um services de outro modulos

interfaciado ou variavel tipadas

retorna uma entidade

```js
public async create(body: CreateInterface) {
const create = await this.model.create(body);
await this.publication.incrementNumberCommentOfPublication(
   body.publication_id,
);
return await this.model.findOneById(create.id);
```

### model
uma unidade, que realiza uma execução especifica, unica...
normalmente aonde os orm são executados, ou seja chamada ao banco de dados são feitas

returna como erro uma exeção em 2 nivel 1 - erro de query -> QUERY_FAILED(400) 2 - recurso não encontrado -> NOT_FOUND(404)

lista são chamado por repositorio customizados, por motivo que nativamente o orm não suporta consulta complexas, é obrigatorio ter uma consulta com os mesmo parametros para buscar a conquidade de registro

possui obrigatoriamente validaçãoes

```
limit > 3 e limit < 15
```

```
column recebe id caso não for passado pelo usuario
```

```
order recebe ASC caso não for passado pelo usuario
```

```
start valida se é uma datatime valida
```

```
end valida se é uma datatime valida
```

```
#os paramentros para o metodo de contagem de registro
publicationId
search
start
end
```

```
#os paramentros para o metodo de lista de registro
publicationId
search
limit
offset
order
column
start
end
```

exemplo

```
public async listByPublicationId(
    publicationId: number,
    search = '',
    limit = 3,
    offset = 0,
    order = 'ASC',
    column = 'id',
    start = '',
    end = '',
  ) {
    try {
      if (limit > 15) {
        limit = 15;
      }

      if (this.empty.run(column)) {
        column = 'id';
      }

      if (!(order === 'ASC' || order === 'DESC')) {
        order = 'ASC';
      }

      if (start) {
        start = this.isValidTimestamp.run(start);
      }

      if (end) {
        end = this.isValidTimestamp.run(end);
      }

      const res = await this.repository_custom.listByPublicationId(
        publicationId,
        search,
        limit,
        offset,
        order,
        column,
        start,
        end,
      );
      const count = await this.repository_custom.countListByPublicationId(
        publicationId,
        search,
        start,
        end,
      );

      if (Object.keys(res).length != 0) {
        return { res: res, count: count };
      }

      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found list by publication id',
        description : ''
      }, HttpStatus.NOT_FOUND)
    } catch (e: any) {
      throw new HttpException(e.response, e.status)
    }
  }
```


```
 public async findOneById(id: number) {
    try {
      const res = await this.repository.findOne(id).catch((err) => {
        throw new HttpException({
          code : code.QUERY_FAILED,
          message : `${err.detail || err.hint || err.routine}`,
          description : ''
        }, HttpStatus.BAD_REQUEST)
      });
      if (res) {
        return res;
      }
      throw new HttpException({
        code : code.NOT_FOUND,
        message : 'not found find one by id',
        description : ''
      }, HttpStatus.NOT_FOUND)
    } catch (e: any) {
      throw new HttpException(e.response, e.status);
    }
  }
```

### module
arquivos de paginas web para exemplos
```
src/modules/user/module
```

### repository
são classe customizada de acesso ao banco com orm

repositorio customizado que possui dois medoto comum, o list e o cout

para sucesso retorna uma entidade

para erro retorna uma exeção de QUERY_FAILED
```
src/modules/user/repository
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

https://atitudereflexiva.files.wordpress.com/2018/11/refresh_token.png

https://miro.medium.com/max/700/1*JZn_mVY2wIl5bkJFngI82Q.png

Conceito de tokens de atualização

Basicamente, o fluxo de autorização da perspectiva do aplicativo cliente é o seguinte:

1 Para fazer login no aplicativo, envie o nome de usuário e a senha para o back-end

2 A resposta incluirá: um token de acesso de curta duração para acessar recursos restritos, um tempo de expiração (por quanto tempo o token de acesso é válido) e um token de atualização de longa duração para obter um novo token de acesso quando o antigo expirar

3 Sempre que você quiser acessar uma rota restrita, envie o token de acesso ao servidor

4 O servidor retorna um erro de autenticação (por exemplo, 401 Unauthorized) quando o token de acesso não é mais válido (por exemplo, expirou)

5 O cliente envia o token de atualização ao servidor para obter um novo token de acesso

E caso um usuário malicioso capturar o refreshToken, como fica o segurança? Pois teoricamente ele poderia criar accesToken quando quiser

Qual a vantagem em usar um Refresh Token ao invés de somente o Access Token?

Criar unicamente os tokens de acesso com um tempo de vida muito longo — o que não seria viável a nível de segurança, já que caso o token fosse roubado, não haveríamos como cancelá-lo em tempo hábil.

Criar unicamente os tokens de acesso com um tempo de vida muito curto — o que não seria viável a nível de experiência de usuário, já que no caso do roubo desse token, não haveríamos como cancelá-lo em tempo hábil.

Criar um tipo de blacklist que te permite listar tokens que você não quer que sejam mais acessíveis, mesmo antes da expiração. Mas isso não me parece uma boa opção se você está utilizando um stateless token em primeiro lugar, já que traz inúmeros problemas. O maior deles: acabar com a necessidade de usar um stateless token, pois deixa de ser stateless no momento em que a cada requisição você precisa verificar se o token é válido ou não. Sinceramente, nesse caso vale mais a pena recorrer às boas e velhas sessões.

Criar um mecanismo com autenticação a base de dois tokens, um access token e um refresh token. E este é mais viável, já que nos permite criar um token verificável com grande tempo de vida (o refresh token) e um token para acessar de fato a nossa aplicação com um curto tempo de vida (o access token).

Aplicativo seguro com token de atualização

Existem várias possibilidades de como um invasor pode obter acesso a um token de usuário. 1 Hacker tem acesso total ao serverside 2 Hacker tem acesso ao lado do cliente 3 Hacker tem acesso a arquivos de log ou lê o tráfego entre cliente e servidor

Como impedir o uso de tokens por terceiros

Proteção ambiental Você também pode vincular os tokens a outras propriedades do ambiente, como Navegador usado (via User-Agent) Sistema Operacional Usado (via User-Agent) Tamanho da tela Geolocalização (se a permissão for concedida) enviar codigo por e-mail para proseguir quando o refrech-token for expirado

//User-Agent console.log(window.navigator.userAgent)

//Window Screen Width console.log(screen.width)

//Window Screen Height console.log(screen.height)

//Window Screen Color Depth console.log(screen.colorDepth)

//Window Screen Pixel Depth console.log(screen.pixelDepth)

Proteção de IP Uma possibilidade de evitar que o hacker use os tokens é apenas colocar na whitelist o ip do criador. Se uma solicitação chegar com outro IP (por exemplo, IP do invasor), rejeite a solicitação e retorne “401 Unauthorized”.

Objetivo principal O objetivo principal deve ser manter o token de atualização protegido. Se o token de atualização vazar, o hacker pode criar novos tokens de acesso e executar ações restritas em seu nome, a menos que você aplique proteção de IP ou proteção de ambiente ou invalide o token de atualização.


