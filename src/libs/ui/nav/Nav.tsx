import {
  Accordion,
  Container,
  Flex,
  Grid,
  GridCol,
  Tabs,
  Text
} from "@mantine/core"
import Link from "next/link"
import {accordionCVA, mobileLinksCVA, navContainerCVA, navTabCVA, responsiveMenuCVA} from "./nav.classes"
import {BurgerMenu} from "@/libs/ui/icons/BurgerMenu"
import {FC, useState} from "react";
import { MenuItems } from "./MenuItems";
import {useRouter} from "next/router";
import {linkResolver} from "@/prismicio";

const routes = {
  '/': '0',
  '/assurances/[uid]': '1',
  '/contact': '2',
  '/nous-connaitre': '3'
}

export const Nav: FC<any> = ({ nav }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  // @ts-ignore
  const [value, setValue] = useState<string | null>(routes[router.route]);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  if (!nav) return null

  return (
    <div className={`${isOpen ? 'bg-white' : 'bg-transparent'}`}>
      <div className={navContainerCVA.root()}>
        <Grid
          columns={12}
          gutter={0}
          justify='left'
        >
          <GridCol>
            <Flex align="stretch" gap='80px' className='z-20 relative justify-between md:justify-start' direction='row'>
              <Link href='/' onClick={() => setValue('0')}>
                <img
                  src="/amerga-logo_2.gif" alt="Amerga"
                  style={{ width: 100, height: 'auto', display: 'block' }}
                />
              </Link>

              <Tabs
                variant="unstyled"
                value={value}
                onChange={(val) => {
                  if (val === '1') return
                  setValue(val)
                }}
                className={navTabCVA.root({ opened: isOpen })}
              >
                <MenuItems
                  rootRef={rootRef} value={value}
                  setControlRef={setControlRef}
                  controlsRefs={controlsRefs}
                  setRootRef={setRootRef}
                  setValue={setValue}
                  nav={nav}
                />
              </Tabs>

              <div onClick={toggleMenu} className='md:hidden flex items-center cursor-pointer z-20'>
                <BurgerMenu />
              </div>
            </Flex>
          </GridCol>
        </Grid>
      </div>

      <Container fluid bg='var(--color-white)' className={responsiveMenuCVA.root({ opened: isOpen })}>
        <Flex direction='column' gap='sm'>
          <Link
            href={linkResolver(nav.data.home)}
            onClick={() => {
              setValue('0');
              toggleMenu()
            }}
          >
            <Text className={mobileLinksCVA.root({ active: value === '0', subItem: false })}>
              {nav.data.home.text}
            </Text>
          </Link>

          <Accordion chevronPosition='right' chevron={<p>xxx</p>} unstyled>
            <Accordion.Item key={'item.value'} value={'item.value'}>
              <Accordion.Control className={accordionCVA.root({ active: value === '1' })}>
                {nav.data.assurances[0].label}
              </Accordion.Control>
              <Accordion.Panel>
                <Link
                  className={mobileLinksCVA.root({ subItem: true })}
                  href={linkResolver(nav.data.assurances[0].auto)}
                  onClick={() => {
                    setValue('1');
                    toggleMenu()
                  }}
                >
                  {nav.data.assurances[0].auto.text}
                </Link>
              </Accordion.Panel>

              <Accordion.Panel>
                <Link
                  className={mobileLinksCVA.root({ subItem: true })}
                  href={linkResolver(nav.data.assurances[0].maison)}
                  onClick={() => {
                    setValue('1');
                    toggleMenu()
                  }}
                >
                  {nav.data.assurances[0].maison.text}
                </Link>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>


          <Link
            href={linkResolver(nav.data.contact)}
            onClick={() => {
              setValue('2');
              toggleMenu()
            }}
          >
            <Text className={mobileLinksCVA.root({ active: value === '2', subItem: false })}>
              {nav.data.contact.text}
            </Text>
          </Link>

          <Link
            href={linkResolver(nav.data.nous_connaitre)}
            onClick={() => {
              setValue('3');
              toggleMenu()
            }}
          >
            <Text className={mobileLinksCVA.root({ active: value === '3', subItem: false })}>
              {nav.data.nous_connaitre.text}
            </Text>
          </Link>
        </Flex>
      </Container>
    </div>
  )
}
