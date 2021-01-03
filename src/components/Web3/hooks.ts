import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { StickerTypeABI, StickerTypeAddresses } from './stickerContracts'
import { parseMetadataEDN, IMetadata } from '../Web3/stickerMetadata'
import contentHash from 'content-hash'
import { Contract } from '@ethersproject/contracts'
import { utils } from 'ethers'

import { injected } from './connectors'

export function useEagerConnect() {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React()

  useEffect((): any => {
    const { ethereum } = window as any
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(injected)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(injected)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}


// fetch my sticker packs

interface IStickerPacks {
  [key: number]: IMetadata
}

export function useFetchMyStickerPackIds() {
  const { account, chainId, library } = useWeb3React()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [myStickerPackIds, setMyStickerPackIds] = useState<number[]>([])

  useEffect((): any => {

    if (!!account && !!library) {
      setLoading(true);

      // TEST
      //let account = "0x5194EF53dc9c3ebfe6A8A7f6793d53ce50066738" // "0x5194EF53dc9c3ebfe6A8A7f6793d53ce50066738" //"0xA71C4Ef0c5BC4b1a172A19DcB5882683808E6b82";
      //

      let stc = new Contract(StickerTypeAddresses[chainId as number], StickerTypeABI, library);
      //let cinterface = new Interface(StickerTypeABI)
      //let smc = new Contract(StickerMarketAddresses[chainId as number], StickerMarketABI, library);
      stc.balanceOf(account).then((numOfPacks: number) => {
        let promises: Promise<any>[] = [];

        for (let i = 0; i < numOfPacks; i++) {
          promises.push(stc.tokenOfOwnerByIndex(account, i));
        }

        // get pack ids I own
        return Promise.all(promises).then((packIds) => {
          //console.log("packIds: " + packIds);

          setMyStickerPackIds(packIds);
          setLoading(false);
        })

      }).catch((e: any) => {
        setLoading(false);
        console.log(e)
        setError(e)
      });
    }
  }, [account, library, chainId])

  return { loading: loading, myStickerPackIds: myStickerPackIds, error: error }
}


export function useFetchStickerPackSummary(packId: number | undefined) {
  const { chainId, library } = useWeb3React()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [stickerPackSummary, setStickerPackSummary] = useState<IMetadata>()

  useEffect((): any => {
    if (!!library && !!packId) {
      setLoading(true);

      let stc = new Contract(StickerTypeAddresses[chainId as number], StickerTypeABI, library);

      stc.getPackSummary(packId).then((packSummary: any) => {

        // ipfs from contenthash from packSummary
        let contenthash = packSummary[2];
        let ipfshash = contentHash.decode(contenthash)

        fetch(`https://ipfs.io/ipfs/${ipfshash}`)
          .then((resp: any) => resp.text())
          .then(metadataEDN => {
            let packSummary = parseMetadataEDN(metadataEDN);

            packSummary.preview = contentHash.decode(packSummary.preview)
            packSummary.thumbnail = contentHash.decode(packSummary.thumbnail)

            packSummary.stickers.forEach(sticker => {
              sticker.hash = contentHash.decode(sticker.hash)
            });

            setStickerPackSummary(packSummary);
            setLoading(false)
          });
      }).catch((e: any) => {
        setError(e)
        console.log(e)
        setLoading(false)
      });
    } else {
      setLoading(false)
    }
  }, [library, chainId, packId])

  return { loading: loading, stickerPackSummary: stickerPackSummary, error: error }
}

export function useFetchPaymentData(packId: number | undefined) {
  const { chainId, library } = useWeb3React()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [paymentData, setPaymentData] = useState<string>()

  useEffect((): any => {
    if (!!library && !!packId) {
      setLoading(true);

      let stc = new Contract(StickerTypeAddresses[chainId as number], StickerTypeABI, library);

      stc.getPaymentData(packId).then((paymentData: any) => {

        // ipfs from contenthash from packSummary

        let i = parseFloat(utils.formatUnits(paymentData[2], 18));

        setPaymentData(i.toString());
        setLoading(false)
      }).catch((e: any) => {
        setError(e)
        console.log(e);
        setLoading(false)
      });
    } else {
      setLoading(false)
    }
  }, [library, chainId, packId])

  return { loading: loading, paymentData: paymentData, error: error }
}
