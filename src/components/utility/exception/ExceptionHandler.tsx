import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../../theme/Theme';

type Props = {
  children: React.ReactNode;
};

type State = {
  error?: Error;
  errorInfo?: React.ErrorInfo;
};

export class ExceptionHandler extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(JSON.stringify({ error, errorInfo }));

    this.setState({ errorInfo });
  }

  render(): React.ReactNode {
    if (!this.state) {
      return this.props.children;
    }

    const { error, errorInfo } = this.state;
    if (!error) {
      return this.props.children;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>There was an error in loading this screen.</Text>
        <ScrollView>
          {error && <Text style={styles.message}>{error.message}</Text>}
          {errorInfo && <Text style={styles.message}>{errorInfo.componentStack}</Text>}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: '50%',
  },
  title: {
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: Theme.color.grey,
  },
  message: {
    fontFamily: 'open-sans',
    color: Theme.color.grey,
  },
});
