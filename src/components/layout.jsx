import { Sidebar } from './side-bar'
import { RightPanel } from './right-panel'
import { MobileNavigation } from './mobile-navigation'

export function Layout({ children, activeSection = "buscar" }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navegación móvil */}
      <MobileNavigation activeSection={activeSection} />
      
      {/* Sidebar izquierdo - visible solo en desktop */}
      <div className="hidden lg:block">
        <Sidebar activeSection={activeSection} />
      </div>
      
      {/* Contenido central */}
      <main className="lg:ml-64 xl:mr-80 min-h-screen">
        <div className="max-w-2xl mx-auto lg:border-x border-border min-h-screen bg-background/50 backdrop-blur-sm">
          <div className="p-4 sm:p-6 pt-16 lg:pt-6">
            {children}
          </div>
        </div>
      </main>
      
      {/* Panel derecho - visible solo en pantallas extra grandes */}
      <div className="hidden xl:block">
        <RightPanel />
      </div>
    </div>
  )
}
