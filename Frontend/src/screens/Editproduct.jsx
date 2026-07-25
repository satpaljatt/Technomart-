import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Editproduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState(''); 
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setDescription(data.description);
                setImage(data.image);
                setBrand(data.brand); 
                setCategory(data.category);
                setCountInStock(data.countInStock);
            } catch (error) {
                console.error('Purana data laane me dikkat hui:', error);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleImageChange = (e) => setImage(e.target.value);
    const handleBrandChange = (e) => setBrand(e.target.value); 
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleCountInStockChange = (e) => setCountInStock(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const userData = JSON.parse(localStorage.getItem('user'));
            const token = userData?.token;

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            // Fixed: Data pehle aur Config aakhri me pass kiya
            const response = await axios.put(`/api/products/${id}`,
                { name, price, description, image, brand, category, countInStock },
                config
            );

            setLoading(false);
            console.log('Product updated successfully:', response.data);
            alert('Product ekdam mast update ho gaya bhai!');
            navigate('/admin/productlist');
        } catch (error) {
            setLoading(false);
            error.response && error.response.data.message && alert(error.response.data.message);
            console.error('Error updating product:', error);
            alert('Error updating product. Please try again.');
        }
    };

  

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 border border-gray-200 font-sans text-gray-900">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Edit Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                    <input type="text" value={name} onChange={handleNameChange} className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price:</label>
                    <input type="number" value={price} onChange={handlePriceChange} className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Count in Stock:</label>
                    <input type="number" value={countInStock} onChange={handleCountInStockChange} className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name:</label>
                    <input type="text" value={brand} onChange={handleBrandChange} className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                    <input type="text" value={category} onChange={handleCategoryChange} className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL:</label>
                    <input type="text" value={image} onChange={handleImageChange} className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                    <textarea value={description} onChange={handleDescriptionChange} rows="4" className="w-full border p-2 rounded-lg focus:outline-blue-500" required />
                </div>

                <div className="md:col-span-2 mt-2">
                    <button type="submit" disabled={loading} className="w-full bg-[#5c3c2e] hover:opacity-90 text-white p-3 rounded-lg font-semibold transition disabled:bg-gray-400 cursor-pointer">
                        {loading ? 'Updating Product...' : 'Update Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Editproduct;