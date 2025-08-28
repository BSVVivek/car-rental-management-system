import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PillNav.css";

const PillNav = ({
    logo,
    logoAlt = "Logo",
    items,
    activeHref,
    className = "",
    ease = "power3.easeOut",
    baseColor = "#fff",
    pillColor = "#060010",
    hoveredPillTextColor = "#060010",
    pillTextColor,
    onNavigate, // <-- New prop to handle navigation
    initialLoadAnimation = true,
}) => {
    const resolvedPillTextColor = pillTextColor ?? baseColor;
    const circleRefs = useRef([]);
    const tlRefs = useRef([]);
    const activeTweenRefs = useRef([]);
    const logoImgRef = useRef(null);
    const logoTweenRef = useRef(null);
    
    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach((circle) => {
                if (!circle?.parentElement) return;
                const pill = circle.parentElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;
                gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

                const label = pill.querySelector(".pill-label");
                const white = pill.querySelector(".pill-label-hover");
                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                const index = circleRefs.current.indexOf(circle);
                if (index === -1) return;

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });
                tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
                if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
                }
                tlRefs.current[index] = tl;
            });
        };
        layout();
        window.addEventListener("resize", layout);
        if (document.fonts?.ready) {
            document.fonts.ready.then(layout).catch(() => {});
        }
        return () => window.removeEventListener("resize", layout);
    }, [items, ease]);

    const handleEnter = (i) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
    };

    const handleLeave = (i) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
    };

    const handleLinkClick = (e, href) => {
        e.preventDefault();
        onNavigate(href);
    };

    const cssVars = {
        "--base": baseColor,
        "--pill-bg": pillColor,
        "--hover-text": hoveredPillTextColor,
        "--pill-text": resolvedPillTextColor,
    };

    return (
        <nav className={`pill-nav ${className}`} style={cssVars}>
            <div className="pill-nav-items">
                <ul className="pill-list" role="menubar">
                    {items.map((item, i) => (
                        <li key={item.href || `item-${i}`} role="none">
                            <a
                                role="menuitem"
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.href)}
                                className={`pill${activeHref === item.href ? " is-active" : ""}`}
                                aria-label={item.ariaLabel || item.label}
                                onMouseEnter={() => handleEnter(i)}
                                onMouseLeave={() => handleLeave(i)}
                            >
                                <span className="hover-circle" aria-hidden="true" ref={(el) => { circleRefs.current[i] = el; }} />
                                <span className="label-stack">
                                    <span className="pill-label">{item.label}</span>
                                    <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default PillNav;