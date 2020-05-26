import { CSSProperties } from 'react';

export const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11
  } as CSSProperties,
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: 340,
    marginRight: 11
  } as CSSProperties,
  textField: {
    background: '#FFFFFF',
  } as CSSProperties,
  mainUpload: {
    display: 'flex', 
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'center', 
  } as CSSProperties,
  containerUpload: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 143, 
    height: 143, 
    borderRadius: '50%', 
    border: '1px dashed #3B3B3B',
    cursor: 'pointer'
  } as CSSProperties,
  icon: {
    fontSize: 30, 
    color: '#3B3B3B'
  } as CSSProperties,
  textUpload: {
    fontSize: 12, 
    color: '#3B3B3B',
    width: 119,
    height: 32,
    textAlign: 'center',
    marginTop: 8
  } as CSSProperties,
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%'
  } as CSSProperties,
  iconContainer: {
    display: 'flex',
    justifyContent: 'center'
  } as CSSProperties,
  errorMessage: {
    fontSize: 10, 
    marginLeft: 8
  } as CSSProperties,
}

export default styles;