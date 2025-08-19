export class Autor {
  constructor(data) {
    // Información básica
    this.key = data.key; // Identificador único del autor (/authors/OL123A)
    this.name = data.name;
    this.personalName = data.personal_name || '';
    this.fullerName = data.fuller_name || '';
  }

}
