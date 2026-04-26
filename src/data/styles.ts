export interface YogaStyle {
  id: string;
  name: string;
  color: string;
  description: string;
}

export const styles: YogaStyle[] = [
  {
    id: "hatha-vinyasa",
    name: "Hatha Vinyasa",
    color: "#C9B99A",
    description:
      "Flowing sequences linking breath to movement. Build strength, flexibility, and focus through dynamic transitions.",
  },
  {
    id: "yin",
    name: "Yin",
    color: "#A8B5A0",
    description:
      "Long-held passive postures targeting deep connective tissue. Cultivate stillness and release chronic tension.",
  },
  {
    id: "mudra",
    name: "Mudra",
    color: "#D4A98C",
    description:
      "Hand gestures and body seals that channel energy flow. Subtle practices with profound energetic effects.",
  },
  {
    id: "chair",
    name: "Chair",
    color: "#B8A9C4",
    description:
      "Accessible yoga using a chair for support. Ideal for office breaks, limited mobility, or gentle recovery.",
  },
  {
    id: "pranayama",
    name: "Pranayama",
    color: "#9BB5C9",
    description:
      "Breathwork techniques for energy regulation. Calm the nervous system or build internal heat through breath.",
  },
  {
    id: "restorative",
    name: "Restorative",
    color: "#C4B8A8",
    description:
      "Fully supported postures held for extended periods. Deep relaxation and nervous system reset.",
  },
  {
    id: "kundalini",
    name: "Kundalini",
    color: "#D1A8A8",
    description:
      "Dynamic kriyas combining movement, breath, and mantra. Awaken dormant energy through repetitive sequences.",
  },
];
