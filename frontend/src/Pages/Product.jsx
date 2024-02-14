import React, { useContext } from "react";
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrumbs from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay"
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  
  // Add some logging for debugging
  console.log('all_product:', all_product);
  console.log('productId:', productId);

  // Check if product is found
  const product = all_product.find((e) => e.id === Number(productId));
  console.log('product:', product);

  return (
    <div>
      {/* Add some logging to check if components receive the correct data */}
      {product ? (
        <>
          <Breadcrumbs product={product} />
          <ProductDisplay product={product} />
          <DescriptionBox product={product}/>
          <RelatedProducts/>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
}

export default Product;

