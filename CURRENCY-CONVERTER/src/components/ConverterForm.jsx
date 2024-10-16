import CurrencySelector from "../CurrencySelector";
import { useEffect, useState } from "react";

const ConverterForm = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GHS");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [history, setHistory] = useState([]); 
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); // State for visibility of history

  const getExchangeRate = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    setIsLoading(true);
    setErrorMessage(""); 

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Unable to fetch exchange rates. Please try again.");
      }

      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);

      const conversionEntry = {
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount: rate,
        date: new Date().toLocaleString(), 
      };
      setHistory((prevHistory) => [conversionEntry, ...prevHistory]); 
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate(); 
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  // Function to toggle visibility of conversion history
  const toggleHistoryVisibility = () => {
    setIsHistoryVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div>
      <form className="converter-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label">Enter an amount</label>
          <input
            type="number"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group-A">
          <div className="form-section">
            <label className="form-label F">From</label>
            <CurrencySelector
              selectedCurrency={fromCurrency}
              handleCurrency={(e) => setFromCurrency(e.target.value)}
            />
          </div>
          <div className="swap-icon" onClick={() => {
            setFromCurrency(toCurrency);
            setToCurrency(fromCurrency);
          }}>
            <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="form-section">
            <label className="form-label T">To</label>
            <CurrencySelector
              selectedCurrency={toCurrency}
              handleCurrency={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>
        <button className={`${isLoading ? "Loading" : ""} submit-button`} type="submit">
          Convert
        </button>
        <p className="exhange-rate-results">
          {isLoading ? "Getting exchange rate..." : errorMessage || result}
        </p>
      </form>

      {/* Button to toggle conversion history visibility */}
      <div className="conversion-history">
        <h3>
          Conversion History
          <button className="toggle-history-button" onClick={toggleHistoryVisibility}>
            {isHistoryVisible ? "Hide history" : "Show history"}
          </button>
        </h3>
        {isHistoryVisible && (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                {entry.amount} {entry.fromCurrency} converted to {entry.convertedAmount} {entry.toCurrency} on {entry.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConverterForm;
