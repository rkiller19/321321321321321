import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import CoinsIcon from '../../assets/coins-red.png'
import PickIcon from '../../assets/pick-grey.png'
import Logo from '../../assets/white-logo.png'
 
import sidebar from './sidebarNew.module.scss'
import sidebarBackgroundLayer from './sidebarNew.module.scss'
import sidebarBackgroundLayerHidden from './sidebarNew.module.scss'
import sidebarHidden from './sidebarNew.module.scss'
import sidebarLogo from './sidebarNew.module.scss'
import sidebarNavList from './sidebarNew.module.scss'
import sidebarNavItem from './sidebarNew.module.scss'
import sidebarNavLink from './sidebarNew.module.scss'
import sidebarNavLinkIcon from './sidebarNew.module.scss'
import sidebarNavLinkActive from './sidebarNew.module.scss'
import closeMenuButton from './sidebarNew.module.scss'

import { openMenuHandler } from '../../actions/menuActions'
import { CloseButton } from '../'

const linksList = [
  { path: '/staking', exact: true, text: 'Staking', icon: CoinsIcon },
  // { path: '/farming', exact: true, text: 'Farming', icon: PickIcon },
]

function NavLinks({ linksList }) {
  return linksList.map(({ path, exact, text, icon }, idx) => (
    <li key={idx} className={sidebarNavItem}>
      <NavLink
        activeClassName={sidebarNavLinkActive}
        className={sidebarNavLink}
        exact={exact}
        to={path}
      >
        <img className={sidebarNavLinkIcon} src={icon} alt="#" />
        {text}
      </NavLink>
    </li>
  ))
}

export function SidebarNew() {
  const isMenuOpen = useSelector((state) => state.menuReducer.isOpen)
  const classNames = isMenuOpen ? sidebar : classnames(sidebar, sidebarHidden)
  const backgroundLayesClassNames = isMenuOpen
    ? sidebarBackgroundLayer
    : classnames(sidebarBackgroundLayerHidden)

  const dispatch = useDispatch()

  const closeMenu = () => {
    dispatch(openMenuHandler(false))
  }

  return (
    <>
      <div onClick={closeMenu} className={backgroundLayesClassNames}></div>
      <div className={classNames}>
        <CloseButton onClick={closeMenu} className={closeMenuButton} />
        <div className={sidebarLogo}>
          <img src={Logo} alt="DAO1" />
        </div>

        <ul className={sidebarNavList}>
          <NavLinks linksList={linksList} />
        </ul>
      </div>
    </>
  )
}
