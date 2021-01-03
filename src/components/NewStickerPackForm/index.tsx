import React, { Fragment, useState, useCallback, useRef, useLayoutEffect, MemoExoticComponent } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Button, Grid, Box, Input, Typography, Link, TextField, Divider, FormControl, Select, MenuItem, InputLabel, withStyles, Theme, createStyles, InputBase, Tooltip, Chip, RootRef } from '@material-ui/core';
import { createMetadataEDN, IMetadata } from '../Web3/stickerMetadata'
import { StickerMarketABI, StickerMarketAddresses } from '../Web3/stickerContracts'
import contentHash from 'content-hash'
import { Contract } from '@ethersproject/contracts'
import { FixedNumber, BigNumber } from 'ethers'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import EmptyFrame from '../EmptyFrameCard'
import FormSection from '../FormSection'
import Image from '../Image'

import useStyles from './styles'
import { ReactComponent as IconUpload } from '../../images/iconUpload.svg'
import { ReactComponent as IconHelp } from '../../images/iconHelp.svg'
import { useTranslation } from 'react-i18next'

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";

import { useStickerState, useStickerDispatch } from '../Web3/context'
import theme from '../../theme';

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

async function ipfsAdd(content: string | Blob) {
  console.log("content" + content)
  const formData = new FormData();
  formData.append("", content);
  const response = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
    method: 'post',
    body: formData
  });
  if (response.status === 200) {
    return response.json();
  }
  return null;
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
interface MyDropzoneProps {
  onDrop: (arg0: any) => Promise<any>,
  dropLabel: string,
  draggingLabel: string,
  disabled?: boolean | false,
  multiple?: boolean | false
}

function MyDropzone(
  props: React.PropsWithChildren<MyDropzoneProps>
) {
  const classes = useStyles();
  const { t } = useTranslation();

  const {multiple, onDrop, disabled, children } = props;
  const dropzoneprops: DropzoneOptions = { onDrop, disabled, multiple }

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneprops)

  return (
    <Box position="relative" height="100%" width="100%" style={{ outline: 'none' }} {...getRootProps()}>
      <input {...getInputProps()} />
      <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" >
        {children !== undefined && children}
        {!children &&
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <div className={classes.iconContainer}>
                <IconUpload fill={theme.palette.primary.main}/>
              </div>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="primary">{t(props.dropLabel)}</Typography>
            </Grid>
          </Grid>
        }
      </Box>
      {isDragActive &&
        <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" className={classes.dropover}>
          <Typography variant="subtitle2" color="primary">{t(props.draggingLabel)}</Typography>
        </Box>}
    </Box>
  )
}

function StickersPreview(props:
  {
    stickers: string[],
    uploading: number,
    setStickers: (arg1: string[]) => void
  }) {
  const { stickers, setStickers, uploading } = props;
  const width = 460;
  const height = 343;

  const classes = useStyles();
  const { t } = useTranslation();

  const grid_vert_lines_x: number[] = [];
  const columns = 4;
  const vDivsSpace = width / columns
  for (let i = 1; i < columns; i++) grid_vert_lines_x.push(vDivsSpace * i)

  const grid_vert_lines_y: number[] = [];
  const rows = 3;
  const hDivsSpace = height / rows
  for (let i = 1; i < rows; i++) grid_vert_lines_y.push(hDivsSpace * i)

  const max_elements = columns * rows
  const remaining_elements = max_elements - (stickers.length + uploading)

  const upload_arrow_idx = max_elements-remaining_elements


  // target id will only be set if dragging from one dropzone to another.
  function onChange(sourceId: any,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string) {
    const nextState = swap(stickers, sourceIndex, targetIndex);
    setStickers(nextState);
  }

  function onRemove(valueToRemove: string) {
    const nextState = stickers.filter((value) => {return value !== valueToRemove})
    setStickers(nextState);
  }

  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="items"
        boxesPerRow={columns}
        rowHeight={hDivsSpace}
        style={{ height: height, width: width }}
      >
        {stickers.map(item => (
          <GridItem key={item}>
            <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" >
              <Image removable onRemove={()=>{onRemove(item)}} width={88} height={88} borderRadius={16} ipfs={item} />
            </Box>
          </GridItem>
        ))}
        {[
          ...Array(uploading),
        ].map((value: undefined, idx: number) => (
          <GridItem key={`upl_${idx}`}>
            <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" >
              <Image removable width={88} height={88} borderRadius={16} uploading={true} />
            </Box>
          </GridItem>
        ))
        }
        {[
              ...Array(remaining_elements),
          ].map((value: undefined, idx: number) => (
            <div key={`rem_${idx}`} style={{position:'absolute',
                                            top: Math.floor(((upload_arrow_idx+idx)/columns))*hDivsSpace,
                                            left: ((upload_arrow_idx+idx)%columns)*vDivsSpace,
                                            width: vDivsSpace,
                                            height: hDivsSpace,
                                            pointerEvents:'none'}}>
              <Box height="100%" width="100%" display="flex" flexDirection='column' justifyContent="center" alignItems="center" >
                <IconUpload fill={theme.palette.grey[400]}/>
                <Typography variant="subtitle2" color="textSecondary">{t('new.upload')}</Typography>
              </Box>
            </div>
          ))}
      </GridDropZone>
      {(grid_vert_lines_x.map((value) => (<Box className={classes.gridDividerVertical} left={value} border />)))}
      {(grid_vert_lines_y.map((value) => (<Box className={classes.gridDividerHorizontal} top={value} border />)))}
    </GridContextProvider>
  );
}

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
    const res = await uploadFile(name, author, thumbnail, banner, uploadedStickers);
    setHash(res.Hash);
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
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();

      imageObject.onload = () => {
        imageFile.width = imageObject.naturalWidth;
        imageFile.height = imageObject.naturalHeight;
        //input.onChange(imageFile);
        URL.revokeObjectURL(imageFile);
      };
      imageObject.src = localImageUrl;
    }

    setThumbnail("");
    setUploadingThumbnail(true);
    ipfsAdd(imageFile).then(res => {
      setThumbnail(res.Hash);
      setUploadingThumbnail(false);
    });
  };

  const handleBanner = async (files: any) => {
    setBanner("");
    setUploadingBanner(true);
    ipfsAdd(files[0]).then(res => {
      setBanner(res.Hash)
      setUploadingBanner(false);
    });
  };

  const handleStickers = async (files: string[]) => {
    setUploadingStickers(files.length);
    Promise.all(files.map(ipfsAdd)).then(all => {
      setUploadingStickers(0);
      setUploadedStickers(all.map((a: any) => a.Hash));
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
      <Box display="flex" flexDirection='column' justifyContent='center' alignItems="center" width='75vw' minWidth='600px'>
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
                <MyDropzone
                  onDrop={handleStickers}
                  multiple={true}
                  draggingLabel="new.drop-files"
                  dropLabel="new.upload-stickers"
                  disabled={uploadedStickers.length === max_stickers}>
                  {showStickersPreview &&
                    <StickersPreview stickers={stickers} setStickers={setStickers} uploading={uploadingStickers} />}
                </MyDropzone>
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
                <MyDropzone
                  onDrop={handleBanner}
                  draggingLabel="new.drop-file"
                  dropLabel="new.upload-banner"
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
                  </MyDropzone>
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
                <MyDropzone
                  onDrop={handleThumbnail}
                  draggingLabel="new.drop-file"
                  dropLabel="new.upload-thumbnail"
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
                  </MyDropzone>
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
        <div id="form" style={{ display: 'flex', flexDirection: 'column', width: '40vw', alignItems: "center" }}>
          <Button variant="contained" color="primary" onClick={uploadDescription} disabled={!complete}>
            Deploy
        </Button>
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