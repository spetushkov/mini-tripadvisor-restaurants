import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  error: Error | null;
  errorInfo?: React.ErrorInfo;
};

export const AppError = (props: Props): JSX.Element => {
  const { error, errorInfo } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>There was an error in loading this page.</Text>
      <ScrollView>
        {error && <Text style={styles.message}>{error.message}</Text>}
        {errorInfo && <Text style={styles.message}>{errorInfo.componentStack}</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: '50%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'grey',
    marginVertical: 10,
  },
  message: {
    fontFamily: 'open-sans',
    color: 'grey',
  },
});
