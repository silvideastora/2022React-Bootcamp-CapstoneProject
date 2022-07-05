import React from 'react'
import {Label, InputGroup, Input, ErrorAlert} from '../Checkout/Checkout.styled';
import PropTypes from 'prop-types';

export default function InputForm( 
    {state, setState,label, placeholder, type, name,errorAlert,regex}
    ){
    const onChange = (e) => {
        setState({...state, campo: e.target.value});
    }
    const validate = () => {
      if(regex && regex.test()){
        setState({...state, valid:'true'});
      }
    }
    return (
      <div>
        <Label htmlFor={name} valid={state.valid}>{label}</Label>
        <InputGroup>
          <Input 
            type={type} 
            placeholder={placeholder} 
            id={name} 
            value={state.campo}
            onChange={onChange}
            onKeyUp={validate}
            onBlur={validate}
            valid={state.valid}
            />
        </InputGroup>
        <ErrorAlert valid={state.valid}>{errorAlert}</ErrorAlert>

      </div>
    );
}

InputForm.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  label:PropTypes.string.isRequired,
  placeholder:PropTypes.string.isRequired,
  type:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  errorAlert:PropTypes.string.isRequired,
  regex:PropTypes.func.isRequired,
}