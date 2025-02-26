import {FC, ReactNode, useState} from "react";
import { Content } from "@prismicio/client";
import {PrismicRichText, SliceComponentProps} from "@prismicio/react";
import {homepageCVA} from "@/styles/page.styles";
import {PrismicNextImage} from "@prismicio/next";

import styles from './styles.module.css';

const jobTitle = {
  heading2: ({ children }: { children: ReactNode }) => <h2 className='text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight font-display-fira mb-16'>{children}</h2>,
}

const jobDescription = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='text-sm tracking-[0.16px] leading-[22px] block min-h-[22px]'>{children}</p>,
}

/**
 * Props for `Executives`.
 */
export type ExecutivesProps = SliceComponentProps<Content.ExecutivesSlice> & {
  executiveManagers: any
};

/**
 * Component for "Executives" Slices.
 */
const Executives: FC<ExecutivesProps> = ({ slice, executiveManagers }) => {
  if (executiveManagers.results_size === 0) return null

  console.log('%cslice', 'color: orange; font-size: 12px;', executiveManagers)

  return (
    <section
      className={homepageCVA.root()}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.container}>
        <nav id='tabs' className={styles.tabs}>
          <ul className='flex gap-[24px] text-[12px] uppercase font-semibold justify-start'>
            {executiveManagers.results.map((ex: any, index: number) => {
              return (
                <li
                  key={index}
                  className={`${styles.li} ${index === 1 ? styles.active : ''}`}
                >
                  {(index+1).toString().padStart(2, '0')}{'. '}{ex.data.name}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.photo}>
          <PrismicNextImage
            className={styles.image}
            field={executiveManagers.results[0].data.photo}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className={styles.description}>
          <PrismicRichText field={executiveManagers.results[0].data.job_title} components={jobTitle} />
          <PrismicRichText field={executiveManagers.results[0].data.job_description} components={jobDescription} />
        </div>
      </div>
    </section>
  );
};

export default Executives;
