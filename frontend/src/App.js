import React from 'react';
import NavigationBar from './components/NavigationBar';
import ImageUploadForm from './components/ImageUploadForm';
import ImageDisplaySection from './components/ImageDisplaySection';

const App = () => {
    return (
        <div>
            <NavigationBar />
            <ImageUploadForm />
            <ImageDisplaySection />
        </div>
    );
}

export default App;
