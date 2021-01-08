import { Contract } from '@ethersproject/contracts';
import { Box, Button, Chip, createStyles, Divider, Grid, InputAdornment, InputBase, InputLabel, Link, MenuItem, Select, Theme, Tooltip, Typography, withStyles } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import contentHash from 'content-hash';
import { BigNumber, FixedNumber } from 'ethers';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as IconHelp } from '../../images/iconHelp.svg';
import { ReactComponent as IconSNT } from '../../images/iconSNT.svg'
import { ipfsAdd } from '../../utils/ipfs';
import EmptyFrame from '../EmptyFrameCard';
import FormSection from '../FormSection';
import StickersDndGrid from '../StickersDndGrid'
import Image from '../Image';
import { useStickerDispatch, useStickerState } from '../Web3/context';
import { StickerMarketABI, StickerMarketAddresses } from '../Web3/stickerContracts';
import { createMetadataEDN, IMetadata } from '../Web3/stickerMetadata';
import Dropzone from '../Dropzone'
import useStyles from './styles';
import { useSnackbar } from 'notistack';

const categories: any = {
  '0x00000001': 'adult',
  '0x00000002': 'animals',
  '0x00000003': 'cartoons',
  '0x00000004': 'crypto',
  '0x00000005': 'events',
  '0x00000006': 'food',
  '0x00000007': 'love',
  '0x00000008': 'sport',
  '0x00000009': 'travel',
  '0x00000000': 'other'
}

/** validations and utility functions **/

// this must be multiple of 4
const minStickers: number = 12;
const maxStickers: number = 36;

const stickerGridColumns = 4;
const stickerGridWidth = 462;
const stickerGridRowHeight = 115;

const stickersLimits = {
  mimeFormats: ['image/gif', 'image/png'],
  width: 280,
  height: 280,
  maxSize: 400 * 1024
}

const bannerLimits = {
  mimeFormats: ['image/jpeg', 'image/png'],
  width: 1280,
  height: 800,
  maxSize: 1024 * 1024
}

const thumbnailLimits = {
  mimeFormats: ['image/jpeg', 'image/png'],
  width: 128,
  height: 128,
  maxSize: 200 * 1024
}

/** UI **/
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(1)
      },
      borderRadius: 8,
      border: '2px solid transparent',
      backgroundColor: theme.palette.grey[200],
      transition: theme.transitions.create(['border', 'border-color']),
      '&:focus-within': {
        borderColor: theme.palette.primary.main,
        border: '2px solid',
        borderRadius: 8
      },
    },
    input: {
      position: 'relative',
      borderRadius: 8,
      fontSize: 15,
      padding: 16,
    },
  }),
)(InputBase);


export default function (props: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = React.useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [address, setAddress] = useState("");
  const [installations, setInstallations] = useState<number>(-1);
  const [contribution, setContribution] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState("");
  const [uploadingThumbnail, setUploadingThumbnail] = useState<boolean>(false);
  const [banner, setBanner] = useState("");
  const [uploadingBanner, setUploadingBanner] = useState<boolean>(false);
  const [uploadingStickers, setUploadingStickers] = useState<number>(0);
  const [stickers, setStickers] = useState<string[]>([]);
  const [metadataHash, setMetadataHash] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const { account, chainId, library } = useWeb3React()

  const stickerState = useStickerState();
  const dispatch = useStickerDispatch();

  // test
  React.useEffect(() => {
    console.log('state: ', stickerState);
    console.log('thumbnail: ', thumbnail);
    console.log('uploadingBanner: ', uploadingBanner);
    console.log('uploadingStickers: ', uploadingStickers);
    console.log('stickers: ', stickers);
  }, [stickerState, thumbnail, uploadingBanner, uploadingStickers, stickers])

  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string[]);
  };

  const uploadDescription = async (_: any) => {
    const m: IMetadata = {
      name: name,
      author: author,
      preview: contentHash.fromIpfs(banner),
      thumbnail: contentHash.fromIpfs(thumbnail),
      stickers: stickers.map(s => { return { hash: contentHash.fromIpfs(s) } })
    }
    const description = createMetadataEDN(m);
  
    try {
      const hash = await ipfsAdd(description);
      setMetadataHash(hash);
    } catch (e) {
      enqueueSnackbar(t('new.error-ipfs-uploading', { filename: 'metadata', error: e }), { variant: "error" });
    }
  };

  React.useEffect(() => {
    setAddress(account ? account : '');
  }, [account])

  const register = async (_: any) => {
    const donate = 0;
    const fee = 0;
    const finalContentHash = "0x" + contentHash.fromIpfs(metadataHash);

    let smc = new Contract(StickerMarketAddresses[chainId as number], StickerMarketABI, library.getSigner(account).connectUnchecked());
    let tmp = BigNumber.from(10).pow(18).mul(price);
    let p = FixedNumber.fromValue(tmp, 18);
    smc.registerPack(p, donate, category, account, finalContentHash, 0)
    /*web3.eth.Contract(StickerMarketABI, StickerTypeAddresses[chainId]).methods
      .registerPack(web3.utils.toWei(price), donate, category, account, finalContentHash, 0).send({"from": account} );*/
  };

  const validateImg = function(imageFile: any, constraint: any) {
    return new Promise<void>((resolve,reject) => {

      if (imageFile) {
        const localImageUrl = URL.createObjectURL(imageFile);
        const imageObject = new window.Image();
        imageObject.onerror = () => {reject(t('new.error-type-load'))}
        imageObject.onload = () => {
          imageFile.width = imageObject.naturalWidth;
          imageFile.height = imageObject.naturalHeight;
          URL.revokeObjectURL(imageFile);

          // validation

          // Get image size in kilobytes
          if(imageFile.size > constraint.maxSize ) return reject(t('new.error-type-size'));

          // mime
          if (!constraint.mimeFormats.includes(imageFile.type)) return reject(t('new.error-type-mime'));

          // dimensions
          if (imageFile.height !== constraint.height) return reject(t('new.error-type-dimension'));
          if (imageFile.width !== constraint.width) return reject(t('new.error-type-dimension'));

          resolve(); 
        };
        imageObject.src = localImageUrl;
      }
      else reject(t('new.error-type-load'));
    });
  }

  const handleThumbnail = async (files: any[]) => {
    if(files.length == 0) {
      enqueueSnackbar(t('new.error-drop-one-file'),{variant: "info"})
      return null;
    }

    let imageFile = files[0];
    setThumbnail("");

    return validateImg(imageFile,thumbnailLimits).then(async ()=> {
      setUploadingThumbnail(true);
      try {
        const hash = await ipfsAdd(imageFile);
        setThumbnail(hash);
      } catch (e) {
        setThumbnail("");
        enqueueSnackbar(t('new.error-ipfs-uploading', { filename: imageFile.name, error: e }), { variant: "error" });
      } finally {
        setUploadingThumbnail(false);
      }
    }).catch((err) => {
      setThumbnail("");
      setUploadingThumbnail(false);
      enqueueSnackbar(t('new.error-base',{type: t('new.error-type-thumbnail'),
                                          filename: imageFile.name,
                                          errortype: err}), {variant: "error"})
    })
  };

  const handleBanner = async (files: any[]) => {
    if (files.length == 0) {
      enqueueSnackbar(t('new.error-drop-one-file'), { variant: "info" })
      return null;
    }

    let imageFile = files[0];
    setBanner("");

    return validateImg(imageFile, bannerLimits).then(async () => {
      setUploadingBanner(true);
      try {
        const hash = await ipfsAdd(imageFile);
        setBanner(hash);
      } catch (e) {
        setBanner("");
        enqueueSnackbar(t('new.error-ipfs-uploading', { filename: imageFile.name, error: e }), { variant: "error" });
      } finally {
        setUploadingBanner(false);
      }
    }).catch((err) => {
      setBanner("");
      setUploadingBanner(false);
      enqueueSnackbar(t('new.error-base', {
        type: t('new.error-type-banner'),
        filename: imageFile.name,
        errortype: err
      }), { variant: "error" })
    })
  };

  const handleStickers = async (files: any[]) => {
    const stickersInExcess = stickers.length + files.length - maxStickers

    if(stickersInExcess > 0) {
      const toRemoveFromUploading = Math.min(stickersInExcess, files.length)
      files.splice(files.length-toRemoveFromUploading,toRemoveFromUploading)
      enqueueSnackbar(t('new.error-max-stickers-reached'), { variant: "warning" })
    }

    // run validation on all files
    return Promise.allSettled(files.map(file => { return validateImg(file, stickersLimits) }))
      .then(async validationResults => {
        let validated: any[] = [];

        // check validation results
        validationResults.forEach((result, idx) => {
          if (result.status === 'fulfilled') {
            validated.push(files[idx])
          } else {
            // show an arror for all rejections
            enqueueSnackbar(t('new.error-base', {
              type: t('new.error-type-stickers'),
              filename: files[idx].name,
              errortype: result.reason
            }), { variant: "error" })
          }
        })

        // set uploading UI
        setUploadingStickers(validated.length);

        // upload all valid stickers
        const results = await Promise.allSettled(validated.map(ipfsAdd));

        // get only uploaded stickers not already uploaded
        const uploaded: any[] = results.reduce((uploaded, ipfsResult, ipfsIdx) => {
          if (ipfsResult.status === 'rejected') {
            enqueueSnackbar(t('new.error-ipfs-uploading', { filename: validated[ipfsIdx].name, error: ipfsResult.reason }), { variant: "error" });
            return uploaded;
          }
          if (stickers.includes(ipfsResult.value)) {
            enqueueSnackbar(t('new.error-sticker-already-present', { filename: validated[ipfsIdx].name }), { variant: "warning" });
            return uploaded;
          }
          uploaded.push(ipfsResult.value)
          return uploaded;
        }, [] as string[])

        // unset uploading UI
        setUploadingStickers(0);
        // set uploaded stickers
        setStickers(stickers.concat(uploaded));
      })
  };

  const stickerGridRows = Math.ceil((Math.max(stickers.length + uploadingStickers + 1, minStickers) ) / 4);

  console.log("stickerGridRows: " + stickerGridRows);
  console.log("stickers.length: " + stickers.length);
  console.log("uploadingStickers: " + uploadingStickers);

  const stickersToBeUploaded = minStickers - stickers.length;

  const complete = name.length !== 0 &&
    author.length !== 0 &&
    thumbnail.length !== 0 &&
    banner.length !== 0 &&
    stickers.length >= minStickers;

  const showBannerPreview = banner.length > 0 || uploadingBanner
  const showThumbnailPreview = thumbnail.length > 0 || uploadingThumbnail
  const showStickersPreview = stickers.length > 0 || uploadingStickers > 0

  return (
    <Box display="flex" flexDirection='column' justifyContent='center' alignItems="center" width='100%'>
      <Box display="flex" flexDirection='column' justifyContent='center' alignItems="center" width='75vw' minWidth='764px' maxWidth='1024px'>
        <Box alignSelf="flex-start" marginTop="40px">
          <Typography variant="h5">{t('new.title')}</Typography>
        </Box>
        <FormSection index={1} title={t('new.meta-title')}>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputLabel
                  className={classes.inputLabel}
                  htmlFor="author">
                  {t('new.meta-artistname')}
                </InputLabel>
                <BootstrapInput
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  fullWidth
                  id="author"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel
                  className={classes.inputLabel}
                  htmlFor="name">
                  {t('new.meta-stickerpack-name')}
                </InputLabel>
                <BootstrapInput
                  value={name}
                  onChange={e => setName(e.target.value)}
                  fullWidth
                  id="name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel
                  className={classes.inputLabel}
                  id="select-category-label">
                  {t('new.meta-category')}
                </InputLabel>
                <Select
                  labelId="select-category-label"
                  id="select-category"
                  value={category}
                  onChange={handleChangeCategory}
                  multiple
                  MenuProps={{ elevation: 1 }}
                  input={<BootstrapInput fullWidth />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={categories[value]} className={classes.chip} />
                      ))}
                    </div>
                  )}>
                  {Object.keys(categories).map((id) => (
                    <MenuItem key={id} value={id}>
                      {categories[id]}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Divider light />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel
                  className={classes.inputLabel}
                  htmlFor="address">
                  {t('new.meta-address')}
                </InputLabel>
                <BootstrapInput
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  fullWidth
                  id="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <InputLabel
                      className={classes.inputLabel}
                      id="select-limit-installs-label">
                      {t('new.meta-limit-installs')}
                    </InputLabel>
                  </Box>
                  <Box>
                    <Tooltip title={t('new.meta-limit-installs-tooltip').toString()} placement="top-end" arrow>
                      <IconHelp />
                    </Tooltip>
                  </Box>
                </Box>
                <Select
                  labelId="select-limit-installs-label"
                  id="select-limit-installs"
                  value={installations}
                  onChange={e => setInstallations(parseInt(e.target.value as string))}
                  MenuProps={{ elevation: 1 }}
                  input={<BootstrapInput fullWidth />}>
                  <MenuItem value={-1}>Unlimited</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel
                  className={classes.inputLabel}
                  htmlFor="price">
                  {t('new.meta-price')}
                </InputLabel>
                <BootstrapInput
                  type="number"
                  value={price}
                  onBlur={()=> {if(isNaN(price)) setPrice(0)}}
                  onChange={e => {
                    const v = Math.max(0,parseFloat(e.target.value));
                    setPrice(v)}}
                  fullWidth
                  id="price"
                  endAdornment={<InputAdornment position="end" style={{marginRight: 8}}><IconSNT style={{marginRight: 8}}/><Typography>SNT</Typography></InputAdornment>}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <InputLabel
                      className={classes.inputLabel}
                      id="select-contribution-label">
                      {t('new.meta-contribution')}
                    </InputLabel>
                  </Box>
                  <Box>
                    <Tooltip title={t('new.meta-contribution-tooltip').toString()} placement="top-end" arrow>
                      <IconHelp />
                    </Tooltip>
                  </Box>
                </Box>
                <Select
                  labelId="select-contribution-label"
                  id="select-contribution"
                  value={contribution}
                  onChange={e => setContribution(parseInt(e.target.value as string))}
                  MenuProps={{ elevation: 1 }}
                  input={<BootstrapInput fullWidth />}>
                  <MenuItem value={0}>0%</MenuItem>
                  <MenuItem value={10}>10%</MenuItem>
                  <MenuItem value={25}>25%</MenuItem>
                  <MenuItem value={50}>50%</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </form>
        </FormSection>
        <FormSection index={2} title={t('new.stickers-title')}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
            <Grid item>
              <EmptyFrame>
                <Dropzone
                  width={stickerGridWidth}
                  height={stickerGridRowHeight*stickerGridRows}
                  onDrop={handleStickers}
                  multiple={true}
                  draggingLabel={(t("new.drop-files"))}
                  dropLabel={(t("new.upload-stickers"))}
                  disabled={stickers.length === maxStickers || uploadingStickers > 0}>
                  {showStickersPreview &&
                    <StickersDndGrid
                    width={stickerGridWidth-2}
                    height={stickerGridRowHeight*stickerGridRows}
                    columns={stickerGridColumns}
                    rows={stickerGridRows}
                    stickers={stickers}
                    setStickers={setStickers}
                    uploading={uploadingStickers} />}
                </Dropzone>
              </EmptyFrame>
              {stickersToBeUploaded > 0 &&
                <Typography style={{marginTop: 8, marginLeft: 4}} variant="subtitle2" color="textSecondary">{(t('new.stckers-upload-more',{count: stickersToBeUploaded}))}</Typography>}
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2" color="textSecondary" paragraph>{t('new.stckers-description1')}
                <Typography variant="inherit" display="inline" color="textPrimary">{t('new.stckers-description2')}</Typography>
                <Typography variant="inherit" display="inline" color="textSecondary">{t('new.stckers-description3')}</Typography>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" paragraph>{t('new.stckers-description4')}
                <Typography variant="inherit" display="inline" color="textPrimary">{t('new.stckers-description5')}</Typography>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" paragraph>{t('new.stckers-description6')}
                <Link href="#" noWrap>
                  {t('terms-and-conditions')}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </FormSection>
        <FormSection index={3} title={t('new.banner-title')}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
            <Grid item>
              <EmptyFrame className={classes.bannerFrameSize}>
                <Dropzone
                  onDrop={handleBanner}
                  multiple={false}
                  draggingLabel={(t("new.drop-file"))}
                  dropLabel={(t("new.upload-banner"))}
                  disabled={showBannerPreview}>
                  {showBannerPreview &&
                    <Image
                      ipfs={banner}
                      width={266}
                      height={175}
                      borderRadius={16}
                      uploading={uploadingBanner}
                      removable
                      onRemove={() => { setBanner('') }} />}
                  </Dropzone>
              </EmptyFrame>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2" color="textSecondary" paragraph>{t('new.banner-description1')}</Typography>
              <Typography variant="subtitle2" paragraph>
                <Link href="#" noWrap>
                  {t('show-example')}
                </Link>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" paragraph>{t('new.banner-description2')}
                <Typography variant="inherit" display="inline" color="textPrimary">{t('new.banner-description3')}</Typography>
                <Typography variant="inherit" display="inline" color="textSecondary">{t('new.banner-description4')}</Typography>
                <Typography variant="inherit" display="inline" color="textPrimary">{t('new.banner-description5')}</Typography>
                <Typography variant="inherit" display="inline" color="textSecondary">{t('new.banner-description6')}</Typography>
              </Typography>
            </Grid>
          </Grid>
        </FormSection>
        <FormSection index={4} title={t('new.thumbnail-title')}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
            <Grid item>
              <EmptyFrame className={classes.thumbnailFrameSize}>
                <Dropzone
                  onDrop={handleThumbnail}
                  draggingLabel={(t("new.drop-file"))}
                  dropLabel={(t("new.upload-thumbnail"))}
                  disabled={showThumbnailPreview}>
                  {showThumbnailPreview &&
                    <Image
                      ipfs={thumbnail}
                      width={128}
                      height={128}
                      borderRadius={128}
                      uploading={uploadingThumbnail}
                      removable
                      onRemove={() => { setThumbnail('') }} />}
                  </Dropzone>
              </EmptyFrame>
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle2" color="textSecondary" paragraph>{t('new.thumbnail-description1')}</Typography>
              <Typography variant="subtitle2" paragraph>
                <Link href="#" noWrap>
                  {t('show-example')}
                </Link>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" paragraph>{t('new.thumbnail-description2')}
                <Typography variant="inherit" display="inline" color="textPrimary">{t('new.thumbnail-description3')}</Typography>
                <Typography variant="inherit" display="inline" color="textSecondary">{t('new.thumbnail-description4')}</Typography>
                <Typography variant="inherit" display="inline" color="textPrimary">{t('new.thumbnail-description5')}</Typography>
                <Typography variant="inherit" display="inline" color="textSecondary">{t('new.thumbnail-description6')}</Typography>
              </Typography>
            </Grid>
          </Grid>
        </FormSection>
        <Box alignSelf="flex-start" marginTop="40px" marginLeft="24px">
        <Button variant="contained" color="primary" onClick={uploadDescription} disabled={!complete}>
            {(t('new.review'))}
        </Button>
        </Box>
        <div id="form" style={{ display: 'flex', flexDirection: 'column', width: '40vw', alignItems: "center", alignContent: "start" }}>

          {metadataHash && metadataHash.length !== 0 &&
            <Fragment>
              <div>IPFS Hash: {metadataHash}</div>
              <a href={'https://ipfs.infura.io/ipfs/' + metadataHash}>link</a>
              <Button variant="contained" color="primary" onClick={register}>
                Publish
            </Button>
            </Fragment>
          }
        </div>
      </Box>
    </Box>);
};