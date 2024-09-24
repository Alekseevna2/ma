import React from 'react'
import PizzaBlock from '../components/PizzaBlock';

const Home=()=> {
  const [items,setItems]=React.useState([]);
  const [isLoading,setIsloading]=React.useState(true);
  React.useEffect(()=>{
    fetch("https://66f1215341537919154fa6f6.mockapi.io/items")
    .then((res)=>{
      return res.json();
    })
    .then((json)=>{
      setItems(json);
    });
  },[]);
  return (
  <>
    <h2 className="content__title">все пиццы</h2>
    <div className="content__items">
      {items.map((obj)=>(
        <PizzaBlock key={obj.id} {...obj} />
      ))}
    </div>
 </>
  )
}
export default Home;