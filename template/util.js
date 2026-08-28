/**
 * CANTEEN ORDERING SYSTEM - UTILITY FUNCTIONS (util.js)
 * 
 * This file handles user interface (UI) rendering, button clicks, 
 * and event connections. 
 * 
 * NOTE FOR STUDENTS: You do NOT need to edit this file!
 * You will make your changes and complete your coding tasks in app.js.
 */

// Global Tray State (stores items currently added by the user)
var currentTray = [];

/**
 * Format a number to British Pounds (e.g., 2.5 -> "£2.50")
 */
function formatPrice(amount) {
  return "£" + Number(amount).toFixed(2);
}

/**
 * Render the list of food cards into the #menu-container element
 */
function renderMenu(itemsToRender) {
  var container = document.getElementById("menu-container");
  if (!container) return;
  
  container.innerHTML = "";

  if (!itemsToRender || itemsToRender.length === 0) {
    container.innerHTML = "<p class='empty-tray-message'>No menu items found for this filter.</p>";
    return;
  }

  for (var i = 0; i < itemsToRender.length; i++) {
    var item = itemsToRender[i];
    
    var card = document.createElement("div");
    card.className = "menu-card";
    
    // Allergen text
    var allergenText = "";
    if (item.alergy_warning && item.alergy_warning.length > 0) {
      allergenText = "Contains: " + item.alergy_warning.join(", ");
    } else {
      allergenText = "No common allergens";
    }

    // Health badge
    var healthBadgeHtml = item.healthpromo ? "<span class='badge-health'>Healthy Choice</span>" : "";

    card.innerHTML = 
      "<div class='menu-card-img-wrapper'>" +
        "<span class='badge-type'>" + item.type + "</span>" +
        healthBadgeHtml +
        "<img src='" + item.image + "' alt='" + item.name + "' onerror=\"this.src='https://via.placeholder.com/300x180?text=" + encodeURIComponent(item.name) + "'\">" +
      "</div>" +
      "<div class='menu-card-content'>" +
        "<h3 class='menu-card-title'>" + item.name + "</h3>" +
        "<p class='menu-card-desc'>" + item.description + "</p>" +
        "<p class='menu-card-allergies'>" + allergenText + "</p>" +
        "<div class='menu-card-footer'>" +
          "<span class='menu-card-price'>" + formatPrice(item.price) + "</span>" +
          "<button class='btn btn-primary btn-sm btn-add-item' data-index='" + i + "'>+ Add to Tray</button>" +
        "</div>" +
      "</div>";

    container.appendChild(card);
  }

  // Attach click listeners to all "+ Add to Tray" buttons
  var addButtons = container.querySelectorAll(".btn-add-item");
  addButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      var index = parseInt(this.getAttribute("data-index"));
      addToTray(itemsToRender[index]);
    });
  });
}

/**
 * Add an item to the user's tray
 */
function addToTray(item) {
  currentTray.push(item);
  refreshTrayUI();
}

/**
 * Remove an item from the user's tray by index
 */
function removeFromTray(index) {
  currentTray.splice(index, 1);
  refreshTrayUI();
}

/**
 * Clear all items from the tray
 */
function clearTray() {
  currentTray = [];
  refreshTrayUI();
  updateFeedback("Tray cleared. Select items to start a new order.", "info");
}

/**
 * Update the visual display of the Tray, Totals, and Feedback Messages
 */
function refreshTrayUI() {
  var listContainer = document.getElementById("order-items-list");
  var countSpan = document.getElementById("summary-count");
  var subtotalSpan = document.getElementById("summary-subtotal");
  var discountRow = document.getElementById("discount-row");
  var discountSpan = document.getElementById("summary-discount");
  var totalSpan = document.getElementById("summary-total");

  countSpan.textContent = currentTray.length;

  // Render items in Tray list
  if (currentTray.length === 0) {
    listContainer.innerHTML = "<p class='empty-tray-message'>Your tray is empty. Click '+ Add to Tray' on any menu item!</p>";
    subtotalSpan.textContent = "£0.00";
    totalSpan.textContent = "£0.00";
    discountRow.style.display = "none";
    updateFeedback("Select items to begin your order.", "info");
    return;
  }

  listContainer.innerHTML = "";
  for (var i = 0; i < currentTray.length; i++) {
    var item = currentTray[i];
    var row = document.createElement("div");
    row.className = "tray-item";
    row.innerHTML = 
      "<div class='tray-item-info'>" +
        "<span class='tray-item-name'>" + item.name + "</span>" +
        "<span class='tray-item-price'>" + formatPrice(item.price) + "</span>" +
      "</div>" +
      "<button class='tray-item-remove-btn' data-index='" + i + "' title='Remove'>&times;</button>";
    listContainer.appendChild(row);
  }

  // Attach remove button listeners
  var removeButtons = listContainer.querySelectorAll(".tray-item-remove-btn");
  removeButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      var idx = parseInt(this.getAttribute("data-index"));
      removeFromTray(idx);
    });
  });

  // RUN STUDENT LOGIC FROM app.js
  // 1. Calculate subtotal
  var subtotal = 0;
  if (typeof calculateSubtotal === "function") {
    subtotal = calculateSubtotal(currentTray);
  }
  subtotalSpan.textContent = formatPrice(subtotal);

  // 2. Check health promotion discount
  var discountAmount = 0;
  if (typeof checkHealthyPromotion === "function") {
    discountAmount = checkHealthyPromotion(currentTray, subtotal);
  }

  if (discountAmount > 0) {
    discountRow.style.display = "flex";
    discountSpan.textContent = "-" + formatPrice(discountAmount);
  } else {
    discountRow.style.display = "none";
  }

  // 3. Calculate final total to pay (calls calculateFinalTotal from app.js)
  var finalTotal = 0;
  if (typeof calculateFinalTotal === "function") {
    finalTotal = calculateFinalTotal(subtotal, discountAmount);
  } else {
    finalTotal = Math.max(0, subtotal - discountAmount);
  }
  totalSpan.textContent = formatPrice(finalTotal);

  // 4. Check allergy warnings
  var allergyWarningMessage = "";
  if (typeof checkOrderAllergies === "function") {
    allergyWarningMessage = checkOrderAllergies(currentTray);
  }

  // 4. Check voucher budget limit (£5.50)
  var isVoucherChecked = document.getElementById("voucher-toggle").checked;
  var budgetMessage = "";
  if (isVoucherChecked && typeof checkBudgetLimit === "function") {
    budgetMessage = checkBudgetLimit(finalTotal);
  }

  // Set feedback message priority: Budget Warning > Allergy Warning > Ready to order
  if (budgetMessage) {
    updateFeedback(budgetMessage, "warning");
  } else if (allergyWarningMessage) {
    updateFeedback(allergyWarningMessage, "warning");
  } else if (discountAmount > 0) {
    updateFeedback("Healthy Choice Discount Applied! Ready to place order.", "success");
  } else {
    updateFeedback("Order ready. Click 'Place Order' when you are done.", "info");
  }
}

/**
 * Display a feedback notification box (info, warning, success, error)
 */
function updateFeedback(message, type) {
  var feedbackBox = document.getElementById("status-feedback");
  var feedbackText = document.getElementById("status-message");
  if (!feedbackBox || !feedbackText) return;

  feedbackBox.className = "status-feedback " + (type || "info");
  feedbackText.textContent = message;
}

/**
 * Initialise Page Event Listeners
 */
window.addEventListener("DOMContentLoaded", function() {
  // Initial menu render
  if (typeof orderItems !== "undefined") {
    renderMenu(orderItems);
  }

  // Filter dropdown listener
  var filterSelect = document.getElementById("filter-type");
  if (filterSelect) {
    filterSelect.addEventListener("change", function() {
      var selectedType = this.value;
      if (selectedType === "all") {
        renderMenu(orderItems);
      } else {
        var filtered = orderItems.filter(function(item) {
          return item.type === selectedType;
        });
        renderMenu(filtered);
      }
    });
  }

  // Voucher checkbox listener
  var voucherToggle = document.getElementById("voucher-toggle");
  if (voucherToggle) {
    voucherToggle.addEventListener("change", function() {
      refreshTrayUI();
    });
  }

  // Clear button
  var clearBtn = document.getElementById("btn-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearTray);
  }

  // Checkout button
  var checkoutBtn = document.getElementById("btn-checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function() {
      if (currentTray.length === 0) {
        updateFeedback("Please add at least one item to your tray first!", "error");
        return;
      }
      
      if (typeof handleCheckout === "function") {
        handleCheckout(currentTray);
      } else {
        updateFeedback("Thank you! Your order has been placed.", "success");
      }
    });
  }
});
