 

import React from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../Search/action';

class InputSearch extends React.Component {

  constructor(props) {
    super(props);
    
  }
 

  handleSearch = (e) => {
    if (e.key === 'Enter') {
      const { onGetData } = this.props;
      onGetData(e.target.value );
    }
  }
  
  render() {
    return (
      <div>
            <input type="text" onKeyDown={this.handleSearch} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  onGetData: getArticles
};

const mapStateToProps = state => ({
   articles : state.articles
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputSearch)
