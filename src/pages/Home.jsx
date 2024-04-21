import React, { useEffect } from 'react';
import axios from '../api/axios';
import FilterSystem from '../components/FilterSystem';

function Home() {
  return (
    <div>
      <FilterSystem />
      
    </div>
  );
}

export default Home;
