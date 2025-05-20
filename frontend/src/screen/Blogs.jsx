import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { use } from 'react';

const Blogs = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [comment, setComment] = useState('')
}