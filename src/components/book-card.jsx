import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { OpenLibraryService } from '../services/OpenLibraryService.js'

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
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-border/50">
      <CardContent className="p-0">
        {/* Portada */}
        <div className="h-40 sm:h-48 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center rounded-t-lg overflow-hidden">
          {urlActual && !imageError ? (
            <img
              src={urlActual}
              alt={`Portada de ${libro.title}`}
              className="h-full w-auto object-cover"
              onError={manejarErrorImagen}
              onLoad={(e) => {
                // Verificar si la imagen es el placeholder "Image not available"
                const img = e.target
                if (img.naturalWidth === 1 && img.naturalHeight === 1) {
                  manejarErrorImagen()
                }
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground bg-muted/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-2">📖</div>
                <span className="text-xs sm:text-sm">Sin portada</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Información del libro */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <h3 className="font-semibold text-base sm:text-lg text-card-foreground line-clamp-2 leading-tight">
            {libro.title}
          </h3>
          
          {libro.authorNames && libro.authorNames.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-xs text-muted-foreground font-medium mt-0.5 flex-shrink-0">Autor(es):</span>
              <span className="text-xs sm:text-sm text-card-foreground">
                {libro.authorNames.slice(0, 2).join(', ')}
                {libro.authorNames.length > 2 && '...'}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs sm:text-sm">
            {libro.firstPublishYear && (
              <span className="text-muted-foreground">
                {libro.firstPublishYear}
              </span>
            )}
            
            {libro.editionCount && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {libro.editionCount} ed.
              </span>
            )}
          </div>
          
          {libro.publishers && libro.publishers.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Editorial:</span> {libro.publishers[0]}
            </div>
          )}
          
          {libro.subjects && libro.subjects.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 sm:mt-3">
              {libro.subjects.slice(0, 2).map((subject, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs px-2 py-1 rounded-full"
                >
                  {subject}
                </span>
              ))}
              {libro.subjects.length > 2 && (
                <span className="text-xs text-muted-foreground px-2 py-1">
                  +{libro.subjects.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
