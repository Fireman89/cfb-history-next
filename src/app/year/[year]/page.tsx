'use client'

import Image from "next/image";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import SchedulePageNew from "@/page/SchedulePageNew";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from "react";

// TODO resolve potential undefined URL or other screwery
export default function Home() {
  const pathname = usePathname();
  const [year, setYear] = useState('2022'); // Default to 2022

  useEffect(() => {
    // Extract the year from the pathname (assuming the route is something like /year/2020)
    const segments = pathname.split('/');
    const yearFromPath = segments[2]; // Assuming /year/[year]
    setYear(yearFromPath || '2022'); // Use the provided year or default to 2022
  }, [pathname]);

  return (
    <Provider store={store}>
      <div className="text-center">
        {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
        <header className="text-2xl">
          <Header/>
        </header>
        <main className="bg-gray-300 min-h-screen flex flex-col items-center justify-center text-black font-sans">
          <SchedulePageNew year={year as string}/>
        </main>
        <footer className="text-xl">
          <Footer/>
        </footer>
      </div>
    </Provider>
  );
}
