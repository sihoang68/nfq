import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link';
import Collections from '../containers/Collections';
import styled from 'styled-components';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import addWhiteIcon from '../assets/images/addWhiteIcon.svg';

const IndexWrapper = styled.div`
    .wrapArticles {
      margin-top: 45px;
    }
    .mainTitle {
        color: #b2b2b2;
        font-size: 60px;
        font-weight: bold;
    }
    .btnAddItem {
        margin-top: 70px;
        background: #7850be;
        border: none;
        color: #fff;
        line-height: 23px;
    }
    
`;

class IndexPage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <IndexWrapper className="wrapper collectionsPage">
          <div className="row">
              <div className="container">
                  <h1 className="mainTitle">NASA Collection</h1>
                  <Link href={`/nasa-search`}>
                    <a className="btn btnAddItem floatRight">
                      <img src={addWhiteIcon} className="floatLeft svg" alt="Add" />&nbsp; Add new item
                    </a>
                  </Link>
                  
              </div>
          </div>
            <div className="row">
              <div className="container wrapArticles">
                <Collections />
                <div className="clearFix"></div>
              </div>
            </div>
        </IndexWrapper>
        <Footer />
      </>
      )
  }
}

export default connect(state => state)(IndexPage)



     