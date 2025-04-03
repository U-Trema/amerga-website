import {navListCVA, tabsTabCVA} from "@/libs/ui/nav/nav.classes";
import {FloatingIndicator, TabsList, TabsTab} from "@mantine/core";
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
  toggleMenu,
  setRootRef,
  setValue,
  rootRef,
  value,
  nav
}: any) => {
  if (!nav) return null

  const onClick = () => {
    toggleMenu();
    setValue('1');
  }

  return (
    <TabsList className={navListCVA.root()} grow={false} ref={setRootRef}>
      <Link href={linkResolver(nav.data.home_bis)}>
        <TabsTab value="0" ref={setControlRef('0')} className={tabsTabCVA.root()}>
          {nav.data.home_bis.text}
        </TabsTab>
      </Link>

      <TabsTab
        value="1"
        ref={setControlRef("1")}
        className={tabsTabCVA.root({ isDropdown: true, active: value === '1' })}
        rightSection={<ArrowDown />}
      >
        <div onClick={onClick}>
          {nav.data.assurances_bis[0].label}
        </div>
      </TabsTab>

      <Link href={linkResolver(nav.data.contact_bis)}>
        <TabsTab value="2" ref={setControlRef('2')} className={tabsTabCVA.root()}>
          {nav.data.contact_bis.text}
        </TabsTab>
      </Link>

      <Link href={linkResolver(nav.data.nous_connaitre_bis)}>
        <TabsTab value="3" ref={setControlRef('3')} className={tabsTabCVA.root()}>
          {nav.data.nous_connaitre_bis.text}
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
