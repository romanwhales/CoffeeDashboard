import { CSSProperties } from 'react';

export const styles = {
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'calc(100vw - 296px)',
    minWidth: 700,
    height: 73,
    background: '#F4F5F9',
    position: 'fixed',
    bottom: 0,
    paddingLeft: 27,
    paddingRight: 27,
    boxShadow: '0 -2px 4px 0 rgba(0,0,0,0.19)',
    marginLeft: -64,
    zIndex: 1000,
    alignItems: 'center'
  } as CSSProperties,
  buttonDiscard: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    background: '#F4F5F9',
    border: '1px solid rgba(59,59,59,0.5)',
    fontSize: 16
  } as CSSProperties,
  buttonSave: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    background: '#7876E0',
    fontSize: 16
  } as CSSProperties,
  buttonDelete: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#EF6749',
    fontSize: 16,
    fontWeight: 500,
    marginTop: 21,
  } as CSSProperties,
  cardTitle: {
    textAlign: 'left', 
    boxSizing: 'border-box', 
    width: '100%', 
    height: '34px', 
    padding: '6px 10px', 
    color: '#FFFFFF', 
    backgroundColor: '#3B3B3B', 
    fontSize: 14, 
    lineHeight: '24px', 
    overflow: 'hidden'
  } as CSSProperties,
  icon: {
    fontSize: 16, 
    color: '#000'
  } as CSSProperties,
}

export default styles;