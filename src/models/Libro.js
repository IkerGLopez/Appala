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
    
    // Identificadores
    this.isbn = data.isbn || [];
   
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