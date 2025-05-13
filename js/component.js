// function loadComponent(url, elementId) {
//   fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Không thể tải: ${url}`);
//       }
//       return response.text();
//     })
//     .then(html => {
//       document.getElementById(elementId).innerHTML = html;
//     })
//     .catch(error => {
//       console.error('Lỗi khi tải component:', error);
//     });
// }

function loadComponent(url, elementId, callback) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Không thể tải: ${url}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById(elementId).innerHTML = html;
      if (typeof callback === 'function') {
        callback(); // Gọi hàm sau khi component được gắn vào DOM
      }
    })
    .catch(error => {
      console.error('Lỗi khi tải component:', error);
    });
}

function highlightActiveNavLink() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  const links = document.querySelectorAll('.nav-item.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Khi trang đã tải xong, tải các component
document.addEventListener('DOMContentLoaded', function() {
  loadComponent('../components/header.html', 'header-container', highlightActiveNavLink);
  loadComponent('../components/footer.html', 'footer-container');
  loadComponent('../components/copyright.html', 'copyright-container');
  loadComponent('../components/blog.component.html', 'blog-component-container');
});