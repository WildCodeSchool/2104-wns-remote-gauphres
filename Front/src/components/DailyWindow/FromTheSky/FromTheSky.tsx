import React, { useEffect, useState } from 'react';
import ApiImageCard from '../../shared/Card/ApiImageCard';

const FromTheSky = () => {
    const [nasaImage, setNasaImage] = useState<string>();

    const fetchNasa = async () => {
        const nasaResponse = await fetch(
            'https://api.nasa.gov/planetary/apod?api_key=f9tgUe42OcJ9mRnbG9apSdd6w8u7mdYsadAlDsdL'
        );
        const data = await nasaResponse.json();
        setNasaImage(data.url);
    };

    useEffect(() => {
        fetchNasa();
    }, []);

    return <ApiImageCard title="From The Sky !" url={nasaImage} />;
};

export default FromTheSky;
