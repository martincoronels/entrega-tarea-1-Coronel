import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
};

const Tarjeta = (props: Props) => {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      onPress={() => setActive(!active)}
      style={active ? styles.tarjetaActiva : styles.tarjetaInactiva}>

      <Text style={active ? styles.textoActivo : styles.textoInactivo}>
        {props.label}
      </Text>

    </Pressable>
  );
};

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
    paddingHorizontal: 20,
  },
  tarjetaActiva: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#ff1313ff',
  },
  tarjetaInactiva: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#ffffffff',
  },
  textoActivo: {
    fontSize: 22,
    color: 'white',
  },
  textoInactivo: {
    fontSize: 22,
    color: '#636161ff',
  },
  text: {
    fontSize: 22,
  },
});
