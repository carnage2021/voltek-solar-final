'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { GoogleG } from '../Icons';
import { SITE } from '@/lib/site';

/** Hero background video — swap these two paths to change the clip. */
const HERO_VIDEO = { src: 'https://ik.imagekit.io/omgojp17s/vid1.mp4', poster: '/videos/hero-vid1-poster.jpg' };

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
      return;
    }
    // Autoplay can be skipped when a remote video loads slowly — start it explicitly once it can play.
    const v = videoRef.current;
    const kick = () => {
      if (!v || !v.paused) return;
      v.muted = true;
      v.play().catch(() => {});
    };
    v?.addEventListener('canplay', kick);
    v?.addEventListener('loadeddata', kick);
    kick();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (imgRef.current && y < 1400) imgRef.current.style.transform = `translate3d(0,${y * 0.28}px,0) scale(${1 + y * 0.00012})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      v?.removeEventListener('canplay', kick);
      v?.removeEventListener('loadeddata', kick);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="hero__img" ref={imgRef}>
        <video
          ref={videoRef}
          className="hero__video"
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
      <div className="hero__tint" aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />
      <div className="container hero__content">
        <div data-reveal="" className="hero__pill">
          <span className="dot-lime" />
          Energy prices are rising — take control
        </div>
        <h1 id="hero-h">
          <span data-reveal="" data-reveal-delay="120">Turn Your Roof Into</span>
          <span data-reveal="" data-reveal-delay="240">
            Your Own <span className="grad">Power Station</span>
          </span>
        </h1>
        <p className="hero-lead" data-reveal="" data-reveal-delay="380">
          MCS-certified solar, battery and EV charger installation across East Kent.
        </p>
        <div className="btn-row" data-reveal="" data-reveal-delay="500">
          <Link href="/book-a-survey" className="btn btn--gold">
            Book a Free Survey <span aria-hidden="true">→</span>
          </Link>
          <a href="#calculator" className="btn btn--ghost-light">Calculate My Savings</a>
        </div>
      </div>
      <div className="container hero__cards">
        <div className="g-card" data-reveal="" data-reveal-delay="650">
          <div className="g-card__g">
            <GoogleG size={24} />
          </div>
          <div className="g-card__txt">
            <span className="stars" style={{ fontSize: 16, letterSpacing: 2 }} aria-label={`${SITE.googleRating} out of 5 stars`}>★★★★★</span>
            <span>{SITE.googleReviews} five-star Google reviews</span>
          </div>
        </div>
        <div className="save-card" data-reveal="" data-reveal-delay="750">
          <div className="save-card__top">
            <span>Average yearly saving</span>
            <span className="badge-lime">▲ 62%</span>
          </div>
          <div className="save-card__row">
            <span className="save-card__num">£1,140</span>
            <svg width="110" height="42" viewBox="0 0 110 42" aria-hidden="true">
              <polyline points="2,38 20,33 38,35 56,24 74,19 92,12 108,3" fill="none" stroke="#E8B36A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="108" cy="3" r="3" fill="#E8B36A" />
            </svg>
          </div>
        </div>
      </div>
      <div className="hero__word" aria-hidden="true">VOLTEK</div>
    </section>
  );
}
