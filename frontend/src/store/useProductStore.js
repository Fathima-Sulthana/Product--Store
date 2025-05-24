import {create} from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:3000';

export const useProductStore = create((set,get) => ({
    products: [],
    loading: false,
    error: null,

    currentProduct: null,

    formData: {
        name: '',
        price: '',
        image: '',
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({formData: {name: '', price: '', image: ''}}),

    addProduct: async(e) =>{
        e.preventDefault();
        set({loading: true});
        try {
            const {formData} = get();
            await axios.post(`${BASE_URL}/api/products`, formData);
            await get().fetchProducts();
            get().resetForm();
            toast.success('Product added successfully!');
            
            document.getElementById("add-product-modal").close();

        } catch (error) {
            console.error('Failed to add product:', error);
            toast.error('Failed to add product, please try again later.');
        }finally{
            set({loading: false});
        }
    },

    fetchProducts: async () => {
        set({loading: true});
        try {
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({products: response.data.data, error: null});
        } catch (err) {
            if(err.status === 429) set({error: 'Too many requests, please try again later.', products: []});
            else set({error: 'something went wrong, please try again later.', products: []});
        } finally {
            set({loading: false});
        }

    },

    deleteProduct: async (id) => {
        set({loading: true});
        try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev =>({products: prev.products.filter(product => product.id !== id)}));
            toast.success('Product deleted successfully!');
        } catch (error) {
            console.error('Failed to delete product:', error);
            toast.error('Failed to delete product, please try again later.');
        } finally {
            set({loading: false});
        }

    
    },

    fetchProduct: async (id) => {
        set({loading: true});
        try {
            const resonse = await axios.get(`${BASE_URL}/api/products/${id}`);
            set({currentProduct: resonse.data.data, 
                formData: resonse.data.data,
                error: null
            });

        } catch (error) {
            console.error('Failed to fetch product:', error);
            set({error: 'Failed to fetch product, please try again later.' , currentProduct: null});
        }finally {
            set({loading: false});
        }
    },

    updateProduct: async (id) => {
        set({loading: true});
        try {
            const {formData} = get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
            set({currentProduct: response.data.data,});
            toast.success('Product updated successfully!');
        } catch (error) {
            toast.error('Failed to update product, please try again later.');
            console.error('Failed to update product:', error);
        } finally {
            set({loading: false});
            document.getElementById("edit-product-modal").close();
        }
    },
}));