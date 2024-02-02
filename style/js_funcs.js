document.querySelector('.dropbtn').addEventListener('click', function() {
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
});

function toggleGrid() {
    var grid = document.getElementById("imageGrid");
    var source = document.getElementById("sourceCredit");
    
    if (grid.style.display === "none") {
        grid.style.display = "grid";
        source.style.display = "block";
    } else {
        grid.style.display = "none";
        source.style.display = "none"; 
    }
}
