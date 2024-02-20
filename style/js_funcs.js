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
    
    grid.classList.toggle("hidden");
    source.classList.toggle("hidden");
    
    if (grid.classList.contains("hidden")) {
        button.textContent = "Open Env Images";
    } else {
        button.textContent = "Close Env Images";
    }
}

// SwitchLanguage + Toc 
// const currentContentId = 'content-en'
// const tags = document.querySelectorAll('h1,h2') // tags all
// const toc = document.querySelector('.toc')
// // toc.innerHTML = '';

// // const tags = document.querySelectorAll(`#${currentContentId} h1, #${currentContentId} h2`);

// tags.forEach(tag => {
//   if (tag.matches('h2')) {
//     const ul = document.createElement('ul')
//     ul.classList.add('toc-title')
//     ul.textContent = tag.textContent
//     toc.appendChild(ul)
//   }
//   else {
//     const li = document.createElement('li')
//     li.classList.add('toc-item')
//     li.textContent = tag.textContent
//     toc.firstElementChild.appendChild(li)
//   }
// })

// ===================== test
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('#switch-en') && document.querySelector('#switch-kr')) {
      switchLanguage('content-en'); 

      document.getElementById('switch-en').addEventListener('click', function() {
          switchLanguage('content-en');
      });

      document.getElementById('switch-kr').addEventListener('click', function() {
          switchLanguage('content-kr');
      });
  } else {
      createTOC('main-content');
  }
});

// function createTOCForMainContent() {
//   const mainContent = document.querySelector('.main-content');
//   if (mainContent) {
//       createTOC(mainContent.id);
//   }
// }

function createTOC(contentId) {
    const toc = document.querySelector('.toc');
    toc.innerHTML = ''; // TOC 초기화

    const activeSection = document.getElementById(contentId);
    const tags = activeSection.querySelectorAll('h1, h2');
    
    let tocContainer = document.createElement('ul');
    toc.appendChild(tocContainer);

    tags.forEach((tag, index) => {
        tag.setAttribute('data-index', index);

        let tocItem = document.createElement('li');
        tocItem.classList.add('toc-item');
        tocItem.setAttribute('data-index', index); 
        tocItem.textContent = tag.textContent;

        if (tag.nodeName.toLowerCase() === 'h2') {
            let lastUl = tocContainer.querySelector('ul:last-of-type');
            if (!lastUl) {
                lastUl = document.createElement('ul');
                lastUl.classList.add('toc-sublist');
                tocContainer.appendChild(lastUl);
            }
            lastUl.appendChild(tocItem);
        } else {
            tocContainer = document.createElement('ul');
            toc.appendChild(tocContainer);
            tocContainer.appendChild(tocItem);
        }
    });

    addTOCItemClickEvent(); 
}

// function addTOCItemClickEvent() {
//     const tocItems = document.querySelectorAll('.toc-item');
//     tocItems.forEach(item => {
//         item.addEventListener('click', function() {
//             const index = this.getAttribute('data-index');
//             const targetElement = document.querySelector(`[data-index="${index}"]`);
//             targetElement.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         });
//     });
// }


function switchLanguage(contentId) {
  document.querySelectorAll('.main-content').forEach(section => {
      section.style.display = 'none';
  });

  const activeSection = document.getElementById(contentId);
  activeSection.style.display = 'block';

  createTOC(contentId);
}


// ===================================






let selectedIndex = 0;

// Intersection Observer setting
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const index = entry.target.dataset.index;
        const tocItems = document.querySelectorAll('.toc-item');

        if (entry.isIntersecting) {
            if(selectedIndex !== undefined) tocItems[selectedIndex].classList.remove('selected');
            selectedIndex = index;
            tocItems[selectedIndex].classList.add('selected');
        }
    });
}, { threshold: 0.5 }); 

document.querySelectorAll('h1, h2').forEach(tag => {
    observer.observe(tag);
});



// const tocItems = document.querySelectorAll('.toc-title, .toc-item')
// tocItems.forEach((item, index) => item.dataset.index = index)

// tags.forEach((tag, index) => tag.dataset.index = index)

// toc.addEventListener('click', e => {
//   if (e.target.matches('.toc-title') || e.target.matches('.toc-item')) {
//     tags[e.target.dataset.index].scrollIntoView({ behavior: "smooth", block: "center"})
//   }
// })


// // IntersectionObserver API
// let selectedIndex = 0
// const observer = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       tocItems[selectedIndex].classList.remove('selected')
//       selectedIndex = entry.target.dataset.index
//       tocItems[selectedIndex].classList.add('selected')
//     }   
//     else if(entry.boundingClientRect.y > 100) {
//       tocItems[selectedIndex].classList.remove('selected')
//       selectedIndex = Number(entry.target.dataset.index) - 1
//       tocItems[selectedIndex].classList.add('selected')
//     }
//   })
// })

// tags.forEach(tag => observer.observe(tag))



// ===== language switcher
document.querySelectorAll('.language-switcher button').forEach(button => {
  button.addEventListener('click', function() {
      document.querySelectorAll('.language-switcher button').forEach(btn => btn.classList.remove('active'));

      this.classList.add('active');

      
  });
});