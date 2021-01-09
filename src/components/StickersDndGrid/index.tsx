import { Box, Typography } from "@material-ui/core";
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-dnd";
import { useTranslation } from 'react-i18next';
import Image from '../Image';
import theme from '../../theme';
import useStyles from "./styles";

import { ReactComponent as IconUpload } from '../../images/iconUpload.svg';


export default function StickersPreview(props:
    {
      columns: number,
      rows: number,
      width: number,
      height: number,
      stickers: string[],
      uploading?: number,
      locked?: boolean,
      setStickers?: (arg1: string[]) => void
    }) {
    const { stickers, setStickers, uploading = 0, width, height, columns, rows, locked = false } = props;
  
    const classes = useStyles();
    const { t } = useTranslation();
  
    const grid_vert_lines_x: number[] = [];
    const vDivsSpace = width / columns
    for (let i = 1; i < columns; i++) grid_vert_lines_x.push(vDivsSpace * i)
  
    const grid_vert_lines_y: number[] = [];
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
      if(setStickers) setStickers(nextState);
    }
  
    function onRemove(valueToRemove: string) {
      const nextState = stickers.filter((value) => {return value !== valueToRemove})
      if(setStickers) setStickers(nextState);
    }
  
    return (
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={columns}
          rowHeight={hDivsSpace}
          disableDrag={uploading>0 || locked}
          disableDrop={uploading>0 || locked}
          style={{ height: height, width: width }}
        >
          {stickers.map(item => (
            <GridItem key={item}>
              <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" >
                <Image removable={!locked} onRemove={()=>{onRemove(item)}} style={{width: 88, height: 88, borderRadius: 16}} ipfs={item} />
              </Box>
            </GridItem>
          ))}
          {[
            ...Array(uploading),
          ].map((_, idx: number) => (
            <GridItem key={`upl_${idx}`}>
              <Box height="100%" width="100%" display="flex" justifyContent="center" alignItems="center" >
                <Image removable style={{width: 88, height: 88, borderRadius: 16}} uploading={true} />
              </Box>
            </GridItem>
          ))
          }
          {!locked && [
                ...Array(remaining_elements),
            ].map((_, idx: number) => (
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
  