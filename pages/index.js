import Head from 'next/head'
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, []);

  return (
    <div>
      <Head>
        <link href="/fonts/style.css" rel="stylesheet" />
      </Head>
      <p>...loading</p>
    </div>
  )
}
