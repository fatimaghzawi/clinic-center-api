export const getParamId = (param: string | string[]): string => (Array.isArray(param) ? param[0] : param);
