import React from 'react';
import Select from 'react-select';

// Currency data with country codes
const currencyData = [
    { code: "AED" }, { code: "AFN" }, { code: "ALL" }, { code: "AMD" },
    { code: "ANG" }, { code: "AOA" }, { code: "ARS" }, { code: "AUD" },
    { code: "AWG" }, { code: "AZN" }, { code: "BAM" }, { code: "BBD" },
    { code: "BDT" }, { code: "BGN" }, { code: "BHD" }, { code: "BIF" },
    { code: "BMD" }, { code: "BND" }, { code: "BOB" }, { code: "BRL" },
    { code: "BSD" }, { code: "BTN" }, { code: "BWP" }, { code: "BYN" },
    { code: "BZD" }, { code: "CAD" }, { code: "CDF" }, { code: "CHF" },
    { code: "CLP" }, { code: "CNY" }, { code: "COP" }, { code: "CRC" },
    { code: "CUP" }, { code: "CVE" }, { code: "CZK" }, { code: "DJF" },
    { code: "DKK" }, { code: "DOP" }, { code: "DZD" }, { code: "EGP" },
    { code: "ERN" }, { code: "ETB" }, { code: "EUR" }, { code: "FJD" },
    { code: "FKP" }, { code: "FOK" }, { code: "GBP" }, { code: "GEL" },
    { code: "GGP" }, { code: "GHS" }, { code: "GIP" }, { code: "GMD" },
    { code: "GNF" }, { code: "GTQ" }, { code: "GYD" }, { code: "HKD" },
    { code: "HNL" }, { code: "HRK" }, { code: "HTG" }, { code: "HUF" },
    { code: "IDR" }, { code: "ILS" }, { code: "IMP" }, { code: "INR" },
    { code: "IQD" }, { code: "IRR" }, { code: "ISK" }, { code: "JEP" },
    { code: "JMD" }, { code: "JOD" }, { code: "JPY" }, { code: "KES" },
    { code: "KGS" }, { code: "KHR" }, { code: "KID" }, { code: "KMF" },
    { code: "KRW" }, { code: "KWD" }, { code: "KYD" }, { code: "KZT" },
    { code: "LAK" }, { code: "LBP" }, { code: "LKR" }, { code: "LRD" },
    { code: "LSL" }, { code: "LYD" }, { code: "MAD" }, { code: "MDL" },
    { code: "MGA" }, { code: "MKD" }, { code: "MMK" }, { code: "MNT" },
    { code: "MOP" }, { code: "MRU" }, { code: "MUR" }, { code: "MVR" },
    { code: "MWK" }, { code: "MXN" }, { code: "MYR" }, { code: "MZN" },
    { code: "NAD" }, { code: "NGN" }, { code: "NIO" }, { code: "NOK" },
    { code: "NPR" }, { code: "NZD" }, { code: "OMR" }, { code: "PAB" },
    { code: "PEN" }, { code: "PGK" }, { code: "PHP" }, { code: "PKR" },
    { code: "PLN" }, { code: "PYG" }, { code: "QAR" }, { code: "RON" },
    { code: "RSD" }, { code: "RUB" }, { code: "RWF" }, { code: "SAR" },
    { code: "SBD" }, { code: "SCR" }, { code: "SDG" }, { code: "SEK" },
    { code: "SGD" }, { code: "SHP" }, { code: "SLE" }, { code: "SLL" },
    { code: "SOS" }, { code: "SRD" }, { code: "SSP" }, { code: "STN" },
    { code: "SYP" }, { code: "SZL" }, { code: "THB" }, { code: "TJS" },
    { code: "TMT" }, { code: "TND" }, { code: "TOP" }, { code: "TRY" },
    { code: "TTD" }, { code: "TVD" }, { code: "TWD" }, { code: "TZS" },
    { code: "UAH" }, { code: "UGX" }, { code: "USD" }, { code: "UYU" },
    { code: "UZS" }, { code: "VES" }, { code: "VND" }, { code: "VUV" },
    { code: "WST" }, { code: "XAF" }, { code: "XCD" }, { code: "XOF" },
    { code: "XPF" }, { code: "YER" }, { code: "ZAR" }, { code: "ZMW" },
    { code: "ZWL" }
];

const CurrencySelector = ({ selectedCurrency, handleCurrency }) => {
    // Prepare options for React Select
    const options = currencyData.map(currency => ({
        value: currency.code,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src={`https://flagsapi.com/${currency.code.slice(0, 2)}/flat/24.png`} 
                    alt={currency.code} 
                    style={{ width: '20px', marginRight: '10px' }} 
                />
                {currency.code} {/* Only show the currency code */}
            </div>
        ),
    }));

    // Handle selection change
    const handleSelectChange = (selectedOption) => {
        handleCurrency({ target: { value: selectedOption.value } });
    };

    return (
        <Select
            value={options.find(option => option.value === selectedCurrency)}
            options={options}
            onChange={handleSelectChange}
            className="currency-select"
            placeholder="Select currency..."
            styles={{
                option: (provided) => ({
                    ...provided,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#000',
                }),
                menu: (provided) => ({
                    ...provided,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                    backdropFilter: 'blur(10px)', 
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    // increase z-index
                    zIndex: 1000,
                }),
                control: (provided) => ({
                    ...provided,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    border: 'solid 1px rgba(255, 255, 255, 0.5)',
                }),
                singleValue: (provided) => ({
                    ...provided,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff',
                }),
            }}
        />
    );
};

export default CurrencySelector;
