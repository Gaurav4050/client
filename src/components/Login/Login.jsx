import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const onSubmit = (data) => {
        // Handle form submission, e.g., login request
        console.log(data);
        setShowSuccessMessage(true);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-4">Login</h2>
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
