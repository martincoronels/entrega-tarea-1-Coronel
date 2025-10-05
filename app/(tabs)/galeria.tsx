import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

//const API_BASE_URL = 'http://192.168.0.184:3000';
import { API_BASE_URL } from '../../config';

type Producto = {
    id: string;
    titulo: string;
    precio: number;
    descripcion: string;
    imagen: ImageSourcePropType;
};

export default function Galeria() {

    const [productos, setProductos] = useState<Producto[]>([]);
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

    useEffect(() => {
      const fetchProductos = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/products`);
          const data = await response.json();

          const mapped: Producto[] = data.map((p: any) => ({
            id: p.id,
            titulo: p.titulo,
            precio: p.precio,
            descripcion: p.descripcion,
            imagen: { uri: p.imagen },
          }));

          setProductos(mapped);
        } catch (error) {
          console.error('Error en fetchProductos', error);
        }
      };
      fetchProductos();
    }, []);


    const filtrarProductos = productos.filter((p) =>
      p.titulo.toLowerCase().includes(filtro.toLowerCase()),
    );


    const toggleFavorito = (id: string) => {
      setFavoritos((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      );
    };


    const crearProducto = async () => {
      if (!nuevoTitulo || !nuevoPrecio || !nuevoDescripcion || !nuevoImagen) {
        return;
      }
      try {
        const body = {
          titulo: nuevoTitulo,
          precio: parseFloat(nuevoPrecio),
          descripcion: nuevoDescripcion,
          imagen: nuevoImagen,
        };
        const response = await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const nuevo = await response.json();

        const productoConvertido: Producto = {
          id: nuevo.id,
          titulo: nuevo.titulo,
          precio: nuevo.precio,
          descripcion: nuevo.descripcion,
          imagen: { uri: nuevo.imagen },
        };

        setProductos((prev) => [...prev, productoConvertido]);

        setNuevoTitulo('');
        setNuevoPrecio('');
        setNuevoDescripcion('');
        setNuevoImagen('');
        setModalNuevoVisible(false);
      } catch (error) {
        console.error('Error en la creacion del producto', error);
      }
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
            <Pressable
              onPress={() => {
                setProductoSeleccionado(item);
                setResizeMode('contain');
                setModalVisible(true);
              }}
              onLongPress={() => toggleFavorito(item.id)}
              style={[styles.item, favoritos.includes(item.id) && styles.favorito]}
            >
              <Image source={item.imagen} style={styles.imagenMini} />
              <View style={styles.textos}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text>${item.precio}</Text>
              </View>
            </Pressable>
          )}
        />

        { }
        <Pressable style={styles.botonNuevo} onPress={() => setModalNuevoVisible(true)}>
          <Text style={styles.botonNuevoTexto}>Nuevo producto</Text>
        </Pressable>

        { }
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

        { }
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

              <Pressable style={styles.botonGuardar} onPress={crearProducto}>
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
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#c4c2c2ff',
    alignItems: 'center',
  },
  favorito: {
    backgroundColor: '#92fb90ff',
  },
  imagenMini: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  textos: {
    flex: 1,
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