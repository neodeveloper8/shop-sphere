import { Link } from "react-router-dom"

interface BreadcrumbsProps {
  category: string
  title: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, title }) => {
  return (
    <nav className="text-sm text-gray-600 mb-6">
      <Link to="/" className="hover:underline">
        Inicio
      </Link>

      <span className="mx-2">/</span>

      <Link
        to={`/category/${category}`}
        className="capitalize hover:underline"
      >
        {category}
      </Link>

      <span className="mx-2">/</span>

      <span className="text-gray-800 font-semibold">{title}</span>
    </nav>
  )
}

export default Breadcrumbs
