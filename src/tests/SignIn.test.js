import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from '../redux/store.ts';
import SignInForm from '../components/SignInForm/SignInForm';

describe('Should render Sign In Form', () => {
    render(
        <Provider store={store}>
            <SignInForm />
        </Provider>
    );
    it('Shold contain button with text "Sign In"', () => {
        const component = screen.getByText('Sign In');
        expect(component).toBeInTheDocument();
    });
});
