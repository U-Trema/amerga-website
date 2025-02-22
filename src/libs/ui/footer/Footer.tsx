import {FC} from 'react';
import {PrismicRichText} from '@prismicio/react';
import {PrismicNextImage, PrismicNextLink} from '@prismicio/next';
import {Container, Flex, Grid, GridCol} from '@mantine/core';
import {
    footerBottomCVA,
    footerColumnCVA,
    footerContainerCVA,
    footerCVA,
    footerGridCVA
} from '@/libs/ui/footer/footer.classes';

export const Footer: FC<any> = ({footer}) => {
    if (!footer) return null;

    return (
        <footer id='footer' className={footerCVA.root()}>
            <Container className={footerContainerCVA.root()}>
                <Grid
                    columns={12}
                    gutter={6}
                    justify='left'
                >
                    <GridCol span={5} className={footerGridCVA.firstCol()}>
                        <section>
                            <Flex direction='column' gap='xs' className={footerGridCVA.firstColBox()}>
                                <PrismicNextImage field={footer.data.footer_logo} alt="" />
                                <PrismicRichText field={footer.data.footer_slogan}/>
                            </Flex>
                        </section>
                    </GridCol>
                    <GridCol
                        span={{ base: 12, md: 6 }}
                        offset={{ base: 0, md: 2 }}
                    >
                        <section>
                            <Flex className={footerGridCVA.col()}>
                                {footer.data.columns.map((item: any, index: number) => (
                                    <Flex key={index} direction='column'>
                                        <p className={footerColumnCVA.title()}>{item.title}</p>
                                        <ul>
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
                    <Flex direction='column' >
                        <Flex direction='row' gap={8} className={footerBottomCVA.first()}>
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
                                    <PrismicNextLink key={index} field={link}/>
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                </section>
            </Container>
        </footer>
    );
};
