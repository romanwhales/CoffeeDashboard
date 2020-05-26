import { CSSProperties } from 'react';

export const styles = {
  titleContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4
  } as CSSProperties,
  title: {
    fontSize: 18, 
    color: '#3B3B3B', 
    fontWeight: 500, 
    marginRight: 18
  } as CSSProperties,
  subTitle: {
    fontSize: 14, 
    color: '#3B3B3B', 
    fontWeight: 500, 
    marginRight: 18
  } as CSSProperties,
  chooseFileContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 21, 
    marginTop: 13
  } as CSSProperties,
  chooseFileText: {
    fontSize: 18, 
    color: '#3B3B3B', 
    marginBottom: 3
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
  filesContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    flexWrap: 'wrap'
  } as CSSProperties,
  filesSubContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    width: 218, 
    marginLeft: 21, 
    marginBottom: 33
  } as CSSProperties,
  deleteButton: {
    width: 218, 
    backgroundColor: '#EF6749',
    borderRadius: 'unset',
    justifyContent: 'center',
    fontWeight: 600,
    marginTop: -6
  } as CSSProperties,
  file: {
    width: 218, 
    height: 128,
  } as CSSProperties,
  coverContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 26, 
    backgroundColor: '#3B3B3B', 
    borderRadius: '0 0 0 3px',
    color: '#FFF',
    position: 'absolute',
    right: 0,
    paddingLeft: 5
  } as CSSProperties,
  button: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    height: 40,
    background: '#7876E0',
    fontSize: 16,
    fontWeight: 500
  } as CSSProperties,
  buttonWhite: {
    display: 'flex', 
    justifyContent: 'center', 
    width: '100%',
    height: 40,
    background: '#FFF',
    fontSize: 16,
    fontWeight: 500,
    color: 'rgba(59,59,59,0.5)',
    border: '1px solid rgba(59,59,59,0.5)'
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
}

export default styles;