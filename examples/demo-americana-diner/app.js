/**
 * ROUTE 66 DINER - EXEMPLAR APP (app.js)
 * 
 * DESIGN RATIONALE:
 * - Theme: 1950s All-American Diner
 * - Target Audience: College students wanting quick, hearty diner meals
 * - Design Choices:
 *   - Layout: .layout-grid (clean columns with tray on right)
 *   - Colour: .colour-light (approachable, classic look)
 *   - Theme: .theme-americana (uses 'Bungee' heading font & red borders)
 *   - Spacing: .spacing-standard (standard readable gap)
 */

var orderItems = [
  {
    name: "Route 66 Double Cheeseburger",
    price: 3.80,
    image: "images/double-cheeseburger.jpg",
    type: "main",
    description: "Two smashed beef patties with melted Monterey Jack cheese, pickles, and diner relish.",
    healthpromo: false,
    alergy_warning: ['gluten', 'dairy', 'sesame']
  },
  {
    name: "Grilled Chicken Ranch Salad",
    price: 3.40,
    image: "images/chicken-ranch-salad.jpg",
    type: "main",
    description: "Crispy greens, cherry tomatoes, grilled chicken strips and light herby dressing.",
    healthpromo: true,
    alergy_warning: ['eggs', 'dairy']
  },
  {
    name: "Smoky BBQ Pulled Pork Sub",
    price: 3.60,
    image: "images/bbq-pulled-pork.jpg",
    type: "main",
    description: "Slow-cooked pulled pork in tangy BBQ glaze, served inside a toasted brioche roll.",
    healthpromo: false,
    alergy_warning: ['gluten', 'sulphites']
  },
  {
    name: "Veggie Bean Chilli Bowl",
    price: 3.10,
    image: "images/bean-chilli-bowl.jpg",
    type: "main",
    description: "Spiced three-bean chilli served over brown rice with guacamole on top.",
    healthpromo: true,
    alergy_warning: []
  },
  {
    name: "Crinkle Cut Diner Fries",
    price: 1.40,
    image: "images/crinkle-fries.jpg",
    type: "snack",
    description: "Golden crispy crinkle-cut potato fries with a pinch of seasoned sea salt.",
    healthpromo: false,
    alergy_warning: []
  },
  {
    name: "Warm Cinnamon Apple Pie",
    price: 1.80,
    image: "images/apple-pie.jpg",
    type: "snack",
    description: "Flaky shortcrust pastry filled with spiced Bramley apples and caramel syrup.",
    healthpromo: false,
    alergy_warning: ['gluten', 'dairy']
  },
  {
    name: "Fresh Melon & Berry Pot",
    price: 1.50,
    image: "images/melon-berry-pot.jpg",
    type: "snack",
    description: "Hand-chopped honeydew melon, blueberries and ripe strawberries.",
    healthpromo: true,
    alergy_warning: []
  },
  {
    name: "Thick Vanilla Shake",
    price: 1.90,
    image: "images/vanilla-shake.jpg",
    type: "drink",
    description: "Traditional malted vanilla ice cream shake topped with whipped cream.",
    healthpromo: false,
    alergy_warning: ['dairy']
  },
  {
    name: "Sparkling Lemon Iced Tea",
    price: 1.20,
    image: "images/lemon-iced-tea.jpg",
    type: "drink",
    description: "Chilled brewed black tea with lemon juice and a touch of agave nectar.",
    healthpromo: true,
    alergy_warning: []
  },
  {
    name: "Classic Root Beer",
    price: 1.30,
    image: "images/root-beer.jpg",
    type: "drink",
    description: "Old-fashioned sarsaparilla soda served ice-cold with a lime wedge.",
    healthpromo: false,
    alergy_warning: []
  }
];

// NOTE: This demo showcases theme styling and data layout.
// Student coding challenge functions (calculating subtotal, budget checks, etc.)
// are left for students to solve in their own project templates.
