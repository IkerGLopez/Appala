import { Libro } from '@/models/Libro.js';
import { Autor } from '@/models/Autor.js';

export class OpenLibraryService {
    static BASE_URL = 'https://openlibrary.org';

    static async buscarLibros(query) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/search.json?q=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                throw new Error(`Error en la búsqueda: ${response.status}`);
            }

            const data = await response.json();

            return data.docs.map(doc => new Libro(doc));

        } catch (error) {
            console.error('ERROR al buscar libros:', error);
            return [];
        }
    }

    static async obtenerLibroPorKey(key) {
        try {
            const response = await fetch(`${this.BASE_URL}${key}.json`);
            
            if (!response.ok) {
                throw new Error(`Error al obtener libro: ${response.status}`);
            }

            const data = await response.json();
            return new Libro(data);

        } catch (error) {
            console.error('ERROR al obtener libro:', error);
            return null;
        }
    }

    static async obtenerAutor(authorKey) {
        try {
            const response = await fetch(`${this.BASE_URL}/authors/${authorKey}.json`);
            
            if (!response.ok) {
                throw new Error(`Error al obtener autor: ${response.status}`);
            }

            const data = await response.json();
            return new Autor(data);

        } catch (error) {
            console.error('ERROR al obtener autor:', error);
            return null;
        }
    }

    static async buscarAutores(query) {
        try {
            const response = await fetch(
                `${this.BASE_URL}/search/authors.json?q=${encodeURIComponent(query)}`
            );

            if (!response.ok) {
                throw new Error(`Error en la búsqueda de autores: ${response.status}`);
            }

            const data = await response.json();
            return data.docs.map(doc => new Autor(doc));

        } catch (error) {
            console.error('ERROR al buscar autores:', error);
            return [];
        }
    }

    static obtenerUrlPortada(coverId, size = 'M') {
        return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
    }

    static obtenerUrlFotoAutor(photoId, size = 'M') {
        return `https://covers.openlibrary.org/a/id/${photoId}-${size}.jpg`;
    }
}