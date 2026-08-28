/**
 * CANTEEN ORDERING SYSTEM - MAIN APP SCRIPT (app.js)
 * Level 1 Digital Skills - Design Software Unit (R/505/6389)
 * 
 * STUDENT NAME: ________________________
 * DATE: ________________________________
 * 
 * INSTRUCTIONS:
 * 1. Research 10 food & drink items with prices, images, and allergy information.
 * 2. Update the 'orderItems' array below with your research.
 * 3. Complete the 5 coding challenges marked with TODO comments.
 */

/* ==========================================================================
   PART 1: MENU DATA (Research at least 10 items)
   
   Available types: "main", "snack", "drink"
   Possible allergens: 'nuts', 'gluten', 'dairy', 'soy', 'eggs', 'fish', 'sesame', 'sulphites'
   ========================================================================== */
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


/* ==========================================================================
   PART 2: CODING CHALLENGES
   Complete the tasks below to make your canteen ordering system work!
   ========================================================================== */

/**
 * CHALLENGE 1: CALCULATE SUBTOTAL (Snippet Bank Practice)
 * -------------------------------------------------------------
 * Goal: Loop through all items in the 'tray' array and add up their prices.
 * 
 * SNIPPET BANK REFERENCE (from Guide 3):
 *   var total = 0.0;
 *   for (var i = 0; i < tray.length; i++) {
 *     total += tray[i].price;
 *   }
 *   return total;
 */
function calculateSubtotal(tray) {
  var total = 0.0;

  // TODO 1: Complete the calculation loop below:
  for (var i = 0; i < tray.length; i++) {
    // Replace '0' with tray[i].price to add each item price to total:
    total += 0; 
  }

  return total;
}


/**
 * CHALLENGE 2: BUDGET CHECK FOR £5.50 VOUCHER (Fill-in-the-blank)
 * -------------------------------------------------------------
 * Goal: If totalAmount is GREATER than voucherLimit, return a warning string.
 */
function checkBudgetLimit(totalAmount) {
  var voucherLimit = 5.50;

  // TODO 2: Replace '==' with the correct comparison operator ( > or < )
  if (totalAmount == voucherLimit) {
    return "Warning: Your order of £" + totalAmount.toFixed(2) + " exceeds the £5.50 meal voucher limit!";
  }

  return ""; // No warning if within budget
}


/**
 * CHALLENGE 3: ALLERGY WARNING CHECK (Fill-in-the-blank)
 * -------------------------------------------------------------
 * Goal: Check if any item in tray contains 'nuts'.
 */
function checkOrderAllergies(tray) {
  for (var i = 0; i < tray.length; i++) {
    var item = tray[i];
    
    // TODO 3: Replace 'BLANK_ALLERGEN' with the allergy string 'nuts'
    if (item.alergy_warning.includes('BLANK_ALLERGEN')) {
      return "Allergy Alert: " + item.name + " contains nuts! Please check ingredients.";
    }
  }

  return ""; // No allergy warnings found
}


/**
 * CHALLENGE 4: HEALTHY PROMOTION DISCOUNT (Snippet Bank Practice)
 * -------------------------------------------------------------
 * Goal: If 2 or more items have healthpromo == true, give a 10% discount (subtotal * 0.10).
 */
function checkHealthyPromotion(tray, subtotal) {
  var healthyCount = 0;

  // TODO 4: Count how many healthy items are in the tray
  for (var i = 0; i < tray.length; i++) {
    if (tray[i].healthpromo == true) {
      // Add 1 to healthyCount:
      healthyCount += 0;
    }
  }

  // TODO 5: If healthyCount is 2 or more, calculate 10% discount:
  if (healthyCount >= 2) {
    return subtotal * 0.0; // Change 0.0 to 0.10 for 10% discount
  }

  return 0; // No discount
}


/**
 * CALCULATE FINAL TOTAL TO PAY
 * -------------------------------------------------------------
 * Takes the subtotal and subtracts any discount amount.
 */
function calculateFinalTotal(subtotal, discountAmount) {
  var finalTotal = subtotal - discountAmount;
  
  // Make sure total never goes below £0.00
  if (finalTotal < 0) {
    finalTotal = 0;
  }

  return finalTotal;
}


/**
 * CHALLENGE 5: CHECKOUT CONFIRMATION (Fill-in-the-blank)
 * -------------------------------------------------------------
 * Goal: Create a friendly order confirmation message.
 */
function handleCheckout(tray) {
  // TODO 6: Customise your message below:
  var customerMessage = "Order Placed! Thank you for ordering " + tray.length + " item(s).";
  
  updateFeedback(customerMessage, "success");
}
