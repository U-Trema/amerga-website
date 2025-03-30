import {
  Flex,
  Grid,
  GridCol,
  Tabs
} from "@mantine/core"
import Link from "next/link"
import {navContainerCVA, navTabCVA} from "./nav.classes"
import {BurgerMenu} from "@/libs/ui/icons/BurgerMenu"
import {FC, useEffect, useState} from "react";
import { MenuItems } from "./MenuItems";
import {useRouter} from "next/router";
import OpenedMenu from "@/libs/ui/nav/OpenedMenu";
import MobileNav from "@/libs/ui/nav/MobileNav";

const routes = {
  '/': '0',
  '/assurances/[uid]': '1',
  '/contact': '2',
  '/nous-connaitre': '3'
}

export const Nav: FC<any> = ({ nav, assurances_link }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const [mobileIsOpen, setMobileIsOpen] = useState(false)
  const toggleMobileMenu = () => setMobileIsOpen(!mobileIsOpen)

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  // @ts-ignore
  const [value, setValue] = useState<string | null>(routes[router.route]);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  useEffect(() => {
    if (router.route === ('/assurances/[uid]')) {
      setValue('1')
    }
    setIsOpen(false)
    toggleMobileMenu()
  }, [router])

  if (!nav) return null

  return (
    <div className={`${isOpen ? 'bg-transparent md:bg-white' : 'bg-transparent'} ${mobileIsOpen ? 'bg-white md:bg-transparent' : 'bg-transparent'}`}>
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
                  style={{ width: 100, height: 'auto', display: 'block' }}
                  src="/amerga-logo_2.gif"
                  alt="Amerga"
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
                  setControlRef={setControlRef}
                  controlsRefs={controlsRefs}
                  setRootRef={setRootRef}
                  toggleMenu={toggleMenu}
                  setValue={setValue}
                  rootRef={rootRef}
                  value={value}
                  nav={nav}
                />
              </Tabs>

              <div onClick={toggleMobileMenu} className='md:hidden flex items-center cursor-pointer z-20'>
                <BurgerMenu />
              </div>
            </Flex>
          </GridCol>
        </Grid>
      </div>

      {!mobileIsOpen && <MobileNav nav={nav} assurances_link={assurances_link} />}

      {isOpen && (
        <OpenedMenu data={nav.data} links={assurances_link} />
      )}
    </div>
  )
}
