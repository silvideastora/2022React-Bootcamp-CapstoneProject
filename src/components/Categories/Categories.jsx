import React , {useState, useEffect} from 'react'
import {CardContainer, CategoriesWrapper, Card} from './Categories.styled';
import {useFeaturedCategories} from '../../utils/hooks/useFeaturedCategories';
import { Link } from 'react-router-dom';

export default function Categories() {
    const [categories, setCategories] = useState([]); 
    const {data, isLoading} = useFeaturedCategories();
    
    useEffect(() => {
        if(data.results) {
            setCategories(data.results);
        }
    }, [data.results])

    return (
        
        <CategoriesWrapper>
            {!isLoading && (  
            <CardContainer>
                {categories.map((category, index) => (
                <Link to={`/products?category=${category.id}`} 
                    key={index} >
                <Card 
                    style={{ backgroundImage:`url(${category.data.main_image.url})` }}>
                    <div className="card-text" >
                        <h3>{category.data.name}</h3>
                    </div>
                </Card>
                </Link>
                ))}
            </CardContainer>
            )}
        </CategoriesWrapper>
    )
};


