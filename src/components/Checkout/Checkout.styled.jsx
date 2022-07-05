import styled, {css} from 'styled-components';

export const FormWrapper = styled.div`
max-width: 1200px;
width: 90%
height: 600px;
margin: 0 auto;
display: flex;
justify-content: space-between;

@media (max-width: 768px) {
    flex-direction: column;
}
`;
export const OrderSummary = styled.div`

div {
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 20px;
width: 500px;
height: 100px;
padding: 20px;
background: white;
border-top: 1px solid gainsboro;
}

p {
    
    font-size: 16px;
    color: gray;
    margin-left: 20px;
}
span {
    justify-content: flex-end;
    align-items: space-between;
    font-size: 20px;
    font-weight: 400;
    margin-left: 20px;
}

`;

export const Form = styled.form`
display: grid;
grid-template-columns: repeat(2, 300px);
gap: 10px;
 @media(max-width: 768px){
   display:flex;
   flex-direction: column;
   padding: 30px;
 }

`;
export const Label = styled.label`
display: block;
font-weight: 700;
padding: 10px;
min-height: 40px;
cursor: pointer;

${props => props.valid === 'false' && css`
    color: crimson;
`}
`;

export const InputGroup = styled.div`
position: relative;
z-index: 90;


`;

export const Input = styled.input`
width: 100%;
background: white;
border-radius: 3px;
height: 45px;
line-height:45px;
padding: 0 40px 0 10px;
transition: .3s ease all;
border: 3px solid transparent;

&: focus {
    border: 3px solid mediumslateblue;
    outline: none;
    box-shadow: 3px 0px 3px slateblue;
}
${props => props.valid === 'true' && css`
border: 3px solid transparent;
` }

${props => props.valid === 'false' && css`
border: 3px solid crimson  !important;
` }
`;

export const ErrorAlert = styled.p`
font-size: 12px;
margin-bottom: 0;
color: crimson;
display: none;

${props => props.valid === 'true' && css`
    display:none;
`}
${props => props.valid === 'false' && css`
    display:block;
`}
`;

export const ImageIcon = styled.image`
    position: absolute;
    right: 10px;
    bottom: 14px;
    z-index: 100;
    font-size: 12px;
    opacity: 0;
`;
 export const TermsContainer = styled.div`
 grid-column: span 2;
 
 input {
     margin-right: 10px;
 }
 `;

 export const ButtonContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 grid-column: span 2;

 `;
  export const Button = styled.button`
  margin-top: 10px;
  height: 45px;
  color: white;
  line-height: 45px;
  width: 30%;
  background: gray;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: .2s ease all;

  &:hover {
    box-shadow:0 0 40px 40px slateblue inset;
  }
  `;

  export const SuccessComment = styled.p`
  font-size: 14px;
  color: lightseagreen;
  display:none;
  `;
   export const ErrorMessage = styled.div`
   height: 45px;
   line-height: 45px;
   background: gray;
   padding: 0px 15px;
   border-radius:3px;
   grid-column: span 2;

   p{
       margin:0;
   }
   `;
