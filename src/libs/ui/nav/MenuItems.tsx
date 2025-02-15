import {navListCVA, tabsTabCVA} from "@/libs/ui/nav/nav.classes";
import {FloatingIndicator, Menu, TabsList, TabsTab, UnstyledButton} from "@mantine/core";
import {ArrowDown} from "@/libs/ui/icons/ArrowDown";
import Link from "next/link";
import {cva} from "class-variance-authority";
import {useRouter} from "next/router";

const indicatorCVA = {
  root: cva(['bg-transparent !rounded-[10px]'], {
    variants: {
      active: {
        true: '!bg-grey-secondary',
        false: ''
      }
    }
  })
}

export const MenuItems = ({ setRootRef, setControlRef, value, controlsRefs, rootRef, setValue }: any) => {
  const router = useRouter()

  return (
    <TabsList className={navListCVA.root()} grow={false} ref={setRootRef}>
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
              Assurances
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Link href='/assurances/auto' onClick={() => setValue('1')}>
              <Menu.Item className='hover:!bg-grey-secondary !pl-5 !pr-10' value='assurances/auto'>
                Assurances auto
              </Menu.Item>
            </Link>

            <Link href='/assurances/habitation' onClick={() => setValue('1')}>
              <Menu.Item className='hover:!bg-grey-secondary !pl-5 !pr-10'>
                Assurance habitation
              </Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      </TabsTab>

      <Link href='/contact'>
        <TabsTab value="2" ref={setControlRef('2')} className={tabsTabCVA.root()}>
          Contact
        </TabsTab>
      </Link>

      <Link href='/nous-connaitre'>
        <TabsTab value="3" ref={setControlRef('3')} className={tabsTabCVA.root()}>
          Nous connaître
        </TabsTab>
      </Link>

      <FloatingIndicator
        target={value ? controlsRefs[value] : null}
        parent={rootRef}
        className={indicatorCVA.root({ active: router.route !== '/'})}
      />
    </TabsList>
  )
}
