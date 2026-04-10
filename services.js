import { validateData, generateId, calculateNights } from "./utils.js";
import { hotel } from "./models.js";


function searchAvailableRooms (hotel, checkIn, checkOut, roomType) {
    const specificRoomTypes = hotel.rooms.filter(room => room.type === roomType);
    const availableRooms = [];
    
    for (const room of specificRoomTypes ) {
        if(!isOverlap (hotel, room.number, checkIn, checkOut)) {
            availableRooms.push(room);
        }
    }
    return availableRooms;
}


const availableRooms = searchAvailableRooms(hotel, '2026-01-27', '2026-01-29', 'single');
console.log(availableRooms); 


function creteReservation (hotel, roomNumber, guestData, checkIn, checkOut) {
    
    const specificRoom = hotel.rooms.find(room => roomNumber === room.number);
    const isValidData = validateData(guestData.email, guestData.dni, guestData.phone);
    const totalNights = calculateNights(checkIn, checkOut);
    
    if(!isValidData.isValid) {
        return isValidData;   
    }
    if(!specificRoom) {
        return `La habitacion ${roomNumber} no existe`;
    }
    if(new Date(checkIn) < new Date() || new Date(checkOut) < new Date(checkIn)) {
        return `Check In: ${checkIn} o Check out: ${checkOut} invalidos`;
    }
    if(isOverlap(hotel, roomNumber, checkIn, checkOut)) {
        return `Habitacion ${roomNumber} no disponible`;
    }
    if(totalNights < 1 || totalNights > 14) {
        return `Reserva invalida: reservar minimo 1 noche y maximo 14 noches`;
    }
    
    const calculatedPrice = totalNights * specificRoom.pricePerNight;
    
    return {
        id: generateId(),
        roomNumber: specificRoom.number,
        guest: guestData,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: totalNights,
        totalPrice: calculatedPrice,
        satus: 'confirmed',
    }
}


function isOverlap (hotel, roomNumber, checkIn, checkOut) {
    const dateIn = new Date(checkIn);
    const dateOut = new Date(checkOut);
    
    const overlap = hotel.reservations.filter(reservation => roomNumber === reservation.roomNumber
        && reservation.status !== 'cancelled' ).
        some(reservation => {
            const rCheckIn = new Date(reservation.checkIn);
            const rCheckOut = new Date(reservation.checkOut);
            return rCheckIn < dateOut && dateIn < rCheckOut;
        })
        
        return overlap;
    }
    
const reservation = creteReservation (
    hotel, 
    101, 
    {
        name: 'Cheryl Soberanes', 
        email: 'cherylsoberanes@gmail.com', 
        phone: '+34 612345678', 
        dni: '12345678A'
    },
    '2026-04-05',
    '2026-04-09'
);
    
console.log(reservation);


function addExtras (hotel, reservationId, extras) {
    const reservation = hotel.reservations.find(reservation => reservationId === reservation.id);
    if(!reservation) return `La ${reservationId} no existe`;
    if(!reservation.extras) {
        reservation.extras = [];
    }

    const validExtras = extras.filter(extra => extra.price > 0 && extra.quantity > 0);

    if(validExtras.length === 0) {
        return 'No hay extras validos para agregar';
    }

    reservation.extras.push(...validExtras);
    //validExtras.forEach(extra => reservation.extras.push(extra));
    
    //calculamos el precio de los nuevos extras
    const extraCost= validExtras.reduce((acc, extra) => {
        acc += extra.price * extra.quantity;
        return acc;
    }, 0);
    
    //se lo sumamos al total
    reservation.totalPrice += extraCost;
    return reservation;
}

const reservation2 = hotel.reservations.find(reservation => 'RES-001' === reservation.id);
console.log(reservation2);
console.log(addExtras(hotel, "RES-001", [{ name: "Parking", price: 15, quantity: 5 }]));



