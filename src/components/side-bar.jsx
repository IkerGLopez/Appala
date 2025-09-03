import { Home, Search, MessageCircle, BookOpen, Star, Users, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: Search, label: "Buscar", href: "/search" },
  { icon: MessageCircle, label: "Mensajes", href: "/messages" },
  { icon: BookOpen, label: "Mis libros", href: "/my-books" },
  { icon: Star, label: "Mis reseñas", href: "/my-reviews" },
  { icon: Users, label: "Amigos", href: "/friends" },
  { icon: User, label: "Perfil", href: "/profile" },
]

export function Sidebar({ activeSection = "search" }) {
  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border fixed left-0 top-0 overflow-y-auto z-10 lg:translate-x-0 -translate-x-full transition-transform duration-300">
      <div className="p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-sidebar-foreground">BookRepo</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tu biblioteca personal</p>
        </div>

        <nav className="space-y-1 sm:space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={activeSection === item.label.toLowerCase().replace(" ", "-") ? "default" : "ghost"}
              className="w-full justify-start gap-3 h-10 sm:h-12 text-sm sm:text-base text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
            >
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-sidebar-border bg-sidebar/50 backdrop-blur-sm">
        <div className="text-xs text-muted-foreground text-center">
          <p>Versión 1.0.0</p>
          <p className="mt-1">Hecho con amor para lectores</p>
        </div>
      </div>
    </div>
  )
}
