// Blog Sidebar Toggle
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('blogSidebar');
  const toggle = document.getElementById('sidebarToggle');
  const close = document.getElementById('sidebarClose');
  const content = document.getElementById('sidebarContent');

  if (!sidebar || !toggle || !content) return;

  // Default to closed state - sidebar should start closed
  // Only open if explicitly set to true AND user hasn't navigated away
  // We'll remove auto-opening behavior for better UX

  // Open sidebar
  toggle.addEventListener('click', function() {
    sidebar.classList.add('open');
    document.body.classList.add('sidebar-open');
    localStorage.setItem('sidebarOpen', 'true');
  });

  // Close sidebar
  if (close) {
    close.addEventListener('click', function() {
      sidebar.classList.remove('open');
      document.body.classList.remove('sidebar-open');
      localStorage.setItem('sidebarOpen', 'false');
    });
  }
});
