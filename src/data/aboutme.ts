export interface AboutMe {
  name: string;
  title: string;
  institution: string;
  description: string;
  email: string;
  imageUrl?: string;
  blogUrl?: string;
  cvUrl?: string;
  googleScholarUrl?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string; // Gets placed in the left sidebar
  secretDescription?: string; // Gets placed in the bottom
  altName?: string;
  institutionUrl?: string;
}

export const aboutMe: AboutMe = {
  name: "Xindong Lin",
  altName: "林新东",
  title: "Graduate Student",
  institution: "University of British Columbia",
  // Note that links work in the description
  description:
    "Hi, I'm in the final year of my MSc in Computer Science at UBC, where I work with Professor <a href='https://www.cs.ubc.ca/~van/'>Michiel van de Panne</a> on physics-based character animation and robotics. My research focus is on planning and control for the skilled movement of physics-based humanoid characters, building on deep reinforcement learning methods. I'm also broadly interested in embodied AI and computer graphics. My ultimate goal is to create universal intelligent agents that can replace humans for dangerous tasks (or agents which surpass human capabilities&#128520;). Previously during my undergrad, I worked with Professor <a href='https://sensorimotor.cs.ubc.ca/pai/'>Dinesh K. Pai</a> on motion capture topics. <br> <br> Prior to the above, I worked in the industry as a software engineer, where I developed and maintained Web Apps with JavaScript and Python. During my leisure time, I'm active in a variety of sports and play competitive FPS games such as Valorant, CS:GO and Apex Legends. Fun fact: I'm an Immortal (<a href='https://tracker.gg/valorant/profile/riot/social%20phobia%23OvO/overview?platform=pc&playlist=competitive&season=ac12e9b3-47e6-9599-8fa1-0bb473e5efc7'>NA top 0.5%</a>) player in Valorant. <br> <br> <b><u>Update:</u></b> I am seeking PhD positions starting in Fall 2026 related to robotics, character animation, or embodied AI. If you are interested in my profile, please feel free to contact me via email. <br> <br> <u><b>More about me down below!</u></b> &#128516;",
  email: "xindong@cs.ubc.ca",
  // funDescription: "I am a competitive fps gamer.",
  imageUrl:
    "/images/profile.jpg",
  googleScholarUrl: "https://scholar.google.ca/citations?user=Dhfl1TEAAAAJ&hl=en",
  githubUsername: "xindonglin99",
  linkedinUsername: "xindonglin",
  twitterUsername: "linx1ndong",
  // blogUrl: "https://",
  // cvUrl: "/pdfs/cv.pdf",
  institutionUrl: "https://www.cs.ubc.ca/",
  // altName: "Character animation and robotics",
  secretDescription: "'Good artists copy; great artists steal.' - Pablo Picasso",
};
