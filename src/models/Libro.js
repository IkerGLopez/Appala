export class Libro {
  constructor(data) {
    // Información básica
    this.key = data.key; // Identificador único del libro
    this.title = data.title;
    this.authors = data.authors || []; // Array de objetos autor
    this.authorNames = data.author_name || [];
    
    // Fechas y ediciones
    this.firstPublishYear = data.first_publish_year;
    this.publishDate = data.publish_date;
    this.publishYear = data.publish_year;
    
    // Identificadores para portadas (múltiples opciones)
    this.isbn = data.isbn || [];
    this.oclc = data.oclc || [];
    this.lccn = data.lccn || [];
    this.olid = data.edition_key || []; // Open Library IDs
    
    // Portada
    this.cover_i = data.cover_i; // ID de la portada principal
    this.cover_edition_key = data.cover_edition_key;
   
    // Información adicional
    this.subjects = data.subject || [];
    this.publishers = data.publisher || [];
    
    // Metadatos
    this.editionCount = data.edition_count;
    
    // Ratings (si disponible)
    this.ratingsAverage = data.ratings_average;
    this.ratingsCount = data.ratings_count;
  }
}