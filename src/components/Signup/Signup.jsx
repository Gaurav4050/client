// Signup.js
import axios from 'axios';
import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [uploadaedImageURL, setUploadedImageURL] = useState(null);
    const password = watch("password");

    const onSubmit = async(data) => {
       
        try{
            const payload = {
                username:data.name,
                email:data.email,
                password:data.password,
                profilePicUrl:uploadaedImageURL || ''
            }
            const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/signup`, payload);
            // navigate to login page
            navigate('/login');
            toast.success("account created successfully");
        }catch(error){
            toast.error("account already exists with this email");    
            console.log(error);
        }
        
    };

    const handleFileChange = async(e) => {
        const file = e.target.files[0];


        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }

        if(file){
            try{

                const formdata = new FormData();
                formdata.append('uploadFile', file);

                const response= await axios.post(`${process.env.REACT_APP_BASE_URI}/upload`, formdata);
                setUploadedImageURL(response.data.result.url);
            }catch(error){
                toast.error("failed to upload image");
                console.log(error);
            }
        }
    };
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl mb-4">Sign up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* name optional */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input type="text" id="name"   placeholder = "Enter your name (optional)" name="name" className="w-full border rounded px-3 py-2" {...register("name")} />
                    </div>

                    {/* Email field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input type="email"
                        placeholder='Enter your email address'
                        id="email" name="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        className="w-full border rounded px-3 py-2" 
                        {...register("email", { required: {value:true, message: "Email is required"},pattern: {value:/^\S+@\S+$/i, message:"Please enter correct email value"} })}
                         />
                        {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    {/* Password field */}
                    <div className="flex gap-3 ">
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input type="password"
                        placeholder='Enter your password'
                        id="password" name="password" className="w-full border rounded px-3 py-2" 
                        {...register("password",{ required: {
                            value: true, 
                            message: "Password is required"
                        },
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                message: "Please enter a password with at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)."
                            }
                        
                         })}
                        
                        
                        />
                    </div>
                    {/* confirm password field */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
                        <input type="password"
                        placeholder='Confirm password'
                        id="confirmPassword" name="confirmPassword" className="w-full border rounded px-3 py-2" {...register("confirmPassword",{ required: true, validate: (value) => value === password || "Passwords do not match" })} />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}

                    </div>


                    </div>

                    {errors.password && <p className="text-red-500 text-xs mt-[-10px] mb-3">{errors.password.message}</p>}


                     {/* Profile Picture field */}
                     <div className="mb-4">
                        <label htmlFor="profilePicture" className="block mb-1">Profile Picture</label>
                        <input type="file" id="profilePicture" name="profilePicture" className="w-full border rounded px-3 py-2" {...register("profilePicture")} onChange={handleFileChange} />
                    </div>

                    {profilePicture && (
                        <div className="mb-4">
                            <img src={profilePicture} alt="Profile" className="rounded-full h-20 w-20 object-cover" />
                        </div>
                    )}


                    {/* Terms and Conditions checkbox */}
                    <div className="mb-4">
                        <input type="checkbox" id="terms" name="terms" className="mr-2" {...register("terms",{ required: true })} />
                        <label htmlFor="terms">I agree to the terms and conditions</label>
                        {errors.terms && <p className="text-red-500 text-xs mt-1">Please accept the terms and conditions</p>}
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Signup</button>
                </form>

                    {/* sign in instead */}

                    <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Sign in</Link></p>


                {showSuccessMessage && <p className="text-green-500 mt-4">Signup successful!</p>}
            </div>
        </div>
    );
};

export default Signup;
