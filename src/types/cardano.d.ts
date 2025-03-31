interface CardanoWallet {
  enable: () => Promise<any>;
  isEnabled: () => Promise<boolean>;
  experimental: any;
}

interface Cardano {
  nami?: CardanoWallet;
  eternl?: CardanoWallet;
  flint?: CardanoWallet;
  yoroi?: CardanoWallet;
  vespr?: CardanoWallet;
}

declare interface Window {
  cardano?: Cardano;
}
