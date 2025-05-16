function loadComponent(url, elementId, callback) {
  const repoName = window.location.pathname.split('/')[1];
  const isGitHubPages = window.location.hostname.includes('github.io');
  const basePath = isGitHubPages ? `/${repoName}/` : '/';
  const fullUrl = basePath + url.replace(/^\/+/, '');

  fetch(fullUrl)
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
  let currentPath = window.location.pathname.replace(/\/$/, ''); // Remove trailing slash
  if (currentPath === '') currentPath = '/index';

  document.querySelectorAll('.nav-item.nav-link').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '');

    // Normalize both: remove .html and trailing slashes
    const normalizedLink = linkPath.replace(/\.html$/, '');
    const normalizedCurrent = currentPath.replace(/\.html$/, '');

    if (normalizedLink === normalizedCurrent) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Khi trang đã tải xong, tải các component
document.addEventListener('DOMContentLoaded', function() {
  loadComponent('/components/header.html', 'header-container', highlightActiveNavLink);
  loadComponent('/components/footer.html', 'footer-container');
  loadComponent('/components/copyright.html', 'copyright-container');
  loadComponent('/components/about.component.html', 'about-component-container');
  loadComponent('/components/product.component.html', 'product-component-container');
});