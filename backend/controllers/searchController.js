import Event from '../models/Event.js';

// @desc    Search events with autocomplete
// @route   GET /api/events/search
// @access  Public
export const searchEvents = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.status(200).json({
                success: true,
                data: []
            });
        }

        const searchQuery = q.trim();

        // Build search query with regex for partial matching
        const searchConditions = {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } },
                { tags: { $regex: searchQuery, $options: 'i' } },
                { city: { $regex: searchQuery, $options: 'i' } },
                { venue: { $regex: searchQuery, $options: 'i' } },
                { organizer: { $regex: searchQuery, $options: 'i' } }
            ],
            status: 'upcoming'
        };

        // Find matching events and limit to 8 results
        const events = await Event.find(searchConditions)
            .select('title category city image featured tags')
            .limit(8)
            .sort({ featured: -1, date: 1 });

        // Calculate relevance score and sort
        const scoredResults = events.map(event => {
            let score = 0;
            const lowerQuery = searchQuery.toLowerCase();
            const lowerTitle = event.title.toLowerCase();
            const lowerCategory = event.category.toLowerCase();

            // Title exact match gets highest score
            if (lowerTitle === lowerQuery) score += 100;
            // Title starts with query
            else if (lowerTitle.startsWith(lowerQuery)) score += 50;
            // Title contains query
            else if (lowerTitle.includes(lowerQuery)) score += 25;

            // Category match
            if (lowerCategory === lowerQuery) score += 75;
            else if (lowerCategory.includes(lowerQuery)) score += 20;

            // Featured events get bonus
            if (event.featured) score += 10;

            return {
                ...event.toObject(),
                relevanceScore: score
            };
        });

        // Sort by relevance score
        scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

        res.status(200).json({
            success: true,
            count: scoredResults.length,
            data: scoredResults
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
