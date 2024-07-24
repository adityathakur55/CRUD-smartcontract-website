import NeucronSDK from 'neucron-sdk';

/** @type {import('./$types').Actions} */
export const actions = {
  login: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    try {
      if (!email || !password) {
        throw new Error('Email or password missing');
      }

      const neucron = new NeucronSDK();
      const authModule = neucron.authentication;

      // Log in the user
      const loginResponse = await authModule.login({ email, password });
      console.log('Login Response:', loginResponse);

      // Check for a valid access token
      if (loginResponse.data && loginResponse.data.access_token) {
        const walletModule = neucron.wallet;
        const DefaultWalletBalance = await walletModule.getWalletBalance({});
        console.log('Default Wallet Balance:', DefaultWalletBalance);

        return { success: true, email, balance: DefaultWalletBalance.data.balance.summary };
      } else {
        throw new Error('Login failed');
      }

    } catch (error) {
      console.error('Error during login:', error.message);
      return { success: false, error: error.message || 'Login failed. Please check your credentials and try again.' };
    }
  },

  pay: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const paymail = data.get('paymail');
    const amount = Number(data.get('amount'));

    try {
      if (!email || !password || !paymail || isNaN(amount)) {
        throw new Error('Missing or invalid payment details');
      }

      const neucron = new NeucronSDK();
      const authModule = neucron.authentication;

      // Log in the user
      const loginResponse = await authModule.login({ email, password });
      console.log('Login Response:', loginResponse);

      // Check for a valid access token
      if (loginResponse.data && loginResponse.data.access_token) {
        const options = {
          outputs: [
            {
              address: paymail,
              note: 'gurudakshina',
              amount
            }
          ]
        };
        console.log('Payment Options:', options);

        const payResponse = await neucron.pay.txSpend(options);
        console.log('Payment Response:', payResponse);

        return { success: true, payment: payResponse.data.txid };
      } else {
        throw new Error('Login failed');
      }

    } catch (error) {
      console.error('Error during payment:', error.message);
      return { success: false, error: error.message || 'Payment failed. Please try again.' };
    }
  }
};
