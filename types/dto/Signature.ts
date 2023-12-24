export enum SignatureType {
    LOG_IN = "LOG_IN"
  }
  

interface SignatureTypeDetails {
  LOG_IN: string;
}

const SignatureTypeMessages: SignatureTypeDetails = {
  LOG_IN: "Please sign to let us verify that you are the owner of this address",
};

class Signature {
  private type: SignatureType;
  private signature: string;
  private message: string;
  private messageArray?: string[];

  constructor(type: SignatureType, signature: string, message: string) {
    this.type = type;
    this.signature = signature;
    this.message = message;
  }

  private toMessageArray(): string[] {
    if (!this.messageArray) {
      this.messageArray = this.message.split("_");
    }
    return this.messageArray;
  }

  public validateMessageType(): boolean {
    return SignatureTypeMessages[this.type] === this.getMessageTip();
  }

  public getMessageTip(): string {
    const msgList = this.toMessageArray();
    return msgList.length > 0 ? msgList[0] : "";
  }

  public getAddress(): string {
    const msgList = this.toMessageArray();
    return msgList.length > 1 ? msgList[1] : "";
  }

  public getNonce(): string {
    const msgList = this.toMessageArray();
    return msgList.length > 2 ? msgList[2] : "";
  }

  // Additional methods for setting and getting other properties...
}

export { Signature, SignatureTypeMessages };
