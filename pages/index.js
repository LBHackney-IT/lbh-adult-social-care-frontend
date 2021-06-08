import Head from 'next/head'
import Login from "./login";

export default function IndexPage() {
  return (
    <div>
      <Head>
        <link href="/fonts/style.css" rel="stylesheet" />
      </Head>
      <Login />
    </div>
  )
}
