import { RecursiveArray, RegisteredStyle, StyleProp, ViewStyle } from 'react-native';

export type Style =
  | false
  | ViewStyle
  | RegisteredStyle<ViewStyle>
  | RecursiveArray<false | ViewStyle | RegisteredStyle<ViewStyle> | null | undefined>
  | StyleProp<ViewStyle>[]
  | null
  | undefined;
