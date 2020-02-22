import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getArticles } from './action';
import Modal from '../../components/Modal';
import Article from '../../components/Article';
import addBlackIcon from '../../assets/images/addBlackIcon.svg';

const SearchResultWrapper = styled.div`
  .search {
      width: 100%;
      font-size: 35px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 15px;
      padding: 20px 30px;
      box-sizing: border-box;
      outline: none;
      font-weight: 300;
      margin-bottom: 50px;
    &::-webkit-input-placeholder { 
      color:#ccc;
    }
    &:-ms-input-placeholder { 
      color:#ccc;
    }
    &:placeholder { 
      color:#ccc;
    }
  }
  .searchResultCount {
    margin-bottom: 45px;
  }
  
`;

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      visible: false,
      article: {},
      searchValue: ''
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onChangeInputSearch = this.onChangeInputSearch.bind(this);

  }
  componentDidMount() {
    this.setState({
      collections: JSON.parse(localStorage.getItem('collections')) || []
    });
  }

handleAdd = (article) => {
  const { visible } = this.state;
  this.setState({ 
    visible: !visible,
    article: article
   });
}
 

handleCancel = () => {
  this.setState(previousState => ({
    visible: !previousState.visible
  }));
}

handleSearch = (e) => {
  if (e.key === 'Enter') {
    const { onGetData } = this.props;
    onGetData(e.target.value);
  }
}

onChangeInputSearch = (e) => {
  this.setState({
    searchValue: e.target.value
  });
}

  render() {
    const { articles } = this.props
    const { visible, article, searchValue } = this.state;
    return (
      <SearchResultWrapper>
        <div className="row">
            <div className="container">
                <h1 className="row titleSearch">Search from Nasa</h1>
                <div className="row">
                  <input className="search" defaultValue="" value={searchValue} placeholder="Type somethings to search..." 
                  onChange={this.onChangeInputSearch}
                  onKeyDown={this.handleSearch} />
                </div>
                <div className="row searchResultCount">
                {searchValue && articles && articles.length > 0 ?  `${articles.length} result for "${searchValue}"` : ''}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="container wrapArticles">
              {articles && articles.map((article, index) => {
                return (
                    <Article 
                      key={index}
                      title={_.get(article, 'data[0].title', '')}
                      description={_.get(article, 'data[0].description', '')}
                      type={_.get(article, 'data[0].media_type', 'image')}
                      linkPreview={_.get(article, 'links[0].href', '')}
                      linkFile={_.get(article, 'data[0].linkFile', '')}
                      dateCreated={_.get(article, 'data[0].date_created', '')}
                      >
                      <button className="btn btnAddCollection" onClick={() => this.handleAdd(article)}>
                      <img src={addBlackIcon} className="floatLeft svg" alt="Add" /> 
                      Add to collections</button>
                    </Article>
                  )
              })}
              {visible && <Modal visible={visible} onCancel={this.handleCancel} data={article} />}
              <div className="clearFix"></div>
            </div>
          </div>
      </SearchResultWrapper>
    );
  }
};

 

Articles.defaultProps = {
  onGetData: null
};

const mapStateToProps = (state) => {
  return ({
    articles: state.articlesReducer.articles,
  })
};

const mapDispatchToProps = {
  onGetData: getArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles)


