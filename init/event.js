const event = require('./models/event')

event.insertMany([
    {
        title: 'hackCBS 7.0',
        date: ' November 9-10, 2024',
        time: '09:00 AM',
        location: 'Shaheed Sukhdev College of Business Studies, Delhi',
        description: 'India largest student-run hackathon, bringing together coders and tech enthusiasts.',
        image: 'https://hackcbs.tech/assets/img/glimpses/24.jpg',
        organizer: 'Shaheed Sukhdev College of Business Studies',
        eventType: 'Hackthon',
        contactEmail: 'connect@hackcbs.tech',
        website: 'https://hackcbs.tech',
        Status: 'Upcoming'
    },
    {
        title: 'Hack Web3Conf India 2024',
        date: 'December 6-7, 2024',
        time: '11:00 AM',
        location: 'Goa',
        description: 'Focused on Web3 technologies, with tracks in gaming, finance, and more.',
        image:'https://cdn.dorahacks.io/static/files/190f3d7ddfffc804d59ccd74a5c91953.png',
        organizer: 'GirlScript Foundation',
        eventType: 'Hackthon(Offline)',
        contactEmail: 'hi@dorahacks.com',
        website: 'https://dorahacks.io/hackathon/hack-web3conf-24/detail',
        status: "Upcoming"

    },
    {
        title: 'Edufabrica Technical Workshop Series with IIT Bhubaneswar',
        date: 'January 2025',
        time: '02:00 PM',
        location: 'IIT Bhubaneswar',
        description: 'A two-day offline technical workshop series covering topics related to biological and astrophysical sciences.',
        image:'https://media.licdn.com/dms/image/D4D22AQEJvRUoi0RU0Q/feedshare-shrink_800/0/1693339920824?e=2147483647&v=beta&t=rM0Cgf0Vip4mHL9_FeVwnsfJkZhcHt4KD83rGfTxl7A',
        organizer: "Edufabrica, in collaboration with IIT Bhubaneswar (Alma Fiesta 2024)",
        eventType: "Workshop",
        contactEmail: "info@edufabrica.net",
        website: "https://www.edufabrica.net/contact",
        status: "Upcoming"
    },
    {
        title: 'InOut 9.0 Hackathon',
        date: 'October 2024',
        time: '03:00 PM',
        location: 'Bangalore',
        description: ' India biggest community-driven hackathon, offering a platform for developers to solve real-world problems.',
        image:'https://assets.devfolio.co/hackathons/bfedfa89e30645b68a7145c312d3da12/assets/cover/239.png',
        organizer: "InOut Community",
        eventType: "Hackthon",
        contactEmail: "sponsor@hackinout.co",
        website: "https://hackinout.co",
        status: "Upcoming"
    },
    {
        title: 'HackWithIndia 2025',
        date: 'March 2025',
        time: '08:00 AM',
        location: 'Chandigarh ',
        description: 'It set to be one of the largest hackathons in the country,encouraging collaboration and creativity across diverse domains.',
        image:'https://assets.devfolio.co/hackathons/8d85450c83fb403ba03aa77aa0370fa0/assets/cover/991.png',
        organizer: "Chandigarh University",
       eventType: "Hackathon",
       contactEmail: "harshitostwal1234@gmail.com",
       website: "https://hackwithindia.live",
       status: "Upcoming"
      }
])