import { FieldMetaProps } from 'formik';
import { Icon, Input, Item, Label, NativeBase, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '../../../theme/Theme';
import { FormItemError } from './FormItemError';
import { FormItemHelp } from './FormItemHelp';
import { FormItemLabel } from './FormItemLabel';

type Props = {
  value: string;
  meta: FieldMetaProps<any>;
  onChangeText: (id: string) => void;
  label?: string;
  labelPosition?: 'top' | 'left';
  helpText?: string;
  instantFeedback?: boolean;
  icon?: string;
  onIconPress?: (e?: any) => any;
  disabled?: boolean;
} & NativeBase.Input;

export const FormItem = (props: React.PropsWithChildren<Props>): JSX.Element => {
  const {
    value,
    meta,
    onChangeText,
    label,
    labelPosition = 'top',
    helpText,
    instantFeedback = false,
    icon,
    onIconPress,
    disabled,
    ...restProps
  } = props;

  const [didFocus, setDidFocus] = useState(false);
  const onFocus = () => setDidFocus(true);

  // Display isValid status icon if:
  // - instantFeedback is enabled
  // - AND the input is focused AND value is longer than 2 characters or the input has been visited
  // - AND there are no errors
  const isValid =
    instantFeedback && ((didFocus && value.trim().length > 2) || meta.touched) && !meta.error;
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <View style={styles.container}>
      {label && labelPosition === 'top' && <FormItemLabel text={label} />}
      <Item
        style={styles.item}
        disabled={disabled}
        fixedLabel={!!label && labelPosition === 'left'}
        success={!!isValid}
        error={!!isInvalid}
      >
        {label && labelPosition === 'left' && <Label>{label}</Label>}
        <Input
          {...restProps}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          disabled={disabled}
        />
        {isValid && <Icon name='checkmark-circle' />}
        {isInvalid && <Icon name='close-circle' />}
        {icon && (
          <Icon
            type='MaterialCommunityIcons'
            name={icon}
            style={styles.icon}
            onPress={onIconPress}
          />
        )}
      </Item>
      {!isInvalid && helpText && <FormItemHelp text={helpText} />}
      {isInvalid && <FormItemError error={meta.error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  item: {
    width: '100%',
  },
  icon: {
    color: Theme.color.grey,
  },
});
