import { CSSProperties } from 'react';

export const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginBottom: 36
  } as CSSProperties,
  headers: {
    display: 'flex',
    flexDirection: 'row',
    color: '#7876E0',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 14,
  } as CSSProperties,
  rowOdd: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    background: '#F4F5F9',
    paddingRight: 15,
    borderBottom: '2px solid #414042'
  } as CSSProperties,
  rowEven: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    background: '#FFF',
    paddingRight: 15,
    borderBottom: '2px solid #414042'
  } as CSSProperties,
  cellHeader: {
    display: 'flex',
    paddingLeft: 22,
    width: 200
  } as CSSProperties,
  cell: {
    display: 'flex',
    paddingLeft: 22,
    height: 38,
    lineHeight: '38px',
    fontWeight: 'bold',
    width: 200
  } as CSSProperties,
  action: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    color: '#7876E0',
    fontSize: 11,
    textDecoration: 'underline',
    cursor: 'pointer'
  } as CSSProperties,
  photo: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '1px solid #7876E0',
    marginLeft: -5,
    marginRight: 17
  } as CSSProperties,
  nameColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRight: '1px solid #414042',
    width: 200
  } as CSSProperties,
  icon: {
    fontSize: 22, 
    color: '#7876E0',
    marginLeft: 8
  } as CSSProperties,
  item: {
    display: 'flex', 
    borderRight: '1px solid #414042', 
    height: '100%',
    width: 200
  } as CSSProperties,
  subItem: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '80%'
  } as CSSProperties,
  cellActions: {
    display: 'flex',
    flex: 1,
    paddingLeft: 22,
    height: 38,
    lineHeight: '38px',
    fontWeight: 'bold'
  } as CSSProperties,
}

export default styles;