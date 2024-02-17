import {
  ClassConstructor,
  plainToClass,
  plainToInstance,
} from 'class-transformer';

class TransformService {
  static convert<T, K>(
    source: K,
    destinationClass: ClassConstructor<T>,
    strategy: 'excludeAll' | 'exposeAll'
  ): T {
    return plainToClass(destinationClass, source, { strategy });
  }

  static convertArray<T, K>(
    source: K[],
    destinationClass: ClassConstructor<T>,
    strategy: 'excludeAll' | 'exposeAll'
  ): T[] {
    return plainToInstance(destinationClass, source, { strategy });
  }
}

export default TransformService;
