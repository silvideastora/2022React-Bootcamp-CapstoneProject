import React  from 'react'
import {PaginateContainer} from './Paginate.styled';
import PropTypes from 'prop-types';

export default function Paginate({pages, page, setCurrentPage}) {

    const eventHandler = (selectedPage) => {
        setCurrentPage(selectedPage)
    }

    return (
        <PaginateContainer>
            {
                Array(pages).fill(null).map((ele, index) => 
                <span  
                    onClick={() => eventHandler(index + 1)} 
                    className={page === index + 1 ? "isActive" : ''}
                    key={index} 
                    > 
                    {index + 1}
                </span>)
            }
          </PaginateContainer>
    )
}

Paginate.propTypes = {
    pages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
}
