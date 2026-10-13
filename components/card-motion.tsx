'use client';

import { useEffect } from 'react';

const motionProperties = ['--card-rotate-x', '--card-rotate-y', '--card-light-x', '--card-light-y'];

/** One delegated controller also covers cards introduced by client-side navigation. */
export function CardMotion() {
  useEffect(() => {
    const motionAllowed = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let activeCard: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    let animationFrame: number | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let pointerKnown = false;
    let waitingForPointerMovement = false;

    function findCard(target: EventTarget | null) {
      if (!(target instanceof Element)) return null;
      const surface = target.closest<HTMLElement>('[data-card-motion], .card-motion-surface');
      let card = surface?.matches('[data-card-motion]')
        ? surface
        : surface?.querySelector<HTMLElement>(':scope > [data-card-motion]') ?? null;

      // A preview within a larger card should never create a second tilt layer.
      let parent = card?.parentElement?.closest<HTMLElement>('[data-card-motion]');
      while (parent) {
        card = parent;
        parent = card.parentElement?.closest<HTMLElement>('[data-card-motion]');
      }
      return card;
    }

    function reset() {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
      if (activeCard) {
        activeCard.removeAttribute('data-card-tilting');
        for (const property of motionProperties) activeCard.style.removeProperty(property);
      }
      activeCard = null;
      bounds = null;
    }

    function suspend() {
      reset();
      // Scrolling/layout changes can synthesize pointer events at a still cursor.
      // Rearm only when the user moves it, not when a new card slides underneath.
      waitingForPointerMovement = pointerKnown;
    }

    function update() {
      animationFrame = null;
      if (!activeCard?.isConnected || !bounds || !motionAllowed.matches) {
        reset();
        return;
      }
      const x = Math.min(1, Math.max(0, (pointerX - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, (pointerY - bounds.top) / bounds.height));
      // Large panels need less rotation so their edges stay close to the layout.
      const rotation = bounds.width > 850 ? 2 : 6;
      activeCard.style.setProperty('--card-rotate-x', `${((0.5 - y) * rotation).toFixed(2)}deg`);
      activeCard.style.setProperty('--card-rotate-y', `${((x - 0.5) * rotation).toFixed(2)}deg`);
      activeCard.style.setProperty('--card-light-x', `${(x * 100).toFixed(1)}%`);
      activeCard.style.setProperty('--card-light-y', `${(y * 100).toFixed(1)}%`);
      activeCard.setAttribute('data-card-tilting', 'true');
    }

    function followPointer(event: PointerEvent) {
      if (!motionAllowed.matches || event.pointerType === 'touch' || !event.isPrimary) {
        reset();
        return;
      }
      if (waitingForPointerMovement) {
        if (event.clientX === pointerX && event.clientY === pointerY) return;
        waitingForPointerMovement = false;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerKnown = true;
      const card = findCard(event.target);
      if (card !== activeCard) {
        reset();
        if (card) {
          // Cache the resting geometry once, never remeasure a tilting card per frame.
          const surface = card.parentElement?.classList.contains('card-motion-surface')
            ? card.parentElement
            : card;
          const initialBounds = surface.getBoundingClientRect();
          if (!initialBounds.width || !initialBounds.height) return;
          bounds = initialBounds;
          activeCard = card;
        }
      }
      if (!activeCard) return;
      if (animationFrame === null) animationFrame = window.requestAnimationFrame(update);
    }

    function leaveCard(event: PointerEvent) {
      if (activeCard && findCard(event.relatedTarget) !== activeCard) reset();
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Tab') suspend();
    }

    function handleClick(event: MouseEvent) {
      if (event.target instanceof Element && event.target.closest('a[href]')) suspend();
    }

    function handleVisibility() {
      if (document.hidden) suspend();
    }

    document.addEventListener('pointerover', followPointer, { passive: true });
    document.addEventListener('pointermove', followPointer, { passive: true });
    document.addEventListener('pointerout', leaveCard, { passive: true });
    document.addEventListener('pointercancel', reset, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('scroll', suspend, { passive: true, capture: true });
    window.addEventListener('resize', suspend, { passive: true });
    window.addEventListener('blur', suspend);
    motionAllowed.addEventListener('change', suspend);

    return () => {
      reset();
      document.removeEventListener('pointerover', followPointer);
      document.removeEventListener('pointermove', followPointer);
      document.removeEventListener('pointerout', leaveCard);
      document.removeEventListener('pointercancel', reset);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('scroll', suspend, true);
      window.removeEventListener('resize', suspend);
      window.removeEventListener('blur', suspend);
      motionAllowed.removeEventListener('change', suspend);
    };
  }, []);

  return null;
}
