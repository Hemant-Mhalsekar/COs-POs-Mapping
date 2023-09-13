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
      <h2 class="text-2xl font-bold">Input Information</h2>
      <div class="mt-4">
  `;

    if (poValues.length > 0) {
      displayContent += `
          <p class="mb-2"><strong class="text-indigo-700">PO Inputs:</strong></p>
          <ul class="list-disc ml-6">
      `;
      poValues.forEach((value, index) => {
        displayContent += `<li>PO ${index + 1}: ${value}</li>`;
      });
      displayContent += `</ul>`;
    }

    if (coValues.length > 0) {
      displayContent += `
          <p class="mt-4 mb-2"><strong class="text-indigo-700">CO Inputs:</strong></p>
          <ul class="list-disc ml-6">
      `;
      coValues.forEach((value, index) => {
        displayContent += `<li>CO ${index + 1}: ${value}</li>`;
      });
      displayContent += `</ul>`;
    }

    if (psoValues.length > 0) {
      displayContent += `
          <p class="mt-4 mb-2"><strong class="text-indigo-700">PSO Inputs:</strong></p>
          <ul class="list-disc ml-6">
      `;
      psoValues.forEach((value, index) => {
        displayContent += `<li>PSO ${index + 1}: ${value}</li>`;
      });
      displayContent += `</ul>`;
    }

    displayContent += `</div>`;

    display.innerHTML = displayContent;
  });

  // ISA Mapping Form JavaScript
  document.getElementById("loadButton").addEventListener("click", function () {
    var fileInput = document.getElementById("fileInput");
    var gridView1 = document.getElementById("gridView1");
    var gridView2 = document.getElementById("gridView2");

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
      document.getElementById("gridView3").classList.remove("hidden");
      document.getElementById("gridView4").classList.remove("hidden");
      document.getElementById("gridView5").classList.remove("hidden");
      document.getElementById("gridView6").classList.remove("hidden");

      var numCOs = parseInt(coInput.value);
      var thresHold = parseInt(coThreshold.value);
      var Marks = parseInt(TotalMark.value);

      //****************************************************************************************************************************************************************************//
      //CREATING FIRST TABLE CIE Marks Entry
      //****************************************************************************************************************************************************************************//

      // numCols = parseInt(coInput.value-1);
      gridView1.innerHTML = ""; // Clear any previous content
      var html = "<table>";

      // Header row with CO-Mapping and CO headers
      html += "<tr>";
      html +=
        "<th colspan=" +
        (1 + numCOs) +
        " class='text-center'>CIE Marks Entry</th>";
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

      localStorage.clear();

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

      var columnsAboveThresholdCounts = [];

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
                // console.log("Row:", rowIndex, "Column:", colIndex, "Value:", enteredValue);

                if (!isNaN(enteredValue)) {
                  var storedColumnValues = JSON.parse(
                    localStorage.getItem("column_values")
                  );
                  var columnNumber = (colIndex - 3) / 2 + 1;

                  if (storedColumnValues && storedColumnValues[columnNumber]) {
                    var columnValues = storedColumnValues[columnNumber];
                    var storedValue = columnValues;

                    if (enteredValue > storedValue) {
                      alert("Enter valid value");
                      this.textContent = "";
                      columnsAboveThresholdCounts[columnNumber]--;
                    } else {
                      var percentage = (enteredValue / storedValue) * 100;

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
                        percentageCell.setAttribute("contenteditable", "false");
                      }
                      // console.log("Percentage : "+percentage);

                      if (percentageCell) {
                        percentageCell.textContent =
                          percentage.toFixed(2) + "%";
                      }
                    }
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

      //****************************************************************************************************************************************************************************//
      //CREATING THIRD TABLE SEE MARKS ENTRY
      //****************************************************************************************************************************************************************************//

      var gridView3 = document.getElementById("gridView3");
      gridView3.innerHTML = ""; // Clear any previous content

      var html = "<table>";

      html += "<tr>";
      html += "<th colspan='4' class='text-center'>SEE MARKS ENTRY</th>"; // CIE header
      html += "</tr>";
      // Header row with CO-Mapping and CO headers
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
        }
      }
      html += "<th class='text-center'>Marks Obtained</th>"; // Editable column header
      html += "<th class='text-center'>SEE percentage</th>"; // Non-editable column header

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
        // Add an editable cell in the third column
        html += "<td class='text-center' contenteditable='true'></td>"; // Editable cell

        // Add a non-editable cell in the fourth column
        html += "<td class='text-center'></td>"; // Non-editable cell
        // Close the row
        html += "</tr>";
      }

      // Close the table tag
      html += "</table>";

      // Set the HTML content of the gridView3 element
      gridView3.innerHTML = html;

      var rowTotalSum = 0;
      var rowCount = rows.length - 1;

      // Attach event listeners to editable cells for value change
      gridView3.addEventListener("input", function (event) {
        var target = event.target;
        if (
          target.tagName === "TD" &&
          target.getAttribute("contenteditable") === "true"
        ) {
          calculatePercentage(target);
          calculateRowAverage();
        }
      });

      // Function to calculate and display percentage
      function calculatePercentage(targetCell) {
        var row = targetCell.parentNode; // Get the parent row
        var cells = row.getElementsByTagName("td"); // Get all cells in the row
        var enteredValue = parseFloat(cells[2].textContent); // Get the value from the first cell

        if (!isNaN(enteredValue) && Marks !== 0) {
          if (enteredValue > Marks) {
            alert("Enter a valid value that is not greater than Marks.");
            cells[2].textContent = ""; // Clear the value in the first cell
            cells[3].textContent = ""; // Clear the second cell
          } else {
            var percentage = (enteredValue / Marks) * 100; // Calculate the percentage
            cells[3].textContent = percentage.toFixed(2) + "%"; // Display the percentage in the second cell

            rowTotalSum += percentage;
          }
        } else {
          cells[1].textContent = ""; // Clear the second cell if the calculation is not possible
        }
      }

      function calculateRowAverage() {
        if (rowCount > 0) {
          var rowAverage = rowTotalSum / rowCount;
          // console.log("Average : " + rowAverage);
          localStorage.setItem("rowAverage", rowAverage);
          updateData();
        } else {
          console.log("Invalid"); // Clear the average cell if there are no valid values
        }
      }

      //****************************************************************************************************************************************************************************//
      //CREATING FORTH TABLE FEEDBACK
      //****************************************************************************************************************************************************************************//

      var gridView4 = document.getElementById("gridView4");
      gridView4.innerHTML = ""; // Clear any previous content

      var html = "<table>";

      html += "<tr>";
      html +=
        "<th colspan=" +
        (numCOs + 2) +
        " class='text-center'>Feedback Score</th>";
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
          console.log("Row: " + row + ", Column: " + col + ", Value: " + value);

          if (!isNaN(value) && (value === 1 || value === 2 || value === 3)) {
            calculateAndSaveColumnAverage(col);
          } else {
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
          console.log("column : " + col + " Average : " + average);
          updateData();
        } else {
          localStorage.removeItem("col_" + col + "_average"); // Remove from local storage if no valid values
        }
      }

      //****************************************************************************************************************************************************************************//
      //CREATING FIFTH TABLE
      //****************************************************************************************************************************************************************************//
      function updateData() {
        var gridView5 = document.getElementById("gridView5");

        gridView5.innerHTML = ""; // Clear any previous content

        var table = document.createElement("table");

        // Header row with CO-Mapping and CO headers
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = `
          <th rowspan='2' class='text-center'></th>
          <th colspan='2' class='text-center'>CIE</th>
          <th class='text-center'>SEE</th>
          <th class='text-center'>Feedback</th>
          <th rowspan='2' class='text-center'>Total CO Attainment</th>
        `;

        var subHeaderRow = document.createElement("tr");
        subHeaderRow.innerHTML = `
          <th class='text-center'>%</th>
          <th class='text-center'>Score</th>
          <th class='text-center'>Score</th>
          <th class='text-center'>Score</th>
        `;

        table.appendChild(headerRow);
        table.appendChild(subHeaderRow);

        // CO rows
        for (var i = 1; i <= numCOs; i++) {
          var score = 0;
          var calculatedValue = 0;

          var coRow = document.createElement("tr");
          coRow.innerHTML = `<td>CO ${i}</td>`;

          for (
            var column = i;
            column < columnsAboveThresholdCounts.length;
            column++
          ) {
            var storedColumn = localStorage.getItem(`column_${column}`);
            var storedPercent = localStorage.getItem(`percent_${column}`);

            if (storedColumn != 0) {
              coRow.innerHTML += `<td class='text-center'>${storedPercent}</td>`;

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

              coRow.innerHTML += `<td class='text-center'>${score}</td>`;
              break;
            }
          }

          for (var j = 1; j <= 3; j++) {
            var td = document.createElement("td");
            td.className = "text-center";

            var averageKey = "col_" + i + "_average";
            var average = localStorage.getItem(averageKey);
            average = parseFloat(average).toFixed(2);

            var rowAverage = localStorage.getItem("rowAverage");

            if (j === 1) {
              if (rowAverage >= 0 && rowAverage <= 35) {
                score = 0;
              } else if (rowAverage > 35 && rowAverage <= 50) {
                score = 1;
              } else if (rowAverage > 50 && rowAverage <= 70) {
                score = 2;
              } else if (rowAverage > 70 && rowAverage <= 100) {
                score = 3;
              }

              td.textContent = score;
            } else if (j === 2) {
              td.textContent = average !== null ? average : "";
            } else if (j === 3) {
              // Ensure that the cells exist before trying to access their textContent
              var coRowCellValue3 = coRow.cells[2]
                ? parseFloat(coRow.cells[2].textContent.trim())
                : 0;
              var coRowCellValue4 = coRow.cells[3]
                ? parseFloat(coRow.cells[3].textContent.trim())
                : 0;
              var coRowCellValue5 = coRow.cells[4]
                ? parseFloat(coRow.cells[4].textContent.trim())
                : 0;

              console.log(
                "coRowCellValue3 : " +
                  coRowCellValue3 +
                  " coRowCellValue4 " +
                  coRowCellValue4 +
                  "  coRowCellValue5 " +
                  coRowCellValue5
              );

              calculatedValue =
                0.6 * coRowCellValue3 +
                coRowCellValue4 * 0.3 +
                coRowCellValue5 * 0.1;
              calculatedValue = parseFloat(calculatedValue).toFixed(2);

              td.textContent = calculatedValue;
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
      html += "<th colspan=5 class='text-center'>LEVEL OF ATTAINMENT</th>"; // First column header
      html += "</tr>";
      // Header row with Level, 0, 1, 2, and 3 headers
      html += "<tr>";
      html += "<th class='text-center'>Level</th>"; // First column header
      for (var i = 0; i <= 3; i++) {
        html += "<th class='text-center'>" + i + "</th>"; // Column headers
      }
      html += "</tr>";

      // Row 2 with %CO attainment data
      html += "<tr>";
      html += "<td class='text-center'>%CO attainment</td>"; // First column cell
      html += "<td class='text-center'>0 to 35%</td>"; // Data for columns 0 to 35%
      html += "<td class='text-center'>35 to 50%</td>"; // Data for columns 35 to 50%
      html += "<td class='text-center'>50 to 70%</td>"; // Data for columns 50 to 70%
      html += "<td class='text-center'>70 to 100%</td>"; // Data for columns 70 to 100%
      html += "</tr>";

      // Close the table tag
      html += "</table>";

      // Insert the generated HTML into the gridView6 element
      gridView6.innerHTML = html;
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
      alert("Enter valid number");
      input.value = "";
    }
  }

  if (input.id === "coThreshold" || input.id === "TotalMarks") {
    if (enteredNumber > 100) {
      // If it's greater than the maximum, set the input value to the maximum
      alert("Enter valid value");
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
      var maxYear = new Date().getFullYear();

      if (startYear >= minYear && endYear <= maxYear && startYear <= endYear) {
        // If the input is within the acceptable range, leave it as is
        input.value = yearRange;
      } else {
        // If the input is not within the acceptable range, clear the input
        input.value = "";
      }
    } else {
      // If the input does not match the yyyy-yyyy pattern, clear the input
      input.value = "";
      alert("Enter valid year");
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

// Disable page reload
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "Are you sure you want to leave this page?";
});
