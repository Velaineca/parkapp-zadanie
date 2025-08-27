import { describe, expect, test, beforeEach } from 'vitest';
import { render } from 'vitest-browser-vue';
import PilotPage from './PilotPage.vue';
import LoginPage from '../LoginPage/LoginPage.vue';
import { createRouter, createWebHistory, RouterView } from 'vue-router';

describe('PilotPage', () => {
  beforeEach(() => {
    sessionStorage.setItem(
      'userGates',
      JSON.stringify([
        'Szlaban Grzybowska 1',
        'Brama Garażowa 1',
        'Brama Wyjazdowa Śląska',
        'Szlaban Pomorska 32',
        'Szlaban Łódzka 25',
        'Brama Gdańska 15',
      ])
    );
  });

  test('renders gates and pagination from sessionStorage', async () => {
    const { getByText, getByTestId } = render(PilotPage);

    expect(getByText('Szlaban Grzybowska 1')).toBeInTheDocument();
    const button = getByTestId('bullet-2');
    expect(button).toBeInTheDocument();
  });

  const routes = [
    { path: '/', component: PilotPage },
    { path: '/login', component: LoginPage },
  ];

  test('log out btn navigates to login page', async () => {
    const routes = [
      { path: '/', component: PilotPage },
      { path: '/login', component: LoginPage },
    ];

    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    const { getByTitle, getByPlaceholder } = render(RouterView, {
      global: { plugins: [router] },
    });

    await router.push('/');
    await router.isReady();

    const logoutBtn = getByTitle('Log out');
    expect(logoutBtn).toBeInTheDocument();

    await logoutBtn.click();

    const emailInput = await getByPlaceholder('Email');
    expect(emailInput).toBeInTheDocument();
  });
});
