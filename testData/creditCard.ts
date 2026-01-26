import { CreditCardData } from '../types/creditCard';
import { getExpirationDatePlusMonths } from '../utils/dateUtils';

export const TEST_CARD: CreditCardData = {
  cardNumber: '1111-1111-1111-1111',
  expiration: getExpirationDatePlusMonths(3),
  cvv: '111',
  holder: 'Test User',
};