export const CompanyNumberRegex = /^((AC|ZC|FC|GE|LP|OC|SE|SA|SZ|SF|GS|SL|SO|SC|ES|NA|NZ|NF|GN|NL|NC|R0|NI|EN|\d{2}|SG|FE)\d{5}(\d|C|R))|(RS\d{3}(\d{3}|\d{2}[WSRCZF]|\d(FI|RS|SA|IP|US|EN|AS)|CUS))|((SL|NI)\d{5}[\dA])$/
// company numbers matching this pattern exist, but Companies House does not hold information about them.
const NoInfoCompanyNumberRegex = /^(IP|SP|IC|SI|NP|NV|RC|SR|NR|NO|CE|CS|PC)[\dA-Z]{6}/
// when prefix is RS, suffix is 1 or 2 or 3 letters
const RegisteredSocietyCompanyNumberRegex = /^RS\d{3}(\d{3}|\d{2}[WSRCZF]|\d(FI|RS|SA|IP|US|EN|AS)|CUS)$/
// when prefix is SL, suffix can be A
const ScottishLimitedPartnershipCompanyNumberRegex = /^SL\d{5}[\dA]$/

const EnglandWalesLimitedLiabilityPartnershipCompanyNumberRegex = /^OC(([\dP]{5}[CWERTB])|([\dP]{4}(OC|CU)))$/
// credit unions end in a C suffix
// northern ireland companies can end with an A
// can end in R

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

/*
From the uri Customer Guide pdf:

Prefix Company Type
England & Wales Company
AC Assurance Company for England & Wales
ZC Unregistered Companies (S 1043 - Not Cos Act) for England & Wales
FC Overseas Company
GE European Economic Interest Grouping (EEIG) for England & Wales
LP Limited Partnership for England & Wales
OC Limited Liability Partnership for England & Wales
SE European Company (Societas Europaea) for England & Wales
SA Assurance Company for Scotland
SZ Unregistered Companies (S 1043 Not Cos Act) for Scotland
SF Overseas Company regd in Scotland (pre 1/10/09)
GS European Economic Interest Grouping (EEIG) for Scotland
SL Limited Partnership for Scotland
SO Limited Liability Partnership for Scotland
SC Scottish Company
ES European Company (Societas Europaea) for Scotland
NA Assurance Company for Northern Ireland
NZ Unregistered Companies (S 1043 Not Cos Act) for Northern Ireland
NF Overseas Company regd in Northern Ireland (pre 1/10/09)
GN European Economic Interest Grouping (EEIG) for Northern Ireland
NL Limited Partnership for Northern Ireland
NC Limited Liability Partnership for Northern Ireland
R0 Northern Ireland Company (pre partition)
NI Northern Ireland Company (post partition)
EN European Company (Societas Europaea) for Northern Ireland

Companies House | Uniform Resource Identifiers (URI) Customer Guide8
Companies House does not hold information, other than the company name
and number, on companies with the following company number prefixes:
Prefix Company Type
IP Industrial & Provident Company
SP Scottish Industrial/Provident Company
IC ICVC (Investment Company with Variable Capital)
SI Scottish ICVC (Investment Company with Variable Capital)
NP Northern Ireland Industrial/Provident Company or Credit Union
NV Northern Ireland ICVC (Investment Company with Variable Capital)
RC Royal Charter Companies (English/Wales)
SR Scottish Royal Charter Companies
NR Northern Ireland Royal Charter Companies
NO Northern Ireland Credit Union Industrial/Provident Society

Additional ones I've found:
RS Registered Society
CE Charitable Incorporated Organisation
CS Scottish Charitable Incorporated Organisation
SG Scottish Partnership
    SI Investment Company with Variable Capital(Umbrella)
FE Further Education and Sixth Form College Corps
PC Protected Cell Company
 */
