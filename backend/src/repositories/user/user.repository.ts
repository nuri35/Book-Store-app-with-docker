import { IUserCreationData } from '@/common-types/interfaces/repo.interface';
import { UserEntity } from '@/entities/user.entity';
import DataSourceFactory from '@source/data.source';
import { HelperRepo } from '../helper-repo';
import { userLoginType } from '@/common-types/enums/type.enum';

export const UserRepository = DataSourceFactory.source
  .getRepository(UserEntity)
  .extend({
    async customCreate(
      addedFields: IUserCreationData,
      currentUserId?: number
    ): Promise<UserEntity> {
      const { name, surname, password, mail, phone, title, type } = addedFields;

      const userInstance = this.create({
        name,
        surname,
        password,
        type,
        mail,
        I: HelperRepo.humanCreate({ phone, title }),
      });
      userInstance.executor = currentUserId;
      return await this.save(userInstance);
    },

    async findOneByUserName(userName: string): Promise<UserEntity | null> {
      return await this.findOne({
        select: {
          id: true,
          type: true,
          publicId: true,
          password: true,
          login: true,
          name: true,
          mail: true,
          surname: true,
          I: {
            phone: true,
            title: true,
          },
        },
        where: [
          {
            mail: userName,
            login: userLoginType.CanLogin,
          },
        ],
      });
    },
  });
