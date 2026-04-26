export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "backbends", name: "Backbends" },
  { id: "inversions", name: "Inversions" },
  { id: "arm-balances", name: "Arm Balances" },
  { id: "seated", name: "Seated" },
  { id: "advanced", name: "Advanced" },
  { id: "slow-down", name: "Slow Down" },
];
