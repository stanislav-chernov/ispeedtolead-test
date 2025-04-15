import { plainToInstance } from 'class-transformer';

export class Mapper {
  static plainToDto<DTO extends object>(
    dtoClass: new () => DTO,
    data: object,
  ): DTO {
    return plainToInstance(dtoClass, data, {
      excludeExtraneousValues: true,
    });
  }
}
