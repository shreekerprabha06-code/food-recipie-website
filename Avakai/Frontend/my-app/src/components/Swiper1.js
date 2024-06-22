import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { FaStar, FaSave } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import '../css/Tiffins.css';
import { NavLink } from 'react-router-dom';

const url = 'http://localhost:2000/fetch';
const delurl = 'http://localhost:2000/delete';

export default function App() {
    const [slidesPerView, setSlidesPerView] = useState(5);
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);

    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        axios.get(url)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesPerView(2);
            } else if (window.innerWidth < 992) {
                setSlidesPerView(3);
            } else {
                setSlidesPerView(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(delurl, { data: { title } })
            .then(res => {
                console.log(res.data);
                setPosts(posts.filter(post => post.title !== title));
                handleReset();
                setShow(false);
            })
            .catch(err => {
                console.error('Error deleting data:', err);
                setError(err);
            });
    };

    const handleReset = () => {
        setEmail('');
        setTitle('');
        setError(null);
    };


    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={-50}
                slidesPerView={slidesPerView}
                loop={true}
                pagination={{ clickable: true }}
                style={{ zIndex: "0" }}
            >
                {posts
                    .filter(item => item.email === userEmail)
                    .map((item, index) => (
                        <SwiperSlide key={index} >
                            <div className='card' style={{ boxShadow: "none" }}>
                                <div className='card-img'>
                                    <img src={item.imglink} alt={item.title} />
                                </div>
                                <div className='card-content' style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                                    <h2><NavLink to={`/recipe/${item.title}`}>{item.title}</NavLink></h2>
                                    <div className="Deletebtn" >
                                        <button onClick={() => {
                                            setShow(!show);
                                            setTitle(item.title);
                                        }} style={{ borderRadius: "5px", border: "none", color: "white", padding: " 10px 20px" }} id='deletebtn'>Delete Post</button>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
            {show && (
                <div className="modal">
                    <div className="deletebox">
                        <span className="close" onClick={() => setShow(false)}><IoClose /></span>
                        <form onSubmit={handleDelete} onReset={handleReset}>
                            <label>Do you want to delete you precious "{title}" recipie?</label>

                            <button type="submit">Yes</button>
                            <button onClick={() => setShow(false)} style={{ backgroundColor: "black" }}>No</button>
                        </form>
                        {error && <p style={{ color: 'red' }}>Error deleting data: {error.message}</p>}
                    </div>
                </div>
            )}
        </>
    );
}
