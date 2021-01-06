import { Contract } from '@ethersproject/contracts';
import { Box, Button, Chip, createStyles, Divider, Grid, InputBase, InputLabel, Link, MenuItem, Select, Theme, Tooltip, Typography, withStyles } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import contentHash from 'content-hash';
import { BigNumber, FixedNumber } from 'ethers';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as IconHelp } from '../../images/iconHelp.svg';
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
const min_stickers: number = 12;
const max_stickers: number = 36;

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

async function uploadFile(name: string, author: string, thumbnail: string, preview: string, stickers: string[]) {
  const m: IMetadata = {
    name: name,
    author: author,
    preview: contentHash.fromIpfs(preview),
    thumbnail: contentHash.fromIpfs(thumbnail),
    stickers: stickers.map(s => { return { hash: contentHash.fromIpfs(s) } })
  }
  const description = createMetadataEDN(m);

  return ipfsAdd(description);
}


function validateImageWeight(imageFile: any, maxWeight: number) {
  if (imageFile && imageFile.size) {
    // Get image size in kilobytes
    const imageFileKb = imageFile.size / 1024;

    if (imageFileKb > maxWeight) {
      return `Image size must be less or equal to ${maxWeight}kb`;
    }
  }
};

/** UI **/
const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(1)
      },
    },
    input: {
      borderRadius: 8,
      position: 'relative',
      border: '2px solid transparent',
      backgroundColor: theme.palette.grey[200],
      fontSize: 15,
      padding: 16,
      transition: theme.transitions.create(['border', 'border-color']),
      '&:focus': {
        borderColor: theme.palette.primary.main,
        border: '2px solid',
        borderRadius: 8
      },
    },
  }),
)(InputBase);


export default function (props: any) {
  const [name, setName] = useState("");
  const [category, setCategory] = React.useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("0");
  const [thumbnail, setThumbnail] = useState("");
  const [uploadingThumbnail, setUploadingThumbnail] = useState<boolean>(false);
  const [banner, setBanner] = useState("");
  const [uploadingBanner, setUploadingBanner] = useState<boolean>(false);
  const [uploadingStickers, setUploadingStickers] = useState<number>(0);
  const [uploadedStickers, setUploadedStickers] = useState<string[]>([]);
  const [stickers, setStickers] = useState<string[]>([]);
  const [hash, setHash] = useState("");

  const [fileObjects, setFileObjects] = useState([]);

  const { account, chainId, library } = useWeb3React()

  const stickerState = useStickerState();
  const dispatch = useStickerDispatch();

  // test
  React.useEffect(() => {
    console.log('state: ', stickerState);
    console.log('thumbnail: ', thumbnail);
    console.log('uploadingBanner: ', uploadingBanner);
    console.log('uploadingStickers: ', uploadingStickers);
    console.log('uploadedStickers: ', uploadedStickers);
    console.log('stickers: ', stickers);
  }, [stickerState, thumbnail, uploadingBanner, uploadingStickers, uploadedStickers, stickers])

  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string[]);
  };

  const uploadDescription = async (_: any) => {
    const hash = await uploadFile(name, author, thumbnail, banner, uploadedStickers);
    setHash(hash);
  };

  React.useEffect(() => {
    setAddress(account ? account : '');
  }, [account])

  const register = async (_: any) => {
    const donate = 0;
    const fee = 0;
    const finalContentHash = "0x" + contentHash.fromIpfs(hash);

    let smc = new Contract(StickerMarketAddresses[chainId as number], StickerMarketABI, library.getSigner(account).connectUnchecked());
    let tmp = BigNumber.from(10).pow(18).mul(price);
    let p = FixedNumber.fromValue(tmp, 18);
    smc.registerPack(p, donate, category, account, finalContentHash, 0)
    /*web3.eth.Contract(StickerMarketABI, StickerTypeAddresses[chainId]).methods
      .registerPack(web3.utils.toWei(price), donate, category, account, finalContentHash, 0).send({"from": account} );*/
  };

  const handleThumbnail = async (files: any) => {
    let imageFile = files[0];
   /* if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }*/

    setThumbnail("");
    setUploadingThumbnail(true);
    ipfsAdd(imageFile).then(hash => {
      setThumbnail(hash);
      setUploadingThumbnail(false);
    });
  };

  const handleBanner = async (files: any) => {
    setBanner("");
    setUploadingBanner(true);
    ipfsAdd(files[0]).then(hash => {
      setBanner(hash)
      setUploadingBanner(false);
    });
  };

  const handleStickers = async (files: string[]) => {
    setUploadingStickers(files.length);
    Promise.all(files.map(ipfsAdd)).then(all => {
      setUploadingStickers(0);
      setUploadedStickers(all.map((hash: string) => hash));
    })
  };

  React.useEffect(() => {
    setStickers(stickers.concat(uploadedStickers))
  }, [uploadedStickers])

  const complete = name.length !== 0 &&
    author.length !== 0 &&
    thumbnail.length !== 0 &&
    banner.length !== 0 &&
    stickers.length >= min_stickers;

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
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  fullWidth
                  id="price"
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
              <EmptyFrame className={classes.stickerFrameSize}>
                <Dropzone
                  onDrop={handleStickers}
                  multiple={true}
                  draggingLabel={(t("new.drop-files"))}
                  dropLabel={(t("new.upload-stickers"))}
                  disabled={uploadedStickers.length === max_stickers}>
                  {showStickersPreview &&
                    <StickersDndGrid stickers={stickers} setStickers={setStickers} uploading={uploadingStickers} />}
                </Dropzone>
              </EmptyFrame>
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

          {hash && hash.length !== 0 &&
            <Fragment>
              <div>IPFS Hash: {hash}</div>
              <a href={'https://ipfs.infura.io/ipfs/' + hash}>link</a>
              <Button variant="contained" color="primary" onClick={register}>
                Publish
            </Button>
            </Fragment>
          }
        </div>
      </Box>
    </Box>);
};