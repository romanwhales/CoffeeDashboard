import { CSSProperties } from 'react';

export const styles = {
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 21,
    width: '95%'
  } as CSSProperties,
  button: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    height: 54,
    background: '#F4F5F9',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lato'
  } as CSSProperties,
}

export default styles;