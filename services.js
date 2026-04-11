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


function checkIn(hotel, reservationId) {
    //buscamos la reserva
    const reservation = hotel.reservations.find(r => r.id === reservationId);

    if(!reservation) return `La reservacion ${reservationId} no existe`; 
    if(reservation.status !== 'confirmed') return `la reservacion no está confirmada`;

    const today = new Date();
    const checkInDate = new Date(reservation.checkIn + 'T00:00:00');

    if(today < checkInDate) return `fecha actual invalida: debe ser igual o posterior al check in previsto`;

    //buscamos la habitacion y validamos que exista
    const room = hotel.rooms.find(r => r.number === reservation.roomNumber);
    if(!room) {
        return `la habitacion ${roomNumber} no existe`;
    }

    //cambiamos el estatus de la reserva a checked-in y de la habitacion a ocupada y tambien cambiamos la hora del
    //check in a la hora y dia actual.
    reservation.status = "checked-in"
    room.status = 'occupied';
    reservation.checkIn = new Date().toISOString();

    return `checkin para la reserva ${reservationId} confirmado con fecha: ${reservation.checkIn}`;
    
}

