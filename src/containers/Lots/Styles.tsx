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
    zIndex: 400
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
  buttonDuplicate: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#7876E0',
    fontSize: 16,
    fontWeight: 500,
    marginTop: 21,
  } as CSSProperties,
  hoverContainer: { 
    position: 'absolute', 
    zIndex: 2, 
    display: 'flex', 
    flexDirection: 'column', 
    alignSelf: 'center', 
    width: '200px', 
    height: '261px', 
    backgroundColor: '#3B3B3B', 
    opacity: 0.9
  } as CSSProperties,
  hoverButton: { 
    width: '100%', 
    height: 34, 
    border: '1px solid #FFFFFF', 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    fontSize: 14, display: 'flex', 
    justifyContent: 'center' 
  } as CSSProperties,
  hoverCheckboxContainer: { 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
    marginTop: 4,
    paddingRight: 4
  } as CSSProperties,
  hoverCheckboxContainerHidden: { 
    display: 'none', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
    marginTop: 4,
    paddingRight: 4
  } as CSSProperties,
  addButton: {
    height: 60,
    width: 60,
    lineHeight: '60px',
    textAlign: 'center',
    backgroundColor: '#7876E0',
    borderRadius: '50%'
  } as CSSProperties,
  rowConfirm: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  } as CSSProperties,
  buttonCancel: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    background: '#F4F5F9',
    border: '1px solid rgba(59,59,59,0.5)',
    fontSize: 16
  } as CSSProperties,
  textConfirm: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    fontSize: 18,
    color: '#3B3B3B',
    fontWeight: 'bold'
  } as CSSProperties,
}

export default styles;