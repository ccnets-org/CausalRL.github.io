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
  // 언어 전환 버튼의 존재 여부를 체크합니다.
  if (document.querySelector('#switch-en') && document.querySelector('#switch-kr')) {
      // 언어 전환 버튼이 있는 경우, 기본 언어로 TOC 생성 및 버튼 이벤트 리스너 추가
      switchLanguage('content-en'); // 기본 언어 설정

      document.getElementById('switch-en').addEventListener('click', function() {
          switchLanguage('content-en');
      });

      document.getElementById('switch-kr').addEventListener('click', function() {
          switchLanguage('content-kr');
      });
  } else {
      // 언어 전환 버튼이 없는 경우, 페이지의 main-content 내용을 바탕으로 TOC 생성
      createTOC('main-content');
  }
});

// function createTOCForMainContent() {
//   // main-content 클래스를 가진 요소의 내용을 바탕으로 TOC 생성
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
    
    // TOC 항목을 담을 최상위 컨테이너
    let tocContainer = document.createElement('ul');
    toc.appendChild(tocContainer);

    tags.forEach((tag, index) => {
        // 각 섹션에 data-index 속성 추가
        tag.setAttribute('data-index', index);

        let tocItem = document.createElement('li');
        tocItem.classList.add('toc-item');
        tocItem.setAttribute('data-index', index); // TOC 항목에 data-index 속성 추가
        tocItem.textContent = tag.textContent;

        if (tag.nodeName.toLowerCase() === 'h2') {
            // h2 태그인 경우, 들여쓰기 효과를 위해 별도 처리
            let lastUl = tocContainer.querySelector('ul:last-of-type');
            if (!lastUl) {
                lastUl = document.createElement('ul');
                lastUl.classList.add('toc-sublist');
                tocContainer.appendChild(lastUl);
            }
            lastUl.appendChild(tocItem);
        } else {
            // h1 태그인 경우, 새로운 컨테이너 생성
            tocContainer = document.createElement('ul');
            toc.appendChild(tocContainer);
            tocContainer.appendChild(tocItem);
        }
    });

    addTOCItemClickEvent(); // TOC 항목 클릭 이벤트 추가 함수 호출
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
  // 모든 콘텐츠 섹션을 숨깁니다.
  document.querySelectorAll('.main-content').forEach(section => {
      section.style.display = 'none';
  });

  // 선택된 언어의 콘텐츠 섹션만 표시합니다.
  const activeSection = document.getElementById(contentId);
  activeSection.style.display = 'block';

  // TOC를 선택된 언어에 맞게 다시 생성합니다.
  createTOC(contentId);
}


// ===================================






let selectedIndex = 0; // 현재 선택된 TOC 항목의 인덱스

// Intersection Observer 설정
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
}, { threshold: 0.5 }); // threshold 값을 조정하여, 언제 항목이 선택되어야 하는지 제어

// 각 섹션 관찰 시작
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