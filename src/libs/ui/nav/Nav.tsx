import {
  Container,
  Flex,
  Grid,
  GridCol,
  Tabs,
  Text
} from "@mantine/core"
import Link from "next/link"
import {navContainerCVA, navTabCVA, responsiveMenuCVA} from "./nav.classes"
import {BurgerMenu} from "@/libs/ui/icons/BurgerMenu"
import {FC, useState} from "react";
import { MenuItems } from "./MenuItems";
import {useRouter} from "next/router";

const routes = {
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
              <Link href='/'>
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
                // defaultValue="insurances"
                className={navTabCVA.root({ opened: isOpen })}
              >
                <MenuItems setRootRef={setRootRef} setControlRef={setControlRef} rootRef={rootRef} value={value} controlsRefs={controlsRefs} setValue={setValue} />
              </Tabs>

              <div onClick={toggleMenu} className='md:hidden flex items-center cursor-pointer z-20'>
                <BurgerMenu />
              </div>
            </Flex>
          </GridCol>
        </Grid>
      </div>

      <Container fluid bg='var(--color-white)' className={responsiveMenuCVA.root({ opened: isOpen })}>
        <Text className='!font-semibold'>Assurances</Text>
        <Text className='!font-semibold'>Contact</Text>
        <Text className='!font-semibold'>Nous connaître</Text>
      </Container>
    </div>
  )
}
