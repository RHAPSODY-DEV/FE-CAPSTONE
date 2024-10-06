import CurrencySelector from "../CurrencySelector"
import { useState } from 'react';
const ConverterForm = () => {
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("GHS");
    // swapping currencies using the icon
    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);


    }
    const getExchangeRate = () => {
        // API call to get exchange rate
        const API_URL = ` https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
        }
     

    }
    // handling form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        getExchangeRate();
        }


  return (
    <form className="converter-form" onSubmit={handFormSubmit}>
    <div className="form-group">
      <label className="form-label">Enter an amount</label>
      <input type="number" className="form-input" required />
    </div>
    {/* second-group */}
    <div className="form-group-A">
     <div className="form-section">
        <label className="form-label F">From</label>
      <CurrencySelector 
         selectedCurrency={fromCurrency}
        //  updating selected currency code
        handleCurrency={e =>  setFromCurrency(e.target.value) }
      />

     </div>
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
             //  updating selected currency code
             handleCurrency={e =>  setToCurrency(e.target.value) }
        />
     </div>
    </div>
    <button className="submit-button" type="submit">Convert</button>
    <p className="exhange-rate-results">1,000USD = 15.89GHS</p>
  </form>
  )
}

export default ConverterForm
