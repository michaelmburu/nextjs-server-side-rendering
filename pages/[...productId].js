import fs from 'fs/promises'
import path from 'path'

const ProductDetail = (props) => {
  const { loadedProduct } = props

  if (!loadedProduct) {
    return <p>Loading........</p>
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  )
}

const getData = async () => {
  const filepath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filepath)
  const data = JSON.parse(jsonData)

  return data
}

export const getStaticProps = async (context) => {
  const { params } = context

  const productId = params.productId

  const data = await getData()

  const product = data.products.find((product) => product.id === productId)

  if (!product) {
    return { notFound: true }
  }

  return {
    props: {
      loadedProduct: product,
    },
  }
}

export const getStaticPaths = async () => {
  const data = await getData()

  const ids = data.products.map((product) => product.id)

  const params = ids.map((id) => ({ params: { productId: id } }))
  return {
    paths: params,
    fallback: true,
  }
}

export default ProductDetail
