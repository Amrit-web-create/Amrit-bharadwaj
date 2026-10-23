declare module "qrcode" {
  interface QRMatrix {
    size: number;
    get(row: number, col: number): boolean;
  }
  interface QRCode {
    modules: QRMatrix;
    version: number;
  }
  interface QRCodeAPI {
    create(
      text: string,
      options?: { errorCorrectionLevel?: "L" | "M" | "Q" | "H" },
    ): QRCode;
  }
  const QRCode: QRCodeAPI;
  export default QRCode;
}
