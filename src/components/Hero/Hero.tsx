import React from 'react'
import {Container, Box, Title, Grid, GridCol, Flex} from '@mantine/core'
import {PrismicNextImage} from '@prismicio/next'
import {PrismicRichText} from '@prismicio/react'
import {assurancesCVA, cardCVA, containerCVA, pictureCVA} from '@/components/Hero/hero.classes'
import {getContrastYIQ} from '@/utils/getContrastYIQ'

export function HeroSection({data} = {data: []} as any) {
  const [hero] = data || []
  if (!hero) return null

  const badgeColor = getContrastYIQ(hero.badge_color)

  return (
    <Container id='hero-section' fluid className={assurancesCVA.root()}>
      <Grid className={containerCVA.root()}>
        <GridCol span={{ base: 12 }} className={pictureCVA.block()} >
          <PrismicNextImage field={hero.image} className={pictureCVA.img()}/>
          <Box style={{ backgroundColor: hero.badge_color }} className={pictureCVA.badge()}>
            <Box className={pictureCVA.badgeText({ textColor: badgeColor })}>{hero.badge}</Box>
          </Box>
        </GridCol>
        <Box className={cardCVA.root()}>
          <Flex direction='column' className={cardCVA.content()}>
            <h1 className={cardCVA.title()}>{hero.titre}</h1>
            <PrismicRichText
              field={hero.overview}
              components={{paragraph: ({children}) => <p className='text-[18px]'>{children}</p>}}
            />
          </Flex>
          {hero.support_text &&
            <Box className={cardCVA.support()}>
              <PrismicRichText field={hero.support_text}/>
            </Box>
          }
        </Box>
      </Grid>
    </Container>
  )
}
