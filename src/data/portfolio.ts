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
    title: "Capability-Aware Planning on Bouldering Problems",
    description:
      "This project aims to solve hard climbing wall problems with trajectories fitting both the capability of the pretrained policy and hold patterns. More updates incoming!",
    technologies: ["RL", "IsaacLab", "Planning"],
    // projectUrl: "https://project-demo.com",
    imageUrl:
      "/images/climbing.gif",
    // codeUrl: "https://github.com/username/project",
  },

  {
    title: "GPU-accelerated Humanoid Stepping",
    description:
      "This project reimplements the ALLSTEPS paper in IsaacLab. Huge speed boost compare to PyBullet.",
    technologies: ["IsaacLab", "RL"],
    // projectUrl: "https://project-demo.com",
    imageUrl:
      "/images/allsteps.gif",
    codeUrl: "https://github.com/xindonglin99/allsteps-isaaclab",
  },

  {
    title: "Robot2robot: Enhance imitation trajectory transfer with reinforcement learning",
    description:
      "This project uses RL to adapt open loop imitation trajectories from a source robot to a target robot with different DOFs.",
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
