// We dynamically load GSAP via CDN in the JS to keep the HTML clean and ensure it loads before execution
const loadGSAP = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.onload = () => {
            const scrollScript = document.createElement('script');
            scrollScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
            scrollScript.onload = resolve;
            document.head.appendChild(scrollScript);
        };
        document.head.appendChild(script);
    });
};

// Initialize animations once GSAP is ready
loadGSAP().then(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initial Load (Hero Section) Animations
    const heroTimeline = gsap.timeline();
    
    // Slide down navbar (Framer entrance effect)
    heroTimeline.to("#navbar", {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1
    });

    // Fade up Hero items sequentially
    heroTimeline.fromTo(".gsap-hero-item", 
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.5"
    );

    // 2. Standard Scroll Reveal for single elements
    gsap.utils.toArray('.gsap-reveal').forEach(element => {
        gsap.fromTo(element, 
            { y: 40, autoAlpha: 0 },
            {
                y: 0, 
                autoAlpha: 1, 
                duration: 0.8, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", 
                    once: true // Ensures it only reveals once exactly like Framer
                }
            }
        );
    });

    // 3. Staggered Bento Grid Reveals
    gsap.utils.toArray('.gsap-reveal-container').forEach(container => {
        const items = container.querySelectorAll('.gsap-stagger-item');
        if (items.length > 0) {
            gsap.fromTo(items,
                { y: 50, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        once: true
                    }
                }
            );
        }
    });

    // 4. Smooth Continuous Marquee Loop
    // Moves -33.33% because the logos list is explicitly duplicated 3 times in the HTML
    gsap.to('.marquee-track', {
        xPercent: -33.33,
        ease: "none",
        duration: 12,
        repeat: -1
    });
});
