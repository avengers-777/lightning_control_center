export interface TokenInfo {
    tokenName: string;
    tokenValue: string;
    isLogin: boolean;
    loginId: string;
    loginType: string;
    tokenTimeout: number;
    sessionTimeout: number;
    tokenSessionTimeout: number;
    tokenActivityTimeout: number;
    loginDevice: string;
    tag: any; // 使用 any 类型，因为你的原始数据中 tag 是 null，可能表示任何类型的值
  }
  