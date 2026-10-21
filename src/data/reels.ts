export type Reel = {
  id: string;
  video: string;
  poster?: string;
  instagramUrl: string;
  caption: string;
};

// Compressed locally in /public/reels/ — H.264 CRF 28, 640px tall, AAC 96k audio.
// Instagram URLs point to Azam's profile for now; swap to each specific reel URL whenever you have them.
const AZAM = "https://www.instagram.com/azam.magic/";

// Row 1 — first WhatsApp batch (8 reels)
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

// Row 2 — second WhatsApp batch (11 reels)
export const reelsRowTwo: Reel[] = [
  { id: "r2-1", video: "/reels/row2-1.mp4", instagramUrl: AZAM, caption: "Dubai activation" },
  { id: "r2-2", video: "/reels/row2-2.mp4", instagramUrl: AZAM, caption: "Private VIP room" },
  { id: "r2-3", video: "/reels/row2-3.mp4", instagramUrl: AZAM, caption: "Hospitality gala" },
  { id: "r2-4", video: "/reels/row2-4.mp4", instagramUrl: AZAM, caption: "Mind reading act" },
  { id: "r2-5", video: "/reels/row2-5.mp4", instagramUrl: AZAM, caption: "Table magic" },
  { id: "r2-6", video: "/reels/row2-6.mp4", instagramUrl: AZAM, caption: "Theatrical set" },
  { id: "r2-7", video: "/reels/row2-7.mp4", instagramUrl: AZAM, caption: "Brand reveal" },
  { id: "r2-8", video: "/reels/row2-8.mp4", instagramUrl: AZAM, caption: "Guest surprise" },
  { id: "r2-9", video: "/reels/row2-9.mp4", instagramUrl: AZAM, caption: "Behind the scenes" },
  { id: "r2-10", video: "/reels/row2-10.mp4", instagramUrl: AZAM, caption: "Headline moment" },
  { id: "r2-11", video: "/reels/row2-11.mp4", instagramUrl: AZAM, caption: "Signature finale" },
];

// Legacy export kept for backward compatibility
export const reels = reelsRowOne;
