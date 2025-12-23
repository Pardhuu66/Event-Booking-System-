import './Loader.css';

const Loader = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="flex-center" style={{ padding: '2rem' }}>
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;
