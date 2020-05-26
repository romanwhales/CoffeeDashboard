import { CSSProperties } from 'react';

export const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 25
  } as CSSProperties,
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: 340
  } as CSSProperties,
  textField: {
    background: '#F4F5F9',
  } as CSSProperties,
  button: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    background: '#7876E0',
    fontSize: 16
  } as CSSProperties,
  forgot: {
    display: 'flex',
    justifyContent: 'center',
    color: '#3B3B3B',
    fontSize: 14,
    lineHeight: '19px',
    background: 'transparent',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer'
  } as CSSProperties,
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  } as CSSProperties,
  logo: {
    width: 203,
    height: 111
  } as CSSProperties,
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center'
  } as CSSProperties,
}

export default styles;