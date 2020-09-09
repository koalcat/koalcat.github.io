const AV = require('leancloud-storage');
const Subscription = AV.Object.extend('Subscription');

AV.init({
  appId: 'rBMLBbaycYOmHQJgEHw8tinr-gzGzoHsz',
  appKey: 'LPmPFKnYLzmujcl34Buocun9',
  serverURL: 'https://rbmlbbay.lc-cn-n1-shared.com',
});

export const subscribeEmail: (email: string) => Promise<any> = (email: string) => {
    const subscription = new Subscription();
    subscription.set('email', email);
    return subscription.save();
}
