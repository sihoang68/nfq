import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import dropdownIcon from '../../assets/images/dropdownIcon.svg';

const SelectWrapper = styled.div` 
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
    select {
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
  select {
      -moz-appearance:none; /* Firefox */
      -webkit-appearance:none; /* Safari and Chrome */
      appearance:none;
      background: url(${dropdownIcon}) right 5px no-repeat;
      background-size: 20px 20px;
  }
`;

const Select = props => {
  const { label, value, options, onChange } = props;
  return (
      <SelectWrapper
        label={label}
        value={value}
        options={options}
        onChange={onChange}
      >
      <label>{label}</label>
      <select onChange={onChange} value={value}>
        {options && options.map((option, index) => {
          return (<option key={index} value={option.value}>{option.label}</option>)
        })}
      </select>
      </SelectWrapper>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.any,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  label: '',
  value: '',
  options: [],
  onChange: () => {}
};

export default Select;

