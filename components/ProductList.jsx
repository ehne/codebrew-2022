import React from 'react';
import { useDB } from 'react-pouchdb';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = React.useState([''])
  const [cards, setCards] = React.useState(
    <><ProductCard key="i" skeleton /> <ProductCard key="i" skeleton /></>
  )
  const db = useDB();

  React.useEffect(()=>{
    db.allDocs().then(res => {
      //console.log(res)
      setCards(res.rows.map(i => <ProductCard key="i" title="hi"/>))
    })
  }, [db])
  
  return cards;
}

export default ProductList;
