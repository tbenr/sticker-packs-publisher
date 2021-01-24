import { Web3Provider } from '@ethersproject/providers';
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
import React, { Suspense } from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Route, Switch, useHistory
} from "react-router-dom";
import logo from '../../images/sickers_logo.svg';
import Dashboard from '../Dashboard';
import NavBar from '../NavBar';
import StickerPackForm from '../StickerPackForm';
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
function Loader() {
  const classes = useStyles();
  return (
  <div className="App">
    <img src={logo} className={classes.homeLogo} alt="logo"/>
  </div>
  )}

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
  const classes = useStyles();

  const {account, setActivatingConnector, activate, error, active } = props;

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
        <Typography variant="subtitle1" color='textSecondary' align="center" paragraph>{account}</Typography>
        <Button variant="contained" color="primary" disableElevation disabled={active ? true : false} onClick={()=>{setActivatingConnector(connectorsByName['Injected']); activate(connectorsByName['Injected'])}}>
          {t('connect-wallet')}
        </Button>
       </Grid>
       <Grid item xs={6}>
        <Typography variant="subtitle1" align="center" paragraph></Typography>
        {!!error && <Typography color="error" variant="subtitle1" align="center" paragraph>{getErrorMessage(t,error)}</Typography>}
      </Grid>
    </Grid>
  )
}

function getErrorMessage(t: TFunction<string>, error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return t('wallet.error-no-ethereum-provider')
  } else if (error instanceof UnsupportedChainIdError) {
    return t('wallet.error-unsupported-chainid')
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return t('wallet.error-rejected-request')
  } else {
    console.error(error)
    return t('wallet.error-generic')
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
  const { account, connector, active, error, activate, chainId } = context

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

  // always go back to dashboard if something changes
  React.useEffect(() => {
    if (active === true) {
      history.push('/dashboard/');
    }
  }, [active, history, account, chainId])

  return (
    <div>
      {(active !== true) &&
        <NotConnected account={account} setActivatingConnector={setActivatingConnector} activate={activate} error={error}/>
      }
      {(active === true) &&
        <>
        <NavBar/>
        <div style={{marginTop: 8, marginBottom: 8}}>
        <Switch>
          <Route path="/dashboard/">
            <Dashboard/>
          </Route>
          <Route path="/new/">
            <StickerPackForm/>
          </Route>
          <Route path="/edit/:packId">
            <StickerPackForm/>
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
      <SnackbarProvider anchorOrigin={{horizontal: "right", vertical: "bottom"}} maxSnack={5}>
      <Main/>
      </SnackbarProvider>
      </StickerStateProvider>
      </Web3ReactProvider>
      </Router>
    </Suspense>
  );
}

export default App;
