import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputWrapper = styled.div` 
  width: 100%;
  font-size: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 15px;
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  label {
      font-size: 15px;
      display: block;
      color: #999;
  }
  input  {
      display: block;
      width: 100%;
      font-size: 25px;
      border: none;
      outline: none;
      color: #333;
      resize: vertical;
      background: none;
      option {
          background: none;
      }
  } 

`;

const Input = props => {
  const { label, value, className, onChange, onKeyDown } = props;
  onChange
  return (
      <InputWrapper
        label={label}
        value={value}
        onChange={onChange}
        className="wrapInput"
      >

        <label>{label}</label>
        <input className={className} value={value} onChange={onChange} onKeyDown={onKeyDown} />
      </InputWrapper>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  value: '',
  className: '',
  onChange: () => {},
  onKeyDown: () => {}
};

export default Input;

