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
    date: "Apr 2026",
    title: "Joining Sanctuary AI as ML Engineer Intern",
    description: "I will be joining Sanctuary AI from July 2026 to January 2027 as a Machine Learning Engineer Intern, working on their Phoenix humanoid robot!",
    link: "https://sanctuary.ai",
    imageUrl: "/images/dex_hand.png",
  },
  {
    date: "Nov 2025",
    title: "Mini-Pi-Plus with MimicKit",
    description: "I created a demo of Mini-Pi-Plus using Xue Bin's new codebase MimicKit. Check out the link for more details! Mini-Pi-Plus on the right.", 
    link: "https://github.com/xbpeng/MimicKit/blob/main/data/envs/deepmimic_pi_plus_env.yaml",
    imageUrl: "/images/mini-hi.png",
  }
];
