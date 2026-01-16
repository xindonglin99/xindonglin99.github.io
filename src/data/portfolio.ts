export interface Portfolio {
  title: string;
  description: string;
  technologies?: string[];
  imageUrl?: string;
  projectUrl?: string;
  codeUrl?: string;
  paperUrl?: string[];
}

export const portfolioData: Portfolio[] = [
  // Example entry
  {
    title: "Learning to plan in bouldering (Ongoing)",
    description:
      "This project trys to learn a high-level planner that accounts for both the capability of the low-level controller and the hand hold pattern to solve hard bouldering problems. The picture is a toy example on a donut wall. More updates incoming!",
    technologies: ["RL", "IsaacLab", "Planning"],
    // projectUrl: "https://project-demo.com",
    imageUrl:
      "/images/climbing.gif",
    // codeUrl: "https://github.com/username/project",
  },

  {
    title: "GPU-accelerated Humanoid Stepping",
    description:
      "This project reimplements the ALLSTEPS paper in IsaacLab. It analyzes the performance of ALLSTEPS on different simulations and optimizes the reward function to improve the performance of the humanoid robot in simulation. More updates are coming soon.",
    technologies: ["IsaacLab", "RL"],
    // projectUrl: "https://project-demo.com",
    imageUrl:
      "/images/allsteps.gif",
    codeUrl: "https://github.com/xindonglin99/allsteps-isaaclab",
  },

  {
    title: "Robot2robot: Enhance imitation trajectory transfer with reinforcement learning",
    description:
      "This project uses RL to adapt open loop imitation trajectories from a source robot to a target robot with different degrees of freedom (DOF).",
    technologies: ["Python", "C++", "RaiSim", "RL"],
    paperUrl: ["Report","/pdfs/CPSC554X_Report.pdf"],
    imageUrl:
      "/images/robot2robot.gif",
    codeUrl: "https://github.com/nickioan/robot2robot",
  },

  {
    title: "Mesh-based geometry processing algorithms implementation",
    description:
      "Basic mesh-based geometry processing algorithms implemented in C++ and OpenGL.",
    technologies: ["C++", "OpenGL"],
    paperUrl: ["Report","/pdfs/CPSC_524_report.pdf"],
    imageUrl:
      "/images/max.jpg",
    codeUrl: "https://github.com/xindonglin99/Geometric-modeling-algos",
  },

  {
    title: "Local smoothness layer for implicit coordinate learning",
    description: "This project aims to reconstruct 1D/2D/3D signals using neural networks, with an adaptive focus (LS-Layer) on different levels of detail in different regions.",
    imageUrl: "/images/2d_comparison_tokyo.png",
    paperUrl: ["Report", "/pdfs/report.pdf"],
  },
];
