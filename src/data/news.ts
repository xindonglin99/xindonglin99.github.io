export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

export const newsData: News[] = [
  // If you don't want to show news, just make the array empty.
  {
    date: "Jul 2025",
    title: "Upcoming colleboration at HighTorque Robotics",
    description: "I'll be working on a robot demo with the HighTorque Robotics team on their humanoid robots Mini-Pi/Mini-Hi during September. Here is a picture of the cute robot!", 
    link: "https://www.hightorquerobotics.com/",
    imageUrl: "/images/mini-hi.png",
  }
];
