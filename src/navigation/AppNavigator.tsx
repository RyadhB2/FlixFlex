import React, { useEffect, useState } from 'react';

import MainNavigator from './MainNavigator';
import { useAppSelector } from '../redux/store/ConfigureStore';
import AuthNavigator from './AuthNavigator';
//Screens

const AppNavigator: React.FC = () => {

  const id = useAppSelector((state) => state.user.id)
  const [loading, setLoading] = useState(true)
  // if (loading) return <Loader />
  if (id) return <MainNavigator />
  else return <AuthNavigator />
};

export default AppNavigator;
