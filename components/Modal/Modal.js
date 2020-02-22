import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import uuid from "uuid";
import Router from 'next/router'
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import checkIcon from '../../assets/images/checkIcon.svg';
import closeIcon from '../../assets/images/closeIcon.svg';

const ModalWrapper = styled.div`
    display: ${props => (props.visible ? 'block' : 'none')};
    position: fixed;  
    z-index: 1;  
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto;  
    background-color: rgb(0,0,0);  
    background-color: rgba(0,0,0,0.4);  
    .close {
        float: right;
    }
    .modal-content {
        background-color: #fefefe;
        margin: 5% auto;
        padding: 20px 35px;
        border: 1px solid #888;
        width: 100%;
        max-width: 760px;
        border-radius: 8px;
        box-sizing: border-box; 
        h2 {
            font-size: 30px;
            font-weight: lighter;
        }
    }
    
    .btnAdd {
      width: auto;
      padding: 12px 15px;
      border-radius: 5px;
      display: inline-block;
      text-decoration: none;
      margin-top: 40px;
      background: #7850be;
      font-size: 16px;
      color: #fff;
      margin-bottom: 10px;
      border: none;
      font-weight: lighter;
    }
    .fixLh {
      line-height: 24px;
    }

    @media (max-width: 767px) {
      .modal-content {
        margin: 0 auto;
      }
    }

`;


const Modal = props => {
  const {  visible, onOk, onCancel, data, action } = props;

  const [id, setId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [type, setType] = React.useState('');
  const [linkPreview, setLinkPreview] = React.useState('');
  const [linkFile, setLinkFile] = React.useState('');
  const [dateCreated, setDateCreated] = React.useState('');


  useEffect(() => {
    if (!_.isEmpty(data)) {
      if(action!=='addItem') {
        setId(uuid.v4());
        setTitle(data.title);
        setDescription(data.description);
        setType(data.type);
        setLinkPreview(data.linkPreview);
        setLinkFile(data.linkFile);
      } else {
        setId(uuid.v4());
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
        setType(data.data[0].media_type);
        setLinkPreview(data.links[0].href);
        setLinkFile(data.links[0].href);
        setDateCreated(data.data[0].date_created);
      }
    }
  }, [data]);

  function addDataToLocalStorage(article) {
      let tmpArr = [];
      tmpArr = JSON.parse(localStorage.getItem('collections')) || [];
      tmpArr.push(article);
      localStorage.setItem('collections', JSON.stringify(tmpArr));
  }
  
  function addItem() {
      const article = {
          id,
          title,
          description,
          type,
          linkPreview,
          linkFile,
          dateCreated, 
          isLike: false
      };
      addDataToLocalStorage(article);
      onCancel();
      Router.push('/')
  }

  function updateItem(data) {
    const newArticle = {
        id: data.id,
        title,
        description,
        type,
        linkPreview,
        linkFile,
        dateCreated: data.dateCreated, 
        isLike: data.isLike
    };
     
      let collections = [];
      collections = JSON.parse(localStorage.getItem('collections')) || [];
      const foundIndex = collections.findIndex(item => item.id === data.id);
      collections[foundIndex] = newArticle;
      localStorage.setItem('collections', JSON.stringify(collections));
      onCancel();
}


  return (
      <ModalWrapper
        visible={visible}
        onCancel={onCancel}
        action={action}
        className="modal"
      >
        <div className="modal-content">
          <span className="close" onClick={onCancel}><img src={closeIcon} className="svg" alt="Close" /></span>
          <div className="row">
              <h2> {action && action ==='addItem' ? `Add to Collection` : `Edit`}</h2>
          </div>
        <div className="row">
          <Input label="Title" value={title} onChange={e => setTitle(e.target.value)}/>
          <TextArea value={description} onChange={e => setDescription(e.target.value)}/>
          <Select label="Type" value={type} onChange={e => setType(e.target.value)}
          options={[
            {
              value: "image",
              label: "Image"
            },
            {
              value: "video",
              label: "Video"
            }
          ]}
          />
          <Input label="Link preview image url *" value={linkPreview} onChange={e => setLinkPreview(e.target.value)}/>
          <Input label="Link file url *" value={linkFile} onChange={e => setLinkFile(e.target.value)}/>
        </div>
        {action && action ==='addItem' 
        ? (<button className="btnAdd fixLh" onClick={() => addItem()}><img className="floatLeft svg" src={checkIcon} alt="Add to Collection" /> &nbsp; Add to Collection</button>) 
        : (<button className="btnAdd fixLh" onClick={() => updateItem(data)}><img className="floatLeft svg" src={checkIcon} alt="Add to Collection" />  &nbsp; Save</button>) }
      </div>
      </ModalWrapper>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  data: PropTypes.any,
  action: PropTypes.string,
};

Modal.defaultProps = {
  visible: false,
  onOk: null,
  onCancel: null,
  data: null,
  action: 'addItem',
};

export default Modal;

 