import React from 'react';
import { useDB } from 'react-pouchdb';
import ProductCard from './ProductCard';
import superjson from 'superjson';

const ProductList = () => {
  const [cards, setCards] = React.useState(
    [<ProductCard key="a" skeleton />, <ProductCard key="b" skeleton />]
  )
  const db = useDB();

  React.useEffect(()=>{
    db.allDocs({include_docs: true}).then(res => {
      //console.log(res)
      const renderedCards = res.rows.map(i => {
        const loadedData = superjson.deserialize(i.doc)
        console.log(i)
        return (
          <ProductCard key={i.id} rev={i.doc._rev} id={i.doc._id} {...loadedData}/>
        )
      })
      //console.log(renderedCards)
      setCards(renderedCards)
    })
  }, [db])
  
  return <>{cards}</>;
}

export default ProductList;
