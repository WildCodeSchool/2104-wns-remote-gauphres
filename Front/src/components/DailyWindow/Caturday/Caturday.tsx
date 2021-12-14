import React, { useEffect, useState } from 'react';
import ApiImageCard from '../../shared/Card/ApiImageCard';

const Caturday = () => {
    const [caturdayImage, setCaturdayImage] = useState<string>(
        'https://cdn2.thecatapi.com/images/9g8.jpg'
    );

    const fetchCaturday = async () => {
        const catResponse = await fetch(
            'https://api.thecatapi.com/v1/images/search',
            {
                headers: {
                    'x-api-key': 'f29c0af3-7f51-4b1d-850a-adaeca87102e',
                },
            }
        );
        const data = await catResponse.json();
        setCaturdayImage(data[0].url);
    };

    useEffect(() => {
        fetchCaturday();
    }, []);

    return <ApiImageCard title="Your Caturday !" url={caturdayImage} />;
};

export default Caturday;
