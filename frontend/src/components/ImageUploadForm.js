import React, { useState } from 'react';

const ImageUploadForm = ({ onImageUpload }) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        // Handle image change
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Upload Image</button>
        </form>
    );
}

export default ImageUploadForm;
