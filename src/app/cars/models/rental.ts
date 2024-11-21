export interface Rental {
    clientId: number;
    carId: number | null;
    rentalStartDate: Date ;
    rentalEndDate: Date ;
    price: number;
    originBranch: string;
    destinationBranch: string;
}
