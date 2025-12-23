const CategoryFilter = ({ selectedCategory, onCategorySelect }) => {
    const categories = [
        { id: 'all', name: 'All Events', icon: '🎪', color: '#D946EF' }, // Neon Fuchsia
        { id: 'concert', name: 'Concerts', icon: '🎵', color: '#FF00FF' }, // Neon Magenta
        { id: 'conference', name: 'Conferences', icon: '🎤', color: '#FFD600' }, // Neon Gold
        { id: 'sports', name: 'Sports', icon: '🏏', color: '#00D26A' }, // Neon Green
        { id: 'theater', name: 'Theater', icon: '🎭', color: '#FF2E63' }, // Neon Red
        { id: 'workshop', name: 'Workshops', icon: '🛠️', color: '#00E5FF' }, // Neon Cyan
        { id: 'festival', name: 'Festivals', icon: '🎉', color: '#FF6B00' }, // Neon Orange
        { id: 'tech-meetup', name: 'Tech Meetups', icon: '💻', color: '#4D4DFF' }, // Neon Blue
        { id: 'cultural', name: 'Cultural', icon: '🎨', color: '#9D4EDD' } // Neon Purple
    ];

    const isActive = (categoryId) => {
        if (categoryId === 'all') {
            return selectedCategory === '';
        }
        return selectedCategory === categoryId;
    };

    const getCardStyle = (category) => {
        const active = isActive(category.id);

        return {
            background: '#ffffff',
            border: `2px solid ${category.color}`,
            borderRadius: '1.25rem',
            padding: '1.75rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: active
                ? `0 0 20px ${category.color}60, inset 0 0 10px ${category.color}10`
                : `0 0 10px ${category.color}20`,
            minHeight: '140px',
            textAlign: 'center',
            position: 'relative',
            transform: active ? 'translateY(-4px)' : 'translateY(0)'
        };
    };

    return (
        <div style={{
            margin: '3rem 0',
            padding: '3rem 0',
            background: 'linear-gradient(to bottom, #F9FAFB, #ffffff)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '2.25rem',
                    fontWeight: '800',
                    marginBottom: '0.75rem',
                    color: '#111827',
                    letterSpacing: '-0.025em'
                }}>
                    Browse by Category
                </h2>
                <p style={{
                    textAlign: 'center',
                    color: '#6B7280',
                    marginBottom: '3rem',
                    fontSize: '1.125rem',
                    fontWeight: '400'
                }}>
                    Find events that match your interests
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1.25rem'
                }}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategorySelect(category.id === 'all' ? '' : category.id)}
                            style={getCardStyle(category)}
                            onMouseEnter={(e) => {
                                if (!isActive(category.id)) {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = `0 0 25px ${category.color}50`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive(category.id)) {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = `0 0 10px ${category.color}20`;
                                }
                            }}
                            type="button"
                        >
                            <span style={{
                                fontSize: '3rem',
                                lineHeight: '1',
                                display: 'block',
                                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                            }}>
                                {category.icon}
                            </span>
                            <span style={{
                                fontWeight: '700',
                                fontSize: '1.125rem',
                                color: category.color,
                                display: 'block',
                                lineHeight: '1.4',
                                fontFamily: 'Inter, system-ui, sans-serif'
                            }}>
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;
