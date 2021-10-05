import { date, object, string } from 'yup';

const requiredSchema = {
  string: object().shape({ value: string().required() }),
  date: object().shape({ value: date().required() })
};

export { requiredSchema };