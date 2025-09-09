import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';


const Contador = () => {

    const [contador, setContador] = useState(0);

    const incrementar = () => {
        setContador(prev => prev + 1)
    }

    const decrementar = () => {
        setContador(prev => prev - 1)
    }

    const resetear = () => {
        setContador(0)
    }

    return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador</Text>
      <Text style={styles.valor}>{contador}</Text>
      <View style={styles.botones}>
        <Button title='Incrementar' onPress={incrementar} />
        
        <Button title='Decrementar' onPress={decrementar} />
        <Pressable style={styles.botonIncrementar} onPress={resetear}>
          <Text style={styles.textoIncrementar}>RESETEAR</Text>
        </Pressable>
        
      </View>
    </View>
  );
};



export default Contador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#cf9999ff',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  valor: {
    fontSize: 48,
    marginBottom: 30,
    color: '#333',
  },
  botones: {
    gap: 12,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    
  },

  botonIncrementar: {
    backgroundColor: '#2196f3',
    alignItems: 'center',
    padding: 12,
  },

  textoIncrementar: {
    color: '#ffffffff',
  },

});