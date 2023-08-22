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

      var html = "<table>";
      for (var i = 0; i < jsonData.length; i++) {
        html += "<tr>";
        for (var j = 0; j < jsonData[i].length; j++) {
          if (i === 0) {
            if (j < 3) {
              html += "<th>" + jsonData[i][j] + "</th>";
            }
          } else {
            if (j < 3) {
              html += "<td>" + jsonData[i][j] + "</td>";
            }
          }

          if (i === 0 && j === 2) {
            for (var k = 0; k < numCOs; k++) {
              html += "<th>CO " + (k + 1) + "</th>";
            }
            html += "<th>Marks</th>";
          }
        }
        html += "</tr>";
      }
      html += "</table>";
      gridView.innerHTML = html;

      var table = gridView.querySelector("table");
      var rows = table.getElementsByTagName("tr");
      for (var i = 1; i < rows.length; i++) {
        for (var j = 3; j < 3 + numCOs + 1; j++) {
          var newCell = document.createElement("td");
          if (j < 3 + numCOs) {
            newCell.setAttribute("contenteditable", "true");
            newCell.addEventListener("input", function () {
              this.textContent = this.textContent.replace(/\D/g, "");
              updateMarks();
            });
          } else {
            newCell.setAttribute("contenteditable", "false");
            newCell.classList.add("marks-cell");
          }
          rows[i].appendChild(newCell);
        }
      }

      function updateMarks() {
        var marksCells = document.querySelectorAll(".marks-cell");
        var totalMarksSum = 0;
        for (var i = 1; i < rows.length; i++) {
          var rowCells = rows[i].querySelectorAll('td[contenteditable="true"]');
          var marksCell = marksCells[i - 1];
          var totalMarks = 0;

          for (var j = 0; j < rowCells.length; j++) {
            totalMarks += parseInt(rowCells[j].textContent) || 0;
          }

          marksCell.textContent = totalMarks;
          totalMarksSum += totalMarks; // Accumulate marks for total sum
        }

        marksSumLabel.textContent = "Total: " + totalMarksSum; // Update sum label
      }
    };

    reader.readAsArrayBuffer(file);
  });
});
