import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class CryptUtilityService {
  /**
   * Como usar a funcionalidade hash
   * @param  textoLegivel   informar o texto legivel para ser encriptado
   * @param  return         retorna o hash do texto legivel
   */
  public async hash(textoLegivel: string) {
    return await hash(textoLegivel, 10);
  }

  /**
   * Como usar a funcionalidade compare
   * @param  textoLegivel   informar o texto legivel para compara com o hash
   * @param  hash           informar o hash do texto legivel
   *
   * Ele vai pegar o texto informado para encriptar, e compara com o hash informado.
   */
  public async compare(textoLegivel: string, hash: string) {
    return await compare(textoLegivel, hash);
  }
}
//https://bcrypt-generator.com/
