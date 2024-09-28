import React from 'react'
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home=({searchValue})=> {

  const [items,setItems]=React.useState([]);
  const [isLoading,setIsloading]=React.useState(true);
  const[categoryId, setCategoryId]=React.useState(0);
  const[currentPage, setCurrentPage]=React.useState(1);
  const[sortType, setSortType]=React.useState({
    name:"популярности",
    sortProperty:"rating",
  });

  React.useEffect(()=>{
    setIsLoading(true);

    const sortBy= sortType.sortProperty.replace("-","");
    const category= categoryId>0?`category=${categoryId}`:"";
    const search= searchValue ?`&search=${searchValue}`:"";

    fetch(
      `https://66f1215341537919154fa6f6.mockapi.io/items?page=${currentPage}&limit=4&$
      {category}&sortBy=${sortBy}&order=${search}`
      )
    .then((res)=> res.json())
    .then((arr)=>{
      setItems(arr);
      setIsloading(false);
    });
    window.scrollTo(0,0);
  },[categoryId,sortType,searchValue,currentPage]);

  const pizzas = items.map((obj)=> <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index )=>(
    <Skeleton key={index}/>
  ));
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
      <div className="content__items">{isLoading? skeletons: pizzas}</div>
     <Pagination onChangePage={(number)=>setCurrentPage(number)}/>
    </div>
  );
}
export default Home;