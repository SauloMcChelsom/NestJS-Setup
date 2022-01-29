import { Version, Sse, MessageEvent, Headers, Res, Controller, Param, Get  } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Observable, interval, map  } from 'rxjs'

@Controller('services/sse')
@ApiTags('services/sse')
export class ServerSentEventsController {

  constructor() {}

  /**
   * 
   * @site
   * https://developer.mozilla.org/en-US/docs/Web/API/EventSource
   */

  /**
   * Ao contrário dos WebSockets , os eventos enviados pelo servidor são unidirecionais; 
   * ou seja, as mensagens de dados são entregues em uma direção, 
   * do servidor para o cliente
   */

  /**
   * útil para lidar com coisas como atualizações de status de mídia social, 
   * Cotações de ações on-line ou twitters atualizando linha do tempo
   * feeds de notícias ou entrega de dados em um mecanismo de armazenamento do lado do cliente, 
   * como IndexedDB ou armazenamento na web.
   */

  /**
   * Quando não usado em HTTP/2
   * o SSE sofre de uma limitação ao número máximo de conexões abertas
   * Esse limite é por navegador + domínio, o que significa que você pode abrir 6 conexões
   * HTTP simultâneos é negociado entre o servidor e o cliente (o padrão é 100).
   */

  @Sse('/public/hello-world')
  @Version('1')
  @ApiOperation({ summary: 'Enviar para cliente hello world' })
  sendClientHelloWorld(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }

}

/**
 * 
  <script type="text/javascript">
    const eventSource = new EventSource('/v1/services/sse/public/hello-world');

    eventSource.onmessage = ({ data }) => {
      const message = document.createElement('li');
      message.innerText = 'New message: ' + data;
      document.body.appendChild(message);
    }

    eventSource.onopen = (e) => {
      const message = document.createElement('li');
      message.innerText = 'The connection has been established.' + eventSource.readyState;
      document.body.appendChild(message);
    };

    eventSource.onerror = (e) => {
      const message = document.createElement('li');
      message.innerText = 'An error occurred while attempting to connect.' + eventSource.readyState;
      document.body.appendChild(message);
    };

    //10 segundo para de enviar
    setTimeout(()=> {
      eventSource.close();
      const message = document.createElement('li');
      message.innerText = 'Conection off ' + eventSource.readyState;
      document.body.appendChild(message);
    }, 10000);
    
  </script>
 */