import './EventCardSkeleton.css';

const EventCardSkeleton = () => {
    return (
        <div className="event-card-skeleton">
            <div className="skeleton-image shimmer"></div>
            <div className="skeleton-content">
                <div className="skeleton-title shimmer"></div>
                <div className="skeleton-description shimmer"></div>
                <div className="skeleton-description shimmer" style={{ width: '80%' }}></div>
                <div className="skeleton-meta">
                    <div className="skeleton-meta-item shimmer"></div>
                    <div className="skeleton-meta-item shimmer"></div>
                </div>
                <div className="skeleton-footer">
                    <div className="skeleton-price shimmer"></div>
                    <div className="skeleton-seats shimmer"></div>
                </div>
            </div>
        </div>
    );
};

const EventCardSkeletonGrid = ({ count = 6 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <EventCardSkeleton key={index} />
            ))}
        </>
    );
};

export default EventCardSkeletonGrid;
export { EventCardSkeleton };
