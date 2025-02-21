import React, {Fragment, useState} from "react"
import {Container, Grid, GridCol, Space} from "@mantine/core"
import { PrismicRichText } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"

type ContentType = { content: any }

export function ContentSection({ data }: any) {
  // Tableau des blocks contenant { type: "paragraph" | "image", ... }
  const contents = data
    .filter(({ content }: ContentType) => content.length)
    .map(({ content }: ContentType) => content)

  // Compteur global d'images pour appliquer le pattern sur l'ensemble de l'article
  let globalImageIndex = 0

  const pattern = ["right", "right", "left"] // Pattern : 2 coups à droite, 1 coup à gauche

  if (!contents.length) return null

  return (
    <Container id="content-section" fluid className="py-10">
      {contents.map((block: any, blockIndex: number) => {
        const hasText = block.some(({type}: any) => type === "paragraph")

        return (
          <div key={blockIndex} style={{ marginBottom: "2rem" }}>
            {block.map((item: any, itemIndex: number) => {
              if (item.type === "image") {
                if (!hasText) {
                  return (
                    <div
                      key={`${blockIndex}-${itemIndex}`}
                      style={{
                        display: "block",
                        margin: "0 auto",
                        textAlign: "center",
                        maxWidth: "60%",
                      }}
                    >
                      <PrismicNextImage field={item} />
                    </div>
                  )
                } else {
                  const floatSide = pattern[globalImageIndex % pattern.length]
                  globalImageIndex++

                  const styleFloat =
                    floatSide === "right"
                      ? { float: "right", margin: "0 0 1rem 1rem" }
                      : { float: "left", margin: "0 1rem 1rem 0" }

                  // @ts-ignore
                  return (
                    <div key={`${blockIndex}-${itemIndex}`} style={styleFloat}>
                      <PrismicNextImage field={item} />
                    </div>
                  )
                }
              }

              if (item.type === "paragraph") {
                return (
                  <div
                    key={`${blockIndex}-${itemIndex}`}
                    style={{ marginBottom: "1rem" }}
                  >
                    <PrismicRichText field={[item]} />
                  </div>
                )
              }

              return null
            })}

            <div style={{ clear: "both" }} />
            <Space h="xl" />
          </div>
        )
      })}
    </Container>
  )

  // return (
  //   <Container id='content-section' fluid className="py-10">
  //     <Grid
  //       columns={12}
  //       gutter={0}
  //       justify='left'
  //       className="mx-auto"
  //     >
  //       {contents.map((block: any, index: any) => (
  //         <Fragment key={index}>
  //           {block.map((item: any, jIndex: any) => (
  //             <GridCol key={`${index}${jIndex}`}>
  //               {item.type === "image" && (
  //                 <div style={{float: "right", margin: "5px -90px 20px 20px", maxWidth: "60%"}}>
  //                   <PrismicNextImage field={item}/>
  //                 </div>
  //               )}
  //               {item.type === "paragraph" && (
  //                 <div className="max-w-2xl mx-auto">
  //                   <PrismicRichText field={[item]} />
  //                 </div>
  //               )}
  //             </GridCol>
  //           ))}
  //           <GridCol span={12}><Space h="xl"/></GridCol>
  //         </Fragment>
  //       ))}
  //     </Grid>
  //   </Container>
  // )
}
