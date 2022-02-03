import { FC } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import Add from "../../assets/add.svg"
import Settings from "../../assets/settings.svg"
import { AccountList, AccountListItem } from "../components/Account/AccountList"
import { Header } from "../components/Header"
import { IconButton } from "../components/IconButton"
import { NetworkSwitcher } from "../components/NetworkSwitcher"
import { H1, P } from "../components/Typography"
import { routes } from "../routes"
import { useAccount } from "../states/account"
import { useAppState } from "../states/app"
import { makeClickable } from "../utils/a11y"
import { deployWallet, getStatus } from "../utils/wallets"

const AccountListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${H1} {
    text-align: center;
  }

  > ${AccountList} {
    width: 100%;
  }
`

const IconButtonCenter = styled(IconButton)`
  margin: auto;
`

const Paragraph = styled(P)`
  text-align: center;
`

export const AccountListScreen: FC = () => {
  const navigate = useNavigate()
  const { switcherNetworkId, localhostPort } = useAppState()
  const { wallets, selectedWallet, addWallet } = useAccount()

  const walletsList = Object.values(wallets)

  const handleAddWallet = async () => {
    try {
      const newWallet = await deployWallet(switcherNetworkId, localhostPort)
      addWallet(newWallet)
      useAccount.setState({ selectedWallet: newWallet.address })
      navigate(routes.account)
    } catch (error: any) {
      useAppState.setState({ error: `${error}` })
      navigate(routes.error)
    }
  }

  return (
    <AccountListWrapper>
      <Header>
        <IconButton
          size={36}
          {...makeClickable(() => navigate(routes.settings), 99)}
        >
          <Settings />
        </IconButton>
        <NetworkSwitcher hidePort />
      </Header>
      <H1>Accounts</H1>
      <AccountList>
        {walletsList.length === 0 && (
          <Paragraph>
            No wallets on this network, click below to add one.
          </Paragraph>
        )}
        {walletsList.map((wallet, index) => (
          <AccountListItem
            key={wallet.address}
            accountNumber={index + 1}
            address={wallet.address}
            status={getStatus(wallet, selectedWallet)}
          />
        ))}
        <IconButtonCenter size={48} {...makeClickable(handleAddWallet)}>
          <Add />
        </IconButtonCenter>
      </AccountList>
    </AccountListWrapper>
  )
}