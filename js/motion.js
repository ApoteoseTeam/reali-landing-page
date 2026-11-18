import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export function startMotion() {
  const media = gsap.matchMedia();
  media.add(
    {
      animated: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 901px) and (min-height: 740px)',
      pointer: '(hover: hover) and (pointer: fine)',
    },
    ({ conditions }) => {
      const { animated, desktop, pointer } = conditions;
      if (!animated) return;

      const lenis = desktop ? new Lenis({ anchors: true, duration: 0.95 }) : null;
      const tick = (seconds) => lenis.raf(seconds * 1000);
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
      }

      gsap.from(['.header .brand', 'h1 span', '.hero .lede', '.hero .actions'], {
        y: 21,
        opacity: 0,
        duration: 0.62,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.scene-chip', { x: 12, opacity: 0, duration: 0.65, stagger: 0.12, delay: 0.25 });

      gsap.utils
        .toArray(
          '.section-head h2, .flow-item, .benefit-grid article, .team-card, .timeline li, .stack article',
        )
        .forEach((item) => {
          gsap.from(item, {
            y: 19,
            opacity: 0.35,
            clearProps: 'transform,opacity',
            duration: 0.58,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 89%', once: true },
          });
        });
      gsap.from('.footer-word', {
        yPercent: 13,
        opacity: 0.55,
        duration: 0.75,
        scrollTrigger: { trigger: '.footer-word', start: 'top 96%', once: true },
      });

      ScrollTrigger.create({
        trigger: '.dashboard',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from('.bar-fill', { scaleY: 0, duration: 0.55, stagger: 0.055 });
          document.querySelectorAll('[data-total]').forEach((item) => {
            const counter = { value: 0 };
            const number = new Intl.NumberFormat('pt-BR');
            const finalValue = Number(item.dataset.total);
            gsap.to(counter, {
              value: finalValue,
              duration: 0.62,
              snap: 'value',
              onUpdate: () => {
                item.textContent = number.format(counter.value);
              },
            });
          });
        },
      });

      const cleanups = [];
      if (desktop) {
        gsap.to('.scene-image', {
          yPercent: 7,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.utils.toArray('.scene-chip').forEach((chip, index) => {
          gsap.to(chip, {
            y: (index - 1) * 40,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
          });
        });
        gsap.from('.comparison article + article', {
          x: 125,
          opacity: 0.65,
          ease: 'none',
          scrollTrigger: { trigger: '.comparison', start: 'top 92%', end: 'top 52%', scrub: true },
        });
        gsap.from('.dashboard', {
          scale: 0.94,
          ease: 'none',
          scrollTrigger: { trigger: '.dashboard', start: 'top bottom', end: 'center 55%', scrub: true },
        });
        gsap.from('.flow-path', {
          scaleX: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.flow', start: 'top 90%', end: 'center 58%', scrub: true },
        });

        const cards = gsap.utils.toArray('.story-card');
        let activeIndex = 0;
        ScrollTrigger.create({
          trigger: '.story-grid',
          pin: '.story-visual',
          pinSpacing: false,
          start: 'top 23%',
          end: 'bottom 72%',
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const index = Math.min(cards.length - 1, Math.floor(progress * cards.length));
            if (index === activeIndex) return;
            const current = cards[index];
            cards[activeIndex].hidden = true;
            activeIndex = index;
            current.hidden = false;
            gsap.fromTo(
              current,
              { opacity: 0.35, scale: 0.965 },
              { opacity: 1, scale: 1, duration: 0.36, overwrite: true },
            );
          },
        });
        cleanups.push(() =>
          cards.forEach((card, index) => {
            card.hidden = index !== 0;
          }),
        );

        ScrollTrigger.create({
          trigger: '.vision-grid',
          pin: true,
          start: 'center 54%',
          end: '+=140',
          anticipatePin: 1,
        });
        ScrollTrigger.create({
          trigger: '.history-grid',
          pin: '#historia .section-head',
          pinSpacing: false,
          start: 'top 23%',
          end: () =>
            '+=' +
            Math.max(
              1,
              document.querySelector('.timeline').offsetHeight -
                document.querySelector('#historia .section-head').offsetHeight,
            ),
          invalidateOnRefresh: true,
        });
        const timeline = document.querySelector('.timeline');
        timeline.addEventListener('toggle', ScrollTrigger.refresh, true);
        cleanups.push(() => timeline.removeEventListener('toggle', ScrollTrigger.refresh, true));
      }

      if (desktop && pointer) {
        const scene = document.querySelector('.hero-scene');
        const image = scene.querySelector('.scene-image');
        const x = gsap.quickTo(image, 'xPercent', { duration: 0.55, ease: 'power3.out' });
        const y = gsap.quickTo(image, 'rotation', { duration: 0.55, ease: 'power3.out' });
        const onPointer = (event) => {
          const bounds = scene.getBoundingClientRect();
          x(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
          y(((event.clientY - bounds.top) / bounds.height - 0.5) * 1.3);
        };
        const onLeave = () => {
          x(0);
          y(0);
        };
        scene.addEventListener('pointermove', onPointer);
        scene.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          scene.removeEventListener('pointermove', onPointer);
          scene.removeEventListener('pointerleave', onLeave);
        });
      }

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        if (lenis) {
          gsap.ticker.remove(tick);
          lenis.destroy();
        }
      };
    },
  );

  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) media.revert();
  });
}
