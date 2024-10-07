import CurrencySelector from "../CurrencySelector";
import { useEffect, useState } from "react";

const ConverterForm = () => {
  // State variables to manage input and output
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("GHS");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Swap the values of fromCurrency and toCurrency
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Function to fetch exchange rates from the API
  const getExchangeRate = async () => {
    // API call to get exchange rate
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    setIsLoading(true); // Set loading state to true during API fetch

    try {
      const response = await fetch(API_URL);

      // Handle non-200 HTTP responses
      if (!response.ok) throw Error("Something went wrong!");

      const data = await response.json();

      // Calculate the converted amount based on exchange rate
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    } finally {
      setIsLoading(false); // Reset loading state after API call
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate(); // Fetch exchange rate on form submit
  };

  // Fetch exchange rate on initial component mount
  useEffect(() => {
    getExchangeRate();
  }, []);

  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
      {/* Input field for amount */}
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

      {/* Currency selection and swap feature */}
      <div className="form-group-A">
        <div className="form-section">
          <label className="form-label F">From</label>
          <CurrencySelector
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>

        {/* Swap Icon to swap the currencies */}
        <div className="swap-icon" onClick={handleSwap}>
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

      {/* Submit button to trigger conversion */}
      <button
        className={`${isLoading ? "Loading" : ""} submit-button`}
        type="submit" >
       <strong> Convert</strong>
      </button>

      {/* Display exchange rate results */}
      <p className="exchange-rate-results">
        {isLoading ? "Getting exchange rate" : result}
      </p>
    </form>
  );
};

export default ConverterForm;
