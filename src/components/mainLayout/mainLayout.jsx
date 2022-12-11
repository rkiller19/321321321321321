import React from 'react'
import { useSelector } from 'react-redux'
import { useEthers } from '@usedapp/core'
import { UnsupportedChainIdError } from '@web3-react/core'

 
import layout from './mainLayout.module.scss'
import mainSection from './mainLayout.module.scss'
import mainContent from './mainLayout.module.scss'
import connectMessage from './mainLayout.module.scss'
import connectMessageInnerContainer from './mainLayout.module.scss'
import connectMessageInnerContainerTitle from './mainLayout.module.scss'
import styles from './mainLayout.module.scss'

import { SidebarNew, Header, Title, ConnectionStatus } from '../'
import NETWORKS from '../../networks.json'
import { supportedChains } from '../../constants'

function listSupportenNetworks(supportenNetworks) {
  return supportenNetworks.map((id, idx) => {
    if (idx === 0) {
      return <span key={id}>{NETWORKS[id].name}</span>
    }
    return <span key={id}>, {NETWORKS[id].name} </span>
  })
}

function MainWrap({ title, children }) {
  return (
    <div className={styles.layout}>
      <SidebarNew />
      <section className={styles.mainSection}>
        <Header title={title} />
        <main className={styles.mainContent}>{children}</main>
      </section>
    </div>
  )
}

export function MainLayout({ title, pageSupportedChains, children }) {
  const { chainId, error } = useEthers()
  const isConnected = useSelector((state) => state.connectionReducer)
  const wrongNetwork =
    error instanceof UnsupportedChainIdError ||
    (pageSupportedChains && !pageSupportedChains?.includes(chainId))

  // if no metamask detected
  if (!window.ethereum) {
    return (
      <MainWrap title={title}>
        <div className={styles.connectMessage}>
          <div className={styles.connectMessageInnerContainer}>
            <Title level={6}>
              Please use Metamask app or browser extension
            </Title>
          </div>
        </div>
      </MainWrap>
    )
  }

  if (error && !wrongNetwork) {
    return (
      <MainWrap title={title}>
        <div className={styles.connectMessage}>
          <div className={styles.connectMessageInnerContainer}>{String(error)}</div>
        </div>
      </MainWrap>
    )
  }

  if (wrongNetwork) {
    return (
      <MainWrap title={title}>
        <div className={styles.connectMessage}>
          <div className={styles.connectMessageInnerContainer}>
            <Title className={styles.connectMessageInnerContainerTitle} level={3}>
              Unsupported network
            </Title>
            <div>
              This page supports only:{' '}
              {listSupportenNetworks(pageSupportedChains || supportedChains)}
            </div>
          </div>
        </div>
      </MainWrap>
    )
  }

  if (isConnected && chainId) {
    return <MainWrap title={title}>{children}</MainWrap>
  }

  return (
    <MainWrap title={title}>
      <div className={styles.connectMessage}>
        <div className={styles.connectMessageInnerContainer}>
          <Title className={styles.connectMessageInnerContainerTitle} level={3}>
            Please connect wallet
          </Title>
          <ConnectionStatus />
        </div>
      </div>
    </MainWrap>
  )
}
