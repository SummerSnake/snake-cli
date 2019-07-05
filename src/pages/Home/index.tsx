import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface InitProp {
  history: any[];
}
export default function Home(props: InitProp) {
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
