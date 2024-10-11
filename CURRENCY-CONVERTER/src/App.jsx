import { useState, useEffect } from 'react';
import ConverterForm from "./components/ConverterForm";

const App = () => {
  // State to manage Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // useEffect to add/remove Dark Mode class on body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="currency-converter">
      {/* Dark Mode Toggle Button */}
      <button className="toggle-mode-button" onClick={toggleDarkMode}>
        {isDarkMode ? "Light" : "Dark"}
      </button>

      <h1 className="title">Currency Converter</h1>
      <ConverterForm />

      {/* DISPLAYING INFO ABOUT SELECTED CURRENCIES */}
      <div className="display-info">
        <h1 className="info">Currency Information</h1>
        <hr />
        <div className="em"></div>
        <div className="currency-info-box">
          {/* From Currency */}
          <div className="currency-from">
            <div className="information">
              <div className="flag">
                <img src={`https://flagsapi.com/US/flat/64.png`} alt="flag" />
                <p>USD - US Dollar</p>
              </div>
              <div className="text">
                <p>
                  Our currency rankings show that the most popular US Dollar exchange rate is the USD to USD rate. The currency code for US Dollars is USD. The currency symbol is $.
                </p>
              </div>
              <a href="#">
                <button>
                  More US Dollar Info
                </button>
              </a>
            </div>
          </div>

          {/* To Currency Info */}
          <div className="currency-to">
            <div className="information">
              <div className="flag">
                <img src={`https://flagsapi.com/US/flat/64.png`} alt="flag" />
                <p>USD - US Dollar</p>
              </div>
              <div className="text">
                <p>
                  Our currency rankings show that the most popular US Dollar exchange rate is the USD to USD rate. The currency code for US Dollars is USD. The currency symbol is $.
                </p>
              </div>
              <a href="#">
                <button>
                  More US Dollar Info
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
