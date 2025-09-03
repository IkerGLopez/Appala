import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { OpenLibraryService } from '@/services/OpenLibraryService.js'

export function BookCard({ libro }) {
  const [imageError, setImageError] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Generar múltiples URLs de portada en orden de prioridad
  const generarUrlsPortada = (libro) => {
    const urls = []
    
    // 1. Usar cover_i (método principal de Open Library)
    if (libro.cover_i) {
      urls.push(OpenLibraryService.obtenerUrlPortada(libro.cover_i, 'M'))
      urls.push(OpenLibraryService.obtenerUrlPortada(libro.cover_i, 'L'))
    }
    
    // 2. Usar ISBNs (hasta 3 diferentes)
    if (libro.isbn && libro.isbn.length > 0) {
      libro.isbn.slice(0, 3).forEach(isbn => {
        urls.push(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`)
        urls.push(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
      })
    }
    
    // 3. Usar OLIDs (Open Library IDs)
    if (libro.olid && libro.olid.length > 0) {
      libro.olid.slice(0, 2).forEach(olid => {
        urls.push(`https://covers.openlibrary.org/b/olid/${olid}-M.jpg`)
      })
    }
    
    // 4. Usar OCLC
    if (libro.oclc && libro.oclc.length > 0) {
      urls.push(`https://covers.openlibrary.org/b/oclc/${libro.oclc[0]}-M.jpg`)
    }
    
    // 5. Usar LCCN
    if (libro.lccn && libro.lccn.length > 0) {
      urls.push(`https://covers.openlibrary.org/b/lccn/${libro.lccn[0]}-M.jpg`)
    }
    
    return urls
  }

  const urlsPortada = generarUrlsPortada(libro)
  const urlActual = urlsPortada[currentImageIndex]

  const manejarErrorImagen = () => {
    // Si hay más URLs disponibles, probar la siguiente
    if (currentImageIndex < urlsPortada.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    } else {
      // Si ya probamos todas las URLs, mostrar placeholder
      setImageError(true)
    }
  }

  const validarImagen = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  return (
    <Card className="card">
      <CardContent className="card-content">
        {/* Portada */}
        <div className="card-flex">
          {urlActual && !imageError ? (
            <img
              src={urlActual}
              alt={`Portada de ${libro.title}`}
              title={`Portada de ${libro.title}`}
              className="portada"
              onError={manejarErrorImagen}
              onLoad={(e) => {
                const img = e.target
                if (img.naturalWidth === 1 && img.naturalHeight === 1) {
                  manejarErrorImagen()
                }
              }}
            />
          ) : (
                <span> <BookOpen className="sin-portada" /> </span>
          )}
        </div>
        
        {/* Información del libro */}
        <div className="book-info">
          <strong>
            {libro.title}
          </strong>
          
          {libro.authorNames && libro.authorNames.length == 1 && (
            <div className="autores-flex">
              <strong>Autor:</strong>
              <span>
                {libro.authorNames.slice(0, 2).join(', ')}
                {libro.authorNames.length > 2 && '...'}
              </span>
            </div>
          )}

          {libro.authorNames && libro.authorNames.length > 1 && (
            <div className="autores-flex">
              <strong>Autores:</strong>
              <span>
                {libro.authorNames.slice(0, 2).join(', ')}
                {libro.authorNames.length > 2 && '...'}
              </span>
            </div>
          )}
          
          <div className="edicion-flex">
            {libro.editionCount && (
              <span>
                {libro.editionCount} ed.
              </span>
            )}

            {libro.firstPublishYear && (
              <span>
                {libro.firstPublishYear}
              </span>
            )}
            
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}
