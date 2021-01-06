import { TransactionResponse, Web3Provider } from '@ethersproject/providers';
import { Button, Grid, Typography } from '@material-ui/core';
import { UnsupportedChainIdError, useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
// web3
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { SnackbarProvider } from 'notistack';
import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Route, Switch, useHistory
} from "react-router-dom";
import logo from '../../images/sickers_logo.svg';
import Dashboard from '../Dashboard';
import EditStickerPack from '../EditStickerPack';
import NavBar from '../NavBar';
import NewStickerPackForm from '../NewStickerPackForm';
import {
  authereum,
  fortmatic, frame, injected,
  ledger,
  portis,
  squarelink,
  torus, walletconnect,
  walletlink
} from '../Web3/connectors';
import { StickerStateProvider } from '../Web3/context';
import { useEagerConnect, useInactiveListener } from '../Web3/hooks';
import useStyles from './styles';




enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
  Ledger = 'Ledger',
  Frame = 'Frame',
  Authereum = 'Authereum',
  Fortmatic = 'Fortmatic',
  Portis = 'Portis',
  Squarelink = 'Squarelink',
  Torus = 'Torus'
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
  [ConnectorNames.Ledger]: ledger,
  [ConnectorNames.Frame]: frame,
  [ConnectorNames.Authereum]: authereum,
  [ConnectorNames.Fortmatic]: fortmatic,
  [ConnectorNames.Portis]: portis,
  [ConnectorNames.Squarelink]: squarelink,
  [ConnectorNames.Torus]: torus
}


// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>...loading...</div>
  </div>
);

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <b>Status Sitckers</b><br/>Terms • Privacy
    </div>
    )
}

function NotConnected(props: any) {
  const { t } = useTranslation();
  const classes = useStyles()

  return(
    <Grid
    direction="column"
    justify="center"
    alignItems="center"
    container
    spacing={0}
    style={{ marginTop: '25vh'}}>
      <Grid item xs={6}>
        <img src={logo} className={classes.homeLogo} alt="logo"/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h4' color='textPrimary' paragraph>{t('home.text1')}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="subtitle1" color='textSecondary' align="center" paragraph>{t('home.text2')}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="subtitle1" color='textSecondary' align="center" paragraph>{props.account}</Typography>
        <Button variant="contained" color="primary" disableElevation disabled={props.active ? true : false} onClick={()=>{props.setActivatingConnector(connectorsByName['Injected']); props.activate(connectorsByName['Injected'])}}>
          {t('connect-wallet')}
        </Button>
       </Grid>
    </Grid>
  )
}

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function Main() {
  const context = useWeb3React<Web3Provider>()
  const history = useHistory();
  const [pendingTxs, setPendingTxs] = useState<TransactionResponse[]>([]);
  const { account, connector, active, error, activate, library } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // hand`le logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  React.useEffect(() => {
    if (active === true) {
      history.push('/dashboard/');
    }
  }, [active, history])

  return (
    <div>
      {(active !== true) &&
        <NotConnected account={account} setActivatingConnector={setActivatingConnector} activate={activate}/>
      }
      {!!error && <Typography color="error">{getErrorMessage(error)}</Typography>}
      {(active === true) &&
        <>
        <NavBar/>
        <div style={{marginTop: 8}}>
        <Switch>
          <Route path="/dashboard/">
            <Dashboard pendingTxs={pendingTxs} setPendingTxs={setPendingTxs}/>
          </Route>
          <Route path="/new/">
            <NewStickerPackForm pendingTxs={pendingTxs} setPendingTxs={setPendingTxs}/>
          </Route>
          <Route path="/edit/:packId">
            <EditStickerPack/>
          </Route>
        </Switch>
        </div>
        </>
      }
      <Footer />
    </div>
  )
}

function App() {  
  return (
    <Suspense fallback={<Loader />}>
      <Router>
      <Web3ReactProvider getLibrary={getLibrary}>
      <StickerStateProvider>
      <SnackbarProvider>
      <Main/>
      </SnackbarProvider>
      </StickerStateProvider>
      </Web3ReactProvider>
      </Router>
    </Suspense>
  );
}

export default App;
