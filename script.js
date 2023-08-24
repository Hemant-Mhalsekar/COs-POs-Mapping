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
    const levelOfAttainments =
      document.getElementById("levelOfAttainments").value;

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
             <p><strong>Level of Attainments:</strong> ${levelOfAttainments}</p>
        `;
  });

  // ISA Mapping Form JavaScript
  document.getElementById("loadButton").addEventListener("click", function () {
    var fileInput = document.getElementById("fileInput");
    var gridView = document.getElementById("gridView");
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

      var numCOs = parseInt(coInput.value);

//****************************************************************************************************************************************************************************//
                                          //CREATING FIRST TABLE
//****************************************************************************************************************************************************************************//
    
        numRows = 1;
        // numCols = parseInt(coInput.value-1);

        var tableContainer1 = document.getElementById("tableContainer1");
        tableContainer1.innerHTML = "";

        var table = document.createElement("table");
        var headerRow = document.createElement("tr");

        // Create header cells
        for (var i = 1; i <= numCOs + 1; i++) {
            var th = document.createElement("th");
            th.className= "bg-blue-400";
            if (i === 1) {
                th.textContent = "CO-Mapping";
            } else {
                th.textContent = "CO" + (i - 1);
            }
            headerRow.appendChild(th);
        }

        table.appendChild(headerRow);

        // Create rows and cells with input fields
        for (var i = 1; i <= numRows; i++) {
            var row = document.createElement("tr");

            // Initialize an array to store input elements
            var inputElements = [];

            for (var j = 1; j <= numCOs + 1; j++) {
                var td = document.createElement("td");
                var input = document.createElement("input");
                input.type = "number"; // Change the input type to "number"
                input.className = "w-full text-center"; // Add Tailwind width class
                if (i === 1 && j === 1) { // Check for the first cell in the second row
                    input.type = "text"; 
                    input.value = "Total Marks"; // Set the content of the first cell
                    input.disabled = true;
                }

                input.id = "table1_row_" + i + "_col_" + j;

                // Add a change event listener to each input element
                // input.addEventListener("change", updateTotal2);

                td.appendChild(input);
                row.appendChild(td);

                inputElements.push(input);
            }
            table.appendChild(row);
        }

        tableContainer1.appendChild(table);
    

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
              html += "<th>" + jsonData[i][j] + "</th>"; // Create header cell with data
            }
          } else {
            if (j < 3) {
              html += "<td>" + jsonData[i][j] + "</td>"; // Create data cell with content
            }
          }

          // Check if it's the first row and the specific column for CO columns
          if (i === 0 && j === 2) {
            for (var k = 0; k < numCOs; k++) {
              html += "<th>CO " + (k + 1) + "</th> <th>%</th>"; // Create CO column header with colspan
            }
          }
        }

        // Close the row
        html += "</tr>";
      }

      // Close the table tag
      html += "</table>";

      // Insert the generated HTML into the gridView element
      gridView.innerHTML = html;

      var table = gridView.querySelector("table");
      var rows = table.getElementsByTagName("tr");
      for (var i = 1; i < rows.length; i++) {
        for (var j = 3; j < 3 + numCOs * 2; j++) {
          var newCell = document.createElement("td");
          if (j < 3 + numCOs * 2) {
            newCell.setAttribute("contenteditable", "true");
            newCell.addEventListener("input", function () {
              this.textContent = this.textContent.replace(/\D/g, "");
              updateMarks();
            });
          } else {
            newCell.setAttribute("contenteditable", "false");
            // newCell.classList.add("marks-cell");
          }
          rows[i].appendChild(newCell);
        }
      }
    };

    reader.readAsArrayBuffer(file);
  });
});
