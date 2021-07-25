let USER_ROLE = null;
export const ADMIN = "admin";
export const USER = "user";

export function GetUserRole() {
  return window.localStorage.getItem("role") == undefined
    ? null
    : window.localStorage.getItem("role");
}

export function SetUserRole(role) {
  if (role == "admin") USER_ROLE = ADMIN;
  else if (role == "user") USER_ROLE = USER;
  else window.localStorage.removeItem("role");
  window.localStorage.setItem("role", USER_ROLE);
}

export const EXCEL_MAPPER = {
  "Company Code": "companyCode",
  "Stock Exchange": "exchangeName",
  "Price Per Share(in Rs)": "sharePrice",
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

const USER_NAME = "User Name";
const PASSWORD = "Password";
const ROLE = "Role";
const EMAIL = "Email";
const MOBILE = "Mobile";

export const USER_JSON_FIELD = {
  username: USER_NAME,
  password: PASSWORD,
  role: ROLE,
  email: EMAIL,
  mobile: MOBILE,
};

const SECTOR_NAME = "Sector Name";

export const SECTOR_JSON_FIELD = {
  sectorName: SECTOR_NAME,
  brief: BRIEF,
};
