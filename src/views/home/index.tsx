'use client'
import { useEffect, useState } from 'react';
import Home from './ui/content';

export default function HomePage() {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch('http://34.47.65.226/test');
            console.log(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);

    return (
        <div>
        <Home/>
        <p>{message}</p>
        </div>
    );
    }
