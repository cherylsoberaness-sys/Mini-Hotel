/*
hotel = {
    name: "Hotel keepCoding",
    rooms: [],
    reservations: [],
    history: []
}

habitacion = {
    number: 101,
    type: "single",
    status: "available",
    features: ["wifi", "tv", "minibar"]

}

reserva = {
    id: "RES-001",
    roomNumber: 101,
    guest: {
        name: "Ana García",
        email: "ana@example.com",
        phone: "+34 612345678",
        dni: "12345678A"
    },
    checkIn: "2026-01-20",
    checkOut: "2026-01-25",
    nights: 5,
    totalPrice: 250,
    status: "confirmed",
    extras: [
        { "name": "Breakfast", "price": 10, "quantity": 5 },
        { "name": "Parking", "price": 15, "quantity": 5 }
    ]
}
*/

const hotel = {
    name: "Hotel keepCoding",
    rooms: [
        {
            number: 101,
            type: "single",
            pricePerNight: 50,
            status: "available",
            features: ["wifi", "tv"]
        },
        {
            number: 102,
            type: "double",
            pricePerNight: 100,
            status: "available",
            features: ["wifi", "tv", "minibar"]
        },
        {
            number: 201,
            type: "suite",
            pricePerNight: 150,
            status: "maintenance",
            features: ["wifi", "tv", "minibar", "jacuzzi"]
        },
        {
            number: 202,
            type: "single",
            pricePerNight: 50,
            status: "available",
            features: ["wifi"]
        },
        {
            number: 203,
            type: "double",
            pricePerNight: 100,
            status: "available",
            features: ["wifi", "tv", "balcony"]
        }
    ],
    reservations: [
        {
            id: "RES-001",
            roomNumber: 101,
            guest: {
                name: "Ana García",
                email: "ana@example.com",
                phone: "+34 612345678",
                dni: "12345678A"
            },
            checkIn: "2026-01-20",
            checkOut: "2026-01-25",
            nights: 5,
            totalPrice: 250,
            status: "confirmed",
            extras: [
                { name: "Breakfast", price: 10, quantity: 5 }
            ]
        },
        {
            id: "RES-002",
            roomNumber: 101,
            guest: {
                name: "Luis Pérez",
                email: "luis@example.com",
                phone: "+34 699887766",
                dni: "87654321B"
            },
            checkIn: "2026-01-26",
            checkOut: "2026-01-28",
            nights: 2,
            totalPrice: 120,
            status: "confirmed",
            extras: []
        },
        {
            id: "RES-003",
            roomNumber: 102,
            guest: {
                name: "Carla López",
                email: "carla@example.com",
                phone: "+34 655443322",
                dni: "11223344C"
            },
            checkIn: "2026-01-22",
            checkOut: "2026-01-27",
            nights: 5,
            totalPrice: 400,
            status: "confirmed",
            extras: [
                { name: "Parking", price: 15, quantity: 5 }
            ]
        },
        {
            id: "RES-004",
            roomNumber: 202,
            guest: {
                name: "Miguel Torres",
                email: "miguel@example.com",
                phone: "+34 600112233",
                dni: "99887766D"
            },
            checkIn: "2026-01-24",
            checkOut: "2026-01-26",
            nights: 2,
            totalPrice: 100,
            status: "cancelled",
            extras: []
        },
        {
            id: "RES-005",
            roomNumber: 203,
            guest: {
                name: "Laura Sánchez",
                email: "laura@example.com",
                phone: "+34 611223344",
                dni: "55667788E"
            },
            checkIn: "2026-01-21",
            checkOut: "2026-01-23",
            nights: 2,
            totalPrice: 180,
            status: "confirmed",
            extras: [
                { name: "Breakfast", price: 10, quantity: 2 },
                { name: "Spa", price: 25, quantity: 1 }
            ]
        },
        {
            id: "RES-006",
            roomNumber: 203,
            guest: {
                name: "David Ruiz",
                email: "david@example.com",
                phone: "+34 677889900",
                dni: "44332211F"
            },
            checkIn: "2026-01-23",
            checkOut: "2026-01-27",
            nights: 4,
            totalPrice: 360,
            status: "confirmed",
            extras: []
        }
    ],
    history: []
};
const rooms = [
    {number: 101, type: "single", pricePerNight: 50, status: "occupied", features: ["wifi", "tv", "minibar"]},
    {number: 102, type: "double", pricePerNight: 50, status: "available", features: ["wifi", "tv", "minibar"]},
    {number: 103, type: "double", pricePerNight: 50, status: "occupied", features: ["wifi", "tv", "minibar"]},
    {number: 104, type: "single", pricePerNight: 50, status: "available", features: ["wifi", "tv", "minibar"]},
    {number: 105, type: "suite", pricePerNight: 50, status: "maintenance", features: ["wifi", "tv", "minibar"]},

]


function createHotel (name, rooms) {
    return {
        name: name,
        rooms: rooms,
        reservations: [{},{},{}],
        history: []
    }
}

const hotel1 = createHotel("Hotel KeepCoding", rooms);


export { hotel };


