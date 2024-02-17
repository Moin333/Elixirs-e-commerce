import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [subimage1, setSubimage1] = useState(null);
    const [subimage2, setSubimage2] = useState(null);
    const [subimage3, setSubimage3] = useState(null);
    const [subimage4, setSubimage4] = useState(null);

    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        subimage1: "",
        subimage2: "",
        subimage3: "",
        subimage4: "",
        category: "women",
        new_price: "",
        old_price: "",
        description: "",
        big_description: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const subimageHandler1 = (e) => {
        setSubimage1(e.target.files[0]);
    };

    const subimageHandler2 = (e) => {
        setSubimage2(e.target.files[0]);
    };

    const subimageHandler3 = (e) => {
        setSubimage3(e.target.files[0]);
    };

    const subimageHandler4 = (e) => {
        setSubimage4(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('product', image);

        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setProductDetails(prevProduct => ({
                    ...prevProduct,
                    image: data.image_url
                }));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const uploadSubimage = async (subimage, subimageKey) => {
        const subimageFormData = new FormData();
        subimageFormData.append('product', subimage);

        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: subimageFormData,
            });

            const data = await response.json();

            if (data.success) {
                setProductDetails(prevProduct => ({
                    ...prevProduct,
                    [subimageKey]: data.image_url
                }));
            }
        } catch (error) {
            console.error("Error uploading subimage:", error);
        }
    };

    const Add_Product = async () => {
        try {
            await uploadImage();
            await uploadSubimage(subimage1, 'subimage1');
            await uploadSubimage(subimage2, 'subimage2');
            await uploadSubimage(subimage3, 'subimage3');
            await uploadSubimage(subimage4, 'subimage4');

            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productDetails),
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product Added") : alert("Failed");
            });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        }
    };

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">men</option>
                <option value="Collections">Collections</option>
            </select>
        </div>
        <div className="addproduct-description">
            <div className="addproduct-itemfield">
                <p>Description</p>
                <input value={productDetails.description} onChange={changeHandler} type='text' name='description' placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-Fulldescription">
            <div className="addproduct-itemfield">
                <p>Full Description</p>
                <input value={productDetails.big_description} onChange={changeHandler} type='text' name='big_description' placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input-1'>
                <img src={subimage1?URL.createObjectURL(subimage1):upload_area} className='addproduct-thumbnail-img1' alt="" />
            </label>
            <input onChange={(e) => subimageHandler1(e, setSubimage1)} type='file' name='subimage1' id='file-input-1' hidden />
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input-2'>
                <img src={subimage2?URL.createObjectURL(subimage2):upload_area} className='addproduct-thumbnail-img2' alt="" />
            </label>
            <input onChange={(e) => subimageHandler2(e, setSubimage2)} type='file' name='subimage2' id='file-input-2' hidden />
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input-3'>
                <img src={subimage3?URL.createObjectURL(subimage3):upload_area} className='addproduct-thumbnail-img3' alt="" />
            </label>
            <input onChange={(e) => subimageHandler3(e, setSubimage3)} type='file' name='subimage3' id='file-input-3' hidden />
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input-4'>
                <img src={subimage4?URL.createObjectURL(subimage4):upload_area} className='addproduct-thumbnail-img4' alt="" />
            </label>
            <input onChange={(e) => subimageHandler4(e, setSubimage4)} type='file' name='subimage4' id='file-input-4' hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct