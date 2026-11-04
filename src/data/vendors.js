// src/data/vendors.js
const vendors = [
  {
    id: 'maryam',
    name: 'Kafe Mahallah Maryam', // Change to your registered name!
    location: 'Mahallah Maryam, Block F',
    openHours: '8:00 a.m. - 10:00 p.m.',
    isOpen: true,
    menu: [
      // 8 Items across 3 categories (Rice, Side Dishes, Drinks)
      { id: 'my-1', name: 'Nasi Ayam Gepuk', description: 'White rice, fried chicken, sambal, cucumbers, cabbages', price: 6.00, category: 'Rice', available: true },
      { id: 'my-2', name: 'Nasi Ayam', description: 'Yellow rice, roasted chicken, salad, soup, sambal, soy sauce', price: 6.00, category: 'Rice', available: true },
      { id: 'my-3', name: 'Nasi Kukus', description: 'White rice, fried chicken, sambal, cucumbers, cabbages, curry', price: 6.00, category: 'Rice', available: true },
      { id: 'my-4', name: 'Ayam Gunting', description: 'Boneless chicken pieces that crispy outside and juicy inside', price: 9.00, category: 'Side Dishes', available: true },
      { id: 'my-5', name: 'Dumplings', description: 'Few pieces of steamed dumplings with dipping sauce', price: 12.00, category: 'Side Dishes', available: true },
      { id: 'my-6', name: 'Sate Ikan', description: 'Grilled fish skewers with sweet and spicy sauce', price: 3.00, category: 'Side Dishes', available: true },
      { id: 'my-7', name: 'Air Bandung', description: 'Rose syrup with milk', price: 3.00, category: 'Drinks', available: true },
      { id: 'my-8', name: 'Teh Tarik', description: 'Pulled milk tea', price: 2.50, category: 'Drinks', available: true }
    ]
  },
  {
    id: 'halimah', // Following the short ID rule: 'kafe-ali'
    name: 'Kafe Mahallah Halimah',
    location: 'Mahallah Halimah, Block PG',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      { id: 'halimah-1', name: 'Nasi Goreng Kampung', description: 'Fried rice with vegetables and chicken', price: 5.00, category: 'Rice', available: true },
      { id: 'halimah-2', name: 'Shawarma', description: 'Grilled meat in a flatbread with vegetables and sauce', price: 6.00, category: 'Side Dishes', available: true },
      { id: 'halimah-3', name: 'Milo Ais', description: 'Iced chocolate malt', price: 3.00, category: 'Drinks', available: true }
    ]
  },

  {
    id: 'hafsah',
    name: 'Kafe Mahallah Hafsah',
    location: 'Mahallah Hafsah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: false, // Make this one Closed to test the red text!
    menu: [
      { id: 'hafsah-1', name: 'Sizzling', description: 'Crispy egg noodles drenched in dark umami-soy gravy with vegetables and meat', price: 9.00, category: 'Noodles', available: true },
      { id: 'hafsah-2', name: 'Oden', description: 'Skewered seafood in a light broth', price: 6.00, category: 'Side Dishes', available: true },
      { id: 'hafsah-3', name: 'Chicken chop', description: 'Grilled chicken steak with vegetables', price: 10.00, category: 'Western', available: true },
    ]
  }
];

export default vendors;