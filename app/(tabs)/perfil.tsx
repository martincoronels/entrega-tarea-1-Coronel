import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Perfil() {

  const [nombre, setNombre] = useState('Martin Coronel');
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');

  const guardarNombre = () => {
    
    setNombre(nuevoNombre);
    setModalVisible(false);
    setNuevoNombre('');
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nombre y Apellido:</Text>
      <Text style={styles.nombre}>{nombre}</Text>

      <Pressable style={styles.boton} onPress={() => setModalVisible(true)}>
        <Text style={styles.botonTexto}>Cambiar nombre</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>Nuevo nombre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresá tu nombre"
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
            />

            <Pressable style={styles.botonGuardar} onPress={guardarNombre}>
              <Text style={styles.botonTexto}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  texto: {
    fontSize: 20,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  boton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  botonTexto: {
    color: 'white',
    fontSize: 18,
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContenido: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    
  },
  modalTitulo: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  botonGuardar: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
});
