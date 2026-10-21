export type Reel = {
  id: string;
  video: string;
  poster?: string;
  instagramUrl: string;
  caption: string;
};

const SAMPLE =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

// Placeholder clips (public Google test bucket). Swap with real reel .mp4s later.
export const reels: Reel[] = [
  {
    id: "r1",
    video: `${SAMPLE}/BigBuckBunny.mp4`,
    instagramUrl: "https://www.instagram.com/azam.magic/",
    caption: "Brand activation · Dubai",
  },
  {
    id: "r2",
    video: `${SAMPLE}/ElephantsDream.mp4`,
    instagramUrl: "https://www.instagram.com/azam.magic/",
    caption: "GITEX Global stage",
  },
  {
    id: "r3",
    video: `${SAMPLE}/ForBiggerBlazes.mp4`,
    instagramUrl: "https://www.instagram.com/azam.magic/",
    caption: "VIP close-up",
  },
  {
    id: "r4",
    video: `${SAMPLE}/ForBiggerEscapes.mp4`,
    instagramUrl: "https://www.instagram.com/azam.magic/",
    caption: "Palazzo Versace gala",
  },
  {
    id: "r5",
    video: `${SAMPLE}/ForBiggerFun.mp4`,
    instagramUrl: "https://www.instagram.com/azam.magic/",
    caption: "Dubai Police event",
  },
  {
    id: "r6",
    video: `${SAMPLE}/ForBiggerJoyrides.mp4`,
    instagramUrl: "https://www.instagram.com/azam.magic/",
    caption: "Mentalism moment",
  },
  {
    id: "r7",
    video: `${SAMPLE}/Sintel.mp4`,
    instagramUrl: "https://www.instagram.com/azam.magic/",
    caption: "Audience reaction",
  },
  {
    id: "r8",
    video: `${SAMPLE}/TearsOfSteel.mp4`,
    instagramUrl: "https://www.instagram.com/azam.magic/",
    caption: "Corporate night",
  },
];
