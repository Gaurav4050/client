import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
     const navigate = useNavigate();
    const auth= useAuth()

    const onSubmit = async (data) => {
        
        try{

            const payload = {
                email:data.email,
                password:data.password
            }

            const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/login`, 
            payload,
            {
                withCredentials: true
              }
            );
            auth.login(response?.data?.data)
            navigate('/home');
            toast.success("login successful");

        }catch(error){
            toast.error("invalid credentials");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-4">Login</h2>
                <div class="bg-blue-100 rounded p-4 mb-4">
    <p class="text-sm text-blue-700 font-semibold">Test credentials:</p>
    <div class="flex flex-col">
        <span class="text-gray-600">email: test@gmail.com</span>
        <span class="text-gray-600">password: Test@123</span>
    </div>
</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input type="text" id="email" name="email" className="w-full border rounded px-3 py-2"
                       {...register("email", { required: {value:true, message: "Email is required"},pattern: {value:/^\S+@\S+$/i, message:"Please enter correct email value"} })}
                         />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    {/* Password field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input type="password" id="password" name="password" className="w-full border rounded px-3 py-2"
                        
                        {...register("password",{ required: 'Password is required' })} />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
                </form>

                    {/* sign up instead */} 
                    <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>

                {showSuccessMessage && <p className="text-green-500 mt-4">Login successful!</p>}
            </div>
        </div>
    );
};

export default Login;
