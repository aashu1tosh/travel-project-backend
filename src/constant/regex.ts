export const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const phoneNumberRegex = /^9\d{9}$/;
export const latRegex = /^([+-]?([1-8]?[0-9](\.\d+)?|90(\.0+)?))$/;
export const longRegex =
    /^([+-]?((1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|180(\.0+)?))$/;
