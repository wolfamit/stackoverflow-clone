import React from 'react';
import loading from '../../assets/89.gif';



const Spinner = ({children , size }) => {
    const styles={
      textAlign: 'center',
      width : size,
    }
  return (
    <div style={styles}>
      <img src={loading} alt='loading'></img>
      {children}
    </div>
  );
};

export default Spinner;
