import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextAreaWrapper = styled.div` 
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
   textarea {
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
  textarea {
      min-height: 250px;
  }
  

`;

const TextArea = props => {
  const { label, value, onChange } = props;
  onChange
  return (
      <TextAreaWrapper
        label={label}
        value={value}
        onChange={onChange}
      >
      <label>{label}</label>
      <textarea onChange={onChange} value={value} />
      </TextAreaWrapper>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TextArea.defaultProps = {
  label: '',
  value: '',
  onChange: () => {}
};

export default TextArea;

