import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/useAuth';
import toast from 'react-hot-toast';

const Home = () => {
    const auth = useAuth();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/posts?page=${currentPage}`, {
                withCredentials: true
            });
            setPosts(response.data.posts);
            setTotalPages(Math.ceil(response.data.totalPages / 9));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            toast.error("No more pages");
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <div className="min-h-screen flex flex-col">
        <div className="bg-gray-800 text-white p-4 flex justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Advisoropedia</h1>
            </div>
            <div class="flex items-center">
    {auth.user.username && <p class="mr-4 text-gray-300">Welcome, {auth.user.username}</p>}
    {auth.user.profilePicUrl && <img src={auth.user.profilePicUrl} alt="profile" class="w-8 h-8 rounded-full mr-4 object-cover" />}
    <button class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"  onClick={handleLogout}>Logout</button>
</div>
        </div>
        <div className="flex-1 flex flex-wrap justify-center p-4">
            {posts.map(post => (
                <div key={post.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                    <div className="bg-white shadow-md rounded-md p-4">
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="bg-gray-800 text-white p-4 flex justify-between">
            <button className={`px-4 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button className={`px-4 py-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    </div>
    );
};

export default Home;
