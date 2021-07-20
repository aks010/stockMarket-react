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
