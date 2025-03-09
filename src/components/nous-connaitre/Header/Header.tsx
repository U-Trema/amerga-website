import React from "react"
import {Box, Container, Text} from "@mantine/core"
import {nousConnaitrePageCVA} from "@/styles/page.styles"
import {PrismicNextImage} from "@prismicio/next"
import {HeaderProps} from "@/components/nous-connaitre/types"


export const Header = React.memo<HeaderProps>(({title, catchphrase, image}) => (
  <Box className={nousConnaitrePageCVA.hero()}>
    <header>
      <Container className={nousConnaitrePageCVA.title()}>
        {title && <h1>{title}</h1>}
        {catchphrase && <Text className={nousConnaitrePageCVA.catchphrase()}>{catchphrase}</Text>}
      </Container>
      <Box className={nousConnaitrePageCVA.heroImageContainer()}>
        {image && <PrismicNextImage field={image} className={nousConnaitrePageCVA.heroImage()}/>}
        <Box className={nousConnaitrePageCVA.heroImageFilter()}/>
      </Box>
    </header>
  </Box>
))

Header.displayName = "Header"