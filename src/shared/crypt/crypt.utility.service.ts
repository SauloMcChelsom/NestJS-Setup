import { Injectable } from '@nestjs/common'
import { hash, compare  } from 'bcryptjs';

@Injectable()
export class CryptUtilityService {
    public async hash(password: string){
        return  await hash(password, 10);
    }

    public async compare(password: string, hash: string){
        return await compare(password, hash)
    }
}
