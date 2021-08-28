import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
// import PropTypes from "prop-types";

const Alert = () => {
  // const { alert } = useContext(AlertContext);
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  if (alert === null) {
    return null;
  } else {
    return (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i> {alert.message}
      </div>
    );
  }
};

// Alert.propTypes = {
//   alert: PropTypes.object.isRequired,
// };

export default Alert;
