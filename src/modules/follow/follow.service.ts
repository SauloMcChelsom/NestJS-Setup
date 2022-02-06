import { Injectable } from '@nestjs/common';

import { ClassificationInterface } from '@root/src/lib/interfaces';
import { PageService } from '@modules/page/page.service';

import { FollowModel } from './follow.model';
import { CreateInterface } from './interface/create.interface';

@Injectable()
export class FollowService {
  constructor(private model: FollowModel, private page: PageService) {}

  public async authListByIdPage(id: number, cls: ClassificationInterface) {
    return await this.model.listAllUserFollowPageByIdOfPage(
      id,
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async authListByIdUser(id: number, cls: ClassificationInterface) {
    return await this.model.listAllPageUserFollowByIdOfUser(
      id,
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async create(body: CreateInterface) {
    //verificar se o usuario ja seguiu a pagina
    const follow = await this.model.userAlreadyFollowPage(
      body.user_id.toString(),
      body.page_id.toString(),
    );

    if (follow) {
      //se houver registro,  verifica se esta seguindo
      const segments = await this.model.getPageUserFollow(
        body.user_id.toString(),
        body.page_id.toString(),
      );
      if (segments.i_am_following) {
        //se sim, atualiza para 'para de seguir' e atualizar o contator na tabela page para --
        await this.model.updateAmFollowing(segments.id.toString(), {
          i_am_following: false,
        });
        await this.page.decrementNumberFollowersPage(segments.page_id);
        return await this.model.getPageUserFollow(
          body.user_id.toString(),
          body.page_id.toString(),
        );
      } else {
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.model.updateAmFollowing(segments.id.toString(), {
          i_am_following: true,
        });
        await this.page.incrementNumberFollowersPage(segments.page_id);
        return await this.model.getPageUserFollow(
          body.user_id.toString(),
          body.page_id.toString(),
        );
      }
    } else {
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      await this.model.save(body);
      const segments = await this.model.getPageUserFollow(
        body.user_id.toString(),
        body.page_id.toString(),
      );
      await this.page.incrementNumberFollowersPage(segments.page_id);
      return await this.model.getPageUserFollow(
        body.user_id.toString(),
        body.page_id.toString(),
      );
    }
  }
}
