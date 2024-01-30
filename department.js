fetch("https://dummyjson.com/users")
  .then((response) => {
    if (response.ok) {
      let res = response.json();
      console.log(res);
      return res;
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then((data) => {
    console.log(data);
    displayDoctor(data);
    addRow(data);
  })
  .catch((error) => console.error("FETCH ERROR:", error));

function displayDoctor(data) {
  const tableContainer = document.querySelector(".table-container");

  const tableContents = data.users.slice(0, 5);
  // const table = document.createElement("table");

  // // Add table header
  // table.innerHTML = `
  //           <tr class="thead">
  //               <th>Department Name</th>
  //               <th>Doctor</th>
  //               <th>Gender</th>
  //               <th>Head of Department</th>
  //               <th>Action</th>
  //               <th>Status</th>
  //           </tr>`;

  // Add table rows
  tableContents.forEach((data) => {
    const row = document.createElement("tr");
    // Set the data-id attribute with the user ID
    row.setAttribute("data-id", data.id);

    row.innerHTML = `
                <td>${data.company.department}</td>
                <td class="dip"><img src=${data.image} alt="A guy"> ${data.firstName}</td>
                <td>${data.gender}</td>
                <td>${data.company.title}</td>
                <td>
                    <img src="images/pen.png" alt="edit">
                    <img src="images/icon.png" alt="icon">
                    <img src="images/delete.png" alt="delete"  onclick="deleteRow(this)">
                </td>
                <td><p>Active</p></td>
            `;
    table.appendChild(row);
    console.log(`This is the index of data: ${data.id}`);
  });

  // Append the table to the container
  tableContainer.appendChild(table);
}

function deleteRow(button) {
  // Traverse the DOM to find the closest <tr> element
  const row = button.closest("tr");

  // Get the user ID from the data-id attribute
  const userId = row.getAttribute("data-id");

  // Make an API request to delete the user with the given ID
  fetch(`https://dummyjson.com/users/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // If the delete request is successful, remove the corresponding row from the table
        row.remove();
      } else {
        throw new Error("DELETE REQUEST ERROR");
      }
    })
    .catch((error) => console.error("DELETE ERROR:", error));
}

// Assume you have a button with an id="addRowButton"
const addRowButton = document.getElementById("addRowButton");

// Add an event listener to the button
addRowButton.addEventListener("click", () => {
  // Get the data for the new row (you might fetch it from an API or have it predefined)
  function addRow(data) {
    const randomNumber = Math.floor(Math.random() * data.length);
    const newUser = data[randomNumber]; // Assuming data is an array of users
    const newRowData = {
      id: newUser.id,
      company: {
        department: newUser.company.department,
      },
      image: newUser.image,
      firstName: newUser.firstName,
      gender: newUser.gender,
      // ... other properties
    };

    // Call a function to dynamically add the new row to the table
    addTableRow(newRowData);
  }

  addRow(data);
});

function addTableRow(data) {
  const tableContainer = document.querySelector(".table-container");
  const table = tableContainer.querySelector("table");

  // Create a new table row
  const row = document.createElement("tr");
  // Set the data-id attribute with the user ID
  row.setAttribute("data-id", data.id);

  // Populate the row with data (similar to what you did in displayDoctor)
  row.innerHTML = `
        <td>${data.company.department}</td>
        <td class="dip"><img src=${data.image} alt="A guy"> ${data.firstName}</td>
        <td>${data.gender}</td>
        <td>${data.company.title}</td>
        <td>
            <img src="images/pen.png" alt="edit">
            <img src="images/icon.png" alt="icon">
            <img src="images/delete.png" alt="delete"  onclick="deleteRow(this)">
        </td>
        <td><p>Active</p></td>
    `;

  // Append the new row to the table
  table.appendChild(row);
}
