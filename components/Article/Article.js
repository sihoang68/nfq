import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import playIcon from '../../assets/images/playIcon.png';

const ArticleWrapper = styled.div` 
  width: 33.333%;
  float: left;
  padding: 0 8px;
  box-sizing: border-box;
  margin-bottom: 60px;
  &:first-child {
      padding-left: 0;
  }
  &:nth-child(3n) {
      padding-right: 0;
  }
  .arThumnail {
      position: relative;
      cursor: pointer;
      span {
          display: block;
          position: absolute;
          top: 50%;
          width: 100%;
          transform: translateY(-50%);
          text-align: center;
          img {
              width: 60px;
              height: 60px;
              opacity: 0.9;
          }
      }
      img.thumbnail {
          width: 100%;
          max-width: 100%;
          height: 210px;
          object-fit: cover;
          object-position: center center;
          border-radius: 5px;
          -webkit-box-shadow: 0px 24px 15px -15px rgba(50, 50, 50, 0.6);
          -moz-box-shadow: 0px 24px 15px -15px rgba(50, 50, 50, 0.6);
          box-shadow: 0px 24px 15px -15px rgba(50, 50, 50, 0.6);
      }
  }
  .arInfo {
      margin-top: 35px;
      span {
          color: #8c8d8c;
      }
  }
  .arTitle {
      font-size: 28px;
      font-weight: 500;
      margin-top: 20px;
      height: 64px;
      overflow: hidden;
  }
  .arDescription {
      word-break: break-all;
      line-height: 160%;
      min-height: 115px;
      overflow: hidden;
      p {
          color: #7b7b7b;
      }
  }
  .arAction {
      a {    
          width: 55px;
          height: 55px;
          box-sizing: border-box;
          margin-right: 15px;
          display: inline-block;
          text-align: center;
          padding: 15px;
          cursor: pointer !important;
          &:hover {
              color: #7850be;
              border-color: #7850be;
          }
      }
      i { font-size: 25px; }
      .btnAddCollection {
          width: 100%;
          text-align: center;
          line-height: 30px;
          font-size: 16px;
          color: #666;
          cursor: pointer !important;
      }
  }
`;


const Article = props => {
  const { id, title, description, type, linkPreview, linkFile, dateCreated, children } = props;
  
  return (
      <ArticleWrapper
        id={id}
        title={title}
        description={description}
        type={type}
        linkPreview={linkPreview}
        linkFile={linkFile}
        dateCreated={dateCreated}
        className="articleItem"
      >
        <div className="arThumnail">
            <span><img src={playIcon} alt="Play" /></span>
            <img className="thumbnail" src={linkPreview} alt={title} />
        </div>
        <div className="arInfo">
            <span className="floatLeft">Si Hoang</span>
            <span className="floatRight">{moment(dateCreated).format('DD MMM, YYYY')}</span>
            <div className="clearFix"></div>
        </div>
        <div className="arTitle">{title}</div>
        <div className="arDescription"><p>{`${description.substring(0, 120)} ...`}</p></div>
        <div className="arAction">
            {children}
        </div>
        
      </ArticleWrapper>
  );
};

Article.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  linkPreview: PropTypes.string,
  linkFile: PropTypes.string,
  dateCreated: PropTypes.string,
  children: PropTypes.any,
};

Article.defaultProps = {
  id: '',
  title: '',
  description: '',
  type: '',
  linkPreview: '',
  linkFile: '',
  dateCreated: '',
  children: null
};

export default Article;

 