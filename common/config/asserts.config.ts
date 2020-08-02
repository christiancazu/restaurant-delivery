export const ASSERTS = {
  USER: {
    DOCUMENT_MIN_LENGTH: 8,
    DOCUMENT_MAX_LENGTH: 16,

    FIRSTNAME_MIN_LENGTH: 2,
    FIRSTNAME_MAX_LENGTH: 32,

    LASTNAME_MIN_LENGTH: 2,
    LASTNAME_MAX_LENGTH: 32,

    EMAIL_MIN_LENGTH: 6,
    EMAIL_MAX_LENGTH: 64,

    USERNAME_MIN_LENGTH: 6,
    USERNAME_MAX_LENGTH: 64,

    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 32,

    PHONE_MIN_LENGTH: 9,
    PHONE_MAX_LENGTH: 16,

    ADDRESS_MAX_LENGTH: 64,

    LOCATION_LAT_LNG_MAX_LENGTH: 128,

    AVATAR_MAX_LENGTH: 64
  },

  PLATE: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 64,

    DESCRIPTION_MAX_LENGTH: 1000,

    AVATAR_MAX_LENGTH: 64
  },

  CATEGORY: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 64,

    DESCRIPTION_MAX_LENGTH: 128,

    AVATAR_MAX_LENGTH: 64
  },

  TYPE: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 64,

    DESCRIPTION_MAX_LENGTH: 128,

    AVATAR_MAX_LENGTH: 64
  },

  ORDER: {
    DESTINE_LAT_LNG: 128,
    RATING_DESCRIPTION: 128,
    PAYMENT_CODE: 32
  },

  PAYMENT: {
    NAME: 32,
    DESCRIPTION: 128
  },

  STATUS: {
    NAME: 32,
    DESCRIPTION: 128
  },

  VEHICLE: {
    LICENSE_PLATE: 8,
    TYPE: 16
  },

  RATING: {
    NAME: 32,
    DESCRIPTION: 128
  }
};
