import {navListCVA, tabsTabCVA} from "@/libs/ui/nav/nav.classes";
import {FloatingIndicator, Menu, TabsList, TabsTab, UnstyledButton} from "@mantine/core";
import {ArrowDown} from "@/libs/ui/icons/ArrowDown";
import Link from "next/link";
import {cva} from "class-variance-authority";
import {linkResolver} from "@/prismicio";

const indicatorCVA = {
  root: cva(['bg-transparent !rounded-[10px] !h-full'], {
    variants: {
      active: {
        true: '!bg-grey-secondary',
        false: ''
      }
    }
  })
}

export const MenuItems = ({
  setControlRef,
  controlsRefs,
  setRootRef,
  setValue,
  rootRef,
  value,
  nav
}: any) => {
  if (!nav) return null

  return (
    <TabsList className={navListCVA.root()} grow={false} ref={setRootRef}>
      <Link href={linkResolver(nav.data.home)}>
        <TabsTab value="0" ref={setControlRef('0')} className={tabsTabCVA.root()}>
          {nav.data.home.text}
        </TabsTab>
      </Link>

      <TabsTab
        value="1"
        ref={setControlRef('1')}
        className={tabsTabCVA.root()}
        rightSection={<ArrowDown />}
      >
        <Menu shadow="md" offset={20} position='bottom'>
          <Menu.Target>
            <UnstyledButton
              className=' !text-soft-black !text-sm !font-semibold !rounded-[10px] hover:!bg-grey-secondary'
              component='div'
            >
              {nav.data.assurances[0].label}
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Link href={linkResolver(nav.data.assurances[0].auto)} onClick={() => setValue('1')}>
              <Menu.Item className='hover:!bg-grey-secondary !pl-5 !pr-10' value='assurances/auto'>
                {nav.data.assurances[0].auto.text}
              </Menu.Item>
            </Link>

            <Link href={linkResolver(nav.data.assurances[0].maison)} onClick={() => setValue('1')}>
              <Menu.Item className='hover:!bg-grey-secondary !pl-5 !pr-10'>
                {nav.data.assurances[0].maison.text}
              </Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      </TabsTab>

      <Link href={linkResolver(nav.data.contact)}>
        <TabsTab value="2" ref={setControlRef('2')} className={tabsTabCVA.root()}>
          {nav.data.contact.text}
        </TabsTab>
      </Link>

      <Link href={linkResolver(nav.data.nous_connaitre)}>
        <TabsTab value="3" ref={setControlRef('3')} className={tabsTabCVA.root()}>
          {nav.data.nous_connaitre.text}
        </TabsTab>
      </Link>

      <FloatingIndicator
        target={value ? controlsRefs[value] : null}
        parent={rootRef}
        className={indicatorCVA.root({ active: true })}
      />
    </TabsList>
  )
}
