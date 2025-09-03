import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BookCard } from '@/components/ui/book-card'
import { OpenLibraryService } from '@/services/OpenLibraryService.js'

export function BookSearchSection() {
  const [query, setQuery] = useState('')
  const [libros, setLibros] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const buscarLibros = async (e) => {
    e.preventDefault()
    
    if (!query.trim()) {
      setError('Por favor, ingresa un término de búsqueda')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const resultados = await OpenLibraryService.buscarLibros(query)
      setLibros(resultados)
      
      if (resultados.length === 0) {
        setError('No se encontraron libros con ese término de búsqueda')
      }
    } catch (err) {
      setError('Error al buscar libros. Por favor, intenta de nuevo.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header de la sección */}
      <header>
        <strong>Buscar libros</strong>
        <p>
          Explora miles de libros usando Open Library
        </p>
      </header>

      {/* Formulario de búsqueda */}
      <form onSubmit={buscarLibros} className="busqueda">
        <div className="busqueda-flex">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título, autor o tema..."
            className="flex-1"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 w-full sm:w-auto"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="ml-2 sm:hidden">Buscar</span>
          </Button>
        </div>
      </form>

      {/* Mensajes de error */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Buscando libros...</span>
          </div>
        </div>
      )}

      {/* Resultados */}
      {libros.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Resultados de búsqueda
            </h2>
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {libros.length} libro{libros.length > 1 ? 's' : ''} encontrado{libros.length > 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
            {libros.map((libro, index) => (
              <BookCard key={libro.key || index} libro={libro} />
            ))}
          </div>
        </div>
      )}

      {/* Estado inicial */}
      {!loading && libros.length === 0 && !error && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
            Descubre tu próxima lectura
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
            Utiliza el buscador para encontrar libros por título, autor o tema. 
            Tenemos acceso a miles de libros gracias a Open Library.
          </p>
        </div>
      )}
    </div>
  )
}
