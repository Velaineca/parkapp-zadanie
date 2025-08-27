import { describe, expect, vi, test } from 'vitest';
import { render } from 'vitest-browser-vue';
import LoginPage from './LoginPage.vue';
import { userEvent } from '@vitest/browser/context';
import { nextTick, ref } from 'vue';

const mockMutate = vi.fn();
let onDoneCallback: Function;
const errorRef = ref(null);

vi.mock('@vue/apollo-composable', () => {
  return {
    useMutation: () => ({
      mutate: mockMutate,
      loading: false,
      error: errorRef,
      onDone: (cb: Function) => {
        onDoneCallback = cb;
      },
    }),
  };
});

describe('LoginPage', () => {
  test('renders form fields', async () => {
    const { getByPlaceholder, getByTestId } = render(LoginPage);

    await expect.element(getByPlaceholder('Email')).toBeInTheDocument();
    await expect.element(getByPlaceholder('Password')).toBeInTheDocument();
    await expect.element(getByTestId('btn-login')).toBeInTheDocument();
  });

  test('show success and user name after correct login', async () => {
    const { getByPlaceholder, getByTestId } = render(LoginPage);

    const email = getByPlaceholder('Email');
    const password = getByPlaceholder('Password');
    const button = getByTestId('btn-login');

    await userEvent.fill(email, 'zadanie@test.pl');
    await userEvent.fill(password, 'test123');
    await button.click();

    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledWith({
      email: 'zadanie@test.pl',
      password: 'test123',
    });

    onDoneCallback({
      data: {
        login: {
          token: 'mock-token-u1',
          user: { id: 'u1', email: 'zadanie@test.pl', name: 'Test User', gates: [] },
        },
      },
    });

    await nextTick();

    expect(getByTestId('text-success')).toBeInTheDocument();
    expect(getByTestId('text-success')).toHaveTextContent('Logged in as Test User.');
  });

  test('show "User not found" after typing wrong email', async () => {
    const { getByPlaceholder, getByTestId } = render(LoginPage);

    const email = getByPlaceholder('Email');
    const password = getByPlaceholder('Password');
    const button = getByTestId('btn-login');

    mockMutate.mockImplementationOnce(() => {
      errorRef.value = new Error('User not found.');
      return Promise.reject(errorRef.value);
    });

    await userEvent.fill(email, 'zadanie@zadanie.pl');
    await userEvent.fill(password, 'zadanie');
    await button.click();

    expect(mockMutate).toHaveBeenCalledTimes(2);

    await nextTick();

    const errorText = getByTestId('text-error');
    await expect(errorText).toBeInTheDocument();
    await expect(errorText).toHaveTextContent('User not found.');
  });

  test('show "Type both email and password." after not typing in correct fields', async () => {
    const { getByPlaceholder, getByTestId } = render(LoginPage);

    const email = getByPlaceholder('Email');
    const password = getByPlaceholder('Password');
    const button = getByTestId('btn-login');

    mockMutate.mockImplementationOnce(() => {
      errorRef.value = new Error('Type both email and password.');
      return Promise.reject(errorRef.value);
    });

    await userEvent.fill(email, '');
    await userEvent.fill(password, '');
    await button.click();

    expect(mockMutate).toHaveBeenCalledTimes(3);

    await nextTick();

    const errorText = getByTestId('text-error');
    await expect(errorText).toBeInTheDocument();
    await expect(errorText).toHaveTextContent('Type both email and password.');
  });

  test('show "Invalid password" after typing wrong password', async () => {
    const { getByPlaceholder, getByTestId } = render(LoginPage);

    const email = getByPlaceholder('Email');
    const password = getByPlaceholder('Password');
    const button = getByTestId('btn-login');

    mockMutate.mockImplementationOnce(() => {
      errorRef.value = new Error('Invalid password.');
      return Promise.reject(errorRef.value);
    });

    await userEvent.fill(email, 'zadanie@test.pl');
    await userEvent.fill(password, '123');
    await button.click();

    expect(mockMutate).toHaveBeenCalledTimes(4);

    await nextTick();

    const errorText = getByTestId('text-error');
    await expect(errorText).toBeInTheDocument();
    await expect(errorText).toHaveTextContent('Invalid password.');
  });
});
