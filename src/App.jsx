import { Layout } from './components/layout'
import { BookSearchSection } from './components/book-search-section'
import './App.css'

function App() {
  return (
    <Layout activeSection="buscar">
      <BookSearchSection />
    </Layout>
  )
}

export default App