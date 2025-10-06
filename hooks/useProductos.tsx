import { useCallback, useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
//const API_BASE_URL = 'http://192.168.0.184:3000';
import { API_BASE_URL } from '../config';

export type Producto = {
  id: string;
  titulo: string;
  precio: number;
  descripcion: string;
  imagen: ImageSourcePropType;
};

type CrearProductoInput = {
  titulo: string;
  precio: number;
  descripcion: string;
  imagen: string; 
};

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mapear = (p: any): Producto => ({
    id: p.id,
    titulo: p.titulo,
    precio: p.precio,
    descripcion: p.descripcion,
    imagen: { uri: p.imagen },
  });

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${API_BASE_URL}/products`);
      const data = await resp.json();
      setProductos(data.map(mapear));
    } catch (e: any) {
      console.error('Error en fetchProductos', e);
      setError('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  const crearProducto = useCallback(
    async (input: CrearProductoInput) => {
      try {
        const resp = await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titulo: input.titulo,
            precio: input.precio,
            descripcion: input.descripcion,
            imagen: input.imagen,
          }),
        });
        const nuevo = await resp.json();
        const convertido = mapear(nuevo);
        setProductos((prev) => [...prev, convertido]);
        return convertido;
      } catch (e) {
        console.error('Error en la creacion del producto', e);
        throw e;
      }
    },
    []
  );

  useEffect(() => {
    
    fetchProductos();
  }, [fetchProductos]);

  return {
    productos,
    setProductos,  
    loading,
    error,
    refetch: fetchProductos,
    crearProducto,
  };
}
