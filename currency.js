  <script>
    const exchangeRates = {
      USD: 1,
      EUR: 0.93,
      INR: 83.20,
      RWF: 1250,
      KES: 131.50,
      UGX: 3850
    };

    function convert() {
      const amount = parseFloat(document.getElementById('amount').value);
      const from = document.getElementById('fromCurrency').value;
      const to = document.getElementById('toCurrency').value;

      if (isNaN(amount)) {
        document.getElementById('result').innerText = "Enter a valid amount.";
        return;
      }

      const usdAmount = amount / exchangeRates[from];
      const converted = usdAmount * exchangeRates[to];
      document.getElementById('result').innerText =
        `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
    }
  </script>
