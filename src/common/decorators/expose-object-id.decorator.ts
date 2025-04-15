import { ExposeOptions, Transform } from 'class-transformer';

/*
 * This decorator solves issue when plainToInstance method of class-transform lib
 * recreating ObjectId during serialization - as a result we got new ObjectId value.
 */
export const ExposeObjectId =
  (options?: ExposeOptions) => (target: Object, propertyKey: string) => {
    Transform(({ obj }) => obj[propertyKey])(target, propertyKey);
  };
