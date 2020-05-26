import { CSSProperties } from 'react';

export const styles = {
  mainContainer: {
    height: 'calc(100vh - 105px)', 
    overflowY: 'auto'
  } as CSSProperties,
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 28,
    width: '80%'
  } as CSSProperties,
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    minWidth: 340,
    marginRight: 11
  } as CSSProperties,
  columnXL: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: 700,
    marginRight: 11
  } as CSSProperties,
  columnMedium: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%',
    minWidth: 489,
    marginRight: 11
  } as CSSProperties,
  columnQuarter: {
    display: 'flex',
    flexDirection: 'column',
    width: '15%',
    minWidth: 200,
    marginRight: 11
  } as CSSProperties,
  textField: {
    background: '#F4F5F9',
  } as CSSProperties,
  button: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#7876E0',
    fontSize: 16,
    fontWeight: 500,
    marginTop: 25,
    height: 39
  } as CSSProperties,
  buttonPublish: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#7876E0',
    fontSize: 16,
    fontWeight: 500,
    marginTop: 21
  } as CSSProperties,
  selectionButton: {
    display: 'flex', 
    justifyContent: 'center', 
    height: 40,
    background: '#F4F5F9',
    fontSize: 14,
    color: '#42526E',
    marginRight: 13,
    marginBottom: 21
  } as CSSProperties,
  selectionButtonSelected: {
    display: 'flex', 
    justifyContent: 'center', 
    height: 40,
    background: '#F4F5F9',
    fontSize: 14,
    color: '#42526E',
    marginRight: 13,
    marginBottom: 21,
    border: '2px solid #7876E0'
  } as CSSProperties,
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  } as CSSProperties,
  uploadContainerEmpty: {
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid #F4F5F9', 
    borderRadius: 3, 
    cursor: 'pointer',
    height: 54
  } as CSSProperties,
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid #F4F5F9', 
    borderRadius: 3, 
    cursor: 'pointer',
  } as CSSProperties,
  icon: {
    fontSize: 16, 
    color: '#7876E0'
  } as CSSProperties,
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
  buttonGray: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#F4F5F9',
    fontSize: 16,
    fontWeight: 500,
    marginTop: 21,
    border: '1px solid rgba(59,59,59,0.5)',
    color: 'rgba(59,59,59,0.5) !important',
  } as CSSProperties,
  checkboxLabel: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: 500,
    color: '#3B3B3B',
  } as CSSProperties,
  errorMessage: {
    fontSize: 10, 
    marginLeft: 8
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
  buttonDelete: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    background: '#EF6749',
    fontSize: 16,
    fontWeight: 500,
    marginTop: 21,
  } as CSSProperties,
  logoContainer: {
    height: 307
  } as CSSProperties,
  logoTitle: {
    fontSize: 14,
    color: '#3B3B3B',
    fontWeight: 'bold',
  } as CSSProperties,
  logoSubtitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 6,
  } as CSSProperties,
  logoSubtitle: {
    fontSize: 14,
    color: '#7876E0',
    fontWeight: 'bold',
    marginRight: 4
  } as CSSProperties,
  logoSubtitleText: {
    fontSize: 14,
    color: 'rgba(59,59,59,0.5)',
  } as CSSProperties,
  logo: {
    boxSizing: 'border-box',
    width: 134,
    height: 134,
    border: '2px solid #DFE1E6',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'rgba(59,59,59,0.5)',
    cursor: 'pointer',
    backgroundColor: '#FAFBFC'
  } as CSSProperties,
  logoIcon: {
    fontSize: 48, 
    color: '#7876E0'
  } as CSSProperties,
  logoImage: {
    width: 134,
    height: 134,
    borderRadius: 3
  } as CSSProperties,
}

export default styles;