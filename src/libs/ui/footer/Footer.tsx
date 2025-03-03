import {FC, ReactNode} from 'react'
import {PrismicRichText} from '@prismicio/react'
import {PrismicNextImage, PrismicNextLink} from '@prismicio/next'
import {Container, Flex, Grid, GridCol} from '@mantine/core'
import {
  footerBottomCVA,
  footerColumnCVA,
  footerContainerCVA,
  footerCVA,
  footerGridCVA
} from '@/libs/ui/footer/footer.classes'
import Link from "next/link";
import {linkResolver} from "@/prismicio";

const slogan = {
  paragraph: ({ children }: { children: ReactNode }) => <p className='[&>strong]:font-semibold'>{children}</p>,
}

export const Footer: FC<any> = ({footer}) => {
  if (!footer) return null

  return (
    <footer id='footer' className={footerCVA.root()}>
      <Container className={footerContainerCVA.root()}>
        <Grid
          columns={12}
          gutter={6}
          justify='left'
          className='mb-64 lg:mb-128'
        >
          <GridCol span={{ base: 12, md: 12, lg: 6 }} className={footerGridCVA.firstCol()}>
            <section>
              <Flex direction='column' gap='xs' className={footerGridCVA.firstColBox()}>
                <PrismicNextImage field={footer.data.footer_logo} alt="" />
                <PrismicRichText field={footer.data.footer_slogan} components={slogan}/>
              </Flex>
            </section>
          </GridCol>

          <GridCol span={{base: 12, md: 12, lg: 6}} offset={{base: 0, md: 0}}>
            <section>
              <Flex className={footerGridCVA.col()}>
                {footer.data.columns.map((item: any, index: number) => (
                  <Flex key={index} direction='column' className='basis-1/2 md:basis-1/3'>
                    <h3 className={footerColumnCVA.title()}>{item.title}</h3>
                    <ul className='flex flex-col gap-[6px] sm:gap-8'>
                      {item.link.map((link: any) => (
                        <li key={link.key} className={footerColumnCVA.link()}>
                          <PrismicNextLink field={link}/>
                        </li>
                      ))}
                    </ul>
                  </Flex>
                ))}
              </Flex>
            </section>
          </GridCol>
        </Grid>

        <section>
          <Flex direction='column'>
            <Flex direction='row' gap={16} className={footerBottomCVA.first()}>
              {footer.data.slices.map((slice: any) =>
                slice.primary.section_links.map((item: any, index: number) => (
                  <PrismicNextLink key={index} field={item.section_link_url}>
                    <PrismicNextImage field={item.section_link_icon} alt="" />
                  </PrismicNextLink>
                ))
              )}
            </Flex>
            <Flex className={footerBottomCVA.second()}>
              <span className={footerBottomCVA.copyright()}>{footer.data.footer_copyright}</span>
              <Flex className={footerBottomCVA.legal()}>
                {footer.data.legal_link.map((link: any, index: number) => (
                  <PrismicNextLink key={index} field={link} className='font-semibold text-[10px]'/>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </section>
      </Container>
    </footer>
  )
}
