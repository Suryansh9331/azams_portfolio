export type Reel = {
  id: string;
  video: string;
  poster?: string;
  instagramUrl: string;
  caption: string;
};

// Compressed locally in /public/reels/ — ~1-2 MB each, no audio, 15s loop, 640px tall.
// Instagram URLs point to Azam's profile for now; swap to the specific reel URL whenever you have it.
const AZAM = "https://www.instagram.com/azam.magic/";

// Row 1 — current 8 reels from WhatsApp batch
export const reelsRowOne: Reel[] = [
  { id: "r1-1", video: "/reels/reel-1.mp4", instagramUrl: AZAM, caption: "Brand activation" },
  { id: "r1-2", video: "/reels/reel-2.mp4", instagramUrl: AZAM, caption: "Stage show moment" },
  { id: "r1-3", video: "/reels/reel-3.mp4", instagramUrl: AZAM, caption: "VIP close-up" },
  { id: "r1-4", video: "/reels/reel-4.mp4", instagramUrl: AZAM, caption: "Illusion reveal" },
  { id: "r1-5", video: "/reels/reel-5.mp4", instagramUrl: AZAM, caption: "Corporate night" },
  { id: "r1-6", video: "/reels/reel-6.mp4", instagramUrl: AZAM, caption: "Mentalism" },
  { id: "r1-7", video: "/reels/reel-7.mp4", instagramUrl: AZAM, caption: "Audience reaction" },
  { id: "r1-8", video: "/reels/reel-8.mp4", instagramUrl: AZAM, caption: "Live performance" },
];

// Row 2 — add new reels here. When this array is empty, row 2 is hidden automatically.
// Expected format after compression: /reels/row2-1.mp4, /reels/row2-2.mp4, ...
export const reelsRowTwo: Reel[] = [];

// Legacy export kept for backward compatibility (anything still importing `reels`)
export const reels = reelsRowOne;
