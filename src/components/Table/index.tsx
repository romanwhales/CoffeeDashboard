import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStore } from 'models';
import { withRouter, RouteComponentProps } from 'react-router';
import Styles from './Styles';
import Cell from './Cell';

export interface TableProps extends RouteComponentProps {
  headers: Array<string>;
  data: any[];
  handleEdit: (item) => void;
}

const Table: React.FunctionComponent<TableProps> = props => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(props.data);
  }, [props.data])

  const handleEdit = (item) => {
    props.handleEdit(item);
  }

  return (
    <div style={Styles.mainContainer}>
      <div style={Styles.headers}>
        {props.headers.map((header, index) => 
          <div key={index} style={Styles.cellHeader}>{header}</div>
        )}
        <div style={Styles.cellHeader}></div>
      </div>
      <div>
        {rows.map((item, rowIndex) => 
          <div key={item._id} style={rowIndex % 2 !== 0 ? Styles.rowEven : Styles.rowOdd}>
            {props.headers.map((header, index) => 
              <div key={`${rowIndex}_${header.toLowerCase()}`} style={Styles.cell}>
                <Cell 
                  header={header} 
                  item={item} 
                />
              </div>
            )}
            <div style={Styles.cellActions}>
              <div style={Styles.action} onClick={() => handleEdit(item)}>Edit</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStore) => ({
  
})
const mapDispatchToProps = dispatch => ({
  
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Table));
