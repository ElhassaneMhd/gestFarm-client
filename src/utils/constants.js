export const HOMEPAGE_ROUTES = [
  // { label: "home", path: "/" },
  // { label: "contact", path: "/contact" },
  // { label: "about", path: "/about" },
];

export const SALE_STATUS = ["PARTIALLY", "PAID", "DELIVERED", "CANCELLED"];

export const SHEEP_STATUS = ["UNLISTED", "AVAILABLE", "SOLD", "RESERVED"];
export const SHEEP_AGES = {
  LAMBS: "0-1 year",
  YEARLINGS: "1-2 year",
  MATURE: "2-5 year",
  OLD: "5+ year",
};
export const SHIPMENT_STATUS = ["PENDING", "DELIVERED", "CANCELLED"];

export const PAGE_PERMISSIONS = {
  sheep: ["READ_SHEEP", "WRITE_SHEEP", "UPDATE_SHEEP", "DELETE_SHEEP"],
  users: ["READ_USERS", "WRITE_USERS", "UPDATE_USERS", "DELETE_USERS"],
  categories: [
    "READ_CATEGORIES",
    "WRITE_CATEGORIES",
    "UPDATE_CATEGORIES",
    "DELETE_CATEGORIES",
  ],
  shipments: [
    "READ_SHIPMENTS",
    "WRITE_SHIPMENTS",
    "UPDATE_SHIPMENTS",
    "DELETE_SHIPMENTS",
  ],
  sales: ["READ_SALES", "WRITE_SALES", "UPDATE_SALES", "DELETE_SALES"],
  roles: ["READ_ROLES", "WRITE_ROLES", "UPDATE_ROLES", "DELETE_ROLES"],
};

export const PAGE_LIMIT = 10;

//OAUth2
export const OAuthProviders = {
  GOOGLE: "oauth2/code/google",
  GITHUB: "oauth2/code/github",
  FACEBOOK: "oauth2/code/facebook",
};

//Validation rules
export const RULES = {
  username: {
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores",
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email address",
    },
  },
  phone: {
    pattern: {
      value: /^(\+212\s?0?|0)(5|6|7)\d{8}$/,
      message:
        "Invalid phone number format. \n Ex: +212 0637814207 or 0637814207",
    },
  },
  password: {
    pattern: {
      value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/,
      message:
        "Password must contain at least 8 characters, one letter (either uppercase or lowercase), and one number",
    },
  },
  passwordConfirmation: {
    validate: (value, getValue) =>
      value === getValue("password") || "Passwords do not match",
  },
  role: {
    pattern: {
      value: /^ROLE_[a-zA-Z0-9_]+$/,
      message:
        "Role must start with 'ROLE_' and contain only letters, numbers, and underscores",
    },
  },
};
