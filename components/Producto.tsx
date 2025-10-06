// components/Producto.tsx
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

export type ProductoUI = {
  id: string;
  titulo: string;
  precio: number;
  descripcion: string;
  imagen: ImageSourcePropType; 
};

type Props = {
  producto: ProductoUI;
  isFavorito?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

function ProductoCard({ producto, isFavorito, onPress, onLongPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.item, isFavorito && styles.favorito]}
      accessibilityRole="button"
      accessibilityLabel={`Producto ${producto.titulo}`}
    >
      <Image source={producto.imagen} style={styles.imagenMini} />
      <View style={styles.textos}>
        <Text style={styles.titulo}>{producto.titulo}</Text>
        <Text>${producto.precio}</Text>
      </View>
    </Pressable>
  );
}

export default ProductoCard;

const styles = StyleSheet.create({
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
  textos: { flex: 1 },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
