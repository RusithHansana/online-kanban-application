import React from 'react';

const SignUpFooter = ({message, action, handleButton}) => {
  return (
    <div>
        <p>{message}  <span onClick={handleButton}> {action}</span></p>
    </div>
  );
}

export default SignUpFooter;