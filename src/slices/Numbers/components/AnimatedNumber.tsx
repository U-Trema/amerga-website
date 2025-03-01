import {animatedClasses} from "@/slices/Numbers/components/classes";
import React, {useCallback, useEffect, useRef, useState} from "react";

const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const useScrollTriggeredCountUp = (
  ref: React.RefObject<HTMLElement | HTMLDivElement> | any,
  end: number,
  duration = 2000
) => {
  const [count, setCount] = useState(0)
  const isCounting = useRef(false)
  const frameRate = 1000 / 60
  const totalFrames = Math.round(duration / frameRate)

  const handleScroll = useCallback(
    ([entry]: any) => {
      if (entry.isIntersecting && !isCounting.current) {
        isCounting.current = true
        let frame = 0

        const counter = setInterval(() => {
          frame++
          const progress = easeOutExpo(frame / totalFrames)
          setCount(Math.round(end * progress))

          if (frame === totalFrames) {
            clearInterval(counter)
            isCounting.current = false
          }
        }, frameRate)
      } else {
        isCounting.current = false
        setCount(0)
      }
    },
    [end, frameRate, totalFrames]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, { threshold: 0.7 })
    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [handleScroll, ref])

  return count
}

export const AnimatedNumber = ({ number, textSize }: { number: any; textSize: 'small' | 'medium' | 'large' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const count = useScrollTriggeredCountUp(ref, Number(number[0].text));

  return <p ref={ref} className={animatedClasses.root({ label: number[0].label, text: textSize })}>{count}</p>
}
