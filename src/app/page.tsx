'use client'

import Image from "next/image";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import SchedulePageNew from "@/page/SchedulePageNew";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

const DEFAULT_YEAR = '2022';

export default function Home() {
  return (
    <Provider store={store}>
      <div className="text-center">
        {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
        <header className="text-2xl">
          <Header/>
        </header>
        <main className="bg-gray-300 min-h-screen flex flex-col items-center justify-center text-black font-sans">
          <SchedulePageNew year={DEFAULT_YEAR}/>
        </main>
        <footer className="text-xl">
          <Footer/>
        </footer>
      </div>
    </Provider>
  );
}
