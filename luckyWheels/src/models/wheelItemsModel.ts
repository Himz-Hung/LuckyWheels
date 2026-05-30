export interface DataItem {
  id: string;
  name: string;
  quantity: number;
  probability: number;
  cooldownSpin: number;
  img?: string;
  wheelId?: string;
  isActive?: boolean;
}