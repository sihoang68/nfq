import React from 'react';
import styled from 'styled-components';
const FooterWrapper = styled.div`
.wrapFooter {
  text-align: center;
  padding: 5px;
  margin-top: 60px;
  background: #f1f1f1;
}
`;

class Footer extends React.Component {
  


  render() {
    return (
      <FooterWrapper>
        <div className="wrapFooter">
            <p>Si Hoang</p>
        </div>
      </FooterWrapper>
    )
  }
}

export default Footer
