import styled from 'styled-components';

export const CategoriesWrapper = styled.div`
    width: 90%;
    max-width: 1200px;
    margin: auto;
    padding: 40px 0;
    display: grid;
    grid-template-rows: 1fr;
    gap: 10px;
`;
export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
    gap: 1rem;
`;

export const Card = styled.div`
border-radius: 10px;
min-height: 300px;
font-weight: bold;
padding: 20px;
position: relative;
overflow: hidden;
background: pink;
background-size: cover;
background-position: center center;

h3 {
    text-align: center;
}

.banner {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 2px;   
}

`;