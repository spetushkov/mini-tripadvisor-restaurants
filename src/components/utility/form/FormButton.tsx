import { Button, Text, View } from 'native-base';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Theme } from '../../../theme/Theme';
import { Style } from '../../../types/Style';

type Props = {
  text: string;
  onPress: () => void;
  style: Style;
  disabled?: boolean;
  disabledStyle?: Style;
  loading?: boolean;
};

export const FormButton = (props: Props): JSX.Element => {
  const { text, onPress, style, disabled, disabledStyle, loading } = props;

  return (
    <Button
      style={[style, disabled ? disabledStyle : {}]}
      block={true}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.activityContainer}>
          {loading && (
            <ActivityIndicator
              style={styles.activity}
              size='small'
              color={Theme.color.brandLight}
            />
          )}
        </View>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 6,
  },
  text: {
    color: Theme.color.brandLight,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: '50%',
    marginRight: 'auto',
  },
  activityContainer: {
    flex: 1,
  },
  activity: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
