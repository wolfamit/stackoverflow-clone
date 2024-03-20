import React from 'react';
import loading from '../../assets/89.gif';



const Spinner = ({children , height }) => {
    const styles={
      textAlign: 'center',
    }
  return (
    <div style={styles}>
      <img src={loading} alt='loading'></img>
      {children}
    </div>
  );
};

export default Spinner;
