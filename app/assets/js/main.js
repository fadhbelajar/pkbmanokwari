// PKB Manokwari - Main JS
document.addEventListener('DOMContentLoaded', function() {

    // Auto-hide flash messages
    const flashMessages = document.querySelectorAll('.alert-dismissible');
    flashMessages.forEach(function(msg) {
        setTimeout(function() {
            msg.remove();
        }, 5000);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Admin double-click to show login
    let clickCount = 0;
    const footer = document.querySelector('footer');
    if (footer) {
        footer.addEventListener('dblclick', function() {
            window.location.href = '/admin/login';
        });
    }
});
