import React from 'react'
import {Box, Container, Space} from '@mantine/core'
import {PrismicRichText} from '@prismicio/react'
import {PrismicNextImage} from '@prismicio/next'
import {contentContainerCVA, contentCVA, imgCVA, paragraphCVA} from '@/components/Content/content.classes'

type ContentType = { content: any }

export function ContentSection({data} = {data: []} as any) {
  const contents = data
    .filter(({content}: ContentType) => content.length)
    .map(({content}: ContentType) => content)

  if (!contents.length) return null

  let globalImageIndex = 0
  const pattern: Array<'right' | 'left'> = ['right', 'right', 'left']

  return (
    <Container id='content-section' fluid className={contentCVA.root()}>
      {contents.map((block: any, blockIndex: number) => {
        const hasText = block.some(({type}: any) => type === 'paragraph')

        return (
          <Box className={contentContainerCVA.root()} key={blockIndex}>
            {block.map((item: any, itemIndex: number) => {
              if (!hasText && item.type === 'image') {
                return (
                  <Box key={`${blockIndex}-${itemIndex}`} className={imgCVA.root({floatSide: 'center'})}>
                    <PrismicNextImage field={item} style={{width: '100%'}}/>
                  </Box>
                )
              }

              if (item.type === 'image') {
                globalImageIndex++

                return (
                  <Box key={`${blockIndex}-${itemIndex}`}
                       className={imgCVA.root({floatSide: pattern[globalImageIndex % pattern.length]})}>
                    <PrismicNextImage field={item}/>
                  </Box>
                )

              }

              if (item.type === 'paragraph') {
                return (
                  <Box key={`${blockIndex}-${itemIndex}`} className={paragraphCVA.root()}>
                    <PrismicRichText field={[item]}/>
                  </Box>
                )
              }

              return null
            })}

            <Box className={imgCVA.clear()}/>
            <Space h='xl'/>
          </Box>
        )
      })}
    </Container>
  )
}
