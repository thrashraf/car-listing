export class GetCarsDto {
  name?: string;
  model?: string;
  startDate: string;
  endDate: string;
  minPrice?: number;
  maxPrice?: number;
}

export class BookingCarDto {
  carId: string;
  startDate: string;
  endDate: string;
  userId: string;
}
