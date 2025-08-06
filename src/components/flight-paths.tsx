
"use client";

import React, { useState, useEffect, useRef } from 'react';

// Configuration
const NUM_DOTS = 70; // Increased for more traffic
const MIN_DURATION = 25; // seconds, slowed down
const MAX_DURATION = 50; // seconds, slowed down

const CONTINENTS = {
    NORTH_AMERICA: { x: 25, y: 35 },
    SOUTH_AMERICA: { x: 35, y: 68 },
    EUROPE: { x: 52, y: 32 },
    AFRICA: { x: 50, y: 55 },
    ASIA: { x: 70, y: 38 },
    AUSTRALIA: { x: 80, y: 75 },
};

const continentKeys = Object.keys(CONTINENTS);
const dotColors = ['red', 'green', 'white'];

const getRandomContinent = (exclude?: string) => {
    let continents = continentKeys;
    if (exclude) {
        continents = continentKeys.filter(c => c !== exclude);
    }
    return continents[Math.floor(Math.random() * continents.length)];
};

interface Dot {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    controlX: number;
    controlY: number;
    startTime: number;
    duration: number;
    colorClass: string;
}

const createDot = (id: number, now: number): Dot => {
    const startContinentKey = getRandomContinent();
    const endContinentKey = getRandomContinent(startContinentKey);
    
    const start = CONTINENTS[startContinentKey as keyof typeof CONTINENTS];
    const end = CONTINENTS[endContinentKey as keyof typeof CONTINENTS];

    const duration = MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION);
    
    // Add some randomness to start/end points within a continent's radius
    const startX = start.x + (Math.random() - 0.5) * 10;
    const startY = start.y + (Math.random() - 0.5) * 10;
    const endX = end.x + (Math.random() - 0.5) * 10;
    const endY = end.y + (Math.random() - 0.5) * 10;

    // Calculate a control point for the quadratic Bezier curve
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    const curveAmount = distance / 200;
    
    const controlX = midX + (Math.random() - 0.5) * distance * 0.5 - dy * curveAmount;
    const controlY = midY + (Math.random() - 0.5) * distance * 0.5 + dx * curveAmount;
    
    const color = dotColors[Math.floor(Math.random() * dotColors.length)];

    return {
        id,
        startX, startY,
        endX, endY,
        controlX, controlY,
        startTime: now + Math.random() * MAX_DURATION * 1000,
        duration: duration * 1000,
        colorClass: `flight-dot-${color}`
    };
};


const FlightPaths = () => {
    const [dots, setDots] = useState<Dot[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initialTime = performance.now();
        setDots(Array.from({ length: NUM_DOTS }, (_, i) => createDot(i, initialTime)));
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const animate = (now: number) => {
            if (containerRef.current) {
                const dotElements = containerRef.current.children;
                dots.forEach((dot, i) => {
                    const elapsed = now - dot.startTime;
                    let t = elapsed / dot.duration;

                    if (t >= 1) {
                        dots[i] = createDot(dot.id, now); 
                        t = 0;
                    }
                    
                    if(t < 0) t = 0;

                    const x = (1 - t) * (1 - t) * dot.startX + 2 * (1 - t) * t * dot.controlX + t * t * dot.endX;
                    const y = (1 - t) * (1 - t) * dot.startY + 2 * (1 - t) * t * dot.controlY + t * t * dot.endY;

                    const element = dotElements[i] as HTMLDivElement;
                    if (element) {
                        element.style.transform = `translate(${x}vw, ${y}vh)`;
                        if (t < 0.1) {
                            element.style.opacity = (t * 10).toString();
                        } else if (t > 0.9) {
                            element.style.opacity = ((1 - t) * 10).toString();
                        } else {
                            element.style.opacity = '1';
                        }
                    }
                });
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [dots]);


    return (
        <div ref={containerRef} className="absolute inset-0 z-2 pointer-events-none">
            {dots.map(dot => (
                <div key={dot.id} className={`flight-dot ${dot.colorClass}`} style={{ opacity: 0 }} />
            ))}
        </div>
    );
};

export default FlightPaths;
