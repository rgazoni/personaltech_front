import { LandingPage } from '@/pages/public/landing-page';
import { Login } from '@/pages/public/login';
import { Signup } from '@/pages/public/signup';
import { Routes } from '@/utils/enums';
import { Route, Routes as Routing } from 'react-router-dom';
import { PrivateRouteClient, PrivateRouteClientUser, PrivateRouteUser } from './private.routes';
import { EditPersonalPage } from '@/pages/private/edit-personal-page';
import { PersonalPage } from '@/pages/private/personal-page';
import { Search } from '@/pages/public/search';
import { SignupTrainee } from '@/pages/public/signup-trainee';
import { Profile } from '@/pages/private/profile';
import { App1 } from '@/pages/private/message';

export const AppRoutes = () => {
  return (
    <Routing>
      <Route path={Routes.HOME} element={<LandingPage />} />
      <Route path={Routes.LOGIN} element={<Login />} />
      <Route path={Routes.SIGNUP} element={<Signup />} />
      <Route path={Routes.PERSONAL_PAGE} element={<PersonalPage />} />
      <Route path={Routes.SEARCH} element={<Search />} />
      <Route path={Routes.SIGNUP_TRAINEE} element={<SignupTrainee />} />
      <Route element={<PrivateRouteUser />}>
        <Route
          index
          path={Routes.PAGE_EDITION}
          element={<EditPersonalPage />}
        />
      </Route>

      <Route element={<PrivateRouteClientUser />}>
        <Route path={Routes.MESSAGE} element={<App1 />} />
      </Route>

      <Route element={<PrivateRouteClient />}>
        <Route
          index
          path={Routes.PROFILE}
          element={<Profile />}
        />
      </Route>
    </Routing>
  );
};
