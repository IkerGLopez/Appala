export function RightPanel() {
  const popularGenres = [
    { name: "Ficción", count: 156 },
    { name: "Romance", count: 89 },
    { name: "Misterio", count: 67 },
    { name: "Ciencia ficción", count: 45 },
    { name: "Biografía", count: 34 }
  ]

  const recentActivity = [
    "María agregó 'Cien años de soledad'",
    "Carlos reseñó 'El Principito'",
    "Ana se unió a BookRepo",
    "Diego completó 'Don Quijote'"
  ]

  return (
    <div className="w-80 h-screen bg-card border-l border-border fixed right-0 top-0 overflow-y-auto z-10 xl:translate-x-0 translate-x-full transition-transform duration-300">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Estadísticas */}
        <div>
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Estadísticas</h2>
          <div className="space-y-3">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
              <p className="text-xs sm:text-sm text-muted-foreground">Libros en la biblioteca</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">1,247</p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg border border-secondary/20">
              <p className="text-xs sm:text-sm text-muted-foreground">Lectores activos</p>
              <p className="text-2xl sm:text-3xl font-bold text-secondary-foreground">892</p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
              <p className="text-xs sm:text-sm text-muted-foreground">Reseñas este mes</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent-foreground">2,341</p>
            </div>
          </div>
        </div>

        {/* Géneros populares */}
        <div>
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Géneros populares</h2>
          <div className="space-y-2 sm:space-y-3">
            {popularGenres.map((genre, index) => (
              <div key={genre.name} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                    index === 0 ? 'bg-primary' :
                    index === 1 ? 'bg-secondary' :
                    index === 2 ? 'bg-accent' :
                    index === 3 ? 'bg-primary/70' : 'bg-secondary/70'
                  }`}></div>
                  <span className="text-xs sm:text-sm font-medium text-card-foreground">{genre.name}</span>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {genre.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div>
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Actividad reciente</h2>
          <div className="space-y-2 sm:space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/30 border border-muted">
                <div className="w-2 h-2 rounded-full bg-primary mt-1 sm:mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{activity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sugerencias */}
        <div>
          <h2 className="text-lg font-semibold text-card-foreground mb-4">Lecturas sugeridas</h2>
          <div className="space-y-2 sm:space-y-3">
            <div className="p-2 sm:p-3 rounded-lg border border-primary/20 bg-primary/5">
              <p className="text-xs sm:text-sm font-medium text-card-foreground">El nombre del viento</p>
              <p className="text-xs text-muted-foreground mt-1">Patrick Rothfuss</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg border border-secondary/20 bg-secondary/5">
              <p className="text-xs sm:text-sm font-medium text-card-foreground">Kafka en la orilla</p>
              <p className="text-xs text-muted-foreground mt-1">Haruki Murakami</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
