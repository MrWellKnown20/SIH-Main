const job = require('./models/job')

job.insertMany([
    {
        title: 'Frontend Developer',
        company: 'Scode Software Solutions',
        location: 'Cuddalore, Tamil Nadu, India',
        description: 'We are looking for a skilled frontend developer to join our team.',
        requirements: ['HTML', 'CSS', 'JavaScript', 'React'],
        salary: 85000,
        jobType: 'Full-time',
        industry:'Technology',
        experienceLevel: 'Mid-level'
    },
    {
        title: 'Software Engineer Intern',
        company: 'Diggai Coder',
        location: 'India',
        description: 'Diggajcoder is looking for motivated and enthusiastic interns to join our team and gain hands-on experience in full-stack development.',
        requirements: ['HTML', 'CSS', 'Nodejs', 'Mongo DB','Data Structures'],
        salary: 95000,
        jobType: 'Full-time',
        industry:'Remote(30 days)',
        experienceLevel: 'Entry-level',
    },
     {
        title: 'Marketing Intern',
        company: 'Creative Agency',
        location: 'Remote',
        description: 'Looking for a passionate marketing intern to assist in campaigns.',
        requirements: ['Social Media Knowledge', 'Communication Skills'],
        salary: 20000,
        jobType: 'Part-time',
        industry:'Marketing',
        experienceLevel: 'Entry-level'
    },
   {
        title: 'Backend Developer',
        company: 'Tech Innovations',
        location: 'Austin, TX',
        description: 'Seeking a backend developer to work on scalable web applications.',
        requirements: ['Node.js', 'Express', 'MongoDB'],
        salary: 90000,
        jobType: 'Full-time',
        industry:'Technology',
        experienceLevel: 'Mid-level'
    },
    {
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        location: 'New York, NY',
        description: 'Design user interfaces and improve user experiences across web and mobile platforms.',
        requirements: ['Figma', 'Sketch', 'Adobe XD'],
        salary: 85000,
        jobType: 'Contract',
        industry: 'Design',
        experienceLevel: 'Mid-level'
    }
])