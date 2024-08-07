document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("courseForm");
  const displayInfo = document.getElementById("displayInfo");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const programmeName = document.getElementById("programmeName").value;
    const department = document.getElementById("department").value;
    const courseTeacher = document.getElementById("courseTeacher").value;
    const courseCode = document.getElementById("courseCode").value;
    const semester = document.getElementById("semester").value;
    const classroom = document.getElementById("classroom").value;
    const courseTitle = document.getElementById("courseTitle").value;
    const division = document.getElementById("division").value;
    const academicYear = document.getElementById("academicYear").value;
    const totalStudents = document.getElementById("totalStudents").value;
    const coThreshold = document.getElementById("coThreshold").value;
    const targetPercentage = document.getElementById("targetPercentage").value;
    const totalCO = document.getElementById("totalCO").value;
    const totalPO = document.getElementById("totalPO").value;
    const totalPSO = document.getElementById("totalPSO").value;
    const TotalMarks = document.getElementById("TotalMarks").value;

    document.getElementById("displayInfo").classList.remove("hidden");

    document.getElementById("PoInputs").classList.remove("hidden");
    document.getElementById("COInputs").classList.remove("hidden");
    document.getElementById("PSOInputs").classList.remove("hidden");
    document.getElementById("ExcelInput").classList.remove("hidden");

    // if(programmeName != "" && department != "" && courseTeacher!= "" && )

    // Display the entered information in the form
    displayInfo.innerHTML = `
             <h2 style="font-weight: bold; color: #007bff; font-size: 26px; ;text-decoration: underline; ">Course Information</h2>
             <p><strong>Name of the Programme:</strong> ${programmeName}</p>
             <p><strong>Department:</strong> ${department}</p>
             <p><strong>Name of the Course Teacher/Teachers:</strong> ${courseTeacher}</p>
             <p><strong>Course Code:</strong> ${courseCode}</p>
             <p><strong>Semester:</strong> ${semester}</p>
             <p><strong>Course Title:</strong> ${courseTitle}</p>
             <p><strong>Class:</strong> ${classroom}</p>
             <p><strong>Division:</strong> ${division}</p>
             <p><strong>Academic Year:</strong> ${academicYear}</p>
             <p><strong>Number of Students:</strong> ${totalStudents}</p>
             <p><strong>CO Threshold%:</strong> ${coThreshold}</p>
             <p><strong>Institute Target Percentage:</strong> ${targetPercentage}</p>
             <p><strong>Total CO:</strong> ${totalCO}</p>
             <p><strong>Total PO:</strong> ${totalPO}</p>
             <p><strong>Total PSO:</strong> ${totalPSO}</p>
             <p><strong>Total Marks:</strong> ${TotalMarks}</p>
        `;
  });

  //Input table for COs, POs and PSOs

  //Taking input for COs, POs and PSOs
  // Define variables to store user inputs
  let poValues = [];
  let coValues = [];
  let psoValues = [];

  // Function to create input fields dynamically and store values
  function createInputs(container, count, placeholder, valuesArray) {
    container.innerHTML = ""; // Clear previous inputs
    valuesArray.length = 0; // Clear previous values

    for (let i = 1; i <= count; i++) {
      // Create a label element
      const label = document.createElement("label");
      label.textContent = `${placeholder} ${i}:`;
      label.setAttribute("for", `${placeholder}${i}`);

      // Create an input element
      const input = document.createElement("input");
      input.setAttribute(
        "class",
        "w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
      );
      input.setAttribute("type", "text");
      input.setAttribute("id", `${placeholder}${i}`);
      input.setAttribute("name", `${placeholder}${i}`);
      input.setAttribute("placeholder", `Enter ${placeholder} ${i}`);

      // Listen for input changes and store them
      input.addEventListener("input", function (event) {
        valuesArray[i - 1] = event.target.value;
      });

      // Append the label and input to the container
      container.appendChild(label);
      container.appendChild(input);
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting (for demonstration)

    // Get the values for Number of POs, Number of COs, and Number of PSOs
    const numPOs = parseInt(document.getElementById("totalPO").value) || 0;
    const numCOs = parseInt(document.getElementById("totalCO").value) || 0;
    const numPSOs = parseInt(document.getElementById("totalPSO").value) || 0;

    // Show the containers and create input fields
    const poInputsContainer = document.getElementById("poInputs");
    const coInputsContainer = document.getElementById("coInputs");
    const psoInputsContainer = document.getElementById("psoInputs");

    createInputs(poInputsContainer, numPOs, "PO", poValues);
    createInputs(coInputsContainer, numCOs, "CO", coValues);
    createInputs(psoInputsContainer, numPSOs, "PSO", psoValues);

    document.getElementById("poHeader").style.display = "block";
    document.getElementById("coHeader").style.display = "block";
    document.getElementById("psoHeader").style.display = "block";
    displayButton.style.display = "block"; // Show the display button
  });

  // Display the entered information
  displayButton.addEventListener("click", function () {
    document.getElementById("display").classList.remove("hidden");

    let displayContent = `
      <h2 class="text-2xl font-bold">Course and Program outcome </h2>
      <div class="mt-4">
  `;

    if (poValues.length > 0) {
      displayContent += `
          <p class="mb-2"><strong class="text-indigo-700">Program Outcome (PO):</strong></p>
          <ul class="list-disc ml-6">
      `;
      poValues.forEach((value, index) => {
        displayContent += `<li>PO ${index + 1}: ${value}</li>`;
      });
      displayContent += `</ul>`;
    }

    if (psoValues.length > 0) {
      displayContent += `
          <p class="mt-4 mb-2"><strong class="text-indigo-700">Program Specific Outcome (PSO):</strong></p>
          <ul class="list-disc ml-6">
      `;
      psoValues.forEach((value, index) => {
        displayContent += `<li>PSO ${index + 1}: ${value}</li>`;
      });
      displayContent += `</ul>`;
    }

    if (coValues.length > 0) {
      displayContent += `
          <p class="mt-4 mb-2"><strong class="text-indigo-700">Course Outcome (CO):</strong></p>
          <ul class="list-disc ml-6">
      `;
      coValues.forEach((value, index) => {
        displayContent += `<li>CO ${index + 1}: ${value}</li>`;
      });
      displayContent += `</ul>`;
    }

    displayContent += `</div>`;

    display.innerHTML = displayContent;
  });

  var refreshCount = 0;

  var columnsAboveThresholdCounts = [];

  // ISA Mapping Form JavaScript
  document.getElementById("loadButton").addEventListener("click", function () {
    var fileInput = document.getElementById("fileInput");
    var gridView1 = document.getElementById("gridView1");
    var gridView2 = document.getElementById("gridView2");

    refreshCount++;

    localStorage.clear();

    var coInput = document.getElementById("totalCO");
    var coThreshold = document.getElementById("coThreshold");
    var TotalMark = document.getElementById("TotalMarks");

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: "array" });
      var sheetName = workbook.SheetNames[0];
      var sheet = workbook.Sheets[sheetName];
      var jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      document.getElementById("gridView1").classList.remove("hidden");
      document.getElementById("gridView2").classList.remove("hidden");

      document.getElementById("gridView4").classList.remove("hidden");
      document.getElementById("gridView5").classList.remove("hidden");
      document.getElementById("gridView6").classList.remove("hidden");
      document.getElementById("gridView8").classList.remove("hidden");

      var numCOs = parseInt(coInput.value);
      var thresHold = parseInt(coThreshold.value);
      var Marks = parseInt(TotalMark.value);
      var numPO = parseInt(totalPO.value);
      var numPSO = parseInt(totalPSO.value);

      //****************************************************************************************************************************************************************************//
      //CREATING FIRST TABLE CIE Marks Entry
      //****************************************************************************************************************************************************************************//

      // numCols = parseInt(coInput.value-1);
      gridView1.innerHTML = ""; // Clear any previous content
      var html = "<table>";
      var html =
        "<div style='text-align: center;'><label style='display: inline;'><img src='img/icons8-info-24.png' alt='Information' style='display: inline; vertical-align: middle;'>Enter total marks assessed for each co as a part continuous internal evaluation.</label></div><table>";

      // Header row with CO-Mapping and CO headers
      html += "<tr>";
      html +=
        "<th colspan=" +
        (1 + numCOs) +
        " class='text-center bg-blue-500 text-white' style='font-size: 30px;'>CIE Marks Entry</th>";
      html += "</tr>";

      html += "<tr>";
      html += "<th class='text-center'>CO-Mapping</th>"; // First column header
      for (var i = 1; i <= numCOs; i++) {
        html += "<th class='text-center'>CO " + i + "</th>"; // CO headers
      }
      html += "</tr>";

      // Row for Total Marks and user input cells
      html += "<tr>";
      html += "<td class='text-center'>Total Marks</td>"; // Total Marks cell
      for (var i = 1; i <= numCOs; i++) {
        html += "<td class='text-center' contenteditable='true'></td>"; // User input cells
      }
      html += "</tr>";

      // Close the table tag
      html += "</table>";

      // Insert the generated HTML into the gridView element
      gridView1.innerHTML = html;

      var table = gridView1.querySelector("table");
      var rows = table.getElementsByTagName("tr");
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        for (var j = 1; j <= numCOs - numCOs; j++) {
          var newCell = document.createElement("td");
          newCell.classList.add("text-center");
          newCell.setAttribute("contenteditable", "true");
          newCell.addEventListener("input", function () {
            this.textContent = this.textContent.replace(/\D/g, "");
          });
          row.appendChild(newCell);
        }
      }

      //Store value in localstorage
      var inputCells = table.querySelectorAll("td[contenteditable='true']");
      var columnValues = {}; // Object to store values for each column

      inputCells.forEach(function (cell) {
        var colIndex = cell.cellIndex;

        cell.addEventListener("input", function () {
          var enteredValue = parseInt(cell.textContent.replace(/\D/g, ""));

          if (!isNaN(enteredValue)) {
            if (!columnValues[colIndex]) {
              columnValues[colIndex] = [];
            }

            columnValues[colIndex] = enteredValue;
            localStorage.setItem("column_values", JSON.stringify(columnValues));
          }

          // console.log("Column-wise values in local storage:", columnValues);
        });
      });

      //****************************************************************************************************************************************************************************//
      //CREATING SECOND TABLE
      //****************************************************************************************************************************************************************************//

      // Initialize the HTML string for the table
      var html = "<table>";

      var html =
        "<div style='text-align: center;'><label style='display: inline;'><img src='img/icons8-info-24.png' alt='Information' style='display: inline; vertical-align: middle;'>Enter marks obtained by students under each CO as a part of CIE.</label></div><table>";
      // Loop through the rows of JSON data
      for (var i = 0; i < jsonData.length; i++) {
        html += "<tr>";

        // Loop through the columns of the current row
        for (var j = 0; j < jsonData[i].length; j++) {
          // If it's the first row, create header cells
          if (i === 0) {
            if (j < 3) {
              html += "<th class='text-center'>" + jsonData[i][j] + "</th>"; // Create header cell with data
            }
          } else {
            if (j < 3) {
              html += "<td class='text-center'>" + jsonData[i][j] + "</td>"; // Create data cell with content
            }
          }

          // Check if it's the first row and the specific column for CO columns
          if (i === 0 && j === 2) {
            for (var k = 0; k < numCOs; k++) {
              html +=
                "<th class='text-center'>CO " +
                (k + 1) +
                "</th> <th class='text-center'>%</th>"; // Create CO column header with colspan
            }
          }
        }

        // Close the row
        html += "</tr>";
      }

      // Close the table tag
      html += "</table>";

      // Insert the generated HTML into the gridView element
      gridView2.innerHTML = html;

      var table = gridView2.querySelector("table");
      var rows = table.getElementsByTagName("tr");

      var rowSize = rows.length - 1;

      for (var i = 1; i < rows.length; i++) {
        for (var j = 3; j < 3 + numCOs * 2; j++) {
          (function (rowIndex, colIndex) {
            // Use IIFE to capture current values of i and j

            var newCell = document.createElement("td");
            newCell.classList.add("text-center");

            if (j < 3 + numCOs * 2) {
              newCell.addEventListener("input", function () {
                var enteredValue = parseInt(
                  this.textContent.replace(/\D/g, "")
                );

                // Store the previous value in a data attribute
                var previousValue = this.getAttribute("data-previous-value");

                // console.log("Row:", rowIndex, "Column:", colIndex, "Value:", enteredValue);
                if (
                  !isNaN(enteredValue) ||
                  (previousValue && enteredValue === "")
                ) {
                  // Update the data attribute with the new value
                  var storedColumnValues = JSON.parse(
                    localStorage.getItem("column_values")
                  );
                  var columnArray = Object.values(storedColumnValues);

                  if (columnArray.length === numCOs) {
                    var columnNumber = (colIndex - 3) / 2 + 1;
                    if (
                      storedColumnValues &&
                      storedColumnValues[columnNumber]
                    ) {
                      this.setAttribute("data-previous-value", enteredValue);
                      var columnValues = storedColumnValues[columnNumber];
                      var storedValue = columnValues;
                      var per = (previousValue / storedValue) * 100;
                      if (enteredValue > storedValue) {
                        // alert("Enter valid value");
                        showToast("Enter valid value", 5000);
                        this.textContent = "";
                        var percentageCellIndex = colIndex + 1;
                        var percentageCell =
                          rows[rowIndex].cells[percentageCellIndex];
                        if (percentageCell) {
                          percentageCell.textContent = "";
                        }
                        this.removeAttribute("data-previous-value");
                        if (previousValue != null && per >= thresHold) {
                          columnsAboveThresholdCounts[columnNumber]--;
                        }
                        updateData();
                      } else {
                        var percentage = (enteredValue / storedValue) * 100;

                        if (previousValue != null && per >= thresHold) {
                          columnsAboveThresholdCounts[columnNumber]--;
                        }
                        if (percentage >= thresHold) {
                          if (!columnsAboveThresholdCounts[columnNumber]) {
                            columnsAboveThresholdCounts[columnNumber] = 1; // Initialize count for the column
                          } else {
                            columnsAboveThresholdCounts[columnNumber]++; // Increment the count
                          }
                        }
                        for (
                          var column = 0;
                          column < columnsAboveThresholdCounts.length;
                          column++
                        ) {
                          var count = columnsAboveThresholdCounts[column] || 0;
                          var percent = (count / (rows.length - 1)) * 100;
                          // console.log("Column", column , ": Count:", count, "Percentage:", percent.toFixed(2) + "%");
                          localStorage.setItem(`column_${column}`, column);
                          localStorage.setItem(
                            `percent_${column}`,
                            percent.toFixed(2)
                          );
                        }
                        updateData();
                        // Set the percentage value in the next cell of the same row
                        var percentageCellIndex = colIndex + 1;
                        var percentageCell =
                          rows[rowIndex].cells[percentageCellIndex];
                        if (percentageCell) {
                          percentageCell.setAttribute(
                            "contenteditable",
                            "false"
                          );
                        }
                        // console.log("Percentage : "+percentage);
                        if (percentageCell) {
                          percentageCell.textContent =
                            percentage.toFixed(2) + "%";
                        }
                      }
                    }
                  } else {
                    showToast("Please Enter data in 1st table", 5000);
                    this.textContent = "";
                  }
                } else {
                  // Clear both the value cell and the corresponding percentage cell
                  this.textContent = "";
                  var percentageCellIndex = colIndex + 1;
                  var percentageCell =
                    rows[rowIndex].cells[percentageCellIndex];
                  if (percentageCell) {
                    percentageCell.textContent = "";
                  }
                }
              });

              newCell.classList.add("text-center");
              newCell.setAttribute("contenteditable", "true");
            } else {
              newCell.setAttribute("contenteditable", "false");
            }

            rows[i].appendChild(newCell);
          })(i, j); // Pass current values of i and j to the IIFE
        }
      }

      var selectedCell = null; // To store the selected cell

      if (refreshCount > 1) {
        columnsAboveThresholdCounts = [];
      }

      // Add a click event listener to the table to track the selected cell
      document
        .getElementById("gridView2")
        .addEventListener("click", function (e) {
          var cell = e.target;
          if (
            cell.tagName === "TD" &&
            cell.getAttribute("contenteditable") === "true"
          ) {
            selectedCell = cell;
          }
        });

      // Add a paste event listener to the entire table
      document
        .getElementById("gridView2")
        .addEventListener("paste", function (e) {
          e.preventDefault();
          if (selectedCell) {
            var clipboardData = e.clipboardData || window.clipboardData;
            var pastedData = clipboardData.getData("text/plain");
            // Split the pasted data into rows
            var rows = pastedData.split(/\r?\n/);
            // Determine the number of rows and columns in the clipboard data
            var numRows = rows.length;
            var numCols = 0;
            for (var i = 0; i < rows.length; i++) {
              var cols = rows[i].split("\t");
              numCols = Math.max(numCols, cols.length);
            }
            // Start pasting data from the selected cell
            var currentRow = selectedCell.parentElement;
            var currentCol = selectedCell.cellIndex;
            for (var i = 0; i < numRows; i++) {
              if (i > 0) {
                currentRow = currentRow.nextElementSibling;
                if (!currentRow) {
                  currentRow = currentRow.parentElement.insertRow();
                  currentRow.innerHTML =
                    "<td class='text-center' contenteditable='true'></td>".repeat(
                      numCols
                    );
                }
                currentCol = selectedCell.cellIndex;
              }

              var cols = rows[i].split("\t");

              for (var j = 0; j < cols.length; j++) {
                currentRow.cells[currentCol].textContent = cols[j];
                // Calculate percentage and display it in the next column cell
                var enteredValue = parseFloat(cols[j]);
                // Store the previous value in a data attribute
                var previousValue = parseFloat(
                  currentRow.cells[currentCol].getAttribute(
                    "data-previous-value"
                  )
                );
                if (
                  !isNaN(enteredValue) ||
                  (previousValue && enteredValue === "")
                ) {
                  var storedColumnValues = JSON.parse(
                    localStorage.getItem("column_values")
                  );
                  if (storedColumnValues != null) {
                    var columnNumber = (currentCol - 3) / 2 + 1; // Use currentCol instead of colIndex
                    if (
                      storedColumnValues &&
                      storedColumnValues[columnNumber]
                    ) {
                      this.setAttribute("data-previous-value", enteredValue);

                      var columnValues = storedColumnValues[columnNumber];
                      var storedValue = columnValues;
                      var per = (previousValue / storedValue) * 100;

                      if (enteredValue > storedValue) {
                        showToast(
                          "Value " +
                            enteredValue +
                            " cannot paste as it is greater than Total marks",
                          5000
                        );
                        currentRow.cells[currentCol].textContent = "";
                        if (previousValue != null && per >= thresHold) {
                          columnsAboveThresholdCounts[columnNumber]--;
                        }
                        currentRow.cells[currentCol].removeAttribute(
                          "data-previous-value"
                        );
                        currentCol++;
                        updateData();
                      } else {
                        var percentage = (enteredValue / storedValue) * 100;
                        currentRow.cells[currentCol].setAttribute(
                          "data-previous-value",
                          enteredValue
                        );
                        if (previousValue != null && per >= thresHold) {
                          columnsAboveThresholdCounts[columnNumber]--;
                        }
                        if (percentage >= thresHold) {
                          if (!columnsAboveThresholdCounts[columnNumber]) {
                            columnsAboveThresholdCounts[columnNumber] = 1; // Initialize count for the column
                          } else {
                            columnsAboveThresholdCounts[columnNumber]++; // Increment the count
                          }
                        }
                        for (
                          var column = 0;
                          column < columnsAboveThresholdCounts.length;
                          column++
                        ) {
                          var count = columnsAboveThresholdCounts[column] || 0;
                          var percent = (count / rowSize) * 100;
                          localStorage.setItem(`column_${column}`, column);
                          localStorage.setItem(
                            `percent_${column}`,
                            percent.toFixed(2)
                          );
                        }
                        updateData();
                        var percentageCellIndex = currentCol + 1;
                        var percentageCell =
                          currentRow.cells[percentageCellIndex];
                        if (percentageCell) {
                          percentageCell.setAttribute(
                            "contenteditable",
                            "false"
                          );
                        }
                        if (percentageCell) {
                          percentageCell.textContent =
                            percentage.toFixed(2) + "%";
                        }
                        // Move to the next cell (leave one column for percentage)
                        currentCol++;
                      }
                    }
                  } else {
                    showToast("Please Enter data in 1st table", 5000);
                    currentRow.cells[currentCol].textContent = "";
                    // Remove the event listener
                    document
                      .getElementById("gridView2")
                      .removeEventListener("paste");
                  }
                } else {
                  // Clear both the value cell and the corresponding percentage cell
                  currentRow.cells[currentCol].textContent = "";
                  showToast("cannot paste Non Integer value", 5000);
                }
                currentCol++;
              }
            }
          }
        });
      
      //****************************************************************************************************************************************************************************//
      //CREATING FORTH TABLE FEEDBACK
      //****************************************************************************************************************************************************************************//

      var gridView4 = document.getElementById("gridView4");
      gridView4.innerHTML = ""; // Clear any previous content

      var html = "<table>";
      var html =
        "<div style='text-align: center;'><label style='display: inline;'><img src='img/icons8-info-24.png' alt='Information' style='display: inline; vertical-align: middle;'>Enter feedback values for each CO given by the student.</label></div><table>";

      html += "<tr>";
      html +=
        "<th colspan=" +
        (numCOs + 2) +
        " class='text-center bg-blue-500 text-white' style='font-size: 30px;'>Feedback Score</th>";
      html += "</tr>";

      html += "<tr>";
      // Iterate over jsonData and add rows with the first 2 columns from JSON data
      for (var i = 0; i < jsonData.length; i++) {
        // Loop through the first 2 columns of the current JSON data row
        for (var j = 0; j < 2; j++) {
          if (i === 0) {
            if (j < 3) {
              html += "<th class='text-center'>" + jsonData[i][j] + "</th>"; // Create header cell with data
            }
          }

          // Check if it's the first row and the specific column for CO columns
          if (i === 0 && j === 1) {
            for (var k = 0; k < numCOs; k++) {
              html += "<th class='text-center'>CO " + (k + 1) + "</th>"; // Create CO column header with colspan
            }
          }
        }
      }
      html += "</tr>";

      for (var i = 1; i < jsonData.length; i++) {
        html += "<tr>";
        // Loop through the first 2 columns of the current JSON data row
        for (var j = 0; j < 2; j++) {
          if (i > 0) {
            if (j < 3) {
              html += "<td class='text-center'>" + jsonData[i][j] + "</td>"; // Create data cell with content
            }
          }
        }

        for (var j = 1; j <= numCOs; j++) {
          html +=
            "<td class='text-center' contenteditable='true' data-row='" +
            i +
            "' data-col='" +
            j +
            "'></td>"; // Editable cells with data attributes
        }

        // Close the row
        html += "</tr>";
      }

      for (var i = 1; i <= rows.length - 1; i++) {
        html += "<tr>";

        html += "</tr>";
      }

      // Close the table tag
      html += "</table>";

      // Insert the generated HTML into the gridView element
      gridView4.innerHTML = html;

      // Add event listener to the editable cells
      var table2 = gridView4.querySelector("table");

      var editableCells = table2.querySelectorAll('[contenteditable="true"]');
      editableCells.forEach(function (cell) {
        cell.addEventListener("input", function () {
          var row = this.getAttribute("data-row");
          var col = this.getAttribute("data-col");
          var value = parseInt(this.textContent.replace(/\D/g, ""));

          if (!isNaN(value) && (value === 1 || value === 2 || value === 3)) {
            calculateAndSaveColumnAverage(col);
          } else {
            showToast("Invalid value" + value, 5000);
            // Invalid input, reset the cell
            this.textContent = "";
          }
        });
      });

      function calculateAndSaveColumnAverage(col) {
        var cellsInColumn = document.querySelectorAll(
          '[data-col="' + col + '"]'
        );
        var total = 0;
        var count = 0;

        cellsInColumn.forEach(function (cell) {
          var value = parseInt(cell.textContent.replace(/\D/g, ""), 10);
          if (!isNaN(value)) {
            total += value;
            count++;
          }
        });

        if (count > 0) {
          var average = total / (rows.length - 1);
          localStorage.setItem("col_" + col + "_average", average);
          updateData();
        } else {
          localStorage.removeItem("col_" + col + "_average"); // Remove from local storage if no valid values
        }
      }

      var selectedCell = null; // To store the selected cell

      // Add a click event listener to the table to track the selected cell
      document
        .getElementById("gridView4")
        .addEventListener("click", function (e) {
          var cell = e.target;
          if (
            cell.tagName === "TD" &&
            cell.getAttribute("contenteditable") === "true"
          ) {
            selectedCell = cell;
          }
        });

      // Add a paste event listener to the entire table
      document
        .getElementById("gridView4")
        .addEventListener("paste", function (e) {
          e.preventDefault();
          if (selectedCell) {
            var clipboardData = e.clipboardData || window.clipboardData;
            var pastedData = clipboardData.getData("text/plain");

            // Check if all pasted data is numeric
            if (!isValidNumericData(pastedData)) {
              showToast(
                "Cannot paste text. Please Copy integer values only",
                5000
              );
              return; // Stop processing if data is not valid
            }

            // Split the pasted data into rows
            var rows = pastedData.split(/\r?\n/);

            // Determine the number of rows and columns in the clipboard data
            var numRows = rows.length;
            var numCols = 0;
            for (var i = 0; i < rows.length; i++) {
              var cols = rows[i].split("\t");
              numCols = Math.max(numCols, cols.length);
            }

            // Start pasting data from the selected cell
            var currentRow = selectedCell.parentElement;
            var currentCol = selectedCell.cellIndex;

            for (var i = 0; i < numRows; i++) {
              if (i > 0) {
                currentRow = currentRow.nextElementSibling;
                if (!currentRow) {
                  currentRow = currentRow.parentElement.insertRow();
                  currentRow.innerHTML =
                    "<td class='text-center' contenteditable='true'></td>".repeat(
                      numCols
                    );
                }
                currentCol = selectedCell.cellIndex;
              }
              var cols = rows[i].split("\t");

              for (var j = 0; j < cols.length; j++) {
                currentRow.cells[currentCol].textContent = cols[j];

                // Calculate and save column average
                var value = parseInt(cols[j]);
                var col = currentRow.cells[currentCol].getAttribute("data-col"); // Corrected line

                if (
                  !isNaN(value) &&
                  (value === 1 || value === 2 || value === 3)
                ) {
                  calculateAndSaveColumnAverage(col);
                } else {
                  showToast("Invalid value : " + value, 5000);
                  // Invalid input, reset the cell
                  currentRow.cells[currentCol].textContent = "";
                }
                currentCol++;
              }
            }
          }
        });

      //****************************************************************************************************************************************************************************//
      //CREATING FIFTH TABLE
      //****************************************************************************************************************************************************************************//
      function updateData() {
        var gridView5 = document.getElementById("gridView5");

        gridView5.innerHTML = ""; // Clear any previous content

        var table = document.createElement("table");
        table.classList.add("border", "border-gray-800");

        // Header row with CO-Mapping and CO headers
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = `
          <th rowspan='2' class='text-center border border-gray-800 text-white bg-blue-500'></th>
          <th colspan='2' class='text-center border border-gray-800 text-white bg-blue-500'>CIE</th>
       
          <th class='text-center border border-gray-800 bg-blue-500 text-white'>Feedback</th>
          <th rowspan='2' class='text-center border border-gray-800 text-white bg-blue-500'>Total CO Attainment</th>
        `;

        var subHeaderRow = document.createElement("tr");
        subHeaderRow.innerHTML = `
          <th class='text-center border border-gray-800 bg-blue-500 text-white'>%</th>
          <th class='text-center border border-gray-800 bg-blue-500 text-white'>Score</th>
        
          <th class='text-center border border-gray-800 bg-blue-500 text-white'>Score</th>
        `;

        table.appendChild(headerRow);
        table.appendChild(subHeaderRow);

        // CO rows
        for (var i = 1; i <= numCOs; i++) {
          var score = 0;
          var calculatedValue = 0;

          var coRow = document.createElement("tr");
          coRow.innerHTML = `<td class='border border-gray-800 font-bold'>CO ${i}</td>`;

          for (
            var column = i;
            column < columnsAboveThresholdCounts.length;
            column++
          ) {
            var storedColumn = localStorage.getItem(`column_${column}`);
            var storedPercent = localStorage.getItem(`percent_${column}`);

            if (storedColumn != 0) {
              coRow.innerHTML += `<td class='text-center border border-gray-800'>${storedPercent}</td>`;

              var percent = parseFloat(storedPercent);

              if (percent >= 0 && percent <= 35) {
                score = 0;
              } else if (percent > 35 && percent <= 50) {
                score = 1;
              } else if (percent > 50 && percent <= 70) {
                score = 2;
              } else if (percent > 70 && percent <= 100) {
                score = 3;
              }

              coRow.innerHTML += `<td class='text-center border border-gray-800'>${score}</td>`;

              break;
            }
          }

          for (var j = 1; j <= 2; j++) {
            var td = document.createElement("td");
            td.className = "text-center border border-gray-800";

            var averageKey = "col_" + i + "_average";
            var average = localStorage.getItem(averageKey);
            average = parseFloat(average).toFixed(2);

            var rowAverage = localStorage.getItem("rowAverage");

            if (j === 1) {
              td.textContent = average !== null ? average : "";
            } else if (j === 2) {
              // Ensure that the cells exist before trying to access their textContent
              var coRowCellValue3 = coRow.cells[2]
                ? parseFloat(coRow.cells[2].textContent.trim())
                : 0;
              var coRowCellValue4 = coRow.cells[3]
                ? parseFloat(coRow.cells[3].textContent.trim())
                : 0;

              calculatedValue =
                0.8 * coRowCellValue3 +
                // coRowCellValue4 * 0.3 +
                0.2 * coRowCellValue4;
              calculatedValue = parseFloat(calculatedValue).toFixed(2);

              var cellKey = "row_" + i + "_calculatedValue";

              localStorage.setItem(cellKey, calculatedValue);
              processData(cellData);

              td.textContent = calculatedValue;
              td.classList.add("font-bold");
            }
            coRow.appendChild(td);
          }
          table.appendChild(coRow);
        }
        gridView5.appendChild(table);
      }

      //****************************************************************************************************************************************************************************//
      //CREATING sixth TABLE
      //****************************************************************************************************************************************************************************//

      var gridView6 = document.getElementById("gridView6");
      // Clear any previous content
      gridView6.innerHTML = "";

      var html = "<table>";

      html += "<tr>";
      html +=
        "<th colspan=5 class='text-center bg-blue-500 text-white' style='font-size: 30px;'>LEVEL OF ATTAINMENT</th>"; // First column header
      html += "</tr>";
      // Header row with Level, 0, 1, 2, and 3 headers
      html += "<tr>";
      html += "<th class='text-center'>Level</th>"; // First column header
      for (var i = 1; i <= 3; i++) {
        html += "<th class='text-center'>" + i + "</th>"; // Column headers
      }
      html += "</tr>";

      // Row 2 with %CO attainment data
      html += "<tr>";
      html += "<td class='text-center'>Correlation</td>"; // First column cell
      html += "<td class='text-center'>Low</td>"; // Data for columns 35 to 50%
      html += "<td class='text-center'>Moderate</td>"; // Data for columns 50 to 70%
      html += "<td class='text-center'>Strong</td>"; // Data for columns 70 to 100%
      html += "</tr>";

      // Close the table tag
      html += "</table>";

      // Insert the generated HTML into the gridView6 element
      gridView6.innerHTML = html;

      //****************************************************************************************************************************************************************************//
      //CREATING EIGHTH TABLE
      //****************************************************************************************************************************************************************************//

      var gridView8 = document.getElementById("gridView8");

      gridView8.innerHTML = ""; // Clear any previous content

      // var table = document.createElement("table");

      var html = "<table>";
      var html =
        "<div style='text-align: center;'><label style='display: inline;'><img src='img/icons8-info-24.png' alt='Information' style='display: inline; vertical-align: middle;'>Enter CO PO and PSO correlation values.</label></div><table>";

      html += "<tr>";
      html +=
        "<th colspan=" +
        (numPO + numPSO + 2) +
        " class='text-center bg-blue-500 text-white' style='font-size: 30px;' >PO/PSO Attainment of the Course</th>";
      html += "</tr>";

      html += "<tr>";
      html += "<th class='text-center'>PO</th>"; // First column header
      for (var i = 1; i <= numPO; i++) {
        html += "<th class='text-center'>PO " + i + "</th>";
        if (i == numPO) {
          for (var j = 1; j <= numPSO; j++) {
            html += "<th class='text-center'>PSO " + j + "</th>";
          }
        }
        
      }
      html += "</tr>";

      for (var i = 1; i <= numCOs + 1; i++) {
        html += "<tr>";
        if (i <= numCOs) {
          html += "<td class='text-center'>CO" + i + "</td>";
        } else {
          html += "<td class='text-center font-bold'>PO Attainment</td>";
        }

        if (i <= numCOs) {
          for (var j = 1; j <= numPO + numPSO; j++) {
            html +=
              "<td class='text-center' contenteditable='true' oninput='trackValue(this, " +
              i +
              ", " +
              j +
              ")'></td>";
          }
        } else {
          for (var j = 1; j <= numPO + numPSO; j++) {
            var tdId = "td_" + j; // Create a unique ID for each <td>
            html += "<td id='" + tdId + "' class='text-center font-bold'></td>";
          }
        }
        html += "</tr>";
      }

      // Close the table tag
      html += "</table>";

      // Insert the generated HTML into the gridView element
      gridView8.innerHTML = html;

      var selectedCell = null; // To store the selected cell

      // Add a click event listener to the table to track the selected cell
      document
        .getElementById("gridView8")
        .addEventListener("click", function (e) {
          var cell = e.target;
          if (
            cell.tagName === "TD" &&
            cell.getAttribute("contenteditable") === "true"
          ) {
            selectedCell = cell;
          }
        });

      document
        .getElementById("gridView8")
        .addEventListener("paste", function (e) {
          e.preventDefault();
          if (selectedCell) {
            var clipboardData = e.clipboardData || window.clipboardData;
            var pastedData = clipboardData.getData("text/plain");

            if (!isValidNumericData(pastedData)) {
              showToast(
                "Cannot paste text. Please copy integer values only.",
                5000
              );
              return; // Stop processing if data is not valid
            }

            // Split the pasted data into rows
            var rows = pastedData.split(/\r?\n/);

            // Determine the number of rows and columns in the clipboard data
            var numRows = rows.length;
            var numCols = 0;
            for (var i = 0; i < rows.length; i++) {
              var cols = rows[i].split("\t");
              numCols = Math.max(numCols, cols.length);
            }

            // Start pasting data from the selected cell
            var currentRow = selectedCell.parentElement;
            var currentCol = selectedCell.cellIndex;

            for (var i = 0; i < numRows; i++) {
              if (i > 0) {
                currentRow = currentRow.nextElementSibling;
                if (!currentRow) {
                  currentRow = currentRow.parentElement.insertRow();
                  currentRow.innerHTML =
                    "<td class='text-center' contenteditable='true'></td>".repeat(
                      numCols
                    );
                }
                currentCol = selectedCell.cellIndex;
              }
              var cols = rows[i].split("\t");

              for (var j = 0; j < cols.length; j++) {
                currentRow.cells[currentCol].textContent = cols[j];

                // Calculate and save column average
                var enteredValue = parseFloat(cols[j]);

                if (
                  !isNaN(enteredValue) &&
                  (enteredValue === 1 ||
                    enteredValue === 2 ||
                    enteredValue === 3)
                ) {
                  trackValue(
                    currentRow.cells[currentCol],
                    currentRow.rowIndex - 1,
                    currentCol,
                    enteredValue
                  );
                } else {
                  showToast("Invalid Value " + enteredValue);
                  // Invalid input, reset the cell
                  currentRow.cells[currentCol].textContent = "";
                }
                currentCol++; // Increment the column index here
              }
            }
          }
        });
    };

    reader.readAsArrayBuffer(file);
  });
});

// Form Validation
function validateNumberInput(input, id) {
  // Remove any non-numeric characters
  input.value = input.value.replace(/[^0-9]/g, "");

  // Convert the input value to a number
  const enteredNumber = parseInt(input.value, 10);

  if (
    input.id == "totalCO" ||
    input.id === "totalPO" ||
    input.id === "totalPSO"
  ) {
    // Check if the entered number is greater than the specified maximum
    if (enteredNumber > 20) {
      // If it's greater than the maximum, set the input value to the maximum
      showToast("Enter valid number");
      input.value = "";
    }
  }

  if (input.id === "coThreshold" || input.id === "TotalMarks") {
    if (enteredNumber > 100) {
      // If it's greater than the maximum, set the input value to the maximum
      showToast("Enter valid value");
      input.value = "";
    }
  }
}
function validateYearRangeInput(input) {
  // Remove any non-digit characters except hyphen (-) from the input value
  var yearRange = input.value.replace(/[^\d-]/g, "");

  if (input.value != "") {
    // Check if the input matches the yyyy-yyyy pattern
    if (/^\d{4}-\d{4}$/.test(yearRange)) {
      var years = yearRange.split("-");
      var startYear = parseInt(years[0]);
      var endYear = parseInt(years[1]);

      // You can define a range of acceptable years here
      var minYear = 1900;
      var cYear = new Date().getFullYear();
      var maxYear = cYear + 1;

      if (startYear >= minYear && endYear <= maxYear && startYear <= endYear) {
        // If the input is within the acceptable range, leave it as is
        input.value = yearRange;
      } else {
        // If the input is not within the acceptable range, clear the input
        input.value = "";
        showToast("Invalid year");
      }
    } else {
      // If the input does not match the yyyy-yyyy pattern, clear the input
      input.value = "";
      showToast("Enter valid year");
    }
  }
}

function checkEnter(event) {
  if (event.key === "Enter") {
    // When Enter is pressed, trigger the validation
    validateYearRangeInput(document.getElementById("academicYear"));
  }
}

function validateTextInput(input) {
  // Remove any numeric characters
  input.value = input.value.replace(/[0-9]/g, "");
}

var columnValues = [];
var columnSums = [];
var columnDivisions = [];
var cellData = [];

function trackValue(cell, row, col, enteredValue) {
  var enteredValue = parseFloat(cell.innerText).toFixed(2);

  if (
    !isNaN(enteredValue) &&
    (enteredValue === "0.00" ||
      enteredValue === "1.00" ||
      enteredValue === "2.00" ||
      enteredValue === "3.00")
  ) {
    // Check if data for the same row and column is already present in cellData
    var existingDataIndex = cellData.findIndex(function (cellInfo) {
      return cellInfo.row === row && cellInfo.col === col;
    });

    if (existingDataIndex !== -1) {
      // Data for the same row and column is already present, update it
      cellData[existingDataIndex].value = enteredValue;
    } else {
      // Data for the row and column is not present, create a new object and push it to cellData
      var cellInfo = {
        row: row,
        col: col,
        value: enteredValue,
      };
      cellData.push(cellInfo);
    }

    // Calculate column sums based on cellData
    calculateColumnSums();
    // Update the column sum for the current column
    if (!columnValues[col]) {
      columnValues[col] = 0;
    }

    if (!columnSums[col]) {
      columnSums[col] = 0;
    }

    // Determine the number of rows and columns based on the data
    var numRows = Math.max(...cellData.map((cell) => cell.row));
    var numColumns = Math.max(...cellData.map((cell) => cell.col));

    // Initialize column totals to zero
    for (var col = 1; col <= numColumns; col++) {
      columnValues[col] = 0;
    }

    // Loop through cellData to calculate column totals
    for (var row = 1; row <= numRows; row++) {
      // Loop through rows
      for (var col = 1; col <= numColumns; col++) {
        // Loop through columns
        var cellKey = "row_" + row + "_calculatedValue";

        // Retrieve the calculatedValue from localStorage
        var calculatedValue = localStorage.getItem(cellKey);
        calculatedValue = parseFloat(calculatedValue) || 0; // Convert to a float

        // Find the cell in cellData that matches the current row and column
        var cell = cellData.find(function (cellInfo) {
          return cellInfo.row === row && cellInfo.col === col;
        });

        if (cell) {
          // console.log("cell value : " + cell.value);
          var total = cell.value * calculatedValue;
          columnValues[col] += total; // Accumulate the total for the current column
        }
      }
    }

    for (var i = 0; i < columnValues.length; i++) {
      if (columnSums[i] !== 0) {
        // Avoid division by zero
        columnDivisions[i] = columnValues[i] / columnSums[i];
      } else {
        columnDivisions[i] = 0; // You can handle division by zero differently if needed
      }
    }

    // Update the last row with the calculated values
    updateLastRow(columnDivisions);
  } else {
    showToast("Enter valid value", 5000);
    cell.innerText = "";
  }
}

function processData(cellData) {
  // Inside this function, you can access row, column, and value information
  cellData.forEach(function (cellInfo) {
    var row = cellInfo.row;
    var col = cellInfo.col;
    var value = cellInfo.value;

    calculateColumnSums();

    if (!columnValues[col]) {
      columnValues[col] = 0;
    }

    if (!columnSums[col]) {
      columnSums[col] = 0;
    }

    // Determine the number of rows and columns based on the data
    var numRows = Math.max(...cellData.map((cell) => cell.row));
    var numColumns = Math.max(...cellData.map((cell) => cell.col));

    // Initialize column totals to zero
    for (var col = 1; col <= numColumns; col++) {
      columnValues[col] = 0;
    }

    // Loop through cellData to calculate column totals
    for (var row = 1; row <= numRows; row++) {
      // Loop through rows
      for (var col = 1; col <= numColumns; col++) {
        // Loop through columns
        var cellKey = "row_" + row + "_calculatedValue";

        // Retrieve the calculatedValue from localStorage
        var calculatedValue = localStorage.getItem(cellKey);
        calculatedValue = parseFloat(calculatedValue) || 0; // Convert to a float

        // Find the cell in cellData that matches the current row and column
        var cell = cellData.find(function (cellInfo) {
          return cellInfo.row === row && cellInfo.col === col;
        });

        if (cell) {
          // console.log("cell value : " + cell.value);
          var total = cell.value * calculatedValue;
          columnValues[col] += total; // Accumulate the total for the current column
        }
      }
    }

    for (var i = 0; i < columnValues.length; i++) {
      if (columnSums[i] !== 0) {
        // Avoid division by zero
        columnDivisions[i] = columnValues[i] / columnSums[i];
      } else {
        columnDivisions[i] = 0; // You can handle division by zero differently if needed
      }
    }

    // Update the last row with the calculated values
    updateLastRow(columnDivisions);
    // Do something with row, column, and value here
  });

  // You can perform additional operations with cellData if needed
}

// Function to calculate column sums from cellData
function calculateColumnSums() {
  // Initialize and columnSums arrays
  columnSums = [];

  // Iterate through cellData and calculate column sums
  for (var i = 0; i < cellData.length; i++) {
    var cellInfo = cellData[i];
    var col = cellInfo.col;
    var value = parseFloat(cellInfo.value);

    if (!columnSums[col]) {
      columnSums[col] = 0;
    }
    columnSums[col] += value;
  }
  // console.log("Sum : ", columnSums);
}

function updateLastRow(columnDivisions) {
  // Loop through the cells and assign columnDivisions values
  for (var i = 1; i < columnDivisions.length; i++) {
    // Assuming your table cells have IDs like 'cell_0', 'cell_1', ...
    var cellId = "td_" + i;

    // Get the cell element by its ID
    var cell = document.getElementById(cellId);

    // Check if the cell exists and assign the corresponding value
    if (cell) {
      cell.innerText = columnDivisions[i].toFixed(2); // Displaying the value with 2 decimal places

      cell.classList.add("highlight"); // Add a CSS class 'highlight' to the cell
    } else {
      console.warn("Cell with ID " + cellId + " not found.");
    }
  }
}

// Function to show the toast message
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, duration);
  }
}

// Disable page reload
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "Are you sure you want to leave this page?";
});

//new
// Function to show the "Print Page" button
function showPrintButton() {
  const printButton = document.getElementById("printButton");
  printButton.removeAttribute("hidden");
}

// Attach the printPage function to the print button
document.getElementById("printButton").addEventListener("click", printPage);
