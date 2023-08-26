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
    const courseTitle = document.getElementById("courseTitle").value;
    const academicYear = document.getElementById("academicYear").value;
    const batch = document.getElementById("batch").value;
    const coThreshold = document.getElementById("coThreshold").value;
    const targetPercentage = document.getElementById("targetPercentage").value;
    const totalCO = document.getElementById("totalCO").value;
    const totalPO = document.getElementById("totalPO").value;
    const totalPSO = document.getElementById("totalPSO").value;
    // const levelOfAttainments =document.getElementById("levelOfAttainments").value;

    document.getElementById("displayInfo").classList.remove("hidden");

    // Display the entered information
    displayInfo.innerHTML = `
             <h2>Course Information</h2>
             <p><strong>Name of the Programme:</strong> ${programmeName}</p>
             <p><strong>Department:</strong> ${department}</p>
             <p><strong>Name of the Course Teacher/Teachers:</strong> ${courseTeacher}</p>
             <p><strong>Course Code:</strong> ${courseCode}</p>
             <p><strong>Semester:</strong> ${semester}</p>
             <p><strong>Course Title:</strong> ${courseTitle}</p>
             <p><strong>Academic Year:</strong> ${academicYear}</p>
             <p><strong>Batch:</strong> ${batch}</p>
             <p><strong>CO Threshold%:</strong> ${coThreshold}</p>
             <p><strong>Institute Target Percentage:</strong> ${targetPercentage}</p>
             <p><strong>Total CO:</strong> ${totalCO}</p>
             <p><strong>Total PO:</strong> ${totalPO}</p>
             <p><strong>Total PSO:</strong> ${totalPSO}</p>
             
        `;
  });

  // ISA Mapping Form JavaScript
  document.getElementById("loadButton").addEventListener("click", function () {
    var fileInput = document.getElementById("fileInput");
    var gridView1 = document.getElementById("gridView1");
    var gridView2 = document.getElementById("gridView2");
    var coInput = document.getElementById("totalCO");
    var marksSumLabel = document.getElementById("marksSum"); // Marks sum label

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

      var numCOs = parseInt(coInput.value);

      //****************************************************************************************************************************************************************************//
                                                                              //CREATING FIRST TABLE
      //****************************************************************************************************************************************************************************//

      // numCols = parseInt(coInput.value-1);

      gridView1.innerHTML = ""; // Clear any previous content

      var html = "<table>";

      // Header row with CO-Mapping and CO headers
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
      console.log("Hello world");

      localStorage.clear();

      var table = gridView1.querySelector("table");
      var rows = table.getElementsByTagName("tr");
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        for (var j = 1; j <= numCOs - 3; j++) {
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
      
          console.log("Column-wise values in local storage:", columnValues);
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

      for (var i = 1; i < rows.length; i++) {
        for (var j = 3; j < 3 + numCOs * 2; j++) {
          (function (rowIndex, colIndex) { // Use IIFE to capture current values of i and j
            var newCell = document.createElement("td");
            newCell.classList.add("text-center");

            if (j < 3 + numCOs * 2) {
              
              newCell.addEventListener("input", function () {
                var enteredValue = parseInt(this.textContent.replace(/\D/g, ""));
                console.log("Row:", rowIndex, "Column:", colIndex, "Value:", enteredValue);

                if (!isNaN(enteredValue)) {
                  console.log("Row:", rowIndex, "Column:", colIndex, "Value:", enteredValue);
                  var storedColumnValues = JSON.parse(localStorage.getItem("column_values"));
                  var columnNumber = (colIndex - 3) / 2 + 1;
                  

                  if (storedColumnValues && storedColumnValues[columnNumber]) {
                    var columnValues = storedColumnValues[columnNumber];
                    var storedValue = columnValues;

                    if (enteredValue > storedValue) {
                      alert("Enter valid value");
                      this.textContent = "";
                    } else {
                      console.log("Entered value "+enteredValue);
                      console.log("storedValue "+storedValue);
                      var percentage = (enteredValue / storedValue) * 100;

                      // Set the percentage value in the next cell of the same row
                      var percentageCellIndex = colIndex + 1;
                      var percentageCell = rows[rowIndex].cells[percentageCellIndex];
                      if (percentageCell) {
                        percentageCell.setAttribute("contenteditable", "false");
                      }
                      console.log("Percentage : "+percentage);

                      if (percentageCell) {
                        percentageCell.textContent = percentage.toFixed(2) + "%";
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

    };

    reader.readAsArrayBuffer(file);
  });
});
