import React from 'react'
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const Home=()=> {
  const [items,setItems]=React.useState([]);
  const [isLoading,setIsloading]=React.useState(true);
  const[categoryId, setCategoryId]=React.useState(0);
  const[sortType, setSortType]=React.useState({
    name:"популярности",
    sortProperty:"rating",
  });

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
    <div  className='container'>
      <div className='content__top'>
        <Categories
        value={categoryId}
        onChangeCategory={(index)=> setCategoryId(index)}
        />
        <Sort value ={sortType} onChangeSort={(index) => setSortType(index)}/>
      </div>
      <h2 className="content__title">все пиццы</h2>
      <div className="content__items">
      {items.map((obj)=>(
        <PizzaBlock key={obj.id} {...obj} />
      ))}
      </div>
    </div>
  )
}
export default Home;