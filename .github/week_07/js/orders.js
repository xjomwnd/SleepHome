// orders.js
import { checkLogin } from "../js/auth.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

// Function to fetch and display current orders
async function currentOrders(containerId, token) {
  try {
    // Make an API request to fetch the current orders data
    const response = await fetch("/api/orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const ordersData = await response.json();

      // Access the container element to display the orders
      const container = document.querySelector(containerId);

      // Clear any existing content in the container
      container.innerHTML = "";

      // Loop through the orders data and create HTML elements to display the orders
      ordersData.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.date}</td>
          <td>${order.items}</td>
          <td>${order.total}</td>
        `;

        container.appendChild(row);
      });
    } else {
      console.error("Failed to fetch current orders data:", response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while fetching current orders data:", error);
  }
}

// Entry point: Load header, footer, and call currentOrders function
loadHeaderFooter();

const token = checkLogin();
currentOrders("#orders", token);
