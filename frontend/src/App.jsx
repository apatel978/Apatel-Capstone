import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import CreateNewGoal from "./components/Goals/CreateGoal/CreateGoalForm";
import UpdateGoalForm from "./components/Goals/UpdateGoal/UpdateGoalForm";
import CreateNewWorkout from "./components/Workouts/CreateWorkout/CreateWorkoutForm";
import UpdateWorkoutForm from "./components/Workouts/UpdateWorkout";
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/current',
        element: <Dashboard />
      },
      {
        path: 'goals/new',
        element: <CreateNewGoal />
      },
      {
        path: 'goals/:goalId/edit',
        element: <UpdateGoalForm />
      },
      {
        path: 'workouts/new',
        element: <CreateNewWorkout />
      },
      {
        path: 'workouts/:workoutId/edit',
        element: <UpdateWorkoutForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
