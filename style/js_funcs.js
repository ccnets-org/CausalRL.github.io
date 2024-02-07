// sidebar dropdown btn
document.querySelector('.dropbtn').addEventListener('click', function() {
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
});

document.querySelector('.dropbtn').addEventListener('click', function() {
    var arrow = this.querySelector('.dropdown-arrow');
    arrow.classList.toggle('rotate-arrow');
});

// img grid toggle
function toggleGrid() {
    var grid = document.getElementById("imageGrid");
    var button = document.getElementById("toggleButton");
    var source = document.getElementById("sourceCredit");
    
    if (grid.style.display === "none") {
        grid.style.display = "grid";
        source.style.display = "block";
        button.textContent = "Close Env Images"; 
    } else {
        grid.style.display = "none";
        source.style.display = "none";
        button.textContent = "Open Env Images"; 
    }
}


// Toc
const tags = document.querySelectorAll('h1,h2')
const toc = document.querySelector('.toc')

tags.forEach(tag => {
  if (tag.matches('h2')) {
    const ul = document.createElement('ul')
    ul.classList.add('toc-title')
    ul.textContent = tag.textContent
    toc.appendChild(ul)
  }
  else {
    const li = document.createElement('li')
    li.classList.add('toc-item')
    li.textContent = tag.textContent
    toc.firstElementChild.appendChild(li)
  }
})

const tocItems = document.querySelectorAll('.toc-title, .toc-item')
tocItems.forEach((item, index) => item.dataset.index = index)

tags.forEach((tag, index) => tag.dataset.index = index)

toc.addEventListener('click', e => {
  if (e.target.matches('.toc-title') || e.target.matches('.toc-item')) {
    tags[e.target.dataset.index].scrollIntoView({ behavior: "smooth", block: "center"})
  }
})

// IntersectionObserver API
let selectedIndex = 0
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tocItems[selectedIndex].classList.remove('selected')
      selectedIndex = entry.target.dataset.index
      tocItems[selectedIndex].classList.add('selected')
    }   
    else if(entry.boundingClientRect.y > 50) {
      tocItems[selectedIndex].classList.remove('selected')
      selectedIndex = Number(entry.target.dataset.index) - 1
      tocItems[selectedIndex].classList.add('selected')
    }
  })
})

tags.forEach(tag => observer.observe(tag))