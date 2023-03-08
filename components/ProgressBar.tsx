import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { useRouter, Router } from 'next/router';

NProgress.configure({
  easing: 'ease',
  speed: 350,
  showSpinner: false,
  template: '<div class="bar" role="bar" style="background-color:#7828C8;opacity:0.8;"></div>',
});

export default function ProgressBar() {
  const router = useRouter();

  useEffect(() => {
    Router.events.on('routeChangeStart', NProgress.start);
    Router.events.on('routeChangeComplete', NProgress.done);
    Router.events.on('routeChangeError', NProgress.done);
    return () => {
      Router.events.off('routeChangeStart', NProgress.start);
      Router.events.off('routeChangeComplete', NProgress.done);
      Router.events.off('routeChangeError', NProgress.done);
    };
  }, []);

  return null;
}
