// dtos/luckyItem/createLuckyItemDto.ts

export interface CreateLuckyItemDto {
    id: string;
    wheelId: string;
    name: string;
    quantity: number;
    probability: number;
    cooldownSpin: number;
    img?: string;
    isActive?: boolean;
  }