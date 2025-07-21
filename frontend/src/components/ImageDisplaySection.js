import React from 'react';

const ImageDisplaySection = ({ originalImage, processedImage }) => {
    if (!originalImage && !processedImage) return null;
    return (
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 32 }}>
            {originalImage && (
                <div>
                    <div style={{ textAlign: 'center', marginBottom: 8 }}>Original Image</div>
                    <img src={originalImage} alt="Original" style={{ maxWidth: 220, maxHeight: 180, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                </div>
            )}
            {processedImage && (
                <div>
                    <div style={{ textAlign: 'center', marginBottom: 8 }}>Detected Objects</div>
                    <img src={processedImage} alt="Processed" style={{ maxWidth: 220, maxHeight: 180, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                </div>
            )}
        </div>
    );
}

export default ImageDisplaySection;
