# Boosted Stake Package

To run dev => vite

To build project => npm run build

## About Package

Package entry point => App.tsx (src/App.tsx); Everything else clings to this file.
Structure:
    - components contains the main large components related to Boosted Staking
    - shared contains reusable small elements
    - fluid-lib contains api calls needed for boosted stake functioning
    - assets contain images/fonts etc


## Package connection:
- the package is downloaded from the npm site
- installed using npm package_name command
- inserted into the project as a component <BoostedStake {...props} />
    - The following should be used as props:
        - signer = the wallet connected
        - borrower = the wallet connected
        - partner = the website partner that is integrating it
- The signer and borrower parameters should change depending on the wallet that the user connects
- The partner parameter can be hardcoded, since it is the wallet of the person who connects the package to his website


## NPM Packages API /boosted-stake-sdk

### Body

* Borrower=signer = the wallet connected
* partner = the website partner that is integrating it

```
{
    "signer": "addr1qywm068rcy5vrgm3r3ejdv3jyvwfs3q3fyzpxj0w3cpg9m8ylar6xm5kqt77uxfpsxlpgm2y2kg6q5w4ddtptl3704pqqwqpmr",
    "epochs": 2,
    "borrower": "addr1qywm068rcy5vrgm3r3ejdv3jyvwfs3q3fyzpxj0w3cpg9m8ylar6xm5kqt77uxfpsxlpgm2y2kg6q5w4ddtptl3704pqqwqpmr",
    "amount": 10000,
    "partner": "addr1qywm068rcy5vrgm3r3ejdv3jyvwfs3q3fyzpxj0w3cpg9m8ylar6xm5kqt77uxfpsxlpgm2y2kg6q5w4ddtptl3704pqqwqpmr"
}
```

### Response

API returns  Leave Loan APR, Loan Fee, Service Fee and other data based on epochs and amount

## How to test

Testing is best done on testnet.

You need to insert the package and then connect the wallet.

If the wallet connects inside and the wallet number is transmitted, then try to borrow
