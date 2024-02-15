import { HumanEntity } from '@/entities/embeded-entities';

export class HelperRepo {
  static humanCreate(humanFields: HumanEntity): HumanEntity {
    const { phone, title } = humanFields;
    const human = new HumanEntity();

    human.phone = phone;
    human.title = title;
    return human;
  }
}
