import React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link';
import Search from '../containers/Search';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import styled from 'styled-components';
import backIcon from '../assets/images/backIcon.svg';

const SearchWrapper = styled.div`
  margin-top: 135px;
  .titleSearch {
      color: #404040;
      font-size: 47px;
      font-weight: lighter;
      margin-top: 60px;
  }
 
  .wrapInput {
    border: none;
  }
  .modal-content .wrapInput {
    border: 1px solid #ccc;
  }
`;
class SearchPage extends React.Component {
  render() {
    return (
      <>
        <Header />
          <SearchWrapper  className="wrapper wrapSearch">
            <div className="row">
                  <div className="container">
                    <Link href={`/`}><a className="link"><img src={backIcon} className="floatLeft" style={{"width": "10px"}} alt="Add" />&nbsp; Back to Collection</a></Link>
                  </div>
              </div>
            <Search />
          </SearchWrapper>
        <Footer />
    </>
    )
  }
}

export default connect(state => state)(SearchPage)
