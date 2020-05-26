import { CSSProperties } from 'react';

export const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row'
  } as CSSProperties,
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: 340,
    marginRight: 11
  } as CSSProperties,
  textField: {
    background: '#F4F5F9',
  } as CSSProperties,
  errorMessage: {
    fontSize: 10, 
    marginLeft: 8
  } as CSSProperties,
}

export default styles;