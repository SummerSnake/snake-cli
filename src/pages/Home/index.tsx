import React, { useState, useEffect } from 'react';
import styles from './index.less';

export default function Home(props) {
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      props.history.push('/login');
    }
    return () => {
      localStorage.removeItem('accessToken');
    };
  }, []);
  return <div className={styles.homeWrap}>home</div>;
}
