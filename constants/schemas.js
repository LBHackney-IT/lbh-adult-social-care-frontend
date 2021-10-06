import { date, number, object, string } from 'yup';

const requiredSchema = {
  string: object().shape({ value: string().required() }),
  date: object().shape({ value: date().required() }),
  number: object().shape({ value: number().required() }),
};

export { requiredSchema };