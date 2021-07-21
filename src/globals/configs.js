let USER_ROLE = null;
export const ADMIN = "ADMIN";
export const USER = "USER";

export function GetUserRole() {
  return USER_ROLE;
}

export function SetUserRole(role) {
  if (role == "admin") USER_ROLE = ADMIN;
  else if (role == "user") USER_ROLE = USER;
  else USER_ROLE = null;
}

export const EXCEL_MAPPER = {
  "Company Code": "companyCode",
  "Stock Exchange": "exchangeName",
  "Price Per Share(in Rs)": "pricePerShare",
  ["Date"]: "datee",
  ["Time"]: "timee",
};

const COMPANY_NAME = "Company Name";
const CEO = "CEO";
const TURNOVER = "Turnover";
const BOARD_OF_DIRECTORS = "Board of Director";
const COMPANY_BRIEF = "Company Brief";
const SECTOR = "Sector";

export const COMPANY_JSON_FIELD = {
  companyName: COMPANY_NAME,
  ceo: CEO,
  turnover: TURNOVER,
  boardOfDirectors: BOARD_OF_DIRECTORS,
  companyBrief: COMPANY_BRIEF,
  sector: SECTOR,
};

const EXCHANGE_NAME = "Name";
const CONTACT_ADDRESS = "Contact Address";
const BRIEF = "Brief";
const REMARKS = "Remarks";

export const EXCHANGE_JSON_FIELD = {
  exchangeName: EXCHANGE_NAME,
  brief: BRIEF,
  contactAddress: CONTACT_ADDRESS,
  remarks: REMARKS,
};

const PRICE_PER_SHARE = "Price Per Share";
const TOTAL_NUMBER_OF_SHARES = "Total Number of Shares";
const OPEN_DATA_TIME = "Open Date Time";
const IPO_REMARKS = "Remarks";

export const IPO_JSON_FIELD = {
  pricePerShare: PRICE_PER_SHARE,
  totalNumberOfShares: TOTAL_NUMBER_OF_SHARES,
  openDateTime: OPEN_DATA_TIME,
  remarks: IPO_REMARKS,
  company: "Company",
};
