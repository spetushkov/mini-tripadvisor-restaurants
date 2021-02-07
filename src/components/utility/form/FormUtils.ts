import { FieldMetaProps, FormikErrors, FormikProps } from 'formik';
import { ClassTransformer, Clazz } from '../../../class/ClassTransformer';
import { ClassValidator } from '../../../class/ClassValidator';

type FormItemProps<T> = {
  value: T[keyof T];
  meta: FieldMetaProps<unknown>;
  onChangeText: keyof T extends React.ChangeEvent<any>
    ? void
    : (e: string | React.ChangeEvent<any>) => void;
};

export const getFormState = <T>(values: T, entityClass: Clazz<T>): T => {
  return ClassTransformer.fromPlain(entityClass, values);
};

export const validateForm = async <T>(
  values: T,
  entityClass: Clazz<T>,
): Promise<FormikErrors<T>> => {
  try {
    const formState = getFormState(values, entityClass);
    const formErrors = await ClassValidator.validate(formState, false);
    return Promise.resolve(formErrors as FormikErrors<T>);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const isFormSubmittable = <T>(form: FormikProps<T>): boolean => {
  return !form.isValidating && !form.isSubmitting && form.dirty && form.isValid;
};

export const getFormItemProps = <T>(
  form: FormikProps<T>,
  itemName: keyof typeof form.values,
): FormItemProps<T> => {
  return {
    value: form.values[itemName],
    meta: form.getFieldMeta(itemName as string),
    onChangeText: form.handleChange(itemName),
  };
};
