import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import contentHash from 'content-hash'
import { utils } from 'ethers'
import { useEffect, useState } from 'react'
import { IMetadata, parseMetadataEDN } from '../Web3/stickerMetadata'
import { injected } from './connectors'
import { useStickerState } from './context'
import { StickerMarketAddresses, StickerPackAddresses, StickerTypeABI, StickerTypeAddresses } from './stickerContracts'
import { isAddress, parseENSAddress } from '../../utils/eth'
import useDebounce from '../../utils/hooks'
import { ipfsFetch } from '../../utils/ipfs'


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
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

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

export function useFetchMyStickerPackIds() {
  const { account, chainId, library } = useWeb3React()
  const { SuccessStickersCount } = useStickerState();
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [myStickerPackIds, setMyStickerPackIds] = useState<number[]>([])
  const { address } = useStickerTypeContractAddress()

  useEffect((): any => {

    if (!!account && !!library && !!address) {
      setLoading(true);

      // TEST
      //let account = "0x5194EF53dc9c3ebfe6A8A7f6793d53ce50066738" // "0x5194EF53dc9c3ebfe6A8A7f6793d53ce50066738" //"0xA71C4Ef0c5BC4b1a172A19DcB5882683808E6b82";
      //

      let stc = new Contract(address, StickerTypeABI, library);
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
          setError(undefined);
        })

      }).catch((e: any) => {
        setLoading(false);
        console.log(e)
        setError(e)
      });
    }
  }, [account, address, library, chainId, SuccessStickersCount])

  return { loading: loading, myStickerPackIds: myStickerPackIds, error: error }
}


export function useFetchStickerPackSummary(packId: number | undefined) {
  const { chainId, library } = useWeb3React()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [stickerPackSummary, setStickerPackSummary] = useState<IMetadata>()
  const { address } = useStickerTypeContractAddress()

  useEffect((): any => {
    if (!!library && !!packId && !!address) {
      setLoading(true);

      let stc = new Contract(address, StickerTypeABI, library);

      stc.getPackSummary(packId).then((packSummary: any) => {

        // ipfs from contenthash from packSummary
        let contenthash = packSummary[2];
        let ipfshash = contentHash.decode(contenthash)

        return ipfsFetch(ipfshash)
          .then(metadataEDN => {
            let packSummary = parseMetadataEDN(metadataEDN);

            packSummary.preview = contentHash.decode(packSummary.preview)
            packSummary.thumbnail = contentHash.decode(packSummary.thumbnail)

            packSummary.stickers.forEach(sticker => {
              sticker.hash = contentHash.decode(sticker.hash)
            });

            setStickerPackSummary(packSummary);
            setLoading(false)
            setError(undefined);
          });
      }).catch((e: any) => {
        setError(e)
        console.log(e)
        setLoading(false)
      });
    } else {
      setLoading(false)
    }
  }, [library, chainId, packId, address])

  return { loading: loading, stickerPackSummary: stickerPackSummary, error: error }
}

export function useFetchPaymentData(packId: number | undefined) {
  const { chainId, library } = useWeb3React()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState<boolean>(true)
  const [paymentData, setPaymentData] = useState<string>()
  const { address } = useStickerTypeContractAddress()

  useEffect((): any => {
    if (!!library && !!packId && !!address) {
      setLoading(true);

      let stc = new Contract(address, StickerTypeABI, library);

      stc.getPaymentData(packId).then((paymentData: any) => {

        // ipfs from contenthash from packSummary

        let i = parseFloat(utils.formatUnits(paymentData[2], 18));

        setPaymentData(i.toString());
        setLoading(false)
        setError(undefined);
      }).catch((e: any) => {
        setError(e)
        console.log(e);
        setLoading(false)
      });
    } else {
      setLoading(false)
    }
  }, [library, chainId, packId, address])

  return { loading: loading, paymentData: paymentData, error: error }
}


export function useAddressChecker(addressOrENS: string, debounce:boolean = true) {
  const { chainId, library } = useWeb3React()
  const [error, setError] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [isENS, setIsENS] = useState<boolean>()
  const debouncedAddressOrENS = useDebounce(addressOrENS, debounce ? 200 : 0)

  useEffect((): any => {
    if(!debouncedAddressOrENS || addressOrENS !== debouncedAddressOrENS) {
      setAddress(undefined)
      setError(undefined)
      setIsENS(undefined)
    } else if(isAddress(debouncedAddressOrENS)) {
      setAddress(debouncedAddressOrENS)
      setError(undefined)
      setIsENS(false)
    } else if(parseENSAddress(debouncedAddressOrENS)) {
      setIsENS(true)
      library.resolveName(debouncedAddressOrENS).then((resolved:string) => {
        if(resolved) {
          setAddress(resolved)
          setError(undefined)
        } else {
          setAddress(undefined)
          setError('unresolved ENS')
        }
      }).catch((e:any) => {
        setAddress(undefined)
        setError(e.toString())
        setIsENS(undefined)
      });
    } else {
      setAddress(undefined)
      setError('invalid address')
      setIsENS(undefined)
    }
  },[debouncedAddressOrENS, chainId, library, addressOrENS])

  return { address: address, error: error, isENS: isENS}
}

function useStickerContractAddress(contract: 'market' | 'type' | 'pack') {
  const { chainId } = useWeb3React()
  let c;
  if (chainId) {
    switch (contract) {
      case 'market':
        c = StickerMarketAddresses[chainId]
        break;
      case 'pack':
        c = StickerPackAddresses[chainId]
        break;
      case 'type':
        c = StickerTypeAddresses[chainId]
        break;
    }
  } else c = '';
  return useAddressChecker(c, false)
}

export function useStickerMarketContractAddress() {
  return useStickerContractAddress('market')
}

export function useStickerPackContractAddress() {
  return useStickerContractAddress('pack')
}

export function useStickerTypeContractAddress() {
  return useStickerContractAddress('type')
}