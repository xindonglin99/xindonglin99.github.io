export interface Publication {
  year: string;
  conference: string;
  title: string;
  authors: string;
  paperUrl?: string;
  codeUrl?: string;
  bibtex?: string;
  tldr?: string;
  imageUrl?: string;
  award?: string;
}

export const publicationData: Publication[] = [
  // If you don't want to show publications, just make the array empty.
  {
    year: "2024",
    conference: "SIGGRAPH Asia",
    title: "Measuring Human Motion Under Clothing",
    authors: "Luis Bolanos, Pearson Wyder-Hodge, <strong>Xindong Lin</strong>, Dinesh K Pai",
    paperUrl: "https://dl.acm.org/doi/10.1145/3680528.3687702",
    // codeUrl: "https://github.com/jsmith/scalable-causal-discovery",
    //bibtex: "https://arxiv.org/abs/2409.15476.bib",
    tldr: "This paper proposes a system, EMob, for accurately estimating body motion under clothing with EM and optical sensors.",
    imageUrl:
      "/images/mocap_pub.png",
    // award: "🏆 Best Paper Award",
    // if you have an image in public/images, you can use it like this:
    // imageUrl: "/images/publication-image.jpg"
  }
];
