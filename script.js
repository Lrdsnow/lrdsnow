document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('mouseover', () => {
        box.style.transform = 'scale(1.05)';
    });
    box.addEventListener('mouseout', () => {
        box.style.transform = 'scale(1)';
    });
});

document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const target = this.getAttribute('data-target');
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(target).style.display = 'block'; 
        window.location.hash = target; 

        document.querySelectorAll('.sidebar-item').forEach(tab => {
            tab.classList.remove('active');
        });

        this.classList.add('active');
    });
});

function showDefaultContent() {
    const defaultTab = document.querySelector('.sidebar-item[data-target="home"]');
    defaultTab.click();
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        const target = window.location.hash.substring(1);
        document.querySelector(`.sidebar-item[data-target="${target}"]`).click();
    } else {
        showDefaultContent();
    }
});