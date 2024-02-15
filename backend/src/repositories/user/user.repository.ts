import { IUserCreationData } from '@/common-types/interfaces/repo.interface';
import { UserEntity } from '@/entities/user.entity';
import DataSourceFactory from '@source/data.source';
import { HelperRepo } from '../helper-repo';

export const UserRepository = DataSourceFactory.source
  .getRepository(UserEntity)
  .extend({
    async customCreate(
      addedFields: IUserCreationData,
      currentUserId?: number
    ): Promise<UserEntity> {
      const { name, surname, password, mail, phone, title } = addedFields;

      const userInstance = this.create({
        name,
        surname,
        password,
        mail,
        I: HelperRepo.humanCreate({ phone, title }),
      });
      userInstance.executor = currentUserId;
      return await this.save(userInstance);
    },
  });
