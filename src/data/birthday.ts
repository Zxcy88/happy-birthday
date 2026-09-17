/**
 * Central content file for the birthday experience.
 * Replace placeholders. Empty strings and [BRACKET] tokens never render.
 */

import { letterBody } from "@/data/letter";

export type UnlockMilestone = {
  at: number;
  text: string;
};

export type PhotoItem = {
  src: string;
  alt: string;
  caption: string;
  eraLabel: string;
};

export type QualityItem = {
  n: string;
  text: string;
};

export type VideoItem = {
  src: string;
  poster: string;
  caption: string;
  /** Tall phone-shaped recording rather than a 16:9 one. */
  portrait?: boolean;
  /** Source-time ranges played as one continuous montage. */
  segments?: VideoSegment[];
};

export type VideoSegment = {
  start: number;
  end: number;
};

export type Soundtrack = {
  src: string;
  /** Where the music should begin, in seconds. 27 = 00:27. */
  startAtSec: number;
  label: string;
};

export type BirthdayContent = {
  herName: string;
  herAge: string;
  myName: string;
  weddingDate: string;
  weddingDateDisplay: string;
  gate: {
    enabled: boolean;
    passphrase: string;
    prompt: string;
    hint: string;
  };
  unlock: {
    tapsRequired: number;
    kicker: string;
    title: string;
    action: string;
    milestones: UnlockMilestone[];
    completeLine: string;
  };
  dedication: {
    lineOne: string;
    lineTwo: string;
    audience: string;
  };
  origin: {
    kicker: string;
    title: string;
    intro: string[];
    photos: PhotoItem[];
  };
  becoming: {
    kicker: string;
    thesis: string;
    thenLabel: string;
    nowLabel: string;
    thenPhoto: PhotoItem;
    nowGallery: PhotoItem[];
  };
  recognition: {
    kicker: string;
    title: string;
    qualities: QualityItem[];
  };
  presence: {
    kicker: string;
    title: string;
    body: string;
    videos: VideoItem[];
    /** The recordings are silent, so this plays under them. */
    soundtrack: Soundtrack | null;
  };
  horizon: {
    kicker: string;
    lines: string[];
  };
  letter: {
    kicker: string;
    title: string;
    body: string;
  };
  voice: {
    kicker: string;
    title: string;
    body: string;
    video: VideoItem;
  };
  finale: {
    status: string;
    lines: string[];
    signOff: string;
  };
  easter: {
    /** Revealed by the small mark in the corner. */
    note: string;
    /** Revealed on the closing chapter by a hidden key sequence. */
    hidden: string;
  };
  audio: {
    src: string;
    label: string;
  };
};

export const birthdayContent: BirthdayContent = {
  herName: "Preety Priti",
  herAge: "",
  myName: "",
  weddingDate: "2026-11-25",
  weddingDateDisplay: "25.11.2026",
  gate: {
    enabled: true,
    passphrase: "25.11.2026",
    prompt: "A word only you would know.",
    hint: "Leave gate.enabled false until you set a passphrase in birthday.ts.",
  },
  unlock: {
    tapsRequired: 25,
    kicker: "Something was made for you, quietly.",
    title: "It isn't ready until you open it.",
    action: "Tap to unlock",
    milestones: [],
    completeLine: "Looks like someone turned 25 quickly 😉",
  },
  dedication: {
    lineOne: "Built madly, for one person.",
    lineTwo: "Everything past this point was made for you.",
    audience: "There is no one else it could belong to.",
  },
  origin: {
    kicker: "Before everything else",
    title: "There was this little girl.",
    intro: [
      "Before the career.",
      "Before adulthood.",
      "Before all the things you are today.",
    ],
    // Ordered youngest to oldest so the chapter moves forward in time.
    photos: [
      {
        src: "/media/childhood/childhood-01.jpeg",
        alt: "A baby photograph, seated against a patterned bedspread",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/childhood/childhood-02.jpeg",
        alt: "A baby photograph, holding a small toy",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/childhood/childhood-03.jpeg",
        alt: "A toddler photograph on a cool stone floor",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/childhood/childhood-04.jpeg",
        alt: "A toddler photograph outdoors in a red top",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/childhood/childhood-05.jpeg",
        alt: "A young child photograph, holding fruit in a courtyard",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/childhood/childhood-06.jpeg",
        alt: "A young child photograph, standing in a sunlit courtyard",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/childhood/childhood-07.jpeg",
        alt: "A childhood photograph on stage at a school function",
        caption: "",
        eraLabel: "",
      },
    ],
  },
  becoming: {
    kicker: "Then / now",
    thesis: "Some things change. Some things become more unmistakably you.",
    thenLabel: "Then",
    nowLabel: "Now",
    thenPhoto: {
      src: "/media/childhood/childhood-04.jpeg",
      alt: "A toddler photograph outdoors in a red top",
      caption: "",
      eraLabel: "",
    },
    nowGallery: [
      {
        src: "/media/present/present-01.jpeg",
        alt: "A recent photograph in a blue and black sari",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/present/present-02.jpeg",
        alt: "A recent photograph on a balcony, green fields behind",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/present/present-03.jpeg",
        alt: "A recent photograph in a blue traditional dance costume",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/present/present-04.jpeg",
        alt: "A recent photograph in an orange and teal outfit",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/present/present-05.jpeg",
        alt: "A recent photograph, smiling in sunlight",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/present/present-06.jpeg",
        alt: "A recent photograph, smiling with eyes closed",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/present/present-07.jpeg",
        alt: "A recent candid photograph",
        caption: "",
        eraLabel: "",
      },
      {
        src: "/media/present/present-08.jpeg",
        alt: "A recent candid photograph, outdoors in the sun",
        caption: "",
        eraLabel: "",
      },
    ],
  },
  recognition: {
    kicker: "A private message for my wifeyyy!!!",
    title: "Things I hope you never underestimate about yourself",
    qualities: [
      { n: "01", text: "Incase you ever forget, you do make me happy, and I appreciate having you in my life." },
      { n: "02", text: "You're such a nice person, I could say 'I love you' 100 times a day and it would never be enough." },
      { n: "03", text: "Your presence in everyone's life is a gift, and I'm so grateful to have you in mine." },
      { n: "04", text: "I'm so proud of you for how you've grown, and I'm so proud of you for how you've handled everything life has thrown at you." },
    ],
  },
  presence: {
    kicker: "Unrehearsed",
    title: "Some moments don't need a camera crew.",
    body: "They just happen. A window. A laugh. A Saturday that didn't know it would be kept.",
    videos: [
      {
        src: "/media/video-calls/video-call-01.mp4",
        poster: "/media/video-calls/video-call-01.jpg",
        caption: "",
        portrait: true,
        segments: [
          { start: 3, end: 12 },
          { start: 21, end: 30 },
          { start: 34, end: 39 },
          { start: 52, end: 57 },
          { start: 172, end: 180 },
          { start: 225, end: 235 },
          { start: 252, end: 259 },
          { start: 326, end: 332 },
          { start: 341, end: 354 },
          { start: 394, end: 400 },
          { start: 422, end: 432 },
          { start: 470, end: 482 },
          { start: 506, end: 510 },
          { start: 522, end: 564 },
          { start: 580, end: 610 },
          { start: 618, end: 628 },
        ],
      },
      // Add the second clip here when you've picked it.
    ],
    soundtrack: {
      src: "/audio/soundtrack.m4a",
      startAtSec: 27,
      label: "Udaarian — Satinder Sartaaj",
    },
  },
  horizon: {
    kicker: "Next chapter",
    lines: [
      "This year isn't only a birthday.",
      "There's already something waiting on the other side of it.",
    ],
  },
  letter: {
    kicker: "A letter",
    title: "There are some things a page like this could never say for me.",
    // The letter itself lives in letter.ts, where quotes need no escaping.
    body: letterBody,
  },
  voice: {
    kicker: "One last thing",
    title: "Everything else, I'd rather say out loud.",
    body: "There's a recording waiting, when you're ready to hear it.",
    video: {
      src: "/media/final/final-message.mp4",
      poster: "/media/final/final-message.jpg",
      caption: "A video message, recorded for her birthday",
    },
  },
  finale: {
    status: "Once again",
    lines: ["Another year.", "Another chapter."],
    signOff: "Happy birthday",
  },
  easter: {
    note: "You found the quiet corner. There's nothing hidden here except this: I would do all of it again.",
    hidden: "25.11.2026 — not a countdown. Just a day I'm walking towards.",
  },
  audio: {
    src: "",
    label: "Soundtrack",
  },
};

const TOKEN = /^\[[A-Z0-9_]+\]$/;

export function isUnset(value: string | undefined): boolean {
  if (!value) return true;
  const v = value.trim();
  return v.length === 0 || TOKEN.test(v);
}

export function displayName(content: BirthdayContent = birthdayContent): string {
  return isUnset(content.herName) ? "you" : content.herName.trim();
}

export function authorName(content: BirthdayContent = birthdayContent): string {
  return isUnset(content.myName) ? "" : content.myName.trim();
}

export function displayAge(content: BirthdayContent = birthdayContent): string {
  return isUnset(content.herAge) ? "" : content.herAge.trim();
}
