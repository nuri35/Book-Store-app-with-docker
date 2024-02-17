import { Request } from 'express';
import { Service } from 'typedi';
import DataSourceFactory from '@source/data.source';
import { EntityManager } from 'typeorm';
import UserCreateDto from '@controllers/user/dto/user.create.dto';
import { UserEntity } from '@entities/user.entity';
import { UserRepository } from '@/repositories/user/user.repository';
import TransformService from '../help-service/conversion/data.transform';
import InitialResDto from '@/controllers/user/response-dto/initial.dto';
import { CreatedResponse } from '@/responses/created.response';
import { Code, Messages } from '@bestnetlib/common';

@Service()
export class UserService {
  private readonly dbSource = DataSourceFactory.source;

  public async create(dto: UserCreateDto, req: Request) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const userMethod = await transactionalEntityManager.withRepository(
            UserRepository
          );

          const resultUser = await userMethod.customCreate(
            dto,
            req.currentSession!.user.id
          );
          const convertData = TransformService.convert<
            InitialResDto,
            UserEntity
          >(resultUser, InitialResDto, 'excludeAll');
          return new CreatedResponse<InitialResDto>(
            Code.SUCCESS_CREATE,
            Messages.SUCCESS_CREATE,
            convertData
          );
        } catch (error) {
          throw error;
        }
      }
    );
  }
}

//todo test edılecke....
