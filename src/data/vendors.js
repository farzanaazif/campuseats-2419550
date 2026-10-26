// src/data/vendors.js
const vendors = [
  {
    id: 'my-restaurant',
    name: 'My CampusEats Restaurant', // Change to your registered name!
    location: 'Mahallah Ali, Block A',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      // 8 Items across 3 categories (Rice, Noodles, Drinks)
      { id: 'my-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal', price: 9.00, category: 'Rice', available: true },
      { id: 'my-2', name: 'Nasi Lemak Special', description: 'Coconut rice with egg and sambal', price: 7.50, category: 'Rice', available: true },
      { id: 'my-3', name: 'Nasi Goreng Kampung', description: 'Fried rice with anchovies and veggies', price: 8.00, category: 'Rice', available: true },
      { id: 'my-4', name: 'Laksa Johor', description: 'Spaghetti in spicy fish gravy with herbs', price: 8.50, category: 'Noodles', available: true },
      { id: 'my-5', name: 'Mee Goreng Mamak', description: 'Spicy fried noodles with tofu', price: 7.00, category: 'Noodles', available: true },
      { id: 'my-6', name: 'Kuey Teow Goreng', description: 'Flat noodles with prawns and egg', price: 8.00, category: 'Noodles', available: true },
      { id: 'my-7', name: 'Air Bandung', description: 'Rose syrup with milk', price: 3.00, category: 'Drinks', available: true },
      { id: 'my-8', name: 'Teh Tarik', description: 'Pulled milk tea', price: 2.50, category: 'Drinks', available: true }
    ]
  },
  {
    id: 'kafe-ali', // Following the short ID rule: 'kafe-ali'
    name: 'Kafe Mahallah Ali',
    location: 'Mahallah Ali, Block C',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      { id: 'ali-1', name: 'Roti Canai', description: 'Flatbread with curry', price: 1.50, category: 'Bread', available: true },
      { id: 'ali-2', name: 'Milo Ais', description: 'Iced chocolate malt', price: 2.50, category: 'Drinks', available: true }
    ]
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: false, // Make this one Closed to test the red text!
    menu: [
      { id: 'aminah-1', name: 'Nasi Kerabu', description: 'Blue rice with herbs', price: 7.00, category: 'Rice', available: true }
    ]
  }
];

export default vendors;