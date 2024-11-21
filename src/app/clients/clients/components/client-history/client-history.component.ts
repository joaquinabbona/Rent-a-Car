
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { ClientHistoryService } from './client-history.service';
import { PaymentService } from '../../../../payment/payment/services/payment.service';
import { Rental } from '../../../../cars/models/rental';
import { Purchase } from '../../../../cars/models/purchase';

@Component({
  selector: 'app-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.css']
})
export class ClientHistoryComponent implements OnInit {
  rentals: any[] = [];
  purchases: any[] = [];
  errorMessage: string | null = null;
  

  constructor(
    private historyService: ClientHistoryService,
    private clientService: ClientService,
    private paymentService: PaymentService
  ) {}

 
  ngOnInit(): void {
    const clientId = this.clientService.getLoggedInClientId(); 

    if (clientId) {
     
      this.historyService.getRentalsByClient(clientId).subscribe({
        next: (rentals) => {
          this.rentals = rentals;
          this.loadCarNamesForRentals(rentals);
        },
        error: (err) => {
          console.error('Error fetching rentals:', err);
          this.errorMessage = 'Error cargando el historial de alquileres.';
        }
      });

      
      this.historyService.getPurchasesByClient(clientId).subscribe({
        next: (purchases) => {
          this.purchases = purchases;
          this.loadCarNamesForPurchases(purchases);
        },
        error: (err) => {
          console.error('Error fetching purchases:', err);
          this.errorMessage = 'Error cargando el historial de compras.';
        }
      });
    } else {
      this.errorMessage = 'No hay un usuario logueado.';
    }
  }

  loadCarNamesForRentals(rentals: any[]) {
    rentals.forEach((rental) => {
      this.historyService.getCarById(rental.carId).subscribe(car => {
        rental.carName = `${car.brand} ${car.model}`;
      });
    });
  }

 
  loadCarNamesForPurchases(purchases: any[]) {
    purchases.forEach((purchase) => {
      this.historyService.getCarById(purchase.carId).subscribe(car => {
        purchase.carName = `${car.brand} ${car.model}` 
      });
    });
  }



  isRental(item: any): item is Rental {
    return 'rentalStartDate' in item;
  }

  isPurchase(item: any): item is Purchase {
    return 'price' in item && !('rentalStartDate' in item);
  }

  cancelReservation(reservationId: number) {
    this.paymentService.cancelReservation(reservationId).subscribe({
      next: () => {
        // Mostrar un mensaje de éxito si se eliminó la reserva
        console.log('Reserva cancelada con éxito');
        // Opcional: actualizar la lista de reservas en el componente
         this.ngOnInit();
      },
      error: (error) => {
        // Mostrar un mensaje de error si no se puede cancelar la reserva
        console.error(error.message);
      }
    });
  }
}  

