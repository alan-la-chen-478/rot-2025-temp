import {isBuild} from '~helpers/environments';

const envVariables = {
  api: {
    source: 'stage',
    protocol: 'https',
    domain: 'royaleorchidtours.alro8.com',
    proxy_domain: 'royaleorchidtours.alro8.com',
  },
  agora: {
    app_id: 'f14d2f434ad6440a9d6b36e8f46abe3c',
  },
};

if (isBuild('development')) {
  envVariables.api.source = 'debug';
  envVariables.api.domain = 'fca7916b3314.ngrok-free.app';
  envVariables.api.proxy_domain = 'royaleorchidtours.test';
  envVariables.agora.app_id = 'f14d2f434ad6440a9d6b36e8f46abe3c';
}

if (isBuild('release')) {
  envVariables.api.source = 'prod';
  envVariables.api.domain = 'royaleorchidtours.com';
  envVariables.api.proxy_domain = 'royaleorchidtours.com';
  envVariables.agora.app_id = 'e8c2025d66a8491f83c1f8c0f7119876'; // cert 67d7e0ced84d4563832e840b50e63d0a
}

export default envVariables;
