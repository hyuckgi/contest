import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { routes, SubRoutes } from '@/router';

// AuthRoute를 통과한 route를 정의한다. 1차
function App() {
  // 각 페이지별 route를 정의한다. 1차
  // 하위 route는 각 Container에서 구현

  return (
    <Suspense fallback={<span>&nbsp;</span>}>
      <Switch>
        {routes.map(route => {
          return <SubRoutes key={route.path} {...route} />;
        })}
      </Switch>
    </Suspense>
  );
}

export default App;
