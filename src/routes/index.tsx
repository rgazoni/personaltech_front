import { LandingPage } from '@/pages/public/landing-page';
import { Login } from '@/pages/public/login';
import { Signup } from '@/pages/public/signup';
import { Routes } from '@/utils/enums';
import { Route, Routes as Routing } from 'react-router-dom';
import { PrivateRoute } from './private.routes';
import { EditPersonalPage } from '@/pages/private/edit-personal-page';
import { PersonalPage } from '@/pages/private/personal-page';
import { Search } from '@/pages/public/search';

export const AppRoutes = () => {
  return (
    <Routing>
      <Route path={Routes.HOME} element={<LandingPage />} />
      <Route path={Routes.LOGIN} element={<Login />} />
      <Route path={Routes.SIGNUP} element={<Signup />} />
      <Route path={Routes.PERSONAL_PAGE} element={<PersonalPage />} />
      <Route path={Routes.SEARCH} element={<Search />} />
      <Route element={<PrivateRoute />}>
        <Route
          index
          path={Routes.PAGE_EDITION}
          element={<EditPersonalPage />}
        />
      </Route>
    </Routing>
  );
};
