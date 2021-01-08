import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  frameSize: {
    height: '160px',
    width: '478px',
  },
  thumbnailFrameSize: {
    height: '176px',
    width: '478px',
  },
  bannerFrameSize: {
    height: '223px',
    width: '478px',
  },
  stickerFrameSize: {
    height: '361px',
    width: '478px',
  },
  formSectionContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed ' + theme.palette.primary.main,
    borderRadius: '16px'
  },
  inputLabel: {
    color: theme.palette.text.primary,
    fontSize: '12px',
    lineHeight: '16px'
  },
  margin: {
    margin: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: theme.palette.common.white
  },
  previewThumbnail: {
    height: '128px',
    width: '128px',
    objectFit: 'contain'
  },
  gridDividerHorizontal: {
    position: 'absolute',
    height: 1,
    width: '100%',
    borderTop: '1px dashed ' + theme.palette.primary.main
  },
  gridDividerVertical: {
    position: 'absolute',
    width: 1,
    height: '100%',
    borderLeft: '1px dashed ' + theme.palette.primary.main
  }
  }))

  export default useStyles;