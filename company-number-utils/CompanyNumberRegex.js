export const CompanyNumberRegex = /^(SC|SZ|ZC|SF|FC|NI|NF|OC|SO|NC|SE|R\d|\d{2})\d{6}$/

// from the official documentation: (officers bulk file word document)
// The majority of company numbers are 8 digit numeric; however, some consist of a prefix of 2 alphanumeric characters followed by 6 digits.  Valid prefixes are:
// SC		Company registered in Scotland
// SZ			Scottish company not required to register
// 	ZC		English/Welsh company not required to register
// 	SF			Overseas Company registered in Scotland
// 	FC		Overseas Company registered in England/Wales (prior to 1st October 2009)
// 	FC		Overseas Company registered in UK (from 1st October 2009)
// 	NI			Company registered in Northern Ireland
// 	NF		Overseas Company registered in Northern Ireland
// 	OC		Limited Liability Partnership registered in England/Wales
// 	SO		Limited Liability Partnership registered in Scotland
// 	NC		Limited Liability Partnership registered in Northern Ireland
// SE		Societas Europaea/UK Societas registered in England/Wales, Scotland or Northern Ireland
//
// In addition there is a single company type that has a prefix of “R” plus 7 digits. These are old companies registered in Northern Ireland.
