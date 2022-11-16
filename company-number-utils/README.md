# Module exports

## Regex `CompanyNumberRegex`
A regular expression that matches valid company numbers. 

Example usage:
```javascript
const valid = CompanyNumberRegex.test(companyNumber)
```

## Function `classifyCompanyNumber(companyNumber: string)`
Classify a company number by its format. 
For example, company numbers beginning with `NI` are for companies registered in Northern Ireland.
This function returns a `COMPANY_NUMBER_TYPE`.

Example usage:
```javascript
const companyClassification = classifyCompanyNumber(companyNumber)
```

## Enum `COMPANY_NUMBER_TYPE`
A constant (like an enum) to represent the different types of company.

Example usage:

```javascript
if (companyClassification === COMPANY_NUMBER_TYPE.EnglandWalesRegular)
    console.log("Company number is for a regular company")
```

## `getCompanyNumberCountry(companyNumber: string)`
Get the country where a company was registered. This can be inferred from the company number prefix 
(eg `NI688567` is registered in Northern Ireland because of the `NI` prefix).

Example usage:
```javascript
const country = getCompanyNumberCountry(companyNumber)
```

## Enum `COMPANY_NUMBER_JURISDICTION`
A constant (like an enum) to represent different countries that a company can be registered in. 
Can be used to evaluate the output of `getCompanyNumberCountry`.

Example usage:

```javascript
if (country === COMPANY_NUMBER_JURISDICTION.NORTHERN_IRELAND)
    console.log("Company was registered in Northern Ireland")
```

# Company Number format
From the official documentation: officers bulk file word document

> The majority of company numbers are 8 digit numeric; however, some consist of a prefix of 2 alphanumeric characters followed by 6 digits.  
> Valid prefixes are:
> - SC		Company registered in Scotland		
> - SZ			Scottish company not required to register
> - ZC		English/Welsh company not required to register
> - SF			Overseas Company registered in Scotland
> - FC		Overseas Company registered in England/Wales (prior to 1st October 2009)
> - FC		Overseas Company registered in UK (from 1st October 2009)
> - NI			Company registered in Northern Ireland
> - NF		Overseas Company registered in Northern Ireland
> - OC		Limited Liability Partnership registered in England/Wales
> - SO		Limited Liability Partnership registered in Scotland
> - NC		Limited Liability Partnership registered in Northern Ireland
> - SE		Societas Europaea/UK Societas registered in England/Wales, Scotland or Northern Ireland
> 
> In addition, there is a single company type that has a prefix of “R” plus 7 digits. These are old companies registered in Northern Ireland.

Furthermore, some 8 digit numeric company numbers that begin with zeros are shortened by removing the leading zeros. 
For example `00049045` could be shortened to `49045`.
