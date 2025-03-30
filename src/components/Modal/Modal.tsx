import React from "react"
import {Box, Modal, TransitionProps} from "@mantine/core"
import {PrismicImage, PrismicRichText} from "@prismicio/react"
import {Calendar} from "@/libs/ui/icons/Calendar"
import {modalCVA, paragraphCVA} from "@/components/Modal/modal.classes"


type ModalManagerProps = any

const components = {
  title: {
    paragraph: ({children}: {children: React.ReactNode}) => (
      <h2 className={paragraphCVA.title()}><b>{children}</b></h2>
    ),
  },
  text: {
    paragraph: ({children}: {children: React.ReactNode}) => (
      <p className={paragraphCVA.text()}>{children}</p>
    ),
  },
}

export const ModalManager = React.memo(({modalContent, opened, onClose}: ModalManagerProps) => {
  if (!modalContent) return null

  const transitionProps: Partial<Omit<TransitionProps, "mounted">> = {
    transition: "fade",
    duration: 150,
    timingFunction: "ease",
  }
  const overlayProps = {blur: 3}
  const arrival_date = modalContent.primary?.arrival_date || modalContent.data?.arrival_date

  const formattedDate = React.useMemo(() => {
    if (!arrival_date) return null

    const rawDate = new Date(arrival_date)
    const localizedDate = new Intl.DateTimeFormat("fr-FR", {
      month: "long",
      year: "numeric",
    }).format(rawDate)

    return (
      <Box className={modalCVA.date()}>
        <Calendar/>
        <p>{localizedDate.charAt(0).toUpperCase() + localizedDate.slice(1)}</p>
      </Box>
    )
  }, [arrival_date])

  if (modalContent.type === 'executive_manager') {
    return (
      <Modal
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        transitionProps={transitionProps}
        size="100%"
        overlayProps={overlayProps}
        classNames={{content: modalCVA.root()}}
      >
        <Box className={modalCVA.container()}>
          <Box className={modalCVA.box()}>
            <Box className={modalCVA.head()}>
              <Box className={modalCVA.img()}>
                <PrismicImage field={modalContent.data.photo} className={modalCVA.img()} />
              </Box>
              <Box className={modalCVA.info()}>
                <h2 className={paragraphCVA.title()}><b>{modalContent.data.name}</b></h2>
                <PrismicRichText field={modalContent.data.job_title} components={components.text}/>
                {formattedDate}
              </Box>
            </Box>

            {/* Description */}
            <PrismicRichText field={modalContent.data.job_description} />
          </Box>
        </Box>
      </Modal>
    )
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      transitionProps={transitionProps}
      size="100%"
      overlayProps={overlayProps}
      classNames={{content: modalCVA.root()}}
    >
      <Box className={modalCVA.container()}>
        <Box className={modalCVA.box()}>
          <Box className={modalCVA.head()}>
            <Box className={modalCVA.img()}>
              <PrismicImage field={modalContent.primary.photo} className={modalCVA.img()} />
            </Box>
            <Box className={modalCVA.info()}>
              <PrismicRichText field={modalContent.primary.name} components={components.title}/>
              <PrismicRichText field={modalContent.primary.job} components={components.text}/>
              {formattedDate}
            </Box>
          </Box>

          {/* Description */}
          <PrismicRichText field={modalContent.primary.description} />
        </Box>
      </Box>
    </Modal>
  )
})

ModalManager.displayName = "ModalManager"
