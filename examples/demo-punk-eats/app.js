/**
 * RIOT BITES - EXEMPLAR APP (app.js)
 * 
 * DESIGN RATIONALE:
 * - Theme: Edgy Punk DIY Street Food
 * - Target Audience: College students wanting bold, spicy, fast-paced food
 * - Design Choices:
 *   - Layout: .layout-sidebar-left (distinct wireframe structure: tray on the left)
 *   - Colour: .colour-dark (stark black & white high-contrast underground zine)
 *   - Theme: .theme-punk (uses 'Creepster' & 'Special Elite', tilted cards, ban-the-bomb/anarchy decals)
 *   - Spacing: .spacing-compact (snug layout fit)
 */

var orderItems = [
  {
    name: "Atomic Buffalo Hot Wings",
    price: 3.90,
    image: "images/hot-wings.jpg",
    type: "main",
    description: "6 crispy wings tossed in fiery habanero glaze served with cool ranch dip.",
    healthpromo: false,
    alergy_warning: ['eggs', 'dairy', 'sulphites']
  },
  {
    name: "Korean BBQ Tofu Bowl",
    price: 3.30,
    image: "images/korean-tofu-bowl.jpg",
    type: "main",
    description: "Crispy glazed tofu cubes, steamed edamame, kimchi and brown rice.",
    healthpromo: true,
    alergy_warning: ['soy', 'sesame']
  },
  {
    name: "Loaded Anarchy Nachos",
    price: 3.50,
    image: "images/loaded-nachos.jpg",
    type: "main",
    description: "Tortilla chips loaded with jalapeños, warm cheese sauce and spicy salsa.",
    healthpromo: false,
    alergy_warning: ['dairy']
  },
  {
    name: "Superfood Protein Power Bowl",
    price: 3.20,
    image: "images/power-bowl.jpg",
    type: "main",
    description: "Quinoa, roasted sweet potato, baby kale, chickpeas and lemon tahini dressing.",
    healthpromo: true,
    alergy_warning: ['sesame']
  },
  {
    name: "Sonic Salt & Pepper Fries",
    price: 1.50,
    image: "images/salt-pepper-fries.jpg",
    type: "snack",
    description: "Chunky skin-on fries seasoned with chilli flakes, spring onion and sea salt.",
    healthpromo: false,
    alergy_warning: []
  },
  {
    name: "Charred Street Corn on Cob",
    price: 1.40,
    image: "images/street-corn.jpg",
    type: "snack",
    description: "Flame-grilled sweetcorn dusted with mild smoked paprika and lime juice.",
    healthpromo: true,
    alergy_warning: []
  },
  {
    name: "Dark Chocolate Brownie Bomb",
    price: 1.70,
    image: "images/brownie-bomb.jpg",
    type: "snack",
    description: "70% dark cocoa brownie loaded with fudge chunks and sea salt.",
    healthpromo: false,
    alergy_warning: ['gluten', 'dairy', 'eggs']
  },
  {
    name: "Cold Brew Rocket Fuel",
    price: 1.80,
    image: "images/cold-brew.jpg",
    type: "drink",
    description: "12-hour steeped artisan Colombian cold brew coffee served black over ice.",
    healthpromo: true,
    alergy_warning: []
  },
  {
    name: "Electric Dragonfruit Lemonade",
    price: 1.40,
    image: "images/dragonfruit-lemonade.jpg",
    type: "drink",
    description: "Tart fresh lemonade infused with vibrant pink pitaya dragonfruit extract.",
    healthpromo: true,
    alergy_warning: []
  },
  {
    name: "Monster Mango Energy Blast",
    price: 1.60,
    image: "images/energy-blast.jpg",
    type: "drink",
    description: "Sparkling tropical juice drink packed with B-vitamins and green tea extract.",
    healthpromo: false,
    alergy_warning: []
  }
];

// NOTE: This demo showcases theme styling and data layout.
// Student coding challenge functions (calculating subtotal, budget checks, etc.)
// are left for students to solve in their own project templates.
