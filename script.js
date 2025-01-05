document.addEventListener("DOMContentLoaded", () => {
    const welcomeHeading = document.querySelector(".welcome h1:nth-of-type(2)");
    const originalText = "I’m A Full Stack <br> Web Developer.";
    const alternateText = "I’m MY FULL NAME.";

    setInterval(() => {
        // Fade out the heading
        welcomeHeading.style.opacity = 0;
        setTimeout(() => {
            // Toggle text and use innerHTML to handle <br>
            welcomeHeading.innerHTML = 
                welcomeHeading.innerHTML === originalText ? alternateText : originalText;
            // Fade back in
            welcomeHeading.style.opacity = 1;
        }, 500);
    }, 6000);
});

// JavaScript for Counter Animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Adjust speed as desired

    const runCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // Detect when stats section is in view
    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter();
                    observer.disconnect(); // Run only once
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(statsSection);
});


function smoothScroll(target, duration) {
    const start = window.pageYOffset;
    const distance = target.offsetTop - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOut(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOut(t, b, c, d) {
        let ts = (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b;
        return ts;
    }

    requestAnimationFrame(animation);
}

// Usage example:
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        
        smoothScroll(targetElement, 1000); // Adjust duration here
    });
});