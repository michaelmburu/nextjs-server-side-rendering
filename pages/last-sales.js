import { useEffect, useState } from 'react'

const LastSalesPage = () => {
  const [sales, setSales] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    fetch('https://nextjs-course-e3831-default-rtdb.firebaseio.com/sales.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const transformedSales = []
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          })
        }
        console.log(transformedSales)
        setSales(transformedSales )
        setIsLoading(false)
      })
  }, [])

  if(!sales){
    return <p>No sales</p>
  }
  return isLoading ? (
    <p>Is Loading.....</p>
  ) : (
    <ul>
      {sales.map(sale => (
      <li key={sale.id}>
        {sale.username} - ${sale.volume}
      </li>
      ))}
    </ul>
  )
}

export default LastSalesPage
