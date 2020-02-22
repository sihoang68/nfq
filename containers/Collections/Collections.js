import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Article from '../../components/Article';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import likeIcon from '../../assets/images/likeIcon.svg';
import likedIcon from '../../assets/images/likedIcon.svg';
import deleteIcon from '../../assets/images/deleteIcon.svg';
import editIcon from '../../assets/images/editIcon.svg';

const CollectionsWrapper = styled.div`
  .btn {    
      width: 55px;
      height: 55px;
      box-sizing: border-box;
      margin-right: 15px;
      display: inline-block;
      text-align: center;
      padding: 10px;
      cursor: pointer;
      &:hover {
          color: #7850be;
          border-color: #7850be;
      }
  }
  .wrapSort {
    margin-bottom: 30px;
    select {
      padding-right: 80px;

    }
  }
  .wrapSort>div {
    width: auto;
    display: inline-block;
    margin-right: 30px;
  }
`;

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      visible: false,
      article: {},
      sort: '',
      filter: ''
    }
    this.syncToState = this.syncToState.bind(this);
    this.syncToLocalStorage = this.syncToLocalStorage.bind(this);
  }

  componentDidMount() {
    this.syncToState();
  }

  syncToState = () => {
    this.setState({
      collections: JSON.parse(localStorage.getItem('collections')) || []
    });
  }

  syncToLocalStorage = (newCollections) => {
    this.setState({ collections: newCollections });
    localStorage.setItem('collections',  JSON.stringify(newCollections));
  }



  handleLike = (id) => {
    let collections = this.state.collections;
    const foundIndex = collections.findIndex(item => item.id === id);
    collections[foundIndex].isLike === true ? collections[foundIndex].isLike = false : collections[foundIndex].isLike = true;
    this.syncToLocalStorage(collections)
  }

  handleDelete = (id) => {
    const newCollections = (this.state.collections).filter(item => item.id !== id)
    this.syncToLocalStorage(newCollections)
  }

  handleEdit = (article) => {
    this.setState({ 
      visible: true,
      article: article
    });
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
    this.syncToState();
  }

  onChangeSort = (e) => {
    this.setState({
      sort: e.target.value
    });
  }
  onChangeFilter = (e) => {
    this.setState({
      filter: e.target.value
    });
  }
 

  render() {
    const { visible, article, sort, filter } = this.state;
    let { collections } = this.state;
    switch(sort) {
      case 'title':
        collections = _.orderBy(collections, ['title'],['asc']); 
        break;
      default:
        collections;
    }

    switch(filter) {
      case 'isLike':
        collections =  _.filter(collections, {'isLike': true});
        break;
      case 'image':
        collections =  _.filter(collections, {'type': 'image'});
        break;
      case 'video':
        collections =  _.filter(collections, {'type': 'video'});
        break;
      default:
        collections;
    }
 

    return (
      <CollectionsWrapper>
        <div className="row wrapSort">
          <Select onChange={this.onChangeSort} value={sort} options={[
            {
              value: "",
              label: "Sort"
            },
            {
              value: "title",
              label: "Sort by Title"
            },
            
          ]} /> 

            <Select onChange={this.onChangeFilter} value={filter} options={[
            {
              value: "",
              label: "Filter"
            },
            {
              value: "isLike",
              label: "Filter by Favorite"
            },
            {
              value: "image",
              label: "Filter by Image"
            },
            {
              value: "video",
              label: "Filter by Video"
            }
          ]} /> 
        </div>



     {collections && collections.map((article, index) => {
        return (
            <Article 
              key={index}
              id={article.id}
              title={article.title}
              description={article.description}
              type={article.type}
              linkPreview={article.linkPreview}
              linkFile={article.linkFile}
              dateCreated={article.dateCreated}
              visible={visible}
              >
              <button className="btn" onClick={() => this.handleLike(article.id)}>
                <img className="svg" src={article.isLike === true ? likedIcon : likeIcon} alt="Like" />
              </button>
              <button className="btn" onClick={() => this.handleDelete(article.id)}>
                <img className="svg" src={deleteIcon} alt="Delete"/>
              </button>
              <button className="btn" onClick={() => this.handleEdit(article)}>
                <img className="svg" src={editIcon} alt="Edit"/>
              </button>
            </Article>
        )
        }) }
        {visible && <Modal visible={visible} onCancel={this.onCancel} data={article} action="editItem"/>}
        <div className="clearFix"></div>
      </CollectionsWrapper>
    );
  }
};


 

const mapStateToProps = (state) => {
  return ({
    collections: state.collections,
  })
};

 
export default connect(
  mapStateToProps,
  null
)(Collections)


