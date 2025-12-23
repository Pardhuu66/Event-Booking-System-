import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Event from './models/Event.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Event.deleteMany();
        console.log('Cleared existing data');

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: process.env.ADMIN_EMAIL || 'admin@eventbooking.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@123',
            role: 'admin',
            phone: '+91 9876543210'
        });

        console.log('Admin user created:', admin.email);

        // Create sample user
        const sampleUser = await User.create({
            name: 'John Doe',
            email: 'user@test.com',
            password: 'User@123',
            role: 'user',
            phone: '+91 9876543211'
        });

        console.log('Sample user created:', sampleUser.email);

        // Helper function to get future dates
        const getFutureDate = (daysFromNow) => {
            const date = new Date();
            date.setDate(date.getDate() + daysFromNow);
            return date;
        };

        // Create comprehensive events across 8 categories
        const events = [
            // === CONCERTS (5 events) ===
            {
                title: 'Summer Music Festival 2025',
                description: 'The biggest outdoor music festival featuring 50+ artists across multiple stages. A 3-day celebration of music, art, and culture.',
                category: 'concert',
                venue: 'Central Park Arena',
                city: 'Mumbai',
                date: getFutureDate(45),
                time: '18:00',
                price: 299,
                totalSeats: 5000,
                availableSeats: 5000,
                image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=675&fit=crop',
                organizer: 'Live Nation India',
                status: 'upcoming',
                featured: true,
                tags: ['music', 'festival', 'outdoor', 'multi-day']
            },
            {
                title: 'Rock Legends Live',
                description: 'Experience the electrifying energy of legendary rock bands performing their greatest hits. A night of pure rock and roll!',
                category: 'concert',
                venue: 'National Stadium',
                city: 'Delhi',
                date: getFutureDate(20),
                time: '19:30',
                price: 199,
                totalSeats: 2000,
                availableSeats: 2000,
                image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=675&fit=crop',
                organizer: 'Rock Entertainment',
                status: 'upcoming',
                featured: true,
                tags: ['rock', 'live', 'concert']
            },
            {
                title: 'Indie Music Night',
                description: 'Discover emerging indie artists and underground bands. An intimate evening of alternative music and creativity.',
                category: 'concert',
                venue: 'The Underground',
                city: 'Bangalore',
                date: getFutureDate(15),
                time: '20:00',
                price: 79,
                totalSeats: 300,
                availableSeats: 300,
                image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=675&fit=crop',
                organizer: 'Indie Collective',
                status: 'upcoming',
                featured: false,
                tags: ['indie', 'alternative', 'underground']
            },
            {
                title: 'Classical Symphony Orchestra',
                description: 'An enchanting evening of classical music by the renowned Symphony Orchestra. Experience timeless masterpieces.',
                category: 'concert',
                venue: 'Concert Hall',
                city: 'Kolkata',
                date: getFutureDate(30),
                time: '19:00',
                price: 149,
                totalSeats: 500,
                availableSeats: 500,
                image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&h=675&fit=crop',
                organizer: 'Classical Arts Foundation',
                status: 'upcoming',
                featured: false,
                tags: ['classical', 'orchestra', 'formal']
            },
            {
                title: 'Jazz & Blues Evening',
                description: 'Smooth jazz and soulful blues performances by acclaimed artists. Perfect for an elegant night out.',
                category: 'concert',
                venue: 'Blue Note Lounge',
                city: 'Pune',
                date: getFutureDate(25),
                time: '20:30',
                price: 99,
                totalSeats: 200,
                availableSeats: 200,
                image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200&h=675&fit=crop',
                organizer: 'Jazz Society',
                status: 'upcoming',
                featured: false,
                tags: ['jazz', 'blues', 'lounge']
            },

            // === CONFERENCES (4 events) ===
            {
                title: 'Global Tech Summit 2025',
                description: 'The largest technology conference in Asia. Connect with 5000+ tech professionals, hear from industry leaders, and explore the future of technology.',
                category: 'conference',
                venue: 'International Convention Center',
                city: 'Bangalore',
                date: getFutureDate(60),
                time: '09:00',
                price: 499,
                totalSeats: 3000,
                availableSeats: 3000,
                image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=675&fit=crop',
                organizer: 'Tech Conference Global',
                status: 'upcoming',
                featured: true,
                tags: ['technology', 'networking', 'business', 'innovation']
            },
            {
                title: 'AI & Machine Learning Conference',
                description: 'Deep dive into artificial intelligence, machine learning, and data science. Learn from experts and get hands-on experience.',
                category: 'conference',
                venue: 'Tech Park Auditorium',
                city: 'Hyderabad',
                date: getFutureDate(40),
                time: '10:00',
                price: 399,
                totalSeats: 800,
                availableSeats: 800,
                image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=675&fit=crop',
                organizer: 'AI Research Institute',
                status: 'upcoming',
                featured: true,
                tags: ['AI', 'machine-learning', 'tech']
            },
            {
                title: 'Digital Marketing Summit',
                description: 'Master the latest digital marketing strategies. SEO, social media, content marketing, and analytics covered in depth.',
                category: 'conference',
                venue: 'Business Center',
                city: 'Mumbai',
                date: getFutureDate(35),
                time: '09:30',
                price: 299,
                totalSeats: 500,
                availableSeats: 500,
                image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=675&fit=crop',
                organizer: 'Marketing Excellence',
                status: 'upcoming',
                featured: false,
                tags: ['marketing', 'digital', 'business']
            },
            {
                title: 'Leadership & Management Forum',
                description: 'Exclusive forum for CEOs, managers, and leaders. Network, learn, and grow with industry pioneers.',
                category: 'conference',
                venue: 'Executive Center',
                city: 'Gurgaon',
                date: getFutureDate(50),
                time: '08:00',
                price: 599,
                totalSeats: 300,
                availableSeats: 300,
                image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=675&fit=crop',
                organizer: 'Leadership Institute',
                status: 'upcoming',
                featured: false,
                tags: ['leadership', 'business', 'executive']
            },

            // === SPORTS (4 events) ===
            {
                title: 'IPL Playoff Match: MI vs CSK',
                description: 'Witness the ultimate cricket showdown! Mumbai Indians vs Chennai Super Kings in this thrilling playoff match.',
                category: 'sports',
                venue: 'Wankhede Stadium',
                city: 'Mumbai',
                date: getFutureDate(28),
                time: '19:30',
                price: 249,
                totalSeats: 3000,
                availableSeats: 3000,
                image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=675&fit=crop',
                organizer: 'BCCI',
                status: 'upcoming',
                featured: true,
                tags: ['cricket', 'IPL', 'sports', 'live']
            },
            {
                title: 'City Marathon 2025',
                description: 'Annual city marathon with 10K, 21K, and 42K categories. Run for fitness and charity!',
                category: 'sports',
                venue: 'City Streets',
                city: 'Delhi',
                date: getFutureDate(55),
                time: '06:00',
                price: 49,
                totalSeats: 5000,
                availableSeats: 5000,
                image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&h=675&fit=crop',
                organizer: 'Marathon Organizers',
                status: 'upcoming',
                featured: false,
                tags: ['marathon', 'running', 'fitness', 'charity']
            },
            {
                title: 'Football Premier League Match',
                description: 'Top teams compete in this exciting football match. Experience the thrill of live football action!',
                category: 'sports',
                venue: 'Football Stadium',
                city: 'Kolkata',
                date: getFutureDate(22),
                time: '17:00',
                price: 129,
                totalSeats: 2500,
                availableSeats: 2500,
                image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=675&fit=crop',
                organizer: 'Football Association',
                status: 'upcoming',
                featured: false,
                tags: ['football', 'soccer', 'sports']
            },
            {
                title: 'Tennis Championship Finals',
                description: 'Watch the best tennis players compete for the championship title. World-class tennis action awaits!',
                category: 'sports',
                venue: 'Tennis Complex',
                city: 'Chennai',
                date: getFutureDate(42),
                time: '14:00',
                price: 179,
                totalSeats: 1000,
                availableSeats: 1000,
                image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=675&fit=crop',
                organizer: 'Tennis Federation',
                status: 'upcoming',
                featured: false,
                tags: ['tennis', 'championship', 'sports']
            },

            // === THEATER (4 events) ===
            {
                title: 'The Phantom of the Opera',
                description: 'Broadway-style musical production of the timeless classic. Mesmerizing performances, stunning sets, and unforgettable music.',
                category: 'theater',
                venue: 'Grand Theater',
                city: 'Mumbai',
                date: getFutureDate(38),
                time: '19:00',
                price: 349,
                totalSeats: 400,
                availableSeats: 400,
                image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=1200&h=675&fit=crop',
                organizer: 'Musical Productions',
                status: 'upcoming',
                featured: true,
                tags: ['theater', 'musical', 'broadway', 'classic']
            },
            {
                title: 'Stand-Up Comedy Special',
                description: 'Laugh out loud with the funniest comedians! An evening of non-stop comedy and entertainment.',
                category: 'theater',
                venue: 'Comedy Club',
                city: 'Bangalore',
                date: getFutureDate(18),
                time: '20:30',
                price: 79,
                totalSeats: 200,
                availableSeats: 200,
                image: 'https://images.unsplash.com/photo-1527224857830-43a9eb5e7add?w=1200&h=675&fit=crop',
                organizer: 'Comedy Entertainment',
                status: 'upcoming',
                featured: false,
                tags: ['comedy', 'stand-up', 'entertainment']
            },
            {
                title: 'Shakespeare Festival - Hamlet',
                description: 'Classic Shakespearean drama performed by a renowned theater company. Experience timeless storytelling.',
                category: 'theater',
                venue: 'Open Air Theatre',
                city: 'Delhi',
                date: getFutureDate(33),
                time: '18:30',
                price: 149,
                totalSeats: 300,
                availableSeats: 300,
                image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1200&h=675&fit=crop',
                organizer: 'Theater Arts Society',
                status: 'upcoming',
                featured: false,
                tags: ['theater', 'shakespeare', 'drama', 'classic']
            },
            {
                title: 'Magic Show Extravaganza',
                description: 'Mind-blowing illusions and magic tricks by world-famous magicians. A show for all ages!',
                category: 'theater',
                venue: 'Entertainment Arena',
                city: 'Pune',
                date: getFutureDate(26),
                time: '19:30',
                price: 99,
                totalSeats: 500,
                availableSeats: 500,
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop',
                organizer: 'Magic Entertainment',
                status: 'upcoming',
                featured: false,
                tags: ['magic', 'illusion', 'family', 'entertainment']
            },

            // === WORKSHOPS (4 events) ===
            {
                title: 'Full Stack Web Development Bootcamp',
                description: 'Intensive 2-day coding bootcamp. Learn React, Node.js, MongoDB, and build real-world projects.',
                category: 'workshop',
                venue: 'Tech Training Center',
                city: 'Bangalore',
                date: getFutureDate(21),
                time: '10:00',
                price: 399,
                totalSeats: 100,
                availableSeats: 100,
                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=675&fit=crop',
                organizer: 'Code Academy',
                status: 'upcoming',
                featured: true,
                tags: ['coding', 'web-development', 'bootcamp', 'tech']
            },
            {
                title: 'Photography Masterclass',
                description: 'Learn professional photography techniques from award-winning photographers. Hands-on workshop with real shoots.',
                category: 'workshop',
                venue: 'Photography Studio',
                city: 'Mumbai',
                date: getFutureDate(24),
                time: '11:00',
                price: 199,
                totalSeats: 50,
                availableSeats: 50,
                image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=675&fit=crop',
                organizer: 'Photography Institute',
                status: 'upcoming',
                featured: false,
                tags: ['photography', 'workshop', 'creative']
            },
            {
                title: 'Digital Art & Design Workshop',
                description: 'Master digital illustration, UI/UX design, and graphic design tools. Portfolio-building workshop.',
                category: 'workshop',
                venue: 'Design Studio',
                city: 'Pune',
                date: getFutureDate(32),
                time: '10:30',
                price: 249,
                totalSeats: 75,
                availableSeats: 75,
                image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&h=675&fit=crop',
                organizer: 'Design School',
                status: 'upcoming',
                featured: false,
                tags: ['design', 'digital-art', 'creative']
            },
            {
                title: 'Public Speaking & Communication Skills',
                description: 'Overcome stage fright and become a confident speaker. Practical exercises and personalized feedback.',
                category: 'workshop',
                venue: 'Training Academy',
                city: 'Delhi',
                date: getFutureDate(29),
                time: '09:00',
                price: 179,
                totalSeats: 60,
                availableSeats: 60,
                image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=675&fit=crop',
                organizer: 'Speaking Excellence',
                status: 'upcoming',
                featured: false,
                tags: ['communication', 'public-speaking', 'soft-skills']
            },

            // === FESTIVALS (4 events) ===
            {
                title: 'Holi Color Festival 2025',
                description: 'Celebrate the festival of colors with music, dance, and traditional festivities. Family-friendly event!',
                category: 'festival',
                venue: 'City Gardens',
                city: 'Jaipur',
                date: getFutureDate(48),
                time: '10:00',
                price: 49,
                totalSeats: 2000,
                availableSeats: 2000,
                image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&h=675&fit=crop',
                organizer: 'Cultural Events',
                status: 'upcoming',
                featured: true,
                tags: ['holi', 'festival', 'cultural', 'family']
            },
            {
                title: 'Food & Wine Festival',
                description: 'Savor cuisines from around the world paired with fine wines. Cooking demos, tastings, and culinary delights.',
                category: 'festival',
                venue: 'Exhibition Grounds',
                city: 'Goa',
                date: getFutureDate(52),
                time: '12:00',
                price: 129,
                totalSeats: 1500,
                availableSeats: 1500,
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=675&fit=crop',
                organizer: 'Culinary Events',
                status: 'upcoming',
                featured: false,
                tags: ['food', 'wine', 'festival', 'culinary']
            },
            {
                title: 'Diwali Celebration & Light Show',
                description: 'Grand Diwali celebration with spectacular light shows, fireworks, and traditional performances.',
                category: 'festival',
                venue: 'City Square',
                city: 'Ahmedabad',
                date: getFutureDate(70),
                time: '18:00',
                price: 0,
                totalSeats: 3000,
                availableSeats: 3000,
                image: 'https://images.unsplash.com/photo-1605811133197-4a6a0071e1e4?w=1200&h=675&fit=crop',
                organizer: 'City Administration',
                status: 'upcoming',
                featured: false,
                tags: ['diwali', 'festival', 'cultural', 'free']
            },
            {
                title: 'Carnival Street Parade',
                description: 'Vibrant carnival with floats, street performers, music, and dance. A celebration of joy and creativity!',
                category: 'festival',
                venue: 'Main Street',
                city: 'Mumbai',
                date: getFutureDate(44),
                time: '16:00',
                price: 29,
                totalSeats: 2500,
                availableSeats: 2500,
                image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=675&fit=crop',
                organizer: 'Carnival Committee',
                status: 'upcoming',
                featured: false,
                tags: ['carnival', 'parade', 'festival', 'street']
            },

            // === TECH MEETUPS (3 events) ===
            {
                title: 'React Developers Meetup',
                description: 'Monthly meetup for React developers. Share knowledge, network, and learn the latest in React ecosystem.',
                category: 'tech-meetup',
                venue: 'Tech Hub',
                city: 'Bangalore',
                date: getFutureDate(12),
                time: '18:30',
                price: 0,
                totalSeats: 150,
                availableSeats: 150,
                image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=675&fit=crop',
                organizer: 'React Community',
                status: 'upcoming',
                featured: false,
                tags: ['react', 'javascript', 'meetup', 'tech', 'free']
            },
            {
                title: 'Data Science & ML Community Meetup',
                description: 'Connect with data scientists and ML engineers. Lightning talks, project showcases, and networking.',
                category: 'tech-meetup',
                venue: 'Innovation Center',
                city: 'Hyderabad',
                date: getFutureDate(17),
                time: '19:00',
                price: 0,
                totalSeats: 200,
                availableSeats: 200,
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop',
                organizer: 'Data Science Community',
                status: 'upcoming',
                featured: false,
                tags: ['data-science', 'machine-learning', 'meetup', 'free']
            },
            {
                title: 'Blockchain & Web3 Developers Forum',
                description: 'Explore blockchain technology, smart contracts, and Web3 development. Expert talks and demos.',
                category: 'tech-meetup',
                venue: 'Startup Hub',
                city: 'Mumbai',
                date: getFutureDate(23),
                time: '18:00',
                price: 0,
                totalSeats: 100,
                availableSeats: 100,
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=675&fit=crop',
                organizer: 'Blockchain Developers',
                status: 'upcoming',
                featured: false,
                tags: ['blockchain', 'web3', 'crypto', 'tech', 'free']
            },

            // === CULTURAL EVENTS (4 events) ===
            {
                title: 'International Film Festival',
                description: 'Week-long celebration of cinema from around the world. Premieres, documentaries, and award-winning films.',
                category: 'cultural',
                venue: 'Cinema Complex',
                city: 'Mumbai',
                date: getFutureDate(58),
                time: '14:00',
                price: 199,
                totalSeats: 800,
                availableSeats: 800,
                image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=675&fit=crop',
                organizer: 'Film Society',
                status: 'upcoming',
                featured: true,
                tags: ['film', 'cinema', 'festival', 'cultural']
            },
            {
                title: 'Classical Dance Performance',
                description: 'Mesmerizing Bharatanatyam and Kathak performances by renowned dancers. Experience Indian classical arts.',
                category: 'cultural',
                venue: 'Cultural Center',
                city: 'Chennai',
                date: getFutureDate(36),
                time: '18:00',
                price: 99,
                totalSeats: 300,
                availableSeats: 300,
                image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=1200&h=675&fit=crop',
                organizer: 'Dance Academy',
                status: 'upcoming',
                featured: false,
                tags: ['dance', 'classical', 'cultural', 'indian']
            },
            {
                title: 'Poetry & Literature Festival',
                description: 'Celebrate the written word with acclaimed poets and authors. Readings, discussions, and book launches.',
                category: 'cultural',
                venue: 'Literary Complex',
                city: 'Kolkata',
                date: getFutureDate(41),
                time: '16:00',
                price: 79,
                totalSeats: 250,
                availableSeats: 250,
                image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=675&fit=crop',
                organizer: 'Literature Society',
                status: 'upcoming',
                featured: false,
                tags: ['poetry', 'literature', 'books', 'cultural']
            },
            {
                title: 'Contemporary Art Exhibition',
                description: 'Featuring works from emerging and established contemporary artists. Paintings, sculptures, and installations.',
                category: 'cultural',
                venue: 'Art Gallery',
                city: 'Delhi',
                date: getFutureDate(27),
                time: '11:00',
                price: 49,
                totalSeats: 400,
                availableSeats: 400,
                image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=675&fit=crop',
                organizer: 'Art Foundation',
                status: 'upcoming',
                featured: false,
                tags: ['art', 'exhibition', 'contemporary', 'gallery']
            }
        ];

        const createdEvents = await Event.insertMany(events);
        console.log(`${createdEvents.length} events created successfully!`);

        console.log('\n✅ Database seeded successfully!');
        console.log('\n=================================');
        console.log('ADMIN CREDENTIALS:');
        console.log('=================================');
        console.log('Email:', admin.email);
        console.log('Password:', process.env.ADMIN_PASSWORD || 'Admin@123');
        console.log('\n=================================');
        console.log('SAMPLE USER CREDENTIALS:');
        console.log('=================================');
        console.log('Email:', sampleUser.email);
        console.log('Password: User@123');
        console.log('\n=================================');
        console.log('EVENT STATISTICS:');
        console.log('=================================');
        console.log('Total Events:', createdEvents.length);
        console.log('Featured Events:', createdEvents.filter(e => e.featured).length);
        console.log('\nCategories:');
        const categories = {};
        createdEvents.forEach(e => {
            categories[e.category] = (categories[e.category] || 0) + 1;
        });
        Object.entries(categories).forEach(([cat, count]) => {
            console.log(`  ${cat}: ${count} events`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
