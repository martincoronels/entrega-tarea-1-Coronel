import React, { useState } from 'react';
import { FlatList, Image, ImageResizeMode, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ProductoCard from '../../components/Producto';
import { useProductos, type Producto } from '../../hooks/useProductos';


export default function Galeria() {

    const { productos, crearProducto } = useProductos();
    const [filtro, setFiltro] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [resizeMode, setResizeMode] = useState<ImageResizeMode>('contain');
    const [favoritos, setFavoritos] = useState<string[]>([]);
    const [modalNuevoVisible, setModalNuevoVisible] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [nuevoPrecio, setNuevoPrecio] = useState('');
    const [nuevoDescripcion, setNuevoDescripcion] = useState('');
    const [nuevoImagen, setNuevoImagen] = useState('');

    const filtrarProductos = productos.filter((p) =>
      p.titulo.toLowerCase().includes(filtro.toLowerCase()),
    );

    const toggleFavorito = (id: string) => {
      setFavoritos((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      );
    };

    const onCrearProducto = async () => {
      if (!nuevoTitulo || !nuevoPrecio || !nuevoDescripcion || !nuevoImagen) return;
      await crearProducto({
        titulo: nuevoTitulo,
        precio: parseFloat(nuevoPrecio),
        descripcion: nuevoDescripcion,
        imagen: nuevoImagen,
      });
      setNuevoTitulo('');
      setNuevoPrecio('');
      setNuevoDescripcion('');
      setNuevoImagen('');
      setModalNuevoVisible(false);
  };

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar producto..."
          placeholderTextColor="#666"
          value={filtro}
          onChangeText={setFiltro}
        />

        <FlatList
          data={filtrarProductos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductoCard
              producto={item}
              isFavorito={favoritos.includes(item.id)}
              onPress={() => {
                setProductoSeleccionado(item);
                setResizeMode('contain');
                setModalVisible(true);
              }}
              onLongPress={() => toggleFavorito(item.id)}
            />
          )}
        />

        <Pressable style={styles.botonNuevo} onPress={() => setModalNuevoVisible(true)}>
          <Text style={styles.botonNuevoTexto}>Nuevo producto</Text>
        </Pressable>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalFondo}>
            <View style={styles.modalContenido}>
              {productoSeleccionado && (
                <>
                  <Image
                    source={productoSeleccionado.imagen}
                    style={[styles.imagenGrande, { resizeMode }]}
                  />
                  <Text style={styles.titulo}>{productoSeleccionado.titulo}</Text>
                  <Text style={styles.descripcion}>{productoSeleccionado.descripcion}</Text>

                  <View style={styles.botones}>
                    {['contain', 'cover', 'stretch'].map((modo) => (
                      <Pressable
                        key={modo}
                        onPress={() => setResizeMode(modo as ImageResizeMode)}
                        style={styles.botonResize}
                      >
                        <Text>{modo}</Text>
                      </Pressable>
                    ))}
                  </View>

                  <Pressable onPress={() => setModalVisible(false)} style={styles.botonCerrar}>
                    <Text style={{ color: 'white' }}>Cerrar</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
        
        <Modal visible={modalNuevoVisible} animationType="slide" transparent={true}>
          <View style={styles.modalFondo}>
            <View style={styles.modalContenido}>
              <Text style={styles.titulo}>Nuevo producto</Text>
              <TextInput
                style={styles.inputModal}
                placeholder="Título"
                placeholderTextColor="#666"
                value={nuevoTitulo}
                onChangeText={setNuevoTitulo}
              />
              <TextInput
                style={styles.inputModal}
                placeholder="Precio"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={nuevoPrecio}
                onChangeText={setNuevoPrecio}
              />

              <TextInput
                style={styles.inputModal}
                placeholder="Descripcion"
                placeholderTextColor="#666"
                value={nuevoDescripcion}
                onChangeText={setNuevoDescripcion}
              />
              
              <TextInput
                style={styles.inputModal}
                placeholder="URL de la imagen"
                placeholderTextColor="#666"
                value={nuevoImagen}
                onChangeText={setNuevoImagen}
              />

              <Pressable style={styles.botonGuardar} onPress={onCrearProducto}>
                <Text style={{ color: 'white' }}>Guardar</Text>
              </Pressable>
              <Pressable style={[styles.botonCerrar, { marginTop: 10 }]} onPress={() => setModalNuevoVisible(false)}>
                <Text style={{ color: 'white' }}>Cancelar</Text>
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
    padding: 16,
    paddingTop: 100,
  },
  input: {
    borderColor: '#999',
    borderWidth: 1,
    padding: 10,
    marginBottom: 40,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descripcion: {
    marginVertical: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContenido: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  imagenGrande: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  botonResize: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#ccc',
    borderRadius: 6,
  },
  botonCerrar: {
    backgroundColor: '#ff3333',
    padding: 10,
    borderRadius: 6,
  },
  botonNuevo: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonNuevoTexto: {
    color: 'white',
    fontSize: 16,
  },
  inputModal: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    
  },
  botonGuardar: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
});