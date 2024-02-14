import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = (props) => {
  const { product } = props;

  // Check if product or product.description is undefined
  if (!product || !product.big_description) {
    return null; // or return a default message or handle it as appropriate
  }

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <h3>{product.big_description}</h3>
      </div>
    </div>
  );
};

export default DescriptionBox;
