import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'
const HomePage = (props) => {
  const { products } = props

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps = async () => {
  const filepath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filepath)
  const data = JSON.parse(jsonData)
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  }
}


export default HomePage
