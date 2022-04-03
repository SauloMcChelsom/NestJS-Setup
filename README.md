<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">NestJS-Setup é uma infraestrutura back-end para iniciar um projeto sem precisar de configurar</p>
 



<h1 align="center">
  <p align="center">
	Documentação Arquitetural do sismtema NestJS-Setup
  </p>
</h1>

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
## Estrutura e convenção
Segue detalhamento de como deve ser a criação das novas funcionalidades do sistema NestJS-Setup. qualquer coisa fora deste padrão deve ser corrigido.

`controller`
os dados são recebidos por dto, e retorna um mepper

`service` 
um conjuto de varias unidade para a realização de uma tarefas, os metodos são chamados por interface ou variavel tipadas, retorna uma etidade

`model`
uma unidade, que realiza uma execução especifica, unica...

`repositorio` 
são classe customizada de acesso ao banco com orm

> se sua classe esta precisando acessar um recurso de outro modulo, sua classe não pode acessa um model ou repositorio, deve sempre acessar o service.

-  **Convenção**

```js
// variavel simples
let numero_cartao_de_debito = 8425778

// variavel que representa uma entidade, dominio ou objeto deve ser declarodo junto com sua propriedade.
// sempre respeitando a ordem entidade+propriedade 
let usuario_nome = 'mary'
```

```js
// metodos

calcularContasDeDebitos(){
...
}
```

```js
// classes

class ContasDeDebitos {
...
}
```

```bash
# arquivos

./contasDeDebitos.components.ts
```

-  **Diretorios**
`./dto`
```js
// create.dto.ts

export class CreateDto {
	@IsNotEmpty()
	@IsNumber()
	publication_id: number;

	@IsNotEmpty()
	@MinLength(1)
	comment: string;
}
```

`./interface`
```js
// create.interface.ts

export interface CreateInterface {
	comment: string;
	publication_id: number;
	user_id: number;
}
```

`./mapper`
```js
// create.mapper.ts

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
```bash
authFindOne.mapper.ts
publicFindOne.mapper.ts
authList.mapper.ts
publicList.mapper.ts
create.mapper.ts
update.mapper.ts
```

-  **Arquivos**
`controller`

classe
```bash
se e publica ou privado
```
```bash
lista ou singular
```
```bash
por entidade+propriedade
```

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













