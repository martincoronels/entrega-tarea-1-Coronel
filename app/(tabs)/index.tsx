import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tarjeta from '../../components/Tarjeta';


const App = () => {

  return (
    <View style={styles.container}>
      <Tarjeta label="Tarjeta 1" />
      <Tarjeta label="Tarjeta 2" />
      <Tarjeta label="Tarjeta 3" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4bdbdff',
    justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },

});
