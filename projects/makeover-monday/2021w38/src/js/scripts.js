/* globals Chart, scrollama, moment */

const ready = fn => {
    if ( document.readyState !== 'loading' ){
        fn();
    } else {
        document.addEventListener( 'DOMContentLoaded', fn );
    }
}

const allData = {
   "Credit Card Data": [
      {
         "product": "Cloned Mastercard with PIN",
         // "product_short": "Cloned Mastercard w/PIN",
         "product_short": ["Cloned Mastercard", "with PIN"],
         "avg_dark_web_price_usd": 25
      },
      {
         "product": "Cloned American Express with PIN",
         // "product_short": "Cloned American Express w/PIN",
         "product_short": ["Cloned American Express", "with PIN"],
         "avg_dark_web_price_usd": 35
      },
      {
         "product": "Cloned VISA with PIN",
         // "product_short": "Cloned VISA w/PIN",
         "product_short": ["Cloned VISA", "with PIN"],
         "avg_dark_web_price_usd": 25
      },
      {
         "product": "Credit card details, account balance up to $1,000",
         // "product_short": "CC details, balance: $1,000",
         "product_short": ["Credit card details", "($1,000 balance)"],
         "avg_dark_web_price_usd": 150
      },
      {
         "product": "Credit card details, account balance up to $5,000",
         // "product_short": "CC details, balance: $5,000",
         "product_short": ["Credit card details", "($5,000 balance)"],
         "avg_dark_web_price_usd": 240
      },
      {
         "product": "Stolen online banking logins, minimum $100 on account",
         // "product_short": "Stolen online banking logins, min: $100",
         "product_short": ["Online banking logins", "(min $100 balance)"],
         "avg_dark_web_price_usd": 40
      },
      {
         "product": "Stolen online banking logins, minimum $2,000 on account",
         // "product_short": "Stolen online banking logins, min: $2,000",
         "product_short": ["Online banking logins", "(min $2,000 balance)"],
         "avg_dark_web_price_usd": 120
      },
      {
         "product": "Walmart account with credit card attached",
         // "product_short": "Walmart account w/CC attached",
         "product_short": ["Walmart account", "(with credit card)"],
         "avg_dark_web_price_usd": 14
      },
      {
         "product": "Hacked (Global) credit card details with CVV",
         // "product_short": "Hacked (Global) CC details with CVV",
         "product_short": ["Credit card with CVV", "(Global)"],
         "avg_dark_web_price_usd": 35
      },
      {
         "product": "USA hacked credit card details with CVV",
         // "product_short": "USA hacked CC details with CVV",
         "product_short": ["Credit card with CVV", "(USA"],
         "avg_dark_web_price_usd": 17
      },
      {
         "product": "UK hacked credit card details with CVV",
         // "product_short": "UK hacked CC details with CVV",
         "product_short": ["Credit card with CVV", "(UK)"],
         "avg_dark_web_price_usd": 20
      },
      {
         "product": "Canada hacked credit card details with CVV",
         // "product_short": "Canada hacked CC details with CVV",
         "product_short": ["Credit card with CVV", "(Canada)"],
         "avg_dark_web_price_usd": 28
      },
      {
         "product": "Australia hacked credit card details with CVV",
         // "product_short": "Australia hacked CC details with CVV",
         "product_short": ["Hacked CC with CVV", "(Australia)"],
         "avg_dark_web_price_usd": 30
      },
      {
         "product": "Israel hacked credit card details with CVV",
         // "product_short": "Israel hacked CC details with CVV",
         "product_short": ["Credit card with CVV", "(Israel)"],
         "avg_dark_web_price_usd": 65
      },
      {
         "product": "Spain hacked credit card details with CVV",
         // "product_short": "Spain hacked CC details with CVV",
         "product_short": ["Credit card with CVV", "(Spain)"],
         "avg_dark_web_price_usd": 40
      },
      {
         "product": "Japan hacked credit card details with CVV",
         // "product_short": "Japan hacked CC details with CVV",
         "product_short": ["Credit card with CVV", "(Japan)"],
         "avg_dark_web_price_usd": 40
      }
   ],
   "Payment processing services": [
      {
         "product": "Stolen PayPal account details, minimum $100",
         // "product_short": "Stolen PayPal account details, min: $100",
         "product_short": ["Stolen PayPal", "account details", "(minimum $100 balance)"],
         "avg_dark_web_price_usd": 30
      },
      {
         "product": "Stolen PayPal account details, minimum $1,000",
         // "product_short": "Stolen PayPal account details, min: $1,000",
         "product_short": ["Stolen PayPal", "account details", "(minimum $1,000 balance)"],
         "avg_dark_web_price_usd": 120
      },
      {
         "product": "PayPal transfers from stolen account, $100-$1,000",
         // "product_short": "PayPal transfers from stolen account, $100-$1,000",
         "product_short": ["PayPal transfers", "($100 – $1,000)"],
         "avg_dark_web_price_usd": 50
      },
      {
         "product": "PayPal transfer from stolen account, $1,000 – $3,000",
         // "product_short": "PayPal transfer from stolen account, $1,000 – $3,000",
         "product_short": ["PayPal transfer", "($1,000 – $3,000)"],
         "avg_dark_web_price_usd": 340
      },
      {
         "product": "PayPal transfers from stolen account, $3,000+",
         // "product_short": "PayPal transfers from stolen account, $3,000+",
         "product_short": ["PayPal transfers", "(above $3,000)"],
         "avg_dark_web_price_usd": 180
      },
      {
         "product": "Western Union transfer from stolen account, above $1,000",
         // "product_short": "Western Union transfer from stolen account, above $1,000",
         "product_short": ["Western Union transfer", "(above $1,000)"],
         "avg_dark_web_price_usd": 45
      },
      {
         "product": "Stolen PayPal account details, no balance",
         // "product_short": "Stolen PayPal account details, no balance",
         "product_short": ["Stolen PayPal", "account details", "(no balance)"],
         "avg_dark_web_price_usd": 14
      },
      {
         "product": "Stolen UK Fully verified Skrill account details",
         // "product_short": "Stolen UK fully verified Skrill account details",
         "product_short": ["Verified Skrill", "account details (UK)"],
         "avg_dark_web_price_usd": 200
      },
      {
         "product": "Hacked TransferGo account",
         // "product_short": "Hacked TransferGo account",
         "product_short": ["Hacked TransferGo", "account"],
         "avg_dark_web_price_usd": 510
      },
      {
         "product": "50 Hacked PayPal account logins",
         // "product_short": "50 Hacked PayPal account logins",
         "product_short": ["50 Hacked PayPal", "account logins"],
         "avg_dark_web_price_usd": 200
      },
      {
         "product": "Hacked UK Neteller account",
         // "product_short": "Hacked UK Neteller account",
         "product_short": ["Hacked UK Neteller", "account"],
         "avg_dark_web_price_usd": 70
      },
      {
         "product": "Hacked PerfectMoney account",
         // "product_short": "Hacked PerfectMoney account",
         "product_short": ["Hacked PerfectMoney", "account"],
         "avg_dark_web_price_usd": 160
      },
      {
         "product": "Hacked Weststein Card account",
         // "product_short": "Hacked Weststein Card account",
         "product_short": ["Hacked Weststein", "Card account"],
         "avg_dark_web_price_usd": 710
      },
      {
         "product": "Movo.Cash Login",
         // "product_short": "Movo.Cash Login",
         "product_short": ["Movo.Cash Login"],
         "avg_dark_web_price_usd": 14
      },
      {
         "product": "Hacked Western Union Account",
         // "product_short": "Hacked Western Union Account",
         "product_short": ["Hacked Western Union", "Account"],
         "avg_dark_web_price_usd": 45
      },
      {
         "product": "Verified Stripe account with payment gateway",
         // "product_short": "Verified Stripe account w/payment gateway",
         "product_short": ["Verified Stripe account", "with payment gateway"],
         "avg_dark_web_price_usd": 1000
      }
   ],
   "Crypto Accounts": [
      {
         "product": "Hacked Coinbase verified account",
         // "product_short": "Hacked Coinbase verified account",
         "product_short": ["Coinbase"],
         "avg_dark_web_price_usd": 610
      },
      {
         "product": "USA verified LocalBitcoins account",
         // "product_short": "USA verified LocalBitcoins account",
         "product_short": ["LocalBitcoins"],
         "avg_dark_web_price_usd": 350
      },
      {
         "product": "Crypto.com verified account",
         // "product_short": "Crypto.com verified account",
         "product_short": ["Crypto.com"],
         "avg_dark_web_price_usd": 300
      },
      {
         "product": "Coinfield.com verified account",
         // "product_short": "Coinfield.com verified account",
         "product_short": ["Coinfield.com"],
         "avg_dark_web_price_usd": 410
      },
      {
         "product": "Kraken verified account",
         // "product_short": "Kraken verified account",
         "product_short": ["Kraken"],
         "avg_dark_web_price_usd": 810
      },
      {
         "product": "Cex.io verified account",
         // "product_short": "Cex.io verified account",
         "product_short": ["Cex.io"],
         "avg_dark_web_price_usd": 710
      },
      {
         "product": "Blockchain.com verified account",
         // "product_short": "Blockchain.com verified account",
         "product_short": ["Blockchain.com"],
         "avg_dark_web_price_usd": 310
      },
      {
         "product": "Binance verified account",
         // "product_short": "Binance verified account",
         "product_short": ["Binance"],
         "avg_dark_web_price_usd": 410
      }
   ],
   "Social Media": [
      {
         "product": "Hacked Facebook account",
         // "product_short": "Hacked Facebook account",
         "product_short": ["Facebook"],
         "avg_dark_web_price_usd": 65
      },
      {
         "product": "Hacked Instagram account",
         // "product_short": "Hacked Instagram account",
         "product_short": ["Instagram"],
         "avg_dark_web_price_usd": 45
      },
      {
         "product": "Hacked Twitter account",
         // "product_short": "Hacked Twitter account",
         "product_short": ["Twitter"],
         "avg_dark_web_price_usd": 35
      },
      {
         "product": "Hacked Gmail account",
         // "product_short": "Hacked Gmail account",
         "product_short": ["Gmail"],
         "avg_dark_web_price_usd": 80
      },
      {
         "product": "Instagram followers x 1,000",
         // "product_short": "Instagram followers x 1,000",
         "product_short": ["Instagram", "(1,000 followers)"],
         "avg_dark_web_price_usd": 5
      },
      {
         "product": "Spotify followers x 1,000",
         // "product_short": "Spotify followers x 1,000",
         "product_short": ["Spotify", "(1,000 followers)"],
         "avg_dark_web_price_usd": 2
      },
      {
         "product": "Twitch followers x 1,000",
         // "product_short": "Twitch followers x 1,000",
         "product_short": ["Twitch", "(1,000 followers)"],
         "avg_dark_web_price_usd": 5
      },
      {
         "product": "LinkedIn company page followers x 1,000",
         // "product_short": "LinkedIn company page followers x 1,000",
         "product_short": ["LinkedIn company", "page (1,000 followers)"],
         "avg_dark_web_price_usd": 12
      },
      {
         "product": "Pinterest followers x 1,000",
         // "product_short": "Pinterest followers x 1,000",
         "product_short": ["Pinterest", "(1,000 followers)"],
         "avg_dark_web_price_usd": 4
      },
      {
         "product": "Soundcloud plays x 1,000",
         // "product_short": "Soundcloud plays x 1,000",
         "product_short": ["Soundcloud", "(1,000 plays)"],
         "avg_dark_web_price_usd": 1
      },
      {
         "product": "Twitter retweets x 1,000",
         // "product_short": "Twitter retweets x 1,000",
         "product_short": ["1,000 retweets", "on Twitter"],
         "avg_dark_web_price_usd": 25
      },
      {
         "product": "Instagram likes x 1,000",
         // "product_short": "Instagram likes x 1,000",
         "product_short": ["1,000 likes", "on Instagram"],
         "avg_dark_web_price_usd": 5
      }
   ],
   "Hacked Services": [
      {
         "product": "Uber driver hacked account",
         // "product_short": "Uber driver hacked account",
         "product_short": ["Uber driver hacked account"],
         "avg_dark_web_price_usd": 14
      },
      {
         "product": "Uber hacked account",
         // "product_short": "Uber hacked account",
         "product_short": ["Uber hacked account"],
         "avg_dark_web_price_usd": 8
      },
      {
         "product": "ZipCar account",
         // "product_short": "ZipCar account",
         "product_short": ["ZipCar account"],
         "avg_dark_web_price_usd": 12
      },
      {
         "product": "Bet365 account",
         // "product_short": "Bet365 account",
         "product_short": ["Bet365 account"],
         "avg_dark_web_price_usd": 50
      },
      {
         "product": "Lykke account",
         // "product_short": "Lykke account",
         "product_short": ["Lykke account"],
         "avg_dark_web_price_usd": 260
      },
      {
         "product": "FedEx account",
         // "product_short": "FedEx account",
         "product_short": ["FedEx account"],
         "avg_dark_web_price_usd": 22
      },
      {
         "product": "Netflix account – 1 year subscription",
         // "product_short": "Netflix account – 1 year subscription",
         "product_short": ["Netflix account", "(1 year subscription)"],
         "avg_dark_web_price_usd": 44
      },
      {
         "product": "Kaspersky account",
         // "product_short": "Kaspersky account",
         "product_short": ["Kaspersky account"],
         "avg_dark_web_price_usd": 8
      },
      {
         "product": "Various adult site accounts",
         // "product_short": "Various adult site accounts",
         "product_short": ["Various adult site", "accounts"],
         "avg_dark_web_price_usd": 5
      },
      {
         "product": "Canva Pro yearly",
         // "product_short": "Canva Pro yearly",
         "product_short": ["Canva Pro yearly"],
         "avg_dark_web_price_usd": 6
      },
      {
         "product": "NBA League Pass",
         // "product_short": "NBA League Pass",
         "product_short": ["NBA League Pass"],
         "avg_dark_web_price_usd": 8
      },
      {
         "product": "Orange TV",
         // "product_short": "Orange TV",
         "product_short": ["Orange TV"],
         "avg_dark_web_price_usd": 4
      },
      {
         "product": "Hulu",
         // "product_short": "Hulu",
         "product_short": ["Hulu"],
         "avg_dark_web_price_usd": 5
      },
      {
         "product": "The Telegraph UK Premium",
         // "product_short": "The Telegraph UK Premium",
         "product_short": ["The Telegraph UK Premium"],
         "avg_dark_web_price_usd": 7
      },
      {
         "product": "CNBC Pro",
         // "product_short": "CNBC Pro",
         "product_short": ["CNBC Pro"],
         "avg_dark_web_price_usd": 3
      },
      {
         "product": "Netflix 4K 1 year",
         // "product_short": "Netflix 4K 1 year",
         "product_short": ["Netflix 4K 1 year"],
         "avg_dark_web_price_usd": 4
      },
      {
         "product": "HBO",
         // "product_short": "HBO",
         "product_short": ["HBO"],
         "avg_dark_web_price_usd": 4
      },
      {
         "product": "Ancestry.com",
         // "product_short": "Ancestry.com",
         "product_short": ["Ancestry.com"],
         "avg_dark_web_price_usd": 8
      },
      {
         "product": "Adobe Creative Cloud 1 year",
         // "product_short": "Adobe Creative Cloud 1 year",
         "product_short": ["Adobe Creative Cloud", "1 year"],
         "avg_dark_web_price_usd": 160
      },
      {
         "product": "eBay account with good reputation (1,000+ feedback)",
         // "product_short": "eBay account w/good reputation (1,000+ feedback)",
         "product_short": ["eBay account", "(1,000+ feedback)"],
         "avg_dark_web_price_usd": 1000
      }
   ],
   "Forged Documents – Scans": [
      {
         "product": "Alberta CA Drivers License (scan)",
         // "product_short": "Alberta CA Drivers License (scan)",
         "product_short": ["Drivers license (Alberta, CA)"],
         "avg_dark_web_price_usd": 32
      },
      {
         "product": "Minnesota drivers license",
         // "product_short": "Minnesota drivers license",
         "product_short": ["Drivers license (Minnesota)"],
         "avg_dark_web_price_usd": 20
      },
      {
         "product": "Utility Bill templates",
         // "product_short": "Utility Bill templates",
         "product_short": ["Utility bill templates"],
         "avg_dark_web_price_usd": 39
      },
      {
         "product": "US Business cheque templates",
         // "product_short": "US Business cheque templates",
         "product_short": ["US Business cheque templates"],
         "avg_dark_web_price_usd": 15
      },
      {
         "product": "NSW (Australia) drivers license",
         // "product_short": "NSW (Australia) drivers license",
         "product_short": ["Drivers license (NSW, Australia)"],
         "avg_dark_web_price_usd": 20
      },
      {
         "product": "Russian passport scan",
         // "product_short": "Russian passport scan",
         "product_short": ["Russian passport scan"],
         "avg_dark_web_price_usd": 100
      },
      {
         "product": "New York drivers license",
         // "product_short": "New York drivers license",
         "product_short": ["Drivers license (New York)"],
         "avg_dark_web_price_usd": 80
      },
      {
         "product": "USA selfie with holding ID",
         // "product_short": "USA selfie w/holding ID",
         "product_short": ["Selfie with holding ID (USA)"],
         "avg_dark_web_price_usd": 100
      },
      {
         "product": "US valid social security number",
         // "product_short": "US valid social security number",
         "product_short": ["Valid social security", "number (USA)"],
         "avg_dark_web_price_usd": 2
      }
   ],
   "Forged Documents – Physical": [
      {
         "product": "Fake US Green Card",
         // "product_short": "Fake US Green Card",
         "product_short": ["Fake US Green Card"],
         "avg_dark_web_price_usd": 150
      },
      {
         "product": "New Jersey ID",
         // "product_short": "New Jersey ID",
         "product_short": ["New Jersey ID"],
         "avg_dark_web_price_usd": 50
      },
      {
         "product": "Netherlands Passport",
         // "product_short": "Netherlands Passport",
         "product_short": ["Netherlands Passport"],
         "avg_dark_web_price_usd": 4000
      },
      {
         "product": "Poland Passport",
         // "product_short": "Poland Passport",
         "product_short": ["Poland Passport"],
         "avg_dark_web_price_usd": 4000
      },
      {
         "product": "Indiana ID",
         // "product_short": "Indiana ID",
         "product_short": ["Indiana ID"],
         "avg_dark_web_price_usd": 185
      },
      {
         "product": "Texas ID",
         // "product_short": "Texas ID",
         "product_short": ["Texas ID"],
         "avg_dark_web_price_usd": 145
      },
      {
         "product": "Utah ID",
         // "product_short": "Utah ID",
         "product_short": ["Utah ID"],
         "avg_dark_web_price_usd": 160
      },
      {
         "product": "European Union National ID (avg.)",
         // "product_short": "European Union National ID (avg.)",
         "product_short": ["European Union", "National ID (avg.)"],
         "avg_dark_web_price_usd": 120
      },
      {
         "product": "Latvian National ID",
         // "product_short": "Latvian National ID",
         "product_short": ["Latvian National ID"],
         "avg_dark_web_price_usd": 500
      },
      {
         "product": "Louisiana ID",
         // "product_short": "Louisiana ID",
         "product_short": ["Louisiana ID"],
         "avg_dark_web_price_usd": 125
      },
      {
         "product": "Montana ID",
         // "product_short": "Montana ID",
         "product_short": ["Montana ID"],
         "avg_dark_web_price_usd": 150
      },
      {
         "product": "Nevada ID",
         // "product_short": "Nevada ID",
         "product_short": ["Nevada ID"],
         "avg_dark_web_price_usd": 160
      },
      {
         "product": "Delaware ID",
         // "product_short": "Delaware ID",
         "product_short": ["Delaware ID"],
         "avg_dark_web_price_usd": 185
      },
      {
         "product": "France Passport",
         // "product_short": "France Passport",
         "product_short": ["France Passport"],
         "avg_dark_web_price_usd": 4000
      },
      {
         "product": "Lithuanian passport",
         // "product_short": "Lithuanian passport",
         "product_short": ["Lithuanian passport"],
         "avg_dark_web_price_usd": 1500
      },
      {
         "product": "Maltese Passport",
         // "product_short": "Maltese Passport",
         "product_short": ["Maltese Passport"],
         "avg_dark_web_price_usd": 6500
      },
      {
         "product": "Maltese Passport",
         // "product_short": "Maltese Passport",
         "product_short": ["Maltese Passport"],
         "avg_dark_web_price_usd": 6500
      },
      {
         "product": "Various European Union passports",
         // "product_short": "Various European Union passports",
         "product_short": ["Various European", "Union passports"],
         "avg_dark_web_price_usd": 4000
      },
      {
         "product": "US driver’s license",
         // "product_short": "US driver’s license",
         "product_short": ["US driver’s license"],
         "avg_dark_web_price_usd": 100
      }
   ],
   "Email Database Dumps": [
      {
         "product": "Fake US Green Card",
         // "product_short": "Fake US Green Card",
         "product_short": ["Fake US Green Card"],
         "avg_dark_web_price_usd": 150
      },
      {
         "product": "600k New Zealand emails",
         // "product_short": "600k New Zealand emails",
         "product_short": ["600k New Zealand emails"],
         "avg_dark_web_price_usd": 10
      },
      {
         "product": "350k Czech emails",
         // "product_short": "350k Czech emails",
         "product_short": ["350k Czech emails"],
         "avg_dark_web_price_usd": 10
      },
      {
         "product": "2,4 million Canada emails",
         // "product_short": "2,4 million Canada emails",
         "product_short": ["2,4 million Canada emails"],
         "avg_dark_web_price_usd": 10
      },
      {
         "product": "4,78 million Mexico emails",
         // "product_short": "4,78 million Mexico emails",
         "product_short": ["4,78 million Mexico emails"],
         "avg_dark_web_price_usd": 10
      },
      {
         "product": "380k Austria emails",
         // "product_short": "380k Austria emails",
         "product_short": ["380k Austria emails"],
         "avg_dark_web_price_usd": 10
      },
      {
         "product": "Private USA dentists database 122k",
         // "product_short": "Private USA dentists database 122k",
         "product_short": ["Private USA dentists", "database 122k"],
         "avg_dark_web_price_usd": 50
      },
      {
         "product": "USA Voter Database (various states)",
         // "product_short": "USA Voter Database (various states)",
         "product_short": ["USA Voter Database", "(various states)"],
         "avg_dark_web_price_usd": 100
      }
   ],
   "Malware": [
      {
         "product": "Global low quality, slow speed, low success rate x 1,000",
         // "product_short": "Global low quality, slow speed, low success rate x 1,000",
         "product_short": ["Global", "(low quality)"],
         "avg_dark_web_price_usd": 50
      },
      {
         "product": "Europe low quality, slow speed, low success rate x 1,000",
         // "product_short": "Europe low quality, slow speed, low success rate x 1,000",
         "product_short": ["Europe", "(low quality)"],
         "avg_dark_web_price_usd": 320
      },
      {
         "product": "USA, CA, UK, AU low quality, slow speed, low success rate x 1,000",
         // "product_short": "USA, CA, UK, AU low quality, slow speed, low success rate x 1,000",
         "product_short": ["USA, CA, UK, AU", "(low quality)"],
         "avg_dark_web_price_usd": 900
      },
      {
         "product": "Global med quality, 70% success rate x 1,000",
         // "product_short": "Global med quality, 70% success rate x 1,000",
         "product_short": ["Global", "(medium quality)"],
         "avg_dark_web_price_usd": 80
      },
      {
         "product": "Europe med quality, 70% success rate x 1,000",
         // "product_short": "Europe med quality, 70% success rate x 1,000",
         "product_short": ["Europe", "(medium quality)"],
         "avg_dark_web_price_usd": 500
      },
      {
         "product": "USA only med quality, 70% success rate x 1,000",
         // "product_short": "USA only med quality, 70% success rate x 1,000",
         "product_short": ["USA", "(medium quality)"],
         "avg_dark_web_price_usd": 1000
      },
      {
         "product": "USA, CA, UK, AU med quality, 70% success rate x 1,000",
         // "product_short": "USA, CA, UK, AU med quality, 70% success rate x 1,000",
         "product_short": ["USA, CA, UK, AU", "(medium quality)"],
         "avg_dark_web_price_usd": 1400
      },
      {
         "product": "Europe fresh high quality x 1,000",
         // "product_short": "Europe fresh high quality x 1,000",
         "product_short": ["Europe", "(fresh, high quality)"],
         "avg_dark_web_price_usd": 2500
      },
      {
         "product": "Europe aged high quality x 1,000",
         // "product_short": "Europe aged high quality x 1,000",
         "product_short": ["Europe aged", "high quality x 1,000"],
         "avg_dark_web_price_usd": 1200
      },
      {
         "product": "USA high quality x 1,000",
         // "product_short": "USA high quality x 1,000",
         "product_short": ["USA high quality x 1,000"],
         "avg_dark_web_price_usd": 1900
      },
      {
         "product": "CA high quality x 1,000",
         // "product_short": "CA high quality x 1,000",
         "product_short": ["CA high quality x 1,000"],
         "avg_dark_web_price_usd": 1400
      },
      {
         "product": "UK high quality x 1,000",
         // "product_short": "UK high quality x 1,000",
         "product_short": ["UK high quality x 1,000"],
         "avg_dark_web_price_usd": 2200
      },
      {
         "product": "Android x 1,000",
         // "product_short": "Android x 1,000",
         "product_short": ["Android x 1,000"],
         "avg_dark_web_price_usd": 900
      },
      {
         "product": "Premium x 1,000",
         // "product_short": "Premium x 1,000",
         "product_short": ["Premium x 1,000"],
         "avg_dark_web_price_usd": 5000
      }
   ],
   "DDOS Attacks": [
      {
         "product": "Unprotected website, 10-50k requests per second, 1 hour",
         // "product_short": "Unprotected website, 10-50k requests per second, 1 hour",
         "product_short": ["Unprotected website", "10-50k requests per second, 1 hour"],
         "avg_dark_web_price_usd": 15
      },
      {
         "product": "Unprotected website, 10-50k requests per second, 24 hours",
         // "product_short": "Unprotected website, 10-50k requests per second, 24 hours",
         "product_short": ["Unprotected website", "10-50k requests per second, 24 hours"],
         "avg_dark_web_price_usd": 50
      },
      {
         "product": "Unprotected website, 10-50k requests per second, 1 week",
         // "product_short": "Unprotected website, 10-50k requests per second, 1 week",
         "product_short": ["Unprotected website", "10-50k requests per second, 1 week"],
         "avg_dark_web_price_usd": 500
      },
      {
         "product": "Unprotected website, 10-50k requests per second, 1 month",
         // "product_short": "Unprotected website, 10-50k requests per second, 1 month",
         "product_short": ["Unprotected website", "10-50k requests per second, 1 month"],
         "avg_dark_web_price_usd": 1000
      },
      {
         "product": "Europe low quality, slow speed, low success rate x 1,000",
         // "product_short": "Europe low quality, slow speed, low success rate x 1,000",
         "product_short": ["Europe low quality", "slow speed", "low success rate x 1,000"],
         "avg_dark_web_price_usd": 320
      },
      {
         "product": "Premium protected website, 20-50k requests per second, multiple elite proxies, 24 hours",
         // "product_short": "Premium protected website, 20-50k requests per second, multiple elite proxies, 24 hours",
         "product_short": ["Premium protected website", "20-50k requests per second", "multiple elite proxies, 24 hours"],
         "avg_dark_web_price_usd": 200
      }
   ]
};

const showDataset = ( chart, dataset, title, subtitle ) => {
    const description = document.getElementById( 'description' );
    dataset = window.helpers.sortArrayOfObjects( dataset, 'avg_dark_web_price_usd' );

    const dataValues = dataset.map( datapoint => {
        return datapoint.avg_dark_web_price_usd;
    } );

    const dataLabels = dataset.map( datapoint => {
        // return datapoint.product;
        return datapoint.product_short;
    } );

    const dataLabelsLong = dataset.map( datapoint => {
        // return datapoint.product;
        return datapoint.product;
    } );

    // if ( window.helpers.isMobile() ){
    //     chart.data.datasets[0].axis = 'y';
    // }

    chart.data.datasets[0].axis = 'y';

    chart.data.datasets[0].data = dataValues;
    chart.data.labels = dataLabels;
    chart.options.plugins.annotation.annotations.annotation.value = window.helpers.median( dataValues );
    chart.options.plugins.title.text = title;

    // chart.options.plugins.subtitle.display = false;
    chart.options.plugins.subtitle.text = `Median price: \$${ window.helpers.median( dataValues ) }`;
    chart.update();

    description.innerHTML = '';
    window.helpers.highlightMax( chart, '#7f5af0' );
}

ready( () => {
    Chart.defaults.color = "#fff";
    Chart.defaults.borderColor = "#7f5af0";
    Chart.defaults.backgroundColor = "#2cb67d";

    const data = {
        labels: [],
        datasets: [{
            label: 'Average price in USD',
            borderWidth: 1,
            data: [],
        }]
    };

    const annotation = {
        type: 'line',
        // scaleID: 'y',
        scaleID: 'x',
        value: 0,
        borderColor: Chart.defaults.borderColor,
        borderWidth: 2,
        borderDash: [5, 5],
        click: ( { chart, element } )  => {
            // console.log('Line annotation clicked');
        }
    };  

    var chartEl = document.getElementById( 'chart' );

    if ( window.helpers.isMobile() ){
        chartEl.height = 900;
    } else {
        chartEl.height = 300;
    }

    let scalesConfig = {
        x: {
            display: false,
        },
        y: {
            display: false,
        }
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            animation: {
                duration: 0
            },
            responsive: true,
            // maintainAspectRatio: false,
            // indexAxis: window.helpers.isMobile() ? 'y' : 'x',
            indexAxis: 'y',
            scales: {
                x: {
                    display: false,
                    // suggestedMin: 0,
                    startAtZero: false,
                    // reverse: true,
                    // suggestedMax: Math.max( dataValues ),
                    ticks: {
                        // reverse: true,
                        callback: ( value, index, values ) => {
                            return `${new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD' } ).format( value )}`;
                        }
                    }
                },
                y:{
                    display: false,
                    reverse: true
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: ''
                },                
                subtitle: {
                    display: true,
                    text: '',
                    padding: {
                        bottom: 30
                    }                    
                },                
                tooltip: {
                    callbacks: {
                        title: context => {
                            // console.log( allData[context[0].dataIndex] );
                            // console.log( context[0].dataIndex );
                            // console.log( context[0] );
                            return '';
                        },
                        label: context => {
                            let label = context.dataset.label || '';
                            
                            if ( label ) {
                                label += ': ';
                            }
                            
                            if ( context.parsed.x !== null ) {
                                label += `${new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD' } ).format( context.parsed.x )}`;
                            }
                            return label;
                        }
                    }
                }
            }            
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: tooltipItems => {
                        const title = tooltipItems[0].label;
                        const year = title.split( '/' )[0];
                        const month = window.helpers.getMonth( parseInt( title.split( '/' )[1] ) - 1 );
                        return `${month} ${year}`;
                    },
                    label: context => {
                        let label = context.dataset.label || '';
                        if ( label ) {
                          label += ': ';
                      }
                      if ( context.parsed.x !== null ) {
                          label += `$${new Intl.NumberFormat( 'en-US', { style: 'currency', currency: 'USD' } ).format( context.parsed.x )}`;
                      }
                      return label;
                  }
              }
            }        
        }        
    };

    const chart = new Chart( document.getElementById( 'chart' ), config );
    const description = document.getElementById( 'description' );

    chart.options.scales.x.display = true;
    chart.options.scales.y.display = true;
    chart.options.plugins.annotation = {
        annotations: {
            annotation
        }
    };

    const chartFilterButtons = [...document.querySelectorAll( '#chart-filters button' )];
    chartFilterButtons.forEach( btn => {
        btn.addEventListener( 'click', ev => {

            chartFilterButtons.forEach( btn => {
                btn.classList.remove( 'selected' );
            } );            

            ev.target.classList.add( 'selected' );
            const dataCategory = ev.target.dataset['category'];

            showDataset( chart, allData[dataCategory], dataCategory, '' );

        } );
    } );

    showDataset( chart, allData['Credit Card Data'], 'Credit Card Data', '' );
} );
