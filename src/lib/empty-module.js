// Universal stub module for optional heavy / external packages (CDP, x402, Solana, etc.)
export const registerExactEvmScheme = () => {};
export const registerExactSvmScheme = () => {};
export const toClientEvmSigner = () => {};
export class UptoEvmScheme {}
export class ExactSvmScheme {}
export const cdpSolanaAccountToSvmSigner = () => {};
export const fromCdpSmartWallet = () => ({});
export const fromCdpEvmAccount = () => ({});
export const resolveNetworkFromChainId = () => '';
export const address = (val) => val;
export const getTransactionEncoder = () => ({});
export class x402Client {
  register() {}
  createPaymentPayload() {
    return {};
  }
}
export const createPaymentPayload = () => ({});

const handler = {
  get: (target, prop) => {
    if (prop === '__esModule') return true;
    if (prop === 'default') return stub;
    return stub;
  },
  apply: () => stub,
  construct: () => stub,
};
const stub = new Proxy(function () {}, handler);

export default stub;
