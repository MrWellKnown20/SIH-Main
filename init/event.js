const event = require('../model/event')

event.insertMany([
    {
        title: 'hackCBS 7.0',
        date: '12/11/2024',
        time: '09:00 ',
        location: 'Shaheed Sukhdev College of Business Studies, Delhi',
        description: 'India largest student-run hackathon, bringing together coders and tech enthusiasts.',
        image: 'https://hackcbs.tech/assets/img/glimpses/24.jpg',
        organizer: 'Shaheed Sukhdev College of Business Studies',
        EventType: 'Hackthon',
        ContactEmail: 'connect@hackcbs.tech',
        Website: 'https://hackcbs.tech',
        Status: 'Upcoming'
    },
    {
        title: 'Hack Web3Conf India 2024',
        date: '22/6/2025',
        time: '11:00 ',
        location: 'Goa',
        description: 'Focused on Web3 technologies, with tracks in gaming, finance, and more.',
        image:'https://cdn.dorahacks.io/static/files/190f3d7ddfffc804d59ccd74a5c91953.png',
        organizer: 'GirlScript Foundation',
        EventType: 'Hackthon(Offline)',
        ContactEmail: 'hi@dorahacks.com',
        Website: 'https://dorahacks.io/hackathon/hack-web3conf-24/detail',
        Status: "Upcoming"

    },
    {
        title: 'Edufabrica Technical Workshop Series with IIT Bhubaneswar',
        date: '15/3/2025',
        time: '02:00 ',
        location: 'IIT Bhubaneswar',
        description: 'A two-day offline technical workshop series covering topics related to biological and astrophysical sciences.',
        image:'https://media.licdn.com/dms/image/D4D22AQEJvRUoi0RU0Q/feedshare-shrink_800/0/1693339920824?e=2147483647&v=beta&t=rM0Cgf0Vip4mHL9_FeVwnsfJkZhcHt4KD83rGfTxl7A',
        organizer: "Edufabrica, in collaboration with IIT Bhubaneswar (Alma Fiesta 2024)",
        EventType: "Workshop",
        ContactEmail: "info@edufabrica.net",
        Website: "https://www.edufabrica.net/contact",
        Status: "Upcoming"
    },
    {
        title: 'InOut 9.0 Hackathon',
        date: '4/3/2024',
        time: '03:00 ',
        location: 'Bangalore',
        description: ' India biggest community-driven hackathon, offering a platform for developers to solve real-world problems.',
        image:'https://assets.devfolio.co/hackathons/bfedfa89e30645b68a7145c312d3da12/assets/cover/239.png',
        organizer: "InOut Community",
        EventType: "Hackthon",
        ContactEmail: "sponsor@hackinout.co",
        Website: "https://hackinout.co",
        Status: "Upcoming"
    },
    {
        title: 'HackWithIndia 2025',
        date: '19/5/2025',
        time: '08:00 ',
        location: 'Chandigarh ',
        description: 'It set to be one of the largest hackathons in the country,encouraging collaboration and creativity across diverse domains.',
        image:'https://assets.devfolio.co/hackathons/8d85450c83fb403ba03aa77aa0370fa0/assets/cover/991.png',
        organizer: "Chandigarh University",
       EventType: "Hackathon",
       ContactEmail: "harshitostwal1234@gmail.com",
       Website: "https://hackwithindia.live",
       Status: "Upcoming"
      }
])