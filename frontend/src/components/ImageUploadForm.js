







import React, { useState } from 'react';
import './ImageUploadForm.css';
import ImageDisplaySection from './ImageDisplaySection';

const ImageUploadForm = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
            setProcessedImage(null);
            setResult(null);
            setError(null);
        } else {
            setImage(null);
            setPreview(null);
            setProcessedImage(null);
            setResult(null);
            setError(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setResult(null);
        setProcessedImage(null);
        setError(null);
        if (!image) {
            setError('Please select an image.');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setResult(data.detected_objects);
                setProcessedImage(data.processed_image);
            } else {
                setError(data.error || 'Detection failed.');
            }
        } catch (err) {
            setError('Server error.');
        }
        setLoading(false);
    };

    return (
        <div className="upload-card">
            <h2 className="upload-title">Traffic Cam Object Detection</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <label className="upload-label">
                    Select Image
                    <input type="file" accept="image/*" onChange={handleImageChange} className="upload-input" />
                </label>
                {preview && (
                    <div className="image-preview-container">
                        <img src={preview} alt="Preview" className="image-preview" />
                    </div>
                )}
                <button type="submit" className="upload-btn" disabled={loading}>
                    {loading ? <span className="spinner"></span> : 'Upload Image'}
                </button>
            </form>
            {result !== null && !loading && (
                <div className="result-message success">Detected objects: {result}</div>
            )}
            {error && !loading && (
                <div className="result-message error">{error}</div>
            )}
            <ImageDisplaySection
                originalImage={preview}
                processedImage={processedImage ? `data:image/jpeg;base64,${processedImage}` : null}
            />
        </div>
    );
}

export default ImageUploadForm;
