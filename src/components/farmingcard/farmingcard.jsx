import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
 
import card from './farmingcard.module.scss'
import cardWrapper from './farmingcard.module.scss'
import cardHead from './farmingcard.module.scss'
import cardHeadLogo from './farmingcard.module.scss'
import cardLabel from './farmingcard.module.scss'
import  cardInfoText from './farmingcard.module.scss'
import cardName from './farmingcard.module.scss'
import cardNameText from './farmingcard.module.scss'
import  cardStakingConditions from './farmingcard.module.scss'
import cardStakingConditionsItem from './farmingcard.module.scss'
import cardStakingItem from './farmingcard.module.scss'
import cardStakingItemHead from './farmingcard.module.scss'
import cardStakingItemInfo from './farmingcard.module.scss'
import cardStakingItemInfoBlock from './farmingcard.module.scss'
import cardStakingItemButtons from './farmingcard.module.scss'
import cardFooter from './farmingcard.module.scss'
import cardTatalStaked from './farmingcard.module.scss'
import cardTatalStakedValue from './farmingcard.module.scss'
import cardButton from './farmingcard.module.scss'
import externalLink from './farmingcard.module.scss'
import externalLinkImg from './farmingcard.module.scss'
import styles from './farmingcard.module.scss'

import { CardModal } from './cardModal/cardModal'
import { Button, TxLoader, Modal, Title } from '../'
import { errorModalAction } from '../../actions/modalAction'
import { staked, unStaked } from '../../actions/stakedAction'
import LinkIcon from '../../assets/link_icon_white.png'

export const FarmingCard = (props) => {
  const [adderModalIsVisible, setAdderModalIsVisible] = useState(false)
  const [withdrawModalIsVisible, setWithdrawModalIsVisible] = useState(false)

  const stakingTransactionState = useSelector(
    (state) => state.stakingReducer.stakingTransactionState,
  )
  const unStakingTransactionState = useSelector(
    (state) => state.stakingReducer.unStakingTransactionState,
  )
  const harvestTransactionState = useSelector(
    (state) => state.stakingReducer.harvestTransactionState,
  )
  const dispatch = useDispatch()

  const HARVEST_IN_PROGRESS = harvestTransactionState === 'IN_PROGRESS'
  const STAKING_IN_PROGRESS = stakingTransactionState === 'IN_PROGRESS'
  const UNSTAKING_IN_PROGRESS = unStakingTransactionState === 'IN_PROGRESS'

  const closeErrorModal = () => {
    dispatch(errorModalAction(false))
  }
  const selector = useSelector((state) => state.stakedReducer.stake)
  const unStakeSelector = useSelector((state) => state.stakedReducer.unStake)
  const errorModalStatus = useSelector((state) => state.modalReducer.errorModal)
  const errorModalMessage = useSelector((state) => state.modalReducer.title)

  if (selector === true) {
    setTimeout(function() {
      dispatch(staked(false))
    }, 4000)
  }
  if (unStakeSelector === true) {
    setTimeout(function() {
      dispatch(unStaked(false))
    }, 4000)
  }

  const getEquivalentUSDRate = (value, multiplier) => {
    return +(multiplier * value).toFixed(2)
  }

  const getNumberOfDays = () => {
    const date1 = new Date('06/11/2021')
    const todayDate = new Date().toISOString().slice(0, 10)
    const date2 = new Date(todayDate)

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime()

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay)

    return diffInDays
  }

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <div className={styles.cardHeadLogo}>
            <img src={props.logo} alt="DAO1" />
          </div>
          <div className={styles.cardName}>
            <span className={styles.cardLabel}>Name</span>
            <span className={styles.cardNameText}>
              {props.tokenName}
              {props.linkUrl !== '' ? (
                <a
                  className={styles.externalLink}
                  href={props.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={LinkIcon} className={styles.externalLinkImg} alt="" />
                </a>
              ) : (
                ''
              )}
            </span>
          </div>
        </div>

        <div className={styles.cardStakingConditions}>
          <div className={styles.cardStakingConditionsItem}>
            <div className={styles.cardLabel}>Allocation</div>
            <div className={styles.cardInfoText}>{props.alloc}</div>
          </div>
          <div className={styles.cardStakingConditionsItem}>
            <div className={styles.cardLabel}>TOTAL LIQUIDITY</div>
            <div className={styles.cardInfoText}>
              {props.showLiquidity ? (
                <p className="percent">
                  $
                  {getEquivalentUSDRate(props.tokenDao1, props.usdDAO1Rate) +
                    getEquivalentUSDRate(props.tokenUSDT1, props.usdUSDTRate)}
                </p>
              ) : (
                <p className="percent">NA</p>
              )}
            </div>
          </div>
          <div className={styles.cardStakingConditionsItem}>
            <div className={styles.cardLabel}>LOCK</div>
            <div className={styles.cardInfoText}>{props.lockInPeriod}</div>
          </div>
        </div>

        <div className={styles.cardStakingItem}>
          <div className={styles.cardStakingItemHead}>
            <div className={styles.cardStakingItemInfo}>
              <div className={styles.cardStakingItemInfoBlock}>
                <div className={styles.cardLabel}>
                  {props.tokenName.replace(/ *\([^)]*\)*/g, '')} STAKED
                </div>
                <div className={styles.cardInfoText}>{props.tokenStaked}</div>
              </div>
            </div>
            <div className={styles.cardStakingItemButtons}>
              <Button
                className={styles.cardButton}
                disabled={
                  STAKING_IN_PROGRESS ||
                  UNSTAKING_IN_PROGRESS ||
                  props.lockIn >= getNumberOfDays()
                }
                onClick={() => {
                  if (
                    STAKING_IN_PROGRESS ||
                    props.lockIn >= getNumberOfDays()
                  ) {
                    return
                  }
                  setWithdrawModalIsVisible(true)
                }}
              >
                Withdraw&nbsp;-
              </Button>

              <Button
                className={styles.cardButton}
                disabled={STAKING_IN_PROGRESS || UNSTAKING_IN_PROGRESS}
                onClick={() => {
                  if (UNSTAKING_IN_PROGRESS) {
                    return
                  }
                  setAdderModalIsVisible(true)
                }}
              >
                Deposit&nbsp;+
              </Button>
            </div>
          </div>
          {(STAKING_IN_PROGRESS || UNSTAKING_IN_PROGRESS) && (
            <TxLoader>Transaction pending</TxLoader>
          )}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.cardTatalStaked}>
            <div className={styles.cardLabel}>{props.title} EARNED</div>
            <div className={styles.cardTatalStakedValue}>{props.tokenEarned}</div>
          </div>
          <Button
            className={styles.cardButton}
            onClick={props.checkAndHarvest}
            disabled={HARVEST_IN_PROGRESS}
          >
            Harvest
          </Button>
        </div>

        {HARVEST_IN_PROGRESS && <TxLoader>Transaction pending</TxLoader>}

        {/* Deposit modal */}
        <CardModal
          isOpen={adderModalIsVisible}
          closeHandler={() => setAdderModalIsVisible(false)}
          title={`Deposit ${props.tokenName}`}
          callMethod={props.checkAndStakeSSGT}
          updateWalletAmount={props.updateWalletAmount}
          buttonText="Deposit"
          balance={props.walletBalance}
          walletAmount={props.walletAmount}
        />

        {/* Withdraw modal */}
        <CardModal
          isOpen={withdrawModalIsVisible}
          closeHandler={() => setWithdrawModalIsVisible(false)}
          title={`Withdraw ${props.tokenName}`}
          callMethod={props.checkAndUnStakeSSGT}
          updateWalletAmount={props.updateWalletAmount}
          buttonText="Withdraw"
          balance={props.tokenStaked}
          walletAmount={props.walletAmount}
        />

        {/* Error modal */}
        <Modal isOpen={errorModalStatus} closeHandler={closeErrorModal}>
          <Title level={2}>Error</Title>
          <p>{errorModalMessage}</p>
        </Modal>
      </div>
    </div>
  )
}
