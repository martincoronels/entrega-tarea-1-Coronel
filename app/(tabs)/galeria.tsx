import React, { useState } from 'react';
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
    View
} from 'react-native';


type Producto = {
  id: string;
  titulo: string;
  precio: number;
  descripcion: string;
  imagen: ImageSourcePropType;
};


const productos: Producto[] = [
  {
    id: '1',
    titulo: 'Camiseta React',
    precio: 25,
    descripcion: 'Camiseta negra con logo de React Native',
    imagen: require('../../assets/images/react-shirt.png'), // imagen local
  },
  {
    id: '2',
    titulo: 'Cuadro Paisaje',
    precio: 15,
    descripcion: 'Cuadro con un gran paisaje',
    imagen: {
      uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    },
  },
  {
    id: '3',
    titulo: 'Mouse Wireless',
    precio: 30,
    descripcion: 'Mouse ergonómico inalámbrico para programadores.',
    imagen: {
      uri: 'https://www.achemex.com/cdn/shop/products/41ZVQg7Gn9L.jpg?v=1682007369',
    },
  },
];

export default function Galeria() {
  const [filtro, setFiltro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [resizeMode, setResizeMode] = useState<ImageResizeMode>('contain');
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const filtrarProductos = productos.filter((p) =>
    p.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
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
            style={[
              styles.item,
              favoritos.includes(item.id) && styles.favorito,
            ]}
          >
            <Image source={item.imagen} style={styles.imagenMini} />
            <View style={styles.textos}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text>${item.precio}</Text>
            </View>
          </Pressable>
        )}
      />

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
    marginTop: 10,
    backgroundColor: '#ff3333',
    padding: 10,
    borderRadius: 8,
  },
});
