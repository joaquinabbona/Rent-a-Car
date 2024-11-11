export interface Rental {
    clientId: number;
    carId: number | null;
    rentalStartDate: Date | null;
    rentalEndDate: Date | null;
    price: number;
    originBranch: string;
    destinationBranch: string;
}
