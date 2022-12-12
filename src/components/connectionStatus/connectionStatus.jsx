import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEthers, shortenAddress } from '@usedapp/core'
import { UnsupportedChainIdError } from '@web3-react/core'
import classnames from 'classnames'

import WalletIcon from '../../assets/wallet-red.png'
import ArrowDown from '../../assets/arrow-down.png'
import { Button } from '../'

import connectionStatus  from './connectionStatus.module.scss'   
import walletIcon  from './connectionStatus.module.scss'
import accountAddressBlock  from './connectionStatus.module.scss'
import accountAddress  from './connectionStatus.module.scss'
import connectButton from './connectionStatus.module.scss'
import disconnectButton from './connectionStatus.module.scss'
import networksMenu from './connectionStatus.module.scss'
import networksMenuHidden from './connectionStatus.module.scss'
import networksMenuList from './connectionStatus.module.scss'
import networksMenuWrapper from './connectionStatus.module.scss'
import networksMenuButton from './connectionStatus.module.scss'
import networksMenuArrow from './connectionStatus.module.scss'
import styles from './connectionStatus.module.scss'

import { withWalletConnection } from '../../utils/withWalletConnection'
import { switchNetwork } from '../../utils/switchNetwork'
import NETWORKS from '../../networks.json'
import { supportedChains } from '../../constants'

function NetworkSwitcher({ deactivateWallet }) {
  const { chainId, error } = useEthers()
  const [menuIsVisible, setMenuIsVidible] = useState(false)
  const wrongNetwork = error instanceof UnsupportedChainIdError

  const menuClassNames = classnames(styles.networksMenu, {
    [styles.networksMenuHidden]: !menuIsVisible,
  })

  const selectButtonText = wrongNetwork
    ? 'Wrong Network'
    : NETWORKS[chainId].name

  return (
    <div className={styles.networksMenuWrapper}>
      <Button
        onClick={() => {
          setMenuIsVidible(!menuIsVisible)
        }}
      >
        {selectButtonText}
        <img className={styles.networksMenuArrow} src={ArrowDown} alt="Select" />
      </Button>
      <div className={menuClassNames}>
        Select network
        <div className={styles.networksMenuList}>
          {supportedChains.map((id) => {
            if (chainId === id) {
              return null
            }

            return (
              <Button
                key={id}
                onClick={() => {
                  switchNetwork(id)
                }}
                className={styles.networksMenuButton}
              >
                {NETWORKS[id].name}
              </Button>
            )
          })}
          <Button onClick={deactivateWallet} className={styles.disconnectButton}>
            Disconnect
          </Button>
        </div>
      </div>
    </div>
  )
}

function ConnectionStatusPure({ activateWallet, deactivateWallet }) {
  const { account, error } = useEthers()
  const isConnected = useSelector((state) => state.connectionReducer)
  const wrongNetwork = error instanceof UnsupportedChainIdError

  const ConnectionResult = () => {
    if (error && !wrongNetwork) {
      return (
        <Button disabled className={styles.connectButton}>
          Error
        </Button>
      )
    }

    if (wrongNetwork) {
      return <NetworkSwitcher deactivateWallet={deactivateWallet} />
    }

    if (isConnected && account) {
      return (
        <>
          <div className={styles.accountAddressBlock}>
            <img className={styles.walletIcon} src={WalletIcon} alt="Wallet" />
            <span className={styles.accountAddress}>
              {account && shortenAddress(account)}
            </span>
          </div>
          <NetworkSwitcher deactivateWallet={deactivateWallet} />
        </>
      )
    }

    return (
      <Button onClick={activateWallet} className={styles.connectButton}>
        Connect Wallet
      </Button>
    )
  }

  return (
    <div className={styles.connectionStatus}>
      <ConnectionResult />
    </div>
  )
}

export const ConnectionStatus = withWalletConnection(ConnectionStatusPure)
