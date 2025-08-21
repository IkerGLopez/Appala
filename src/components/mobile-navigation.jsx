import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { Sidebar } from './side-bar'

export function MobileNavigation({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Botón de menú móvil */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="bg-background/80 backdrop-blur-sm border-border shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar móvil */}
      <div className={`lg:hidden fixed left-0 top-0 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="relative">
          <Sidebar activeSection={activeSection} />
          
          {/* Botón de cerrar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  )
}
