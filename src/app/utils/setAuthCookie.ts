import { Response } from "express";

export interface TokenInfo {
  accessToken: string;
  refreshToken?: string;
}

export const setAuthCookie = async (res: Response, tokenInfo: TokenInfo) => {

  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // ...(isProduction && { domain: ".netlify.app" }),
      // path: "/",
    });
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // ...(isProduction && { domain: ".netlify.app" }),
      // path: "/",
    });
  }
};
