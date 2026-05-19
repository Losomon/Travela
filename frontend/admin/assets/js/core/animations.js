var Animations = {
    fadeUp: function (el, delay) {
        delay = delay || 0;
        el.style.transitionDelay = delay + 'ms';
        el.classList.add('fade-up', 'visible');
    },
    stagger: function (containerSel, childSel) {
        var container = document.querySelector(containerSel);
        if (!container) return;
        var children = container.querySelectorAll(childSel);
        children.forEach(function (el, i) {
            el.style.transitionDelay = (i * 80) + 'ms';
            el.classList.add('fade-up', 'visible');
        });
    },
    reveal: function (section) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        observer.observe(section);
    },
    initPageTransitions: function () {
        var links = document.querySelectorAll('.page-link');
        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = link.getAttribute('href');
                if (href && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    document.body.classList.add('page-exit');
                    setTimeout(function () {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
    }
};
window.Animations = Animations;