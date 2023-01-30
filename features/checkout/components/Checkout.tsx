import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/Elements/Button';
import { publicStrip } from '@/config/index';
import { apiCall } from '@/lib/axios';
import { Context } from '@/store/appContext';

import { CheckoutForm } from './CheckoutForm';
import { CheckoutSummary } from './CheckoutSummary';
import { CheckoutSection } from './index.styled';

export const Checkout = () => {
	return (
		<CheckoutSection>
			<CheckoutForm />
			<CheckoutSummary />
		</CheckoutSection>
	);
};
