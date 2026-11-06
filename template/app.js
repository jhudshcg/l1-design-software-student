/* DESIGN SOFTWARE — YOUR EDITING FILE
   Work in project/app.js. Search for the activity marker from the guide.
   Make one change → Save → Refresh → Check.
*/

// MESSAGE: change only the words between the quotes. Guide 3, activity A.
var orderMessage = "Thank you! Your practice order is ready.";

// MENU: replace the sample information with your ten researched items.
// Keep property names, commas and brackets. Prices are numbers: 3.50, not "£3.50".
// type is "main", "snack" or "drink". healthpromo is true or false.
// Keep the starter's spelling alergy_warning. An empty allergy list is [].
var orderItems = [
  {
    name: "Classic Chicken Burger",
    price: 3.50,
    image: "images/chicken-burger.jpg",
    type: "main",
    description: "Crispy breaded chicken breast fillet with lettuce and mayo in a seeded bun.",
    healthpromo: false,
    alergy_warning: ['gluten', 'eggs', 'dairy']
  },
  {
    name: "Mediterranean Veggie Wrap",
    price: 3.20,
    image: "images/veggie-wrap.jpg",
    type: "main",
    description: "Grilled peppers, hummus, cucumber and spinach in a wholemeal tortilla wrap.",
    healthpromo: true,
    alergy_warning: ['gluten', 'sesame']
  },
  {
    name: "Margherita Pizza Slice",
    price: 2.20,
    image: "images/pizza-slice.jpg",
    type: "main",
    description: "Stonebaked pizza base topped with rich tomato sauce and melted mozzarella cheese.",
    healthpromo: false,
    alergy_warning: ['gluten', 'dairy']
  },
  {
    name: "Jacket Potato with Tuna Mayo",
    price: 3.00,
    image: "images/jacket-potato.jpg",
    type: "main",
    description: "Fluffy baked potato served with fresh tuna and light mayonnaise filling.",
    healthpromo: true,
    alergy_warning: ['fish', 'eggs']
  },
  {
    name: "Fresh Fruit Salad Pot",
    price: 1.50,
    image: "images/fruit-salad.jpg",
    type: "snack",
    description: "Seasonal mix of watermelon, grapes, strawberries, melon and pineapple chunks.",
    healthpromo: true,
    alergy_warning: []
  },
  {
    name: "Salted Caramel Brownie",
    price: 1.60,
    image: "images/caramel-brownie.jpg",
    type: "snack",
    description: "Rich chocolate brownie topped with smooth salted caramel drizzle.",
    healthpromo: false,
    alergy_warning: ['gluten', 'dairy', 'eggs', 'nuts']
  },
  {
    name: "Cheese & Onion Crisps",
    price: 0.90,
    image: "images/crisps.jpg",
    type: "snack",
    description: "Crunchy hand-cooked British potato crisps with mature cheddar flavouring.",
    healthpromo: false,
    alergy_warning: ['dairy']
  },
  {
    name: "Sparkling Orange Water",
    price: 1.10,
    image: "images/orange-water.jpg",
    type: "drink",
    description: "Zero sugar lightly sparkling spring water with natural orange flavour.",
    healthpromo: true,
    alergy_warning: []
  },
  {
    name: "Cold Chocolate Milkshake",
    price: 1.80,
    image: "images/milkshake.jpg",
    type: "drink",
    description: "Creamy whole milk blended with cocoa powder and vanilla ice cream.",
    healthpromo: false,
    alergy_warning: ['dairy']
  },
  {
    name: "Hot Tea or Filter Coffee",
    price: 1.20,
    image: "images/hot-drink.jpg",
    type: "drink",
    description: "Freshly brewed fairtrade English Breakfast tea or freshly ground dark roast coffee.",
    healthpromo: true,
    alergy_warning: ['dairy']
  }
];

// TRY MY CODE: switch on ONE activity when its guide tells you to.
// false = supplied working logic. true = try your function below.
// Turn a switch back to false to restore supplied logic without deleting your work.
// A missing quote/bracket can stop this file loading: undo your last edit first.
var challengeModes = {
  subtotal: false,
  budget: false,
  allergy: false,
  promotion: false
};

// EXTENSION: false = no promotion. Set true only when trying the discount activity.
var useHealthyPromotion = false;

// B — SUBTOTAL. Predict the total, then choose what to add on the marked line.
function studentSubtotal(tray) {
  var total = 0;
  for (var i = 0; i < tray.length; i++) {
    total += 0; // B: replace only this 0. Keep the supplied loop.
  }
  return total;
}

// C — VOUCHER. Compare the amount to pay with the voucher limit.
function studentOverBudget(totalAmount) {
  var voucherLimit = 5.50;
  return totalAmount == voucherLimit; // C: choose a comparison operator.
}

// D — ALLERGY LIST. Does this list contain the word you are looking for?
function studentHasNuts(allergens) {
  return allergens.includes("CHOOSE"); // D: replace the word inside the quotes.
}

// E — DISCOUNT EXTENSION. Work through E1 and E2 separately in the guide.
function studentDiscount(tray, subtotal) {
  var healthyCount = 0;
  for (var i = 0; i < tray.length; i++) {
    if (tray[i].healthpromo == true) {
      healthyCount += 0; // E1: choose how much to increase the count.
    }
  }
  if (healthyCount >= 2) {
    return subtotal * 0; // E2: choose the fraction that gives a 10% discount.
  }
  return 0;
}
